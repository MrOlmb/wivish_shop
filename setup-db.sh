#!/bin/bash

# Database setup script for Vercel deployment
echo "Setting up database for deployment..."

# Set the database URL
export DATABASE_URL="mysql://root:RYGJrlpQfGZVjMOIdKvCRyGJikQBxOsh@caboose.proxy.rlwy.net:46856/railway"

# Generate Prisma client
echo "Generating Prisma client..."
bunx prisma generate

# Push database schema (this will create tables if they don't exist)
echo "Pushing database schema..."
bunx prisma db push

# Optional: Run seed script if you have one
if [ -f "scripts/seed.js" ]; then
    echo "Running seed script..."
    bunx ts-node scripts/seed.js
fi

echo "Database setup complete!"
