#!/bin/bash

# =============================================================================
# MongoDB Migration Script
# Migrates data from MONGODB_URI to EB_MONGODB_URI
# =============================================================================

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Print colored output
print_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
print_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
print_warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }
print_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# Banner
echo ""
echo "=============================================="
echo "   ASI Blogger MongoDB Migration Script"
echo "=============================================="
echo ""

# Get script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

# Load environment variables from .env file
ENV_FILE="$PROJECT_DIR/.env"
if [ -f "$ENV_FILE" ]; then
    print_info "Loading environment variables from .env"
    export $(grep -v '^#' "$ENV_FILE" | xargs)
else
    print_error ".env file not found at $ENV_FILE"
    exit 1
fi

# Validate environment variables
if [ -z "$MONGODB_URI" ]; then
    print_error "MONGODB_URI is not set in .env file"
    exit 1
fi

if [ -z "$EB_MONGODB_URI" ]; then
    print_error "EB_MONGODB_URI is not set in .env file"
    exit 1
fi

print_info "Source: MONGODB_URI configured"
print_info "Target: EB_MONGODB_URI configured"
echo ""

# Parse MongoDB URI to extract database name
parse_db_name() {
    local uri=$1
    # Extract database name from URI (after last / and before ?)
    local db_name=$(echo "$uri" | sed -n 's|.*\/\([^?]*\).*|\1|p')
    echo "$db_name"
}

SOURCE_DB=$(parse_db_name "$MONGODB_URI")
TARGET_DB=$(parse_db_name "$EB_MONGODB_URI")

print_info "Source database: $SOURCE_DB"
print_info "Target database: $TARGET_DB"
echo ""

# Create temporary directory for dump
DUMP_DIR="$PROJECT_DIR/tmp/mongo_dump_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$DUMP_DIR"
print_info "Created temporary directory: $DUMP_DIR"

# Check if MongoDB tools are available
check_mongo_tools() {
    if command -v mongodump &> /dev/null && command -v mongorestore &> /dev/null; then
        return 0
    else
        return 1
    fi
}

# Migration using mongodump/mongorestore (fastest method)
migrate_with_mongo_tools() {
    print_info "Using MongoDB Database Tools for migration..."
    echo ""

    # Collections to migrate
    COLLECTIONS=("blogs" "comments" "likes")

    for collection in "${COLLECTIONS[@]}"; do
        print_info "Dumping collection: $collection"
        mongodump --uri="$MONGODB_URI" \
            --collection="$collection" \
            --out="$DUMP_DIR" \
            --quiet

        if [ $? -eq 0 ]; then
            print_success "Dumped $collection successfully"
        else
            print_error "Failed to dump $collection"
            exit 1
        fi
    done

    echo ""
    print_info "Restoring to target database..."

    for collection in "${COLLECTIONS[@]}"; do
        print_info "Restoring collection: $collection"

        # Find the dump file
        DUMP_FILE="$DUMP_DIR/$SOURCE_DB/$collection.bson"

        if [ -f "$DUMP_FILE" ]; then
            mongorestore --uri="$EB_MONGODB_URI" \
                --collection="$collection" \
                --nsFrom="$SOURCE_DB.$collection" \
                --nsTo="$TARGET_DB.$collection" \
                --drop \
                "$DUMP_FILE" \
                --quiet

            if [ $? -eq 0 ]; then
                print_success "Restored $collection successfully"
            else
                print_error "Failed to restore $collection"
                exit 1
            fi
        else
            print_warning "No data found for $collection (skipping)"
        fi
    done
}

# Migration using Node.js script (fallback)
migrate_with_node() {
    print_info "MongoDB tools not found. Using Node.js migration script..."
    echo ""

    cd "$PROJECT_DIR"

    # Run the Node.js migration script
    npx ts-node --compiler-options '{"module":"CommonJS"}' scripts/migrate-db.ts

    if [ $? -eq 0 ]; then
        print_success "Node.js migration completed successfully"
    else
        print_error "Node.js migration failed"
        exit 1
    fi
}

# Confirmation prompt
echo ""
print_warning "This will migrate ALL data from the source database to the target database."
print_warning "The target collections will be REPLACED with source data."
echo ""
read -p "Do you want to proceed? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
    print_info "Migration cancelled."
    exit 0
fi

echo ""
print_info "Starting migration..."
echo ""

# Run migration
if check_mongo_tools; then
    migrate_with_mongo_tools
else
    migrate_with_node
fi

# Cleanup
print_info "Cleaning up temporary files..."
rm -rf "$DUMP_DIR"

echo ""
print_success "=============================================="
print_success "   Migration completed successfully!"
print_success "=============================================="
echo ""
print_info "Next steps:"
echo "  1. Update your .env file to use EB_MONGODB_URI as MONGODB_URI"
echo "  2. Or update src/lib/mongodb.ts to use EB_MONGODB_URI"
echo "  3. Verify the data in your new database"
echo "  4. Restart your application"
echo ""
