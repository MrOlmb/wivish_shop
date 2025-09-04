const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient();

async function backupUsers() {
  try {
    console.log('Backing up users...');
    
    // Get all users
    const users = await prisma.user.findMany();
    
    // Save to JSON file
    const backup = {
      timestamp: new Date().toISOString(),
      users: users
    };
    
    fs.writeFileSync('users-backup.json', JSON.stringify(backup, null, 2));
    console.log(`✅ Backup completed! ${users.length} users saved to users-backup.json`);
    
    // Also create a CSV for easier viewing
    if (users.length > 0) {
      const csvHeader = 'id,name,email,picture,role,createdAt,updatedAt\n';
      const csvRows = users.map(user => 
        `${user.id},"${user.name}","${user.email}","${user.picture}",${user.role},${user.createdAt},${user.updatedAt}`
      ).join('\n');
      
      fs.writeFileSync('users-backup.csv', csvHeader + csvRows);
      console.log('✅ CSV backup also created: users-backup.csv');
    }
    
  } catch (error) {
    console.error('❌ Error backing up users:', error);
  } finally {
    await prisma.$disconnect();
  }
}

backupUsers();