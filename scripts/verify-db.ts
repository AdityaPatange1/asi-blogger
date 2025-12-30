/**
 * Database Verification Script
 * Verifies the connection and data in both databases
 *
 * Usage: npx tsx scripts/verify-db.ts
 */

import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const SOURCE_URI = process.env.MONGODB_URI;
const TARGET_URI = process.env.EB_MONGODB_URI;

const COLLECTIONS = ['blogs', 'comments', 'likes'];

interface DbStats {
  name: string;
  uri: string;
  connected: boolean;
  collections: {
    name: string;
    count: number;
  }[];
}

class DatabaseVerifier {
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

  private maskUri(uri: string): string {
    // Mask password in URI for display
    return uri.replace(/:([^:@]+)@/, ':****@');
  }

  async verifyDatabase(uri: string, name: string): Promise<DbStats> {
    const stats: DbStats = {
      name,
      uri: this.maskUri(uri),
      connected: false,
      collections: [],
    };

    const client = new MongoClient(uri);

    try {
      await client.connect();
      stats.connected = true;
      this.log(`Connected to ${name}`, 'success');

      const dbName = this.extractDbName(uri);
      const db = client.db(dbName);

      for (const collectionName of COLLECTIONS) {
        const collection = db.collection(collectionName);
        const count = await collection.countDocuments();
        stats.collections.push({ name: collectionName, count });
      }
    } catch (error) {
      this.log(`Failed to connect to ${name}: ${error}`, 'error');
    } finally {
      await client.close();
    }

    return stats;
  }

  async verify(): Promise<void> {
    console.log('');
    console.log('==============================================');
    console.log('   Database Verification');
    console.log('==============================================');
    console.log('');

    const results: DbStats[] = [];

    // Verify source database
    if (SOURCE_URI) {
      this.log('Verifying source database (MONGODB_URI)...');
      const sourceStats = await this.verifyDatabase(SOURCE_URI, 'Source (MONGODB_URI)');
      results.push(sourceStats);
      console.log('');
    } else {
      this.log('MONGODB_URI not configured', 'warning');
    }

    // Verify target database
    if (TARGET_URI) {
      this.log('Verifying target database (EB_MONGODB_URI)...');
      const targetStats = await this.verifyDatabase(TARGET_URI, 'Target (EB_MONGODB_URI)');
      results.push(targetStats);
      console.log('');
    } else {
      this.log('EB_MONGODB_URI not configured', 'warning');
    }

    // Print results
    console.log('==============================================');
    console.log('   Verification Results');
    console.log('==============================================');
    console.log('');

    for (const stats of results) {
      console.log(`${stats.name}:`);
      console.log(`  URI: ${stats.uri}`);
      console.log(`  Connected: ${stats.connected ? '✓ Yes' : '✗ No'}`);

      if (stats.connected) {
        console.log('  Collections:');
        for (const col of stats.collections) {
          console.log(`    - ${col.name}: ${col.count} documents`);
        }
      }
      console.log('');
    }

    // Compare if both databases are available
    if (results.length === 2 && results[0].connected && results[1].connected) {
      console.log('==============================================');
      console.log('   Comparison');
      console.log('==============================================');
      console.log('');

      let allMatch = true;

      for (const colName of COLLECTIONS) {
        const sourceCol = results[0].collections.find(c => c.name === colName);
        const targetCol = results[1].collections.find(c => c.name === colName);

        const sourceCount = sourceCol?.count || 0;
        const targetCount = targetCol?.count || 0;

        const match = sourceCount === targetCount;
        if (!match) allMatch = false;

        const status = match ? '✓' : '✗';
        console.log(`  ${colName}: Source=${sourceCount}, Target=${targetCount} ${status}`);
      }

      console.log('');

      if (allMatch) {
        this.log('All collections match! Migration appears successful.', 'success');
      } else {
        this.log('Some collections do not match. Please verify the migration.', 'warning');
      }
    }

    console.log('');
  }
}

const verifier = new DatabaseVerifier();
verifier.verify().catch((error) => {
  console.error('Verification failed:', error);
  process.exit(1);
});
