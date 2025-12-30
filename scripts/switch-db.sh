#!/bin/bash

# =============================================================================
# Switch Database Script
# Updates the application to use EB_MONGODB_URI instead of MONGODB_URI
# =============================================================================

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
print_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
print_warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }
print_error() { echo -e "${RED}[ERROR]${NC} $1"; }

echo ""
echo "=============================================="
echo "   Switch Database to EB_MONGODB_URI"
echo "=============================================="
echo ""

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
MONGODB_FILE="$PROJECT_DIR/src/lib/mongodb.ts"
ENV_FILE="$PROJECT_DIR/.env"

# Backup original file
print_info "Creating backup of mongodb.ts..."
cp "$MONGODB_FILE" "$MONGODB_FILE.backup"
print_success "Backup created: mongodb.ts.backup"

# Update mongodb.ts to use EB_MONGODB_URI
print_info "Updating mongodb.ts to use EB_MONGODB_URI..."

cat > "$MONGODB_FILE" << 'EOF'
import mongoose from 'mongoose';

// Use EB_MONGODB_URI as the primary connection (migrated database)
// Falls back to MONGODB_URI for backward compatibility
const MONGODB_URI = process.env.EB_MONGODB_URI || process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define EB_MONGODB_URI or MONGODB_URI environment variable');
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectToDatabase;
EOF

print_success "mongodb.ts updated successfully"

echo ""
print_success "=============================================="
print_success "   Database connection switched!"
print_success "=============================================="
echo ""
print_info "The application will now use EB_MONGODB_URI"
print_info "A backup of the original file is at: mongodb.ts.backup"
echo ""
print_info "Next steps:"
echo "  1. Restart your application"
echo "  2. Verify everything works correctly"
echo "  3. Remove the backup file when satisfied"
echo ""
