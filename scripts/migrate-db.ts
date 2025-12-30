/**
 * MongoDB Migration Script
 * Migrates all data from MONGODB_URI to EB_MONGODB_URI
 *
 * Usage: npx ts-node scripts/migrate-db.ts
 */

import { MongoClient, Document } from 'mongodb';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env') });

// Configuration
const SOURCE_URI = process.env.MONGODB_URI;
const TARGET_URI = process.env.EB_MONGODB_URI;

// Collections to migrate
const COLLECTIONS = ['blogs', 'comments', 'likes'];

// Batch size for large collections
const BATCH_SIZE = 100;

interface MigrationStats {
  collection: string;
  sourceCount: number;
  migratedCount: number;
  duration: number;
}

class DatabaseMigrator {
  private sourceClient: MongoClient | null = null;
  private targetClient: MongoClient | null = null;
  private stats: MigrationStats[] = [];

  constructor() {
    if (!SOURCE_URI) {
      throw new Error('MONGODB_URI is not set in environment variables');
    }
    if (!TARGET_URI) {
      throw new Error('EB_MONGODB_URI is not set in environment variables');
    }
  }

  private log(message: string, type: 'info' | 'success' | 'error' | 'warning' = 'info') {
    const colors = {
      info: '\x1b[34m',
      success: '\x1b[32m',
      error: '\x1b[31m',
      warning: '\x1b[33m',
    };
    const reset = '\x1b[0m';
    const prefix = {
      info: '[INFO]',
      success: '[SUCCESS]',
      error: '[ERROR]',
      warning: '[WARNING]',
    };
    console.log(`${colors[type]}${prefix[type]}${reset} ${message}`);
  }

  private extractDbName(uri: string): string {
    const match = uri.match(/\/([^/?]+)(\?|$)/);
    return match ? match[1] : 'test';
  }

  async connect(): Promise<void> {
    this.log('Connecting to source database...');
    this.sourceClient = new MongoClient(SOURCE_URI!);
    await this.sourceClient.connect();
    this.log('Connected to source database', 'success');

    this.log('Connecting to target database...');
    this.targetClient = new MongoClient(TARGET_URI!);
    await this.targetClient.connect();
    this.log('Connected to target database', 'success');
  }

  async disconnect(): Promise<void> {
    if (this.sourceClient) {
      await this.sourceClient.close();
      this.log('Disconnected from source database');
    }
    if (this.targetClient) {
      await this.targetClient.close();
      this.log('Disconnected from target database');
    }
  }

  async migrateCollection(collectionName: string): Promise<MigrationStats> {
    const startTime = Date.now();

    const sourceDbName = this.extractDbName(SOURCE_URI!);
    const targetDbName = this.extractDbName(TARGET_URI!);

    const sourceDb = this.sourceClient!.db(sourceDbName);
    const targetDb = this.targetClient!.db(targetDbName);

    const sourceCollection = sourceDb.collection(collectionName);
    const targetCollection = targetDb.collection(collectionName);

    // Get source count
    const sourceCount = await sourceCollection.countDocuments();
    this.log(`Found ${sourceCount} documents in ${collectionName}`);

    if (sourceCount === 0) {
      this.log(`No documents to migrate in ${collectionName}`, 'warning');
      return {
        collection: collectionName,
        sourceCount: 0,
        migratedCount: 0,
        duration: Date.now() - startTime,
      };
    }

    // Drop target collection to ensure clean migration
    try {
      await targetCollection.drop();
      this.log(`Dropped existing ${collectionName} in target database`);
    } catch (error) {
      // Collection might not exist, which is fine
    }

    // Migrate in batches
    let migratedCount = 0;
    const cursor = sourceCollection.find({});
    let batch: Document[] = [];

    while (await cursor.hasNext()) {
      const doc = await cursor.next();
      if (doc) {
        batch.push(doc);

        if (batch.length >= BATCH_SIZE) {
          await targetCollection.insertMany(batch);
          migratedCount += batch.length;
          this.log(`Migrated ${migratedCount}/${sourceCount} documents in ${collectionName}`);
          batch = [];
        }
      }
    }

    // Insert remaining documents
    if (batch.length > 0) {
      await targetCollection.insertMany(batch);
      migratedCount += batch.length;
    }

    const duration = Date.now() - startTime;
    this.log(`Migrated ${migratedCount} documents in ${collectionName} (${duration}ms)`, 'success');

    return {
      collection: collectionName,
      sourceCount,
      migratedCount,
      duration,
    };
  }

