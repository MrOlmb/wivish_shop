const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Test products data with different categories and local images
const productsData = [
  {
    name: 'Premium Gaming Headset',
    description: 'High-quality wireless gaming headset with noise cancellation and RGB lighting. Perfect for gaming sessions.',
    slug: 'premium-gaming-headset',
    categoryId: 'consumer-electronics',
    subCategoryId: 'consumer-electronics-sub-1', // Cellphone & Accessories
    price: 89.99,
    images: ['/assets/images/featured/most-popular.avif', '/assets/images/swiper/1.webp'],
    variants: [
      { name: 'Black', price: 89.99, stock: 25 },
      { name: 'White', price: 94.99, stock: 15 }
    ]
  },
  {
    name: 'Winter Sports Jacket',
    description: 'Waterproof and breathable winter sports jacket for outdoor activities. Insulated for extreme weather.',
    slug: 'winter-sports-jacket',
    categoryId: 'apparel-accessories',
    subCategoryId: 'apparel-accessories-sub-1', // Ready to Wear
    price: 149.99,
    images: ['/assets/images/ads/winter-sports-clothing.jpg', '/assets/images/swiper/2.webp'],
    variants: [
      { name: 'Size M', price: 149.99, stock: 12 },
      { name: 'Size L', price: 149.99, stock: 8 },
      { name: 'Size XL', price: 159.99, stock: 5 }
    ]
  },
  {
    name: 'LED Smart Bulb Set',
    description: 'Smart WiFi-enabled LED bulbs with color changing capabilities and voice control support.',
    slug: 'led-smart-bulb-set',
    categoryId: 'lights-lighting',
    subCategoryId: 'lights-lighting-sub-1', // LED Interior Lighting
    price: 39.99,
    images: ['/assets/images/featured/top-rated.jpg', '/assets/images/swiper/3.webp'],
    variants: [
      { name: '4-Pack', price: 39.99, stock: 30 },
      { name: '8-Pack', price: 69.99, stock: 20 }
    ]
  },
  {
    name: 'Electric Drill Pro',
    description: 'Professional-grade cordless electric drill with multiple speed settings and long battery life.',
    slug: 'electric-drill-pro',
    categoryId: 'manufacturing-machinery',
    subCategoryId: 'manufacturing-machinery-sub-3', // Machine Tools
    price: 129.99,
    images: ['/assets/images/home-wallpaper-1.jpg', '/assets/images/swiper/4.webp'],
    variants: [
      { name: '18V', price: 129.99, stock: 18 },
      { name: '20V Max', price: 149.99, stock: 12 }
    ]
  },
  {
    name: 'Handcrafted Ceramic Vase',
    description: 'Beautiful handmade ceramic vase with unique artistic patterns. Perfect for home decoration.',
    slug: 'handcrafted-ceramic-vase',
    categoryId: 'arts-crafts',
    subCategoryId: 'arts-crafts-sub-4', // Gifts & Souvenirs
    price: 24.99,
    images: ['/assets/images/sideline/gift.avif', '/assets/images/home-wallpaper-2.jpg'],
    variants: [
      { name: 'Small (6 inch)', price: 24.99, stock: 15 },
      { name: 'Large (10 inch)', price: 34.99, stock: 10 }
    ]
  },
  {
    name: 'Car Wireless Charger Mount',
    description: 'Universal wireless charging car mount for smartphones with automatic clamping and fast charging.',
    slug: 'car-wireless-charger-mount',
    categoryId: 'auto-motorcycle',
    subCategoryId: 'auto-motorcycle-sub-2', // Car Electronics
    price: 49.99,
    images: ['/assets/images/ads/featured.webp', '/assets/images/home-wallpaper-3.jpg'],
    variants: [
      { name: 'Black', price: 49.99, stock: 22 },
      { name: 'Silver', price: 49.99, stock: 18 }
    ]
  },
  {
    name: 'Fitness Resistance Bands Set',
    description: 'Complete set of resistance bands for home workouts with different resistance levels and accessories.',
    slug: 'fitness-resistance-bands-set',
    categoryId: 'sporting-goods',
    subCategoryId: 'sporting-goods-sub-1', // Fitness & Body Building
    price: 29.99,
    images: ['/assets/images/ads/super-deals.avif', '/assets/images/home-wallpaper-4.jpg'],
    variants: [
      { name: 'Light Resistance', price: 24.99, stock: 25 },
      { name: 'Heavy Resistance', price: 34.99, stock: 20 }
    ]
  },
  {
    name: 'Premium Kitchen Knife Set',
    description: 'Professional chef knife set with ergonomic handles and razor-sharp stainless steel blades.',
    slug: 'premium-kitchen-knife-set',
    categoryId: 'light-industry-daily',
    subCategoryId: 'light-industry-daily-sub-1', // Kitchenware & Tableware
    price: 79.99,
    images: ['/assets/images/home-wallpaper-5.jpg', '/assets/images/ads/user-card-ad.avif'],
    variants: [
      { name: '5-Piece Set', price: 79.99, stock: 16 },
      { name: '8-Piece Set', price: 119.99, stock: 12 }
    ]
  },
  {
    name: 'Smart Home Security Camera',
    description: 'Wi-Fi security camera with 1080p HD video, night vision, and smartphone app control.',
    slug: 'smart-home-security-camera',
    categoryId: 'electrical-electronics',
    subCategoryId: 'electrical-electronics-sub-5', // Electronic Components
    price: 69.99,
    images: ['/assets/images/home-wallpaper-6.jpg', '/assets/images/user-card-bg.avif'],
    variants: [
      { name: 'Indoor', price: 69.99, stock: 28 },
      { name: 'Outdoor (Weatherproof)', price: 89.99, stock: 15 }
    ]
  },
  {
    name: 'Eco-Friendly Bamboo Flooring',
    description: 'Sustainable bamboo flooring planks with easy click-lock installation and water resistance.',
    slug: 'eco-friendly-bamboo-flooring',
    categoryId: 'construction-decoration',
    subCategoryId: 'construction-decoration-sub-4', // Tiles & Flooring
    price: 3.99,
    images: ['/assets/images/home-wallpaper.webp', '/assets/images/cart.avif'],
    variants: [
      { name: 'Natural Finish (per sq ft)', price: 3.99, stock: 500 },
      { name: 'Dark Stain (per sq ft)', price: 4.49, stock: 300 }
    ]
  }
];

