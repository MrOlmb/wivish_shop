const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Comprehensive categories and subcategories for production
const categoriesData = [
  {
    id: 'manufacturing-machinery',
    name: 'Manufacturing & Processing Machinery',
    url: 'manufacturing-machinery',
    image: '/assets/icons/logo.png',
    featured: true,
    subcategories: [
      { name: 'Agricultural Machinery', url: 'agricultural-machinery' },
      { name: 'Plastic & Woodworking Machinery', url: 'plastic-woodworking-machinery' },
      { name: 'Machine Tools', url: 'machine-tools' },
      { name: 'Construction Machinery', url: 'construction-machinery' },
      { name: 'Food Processing Machinery', url: 'food-processing-machinery' },
      { name: 'Textile Machinery & Parts', url: 'textile-machinery-parts' }
    ]
  },
  {
    id: 'consumer-electronics',
    name: 'Consumer Electronics',
    url: 'consumer-electronics',
    image: '/assets/icons/logo.png',
    featured: true,
    subcategories: [
      { name: 'Cellphone & Accessories', url: 'cellphone-accessories' },
      { name: 'Digital Devices', url: 'digital-devices' },
      { name: 'Audio & Video Equipment', url: 'audio-video-equipment' },
      { name: 'Household Appliances', url: 'household-appliances' },
      { name: 'Computer Hardware & Software', url: 'computer-hardware-software' },
      { name: 'Gaming & Entertainment', url: 'gaming-entertainment' }
    ]
  },
  {
    id: 'industrial-equipment',
    name: 'Industrial Equipment & Components',
    url: 'industrial-equipment',
    image: '/assets/icons/logo.png',
    featured: true,
    subcategories: [
      { name: 'Pump & Vacuum Equipment', url: 'pump-vacuum-equipment' },
      { name: 'Industrial Valves', url: 'industrial-valves' },
      { name: 'Power & Generators', url: 'power-generators' },
      { name: 'Fastener & Fittings', url: 'fastener-fittings' },
      { name: 'Purifier & Filter', url: 'purifier-filter' },
      { name: 'Industrial Heater', url: 'industrial-heater' }
    ]
  },
  {
    id: 'electrical-electronics',
    name: 'Electrical & Electronics',
    url: 'electrical-electronics',
    image: '/assets/icons/logo.png',
    featured: true,
    subcategories: [
      { name: 'Optical Fiber, Cable & Wire', url: 'optical-fiber-cable-wire' },
      { name: 'Motors & Drives', url: 'motors-drives' },
      { name: 'Power Supply & Distribution', url: 'power-supply-distribution' },
      { name: 'Telecom & Broadcasting', url: 'telecom-broadcasting' },
      { name: 'Electronic Components', url: 'electronic-components' },
      { name: 'Batteries & Chargers', url: 'batteries-chargers' }
    ]
  },
  {
    id: 'construction-decoration',
    name: 'Construction & Decoration',
    url: 'construction-decoration',
    image: '/assets/icons/logo.png',
    featured: true,
    subcategories: [
      { name: 'Bathroom & Kitchen Fixtures', url: 'bathroom-kitchen-fixtures' },
      { name: 'Door & Window Hardware', url: 'door-window-hardware' },
      { name: 'Building Materials', url: 'building-materials' },
      { name: 'Tiles & Flooring', url: 'tiles-flooring' },
      { name: 'Paint & Coating', url: 'paint-coating' },
      { name: 'Plumbing & HVAC', url: 'plumbing-hvac' }
    ]
  },
  {
    id: 'light-industry-daily',
    name: 'Light Industry & Daily Use',
    url: 'light-industry-daily',
    image: '/assets/icons/logo.png',
    featured: false,
    subcategories: [
      { name: 'Kitchenware & Tableware', url: 'kitchenware-tableware' },
      { name: 'Bedding & Bath', url: 'bedding-bath' },
      { name: 'Household Cleaning', url: 'household-cleaning' },
      { name: 'Beauty & Personal Care', url: 'beauty-personal-care' },
      { name: 'Home & Garden', url: 'home-garden' },
      { name: 'Pet Supplies', url: 'pet-supplies' }
    ]
  },
  {
    id: 'auto-motorcycle',
    name: 'Auto, Motorcycle Parts & Accessories',
    url: 'auto-motorcycle',
    image: '/assets/icons/logo.png',
    featured: false,
    subcategories: [
      { name: 'Auto Parts & Accessories', url: 'auto-parts-accessories' },
      { name: 'Car Electronics', url: 'car-electronics' },
      { name: 'Motorcycle Parts & Accessories', url: 'motorcycle-parts-accessories' },
      { name: 'Auto Engine & Parts', url: 'auto-engine-parts' },
      { name: 'Tires & Wheels', url: 'tires-wheels' },
      { name: 'Car Care & Maintenance', url: 'car-care-maintenance' }
    ]
  },
  {
    id: 'apparel-accessories',
    name: 'Apparel & Accessories',
    url: 'apparel-accessories',
    image: '/assets/icons/logo.png',
    featured: false,
    subcategories: [
      { name: 'Ready to Wear', url: 'ready-to-wear' },
      { name: 'Footwear & Headwear', url: 'footwear-headwear' },
      { name: 'Work & Safety Apparel', url: 'work-safety-apparel' },
      { name: 'Fashion Accessories', url: 'fashion-accessories' },
      { name: 'Bags & Luggage', url: 'bags-luggage' },
      { name: 'Watches & Jewelry', url: 'watches-jewelry' }
    ]
  },
  {
    id: 'lights-lighting',
    name: 'Lights & Lighting',
    url: 'lights-lighting',
    image: '/assets/icons/logo.png',
    featured: false,
    subcategories: [
      { name: 'LED Interior Lighting', url: 'led-interior-lighting' },
      { name: 'LED Professional Lighting', url: 'led-professional-lighting' },
      { name: 'LED Outdoor Lighting', url: 'led-outdoor-lighting' },
      { name: 'Commercial Lighting', url: 'commercial-lighting' },
      { name: 'Decorative Lighting', url: 'decorative-lighting' },
      { name: 'Lighting Accessories', url: 'lighting-accessories' }
    ]
  },
  {
    id: 'sporting-goods',
    name: 'Sporting Goods & Recreation',
    url: 'sporting-goods',
    image: '/assets/icons/logo.png',
    featured: false,
    subcategories: [
      { name: 'Fitness & Body Building', url: 'fitness-body-building' },
      { name: 'Outdoor Sports Equipment', url: 'outdoor-sports-equipment' },
      { name: 'Water Sports', url: 'water-sports' },
      { name: 'Team Sports', url: 'team-sports' },
      { name: 'Individual Sports', url: 'individual-sports' },
      { name: 'Recreation Facilities', url: 'recreation-facilities' }
    ]
  },
  {
    id: 'transportation',
    name: 'Transportation',
    url: 'transportation',
    image: '/assets/icons/logo.png',
    featured: false,
    subcategories: [
      { name: 'Bicycles & Parts', url: 'bicycles-parts' },
      { name: 'Electric Vehicles', url: 'electric-vehicles' },
      { name: 'Specialized Vehicles', url: 'specialized-vehicles' },
      { name: 'Cargo & Storage Equipment', url: 'cargo-storage-equipment' },
      { name: 'Marine & Boat Parts', url: 'marine-boat-parts' },
      { name: 'Transportation Services', url: 'transportation-services' }
    ]
  },
  {
    id: 'arts-crafts',
    name: 'Arts & Crafts',
    url: 'arts-crafts',
    image: '/assets/icons/logo.png',
    featured: false,
    subcategories: [
      { name: 'Handmade Jewelry', url: 'handmade-jewelry' },
      { name: 'Art Supplies', url: 'art-supplies' },
      { name: 'Crafting Materials', url: 'crafting-materials' },
      { name: 'Gifts & Souvenirs', url: 'gifts-souvenirs' },
      { name: 'Religious Items', url: 'religious-items' },
      { name: 'Collectibles & Antiques', url: 'collectibles-antiques' }
    ]
  }
];

