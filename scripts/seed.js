const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  try {
    // Create default store
    const defaultStore = await prisma.store.upsert({
      where: { 
        url: 'wivish-shop'  // Use a default URL slug
      },
      update: {},
      create: {
        id: 'default-store-id',
        name: 'Wivish Shop',
        description: 'Your premium e-commerce store offering quality products with excellent service.',
        email: 'contact@wivish.shop',
        phone: '+1234567890',
        url: 'wivish-shop',
        logo: '/assets/icons/logo.png',
        cover: '/assets/images/home-wallpaper.webp',
        status: 'ACTIVE',
        featured: true,
        returnPolicy: 'Return within 30 days for full refund',
        defaultShippingService: 'Standard Delivery',
        defaultShippingFeePerItem: 5.99,
        defaultShippingFeeForAdditionalItem: 2.99,
        defaultShippingFeePerKg: 1.50,
        defaultShippingFeeFixed: 0.00,
        defaultDeliveryTimeMin: 3,
        defaultDeliveryTimeMax: 7,
        // Note: We'll need to assign this to a user later
        userId: 'temp-user-id', // This will be updated after we find the actual admin user
      },
    });

    console.log('✅ Default store created:', defaultStore.name);

    // Create some default categories
    const categories = [
      {
        id: 'cat-electronics',
        name: 'Electronics',
        url: 'electronics',
        image: '/assets/images/no_image.png',
        featured: true
      },
      {
        id: 'cat-clothing',
        name: 'Clothing',
        url: 'clothing', 
        image: '/assets/images/no_image.png',
        featured: true
      },
      {
        id: 'cat-home',
        name: 'Home & Garden',
        url: 'home-garden',
        image: '/assets/images/no_image.png',
        featured: false
      }
    ];

    for (const category of categories) {
      await prisma.category.upsert({
        where: { url: category.url },
        update: {},
        create: category,
      });
      console.log('✅ Category created:', category.name);
    }

    // Create some default subcategories
    const subCategories = [
      {
        id: 'sub-smartphones',
        name: 'Smartphones',
        url: 'smartphones',
        image: '/assets/images/no_image.png',
        featured: true,
        categoryId: 'cat-electronics'
      },
      {
        id: 'sub-laptops', 
        name: 'Laptops',
        url: 'laptops',
        image: '/assets/images/no_image.png',
        featured: false,
        categoryId: 'cat-electronics'
      },
      {
        id: 'sub-mens-clothing',
        name: "Men's Clothing",
        url: 'mens-clothing',
        image: '/assets/images/no_image.png',
        featured: true,
        categoryId: 'cat-clothing'
      }
    ];

    for (const subCategory of subCategories) {
      await prisma.subCategory.upsert({
        where: { url: subCategory.url },
        update: {},
        create: subCategory,
      });
      console.log('✅ SubCategory created:', subCategory.name);
    }

    // Try to find an admin user and assign the store to them
    const adminUser = await prisma.user.findFirst({
      where: { role: 'ADMIN' }
    });

    if (adminUser) {
      await prisma.store.update({
        where: { id: 'default-store-id' },
        data: { userId: adminUser.id }
      });
      console.log('✅ Store assigned to admin user:', adminUser.email);
    } else {
      console.log('⚠️  No admin user found. Store created but not assigned.');
      console.log('   You may need to manually assign the store to an admin user.');
    }

    console.log('🎉 Database seeding completed successfully!');

  } catch (error) {
    console.error('❌ Error during seeding:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });