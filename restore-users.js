const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient();

async function restoreUsers() {
  try {
    console.log('Restoring users from backup...');
    
    // Read backup file
    if (!fs.existsSync('users-backup.json')) {
      console.error('❌ Backup file not found: users-backup.json');
      return;
    }
    
    const backup = JSON.parse(fs.readFileSync('users-backup.json', 'utf8'));
    console.log(`📂 Found backup from ${backup.timestamp} with ${backup.users.length} users`);
    
    // Restore users
    let restored = 0;
    let skipped = 0;
    
    for (const user of backup.users) {
      try {
        await prisma.user.create({
          data: {
            id: user.id,
            name: user.name,
            email: user.email,
            picture: user.picture,
            role: user.role,
            createdAt: new Date(user.createdAt),
            updatedAt: new Date(user.updatedAt)
          }
        });
        restored++;
        console.log(`✅ Restored user: ${user.name} (${user.email})`);
      } catch (error) {
        if (error.code === 'P2002') {
          // User already exists (unique constraint violation)
          console.log(`⚠️  User already exists: ${user.email}`);
          skipped++;
        } else {
          console.error(`❌ Error restoring user ${user.email}:`, error.message);
        }
      }
    }
    
    console.log(`\n📊 Restore completed:`);
    console.log(`   - Restored: ${restored} users`);
    console.log(`   - Skipped: ${skipped} users`);
    
  } catch (error) {
    console.error('❌ Error restoring users:', error);
  } finally {
    await prisma.$disconnect();
  }
}

restoreUsers();