  async recreateIndexes(collectionName: string): Promise<void> {
    const sourceDbName = this.extractDbName(SOURCE_URI!);
    const targetDbName = this.extractDbName(TARGET_URI!);

    const sourceDb = this.sourceClient!.db(sourceDbName);
    const targetDb = this.targetClient!.db(targetDbName);

    const sourceCollection = sourceDb.collection(collectionName);
    const targetCollection = targetDb.collection(collectionName);

    // Get indexes from source
    const indexes = await sourceCollection.indexes();

    for (const index of indexes) {
      // Skip the default _id index
      if (index.name === '_id_') continue;

      try {
        const { key, ...options } = index;
        // Remove internal fields
        delete (options as Record<string, unknown>).v;
        delete (options as Record<string, unknown>).ns;

        await targetCollection.createIndex(key, options);
        this.log(`Created index ${index.name} on ${collectionName}`);
      } catch (error) {
        this.log(`Failed to create index ${index.name}: ${error}`, 'warning');
      }
    }
  }

  async migrate(): Promise<void> {
    console.log('');
    console.log('==============================================');
    console.log('   ASI Blogger MongoDB Migration');
    console.log('==============================================');
    console.log('');

    try {
      await this.connect();
      console.log('');

      // Migrate each collection
      for (const collection of COLLECTIONS) {
        this.log(`Migrating collection: ${collection}`);
        const stats = await this.migrateCollection(collection);
        this.stats.push(stats);

        // Recreate indexes
        this.log(`Recreating indexes for: ${collection}`);
        await this.recreateIndexes(collection);
        console.log('');
      }

      // Print summary
      this.printSummary();

    } catch (error) {
      this.log(`Migration failed: ${error}`, 'error');
      throw error;
    } finally {
      await this.disconnect();
    }
  }

  private printSummary(): void {
    console.log('');
    console.log('==============================================');
    console.log('   Migration Summary');
    console.log('==============================================');
    console.log('');

    let totalSource = 0;
    let totalMigrated = 0;
    let totalDuration = 0;

    for (const stat of this.stats) {
      console.log(`  ${stat.collection}:`);
      console.log(`    Source: ${stat.sourceCount} documents`);
      console.log(`    Migrated: ${stat.migratedCount} documents`);
      console.log(`    Duration: ${stat.duration}ms`);
      console.log('');

      totalSource += stat.sourceCount;
      totalMigrated += stat.migratedCount;
      totalDuration += stat.duration;
    }

    console.log('  Total:');
    console.log(`    Source: ${totalSource} documents`);
    console.log(`    Migrated: ${totalMigrated} documents`);
    console.log(`    Duration: ${totalDuration}ms`);
    console.log('');

    if (totalSource === totalMigrated) {
      this.log('All documents migrated successfully!', 'success');
    } else {
      this.log(`Warning: ${totalSource - totalMigrated} documents may not have been migrated`, 'warning');
    }

    console.log('');
    console.log('Next steps:');
    console.log('  1. Update your .env file to use EB_MONGODB_URI');
    console.log('  2. Or update src/lib/mongodb.ts to use EB_MONGODB_URI');
    console.log('  3. Verify the data in your new database');
    console.log('  4. Restart your application');
    console.log('');
  }
}

// Run migration
const migrator = new DatabaseMigrator();
migrator.migrate().catch((error) => {
  console.error('Migration failed:', error);
  process.exit(1);
});