async function main() {
  console.log('🛍️  Starting product seeding...');

  try {
    // Get the default store
    const store = await prisma.store.findFirst();
    if (!store) {
      console.error('❌ No store found. Please run the store seeding script first.');
      return;
    }

    console.log(`✅ Using store: ${store.name}`);

    // Clear existing products
    await prisma.productVariantImage.deleteMany();
    await prisma.productVariant.deleteMany();
    await prisma.product.deleteMany();
    console.log('🧹 Existing products cleared');

    let productCount = 0;
    let variantCount = 0;

    for (const productData of productsData) {
      // Check if category exists
      const category = await prisma.category.findUnique({
        where: { id: productData.categoryId }
      });

      if (!category) {
        console.warn(`⚠️  Category ${productData.categoryId} not found, skipping product: ${productData.name}`);
        continue;
      }

      // Create product
      const product = await prisma.product.create({
        data: {
          name: productData.name,
          description: productData.description,
          slug: productData.slug,
          brand: 'Wivish', // Default brand
          categoryId: productData.categoryId,
          subCategoryId: productData.subCategoryId,
          storeId: store.id,
        }
      });

      productCount++;
      console.log(`✅ Product created: ${product.name}`);

      // Create variants for the product
      for (let i = 0; i < productData.variants.length; i++) {
        const variantData = productData.variants[i];
        
        const variant = await prisma.productVariant.create({
          data: {
            variantName: variantData.name,
            variantImage: productData.images[0], // Use first image as variant image
            slug: `${productData.slug}-${variantData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`,
            sku: `SKU-${Date.now()}-${Math.floor(Math.random() * 1000)}`, // Generate unique SKU
            keywords: `${productData.name}, ${variantData.name}, ${category.name}`,
            weight: Math.floor(Math.random() * 5000) + 100, // Random weight between 100-5100g
            productId: product.id,
          }
        });

        variantCount++;

        // Add images for this variant
        for (let j = 0; j < productData.images.length; j++) {
          await prisma.productVariantImage.create({
            data: {
              url: productData.images[j],
              alt: `${product.name} - ${variantData.name} - Image ${j + 1}`,
              order: j + 1,
              productVariantId: variant.id,
            }
          });
        }

        console.log(`  ↳ Variant created: ${variant.variantName} (Stock: ${variant.quantity})`);
      }
    }

    console.log('🎉 Product seeding completed successfully!');
    console.log(`📊 Created ${productCount} products with ${variantCount} variants`);
    console.log(`💾 All products assigned to store: ${store.name}`);

  } catch (error) {
    console.error('❌ Error during product seeding:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error('❌ Seeding failed:', error);
  process.exit(1);
});