// Default store configuration
const defaultStore = {
  id: 'wivish-main-store',
  name: 'Wivish Shop',
  description: 'Your premium e-commerce destination offering quality products across all categories with excellent service and fast delivery.',
  email: 'contact@wivish.shop',
  phone: '+1234567890',
  url: 'wivish-shop',
  logo: '/assets/icons/logo.png',
  cover: '/assets/images/home-wallpaper.webp',
  status: 'ACTIVE',
  featured: true,
  returnPolicy: 'Return within 30 days for full refund. Items must be in original condition.',
  defaultShippingService: 'Standard Delivery',
  defaultShippingFeePerItem: 5.99,
  defaultShippingFeeForAdditionalItem: 2.99,
  defaultShippingFeePerKg: 1.50,
  defaultShippingFeeFixed: 0.00,
  defaultDeliveryTimeMin: 3,
  defaultDeliveryTimeMax: 7,
  userId: 'temp-admin-user' // Will be updated when admin user is found
};

async function seedDatabase() {
  console.log('🌱 Starting production database seeding...');

  try {
    // Check if categories already exist to avoid duplicates
    const existingCategories = await prisma.category.count();
    if (existingCategories > 0) {
      console.log('📋 Categories already exist, skipping category seeding');
      return;
    }

    // Create default store first
    console.log('🏪 Creating default store...');
    const store = await prisma.store.upsert({
      where: { url: defaultStore.url },
      update: {},
      create: defaultStore,
    });
    console.log(`✅ Store created: ${store.name}`);

    // Create categories and subcategories
    console.log('📂 Creating categories and subcategories...');
    let totalCategories = 0;
    let totalSubCategories = 0;

    for (const categoryData of categoriesData) {
      const { subcategories, ...categoryInfo } = categoryData;
      
      // Create main category
      const category = await prisma.category.create({
        data: categoryInfo,
      });
      totalCategories++;
      console.log(`✅ Category created: ${category.name}`);

      // Create subcategories for this category
      for (const [index, subCategoryData] of subcategories.entries()) {
        const subCategory = await prisma.subCategory.create({
          data: {
            id: `${categoryData.id}-sub-${index + 1}`,
            name: subCategoryData.name,
            url: subCategoryData.url,
            image: '/assets/images/no_image.png',
            featured: index < 2, // Make first 2 subcategories featured
            categoryId: category.id,
          },
        });
        totalSubCategories++;
        console.log(`  ↳ SubCategory created: ${subCategory.name}`);
      }
    }

    // Try to find an admin user and assign the store to them
    console.log('👤 Looking for admin user...');
    const adminUser = await prisma.user.findFirst({
      where: { role: 'ADMIN' }
    });

    if (adminUser) {
      await prisma.store.update({
        where: { id: store.id },
        data: { userId: adminUser.id }
      });
      console.log(`✅ Store assigned to admin user: ${adminUser.email}`);
    } else {
      console.log('⚠️  No admin user found. Store created but not assigned.');
      console.log('   You may need to manually assign the store to an admin user.');
    }

    // Import and run product seeding
    console.log('🛍️  Starting product seeding...');
    const { seedProducts } = require('./seed-products-production');
    await seedProducts();

    console.log('🎉 Complete production database seeding finished!');
    console.log(`📊 Final Summary:`);
    console.log(`   - Store: ${store.name}`);
    console.log(`   - Categories: ${totalCategories}`);
    console.log(`   - SubCategories: ${totalSubCategories}`);
    console.log(`   - Products: Seeded with variants, sizes, colors, and images`);

  } catch (error) {
    console.error('❌ Error during seeding:', error);
    throw error;
  }
}

// Export for use in build scripts
module.exports = { seedDatabase };

// Run if called directly
if (require.main === module) {
  seedDatabase()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
