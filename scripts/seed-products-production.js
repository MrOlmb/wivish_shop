const { PrismaClient } = require('@prisma/client');
const { v4: uuidv4 } = require('uuid');

const prisma = new PrismaClient();

// Comprehensive product data for production seeding
const productsData = [
  // Consumer Electronics
  {
    name: 'Premium Gaming Headset Pro',
    description: 'High-quality wireless gaming headset with active noise cancellation, RGB lighting, and 7.1 surround sound. Perfect for competitive gaming and streaming.',
    brand: 'GameTech',
    categoryId: 'consumer-electronics',
    subCategoryId: 'consumer-electronics-sub-1', // Cellphone & Accessories
    offerTagId: null,
    images: ['/assets/images/featured/most-popular.avif', '/assets/images/swiper/1.webp'],
    variants: [
      { name: 'Black', price: 89.99, discount: 0, stock: 25, colors: ['Black'], sizes: ['One Size'] },
      { name: 'White', price: 94.99, discount: 5, stock: 15, colors: ['White'], sizes: ['One Size'] },
      { name: 'RGB Edition', price: 119.99, discount: 0, stock: 10, colors: ['Black'], sizes: ['One Size'] }
    ],
    specs: [
      { name: 'Battery Life', value: '20 hours' },
      { name: 'Connectivity', value: 'Bluetooth 5.0' },
      { name: 'Frequency Response', value: '20Hz - 20kHz' }
    ]
  },
  {
    name: 'Smart Fitness Watch',
    description: 'Advanced fitness tracking watch with heart rate monitoring, GPS, sleep tracking, and water resistance up to 50 meters.',
    brand: 'FitTech',
    categoryId: 'consumer-electronics',
    subCategoryId: 'consumer-electronics-sub-1',
    offerTagId: null,
    images: ['/assets/images/swiper/2.webp', '/assets/images/featured/top-rated.jpg'],
    variants: [
      { name: 'Sport Edition', price: 199.99, discount: 10, stock: 30, colors: ['Black', 'Blue'], sizes: ['42mm', '46mm'] },
      { name: 'Premium Edition', price: 299.99, discount: 0, stock: 20, colors: ['Gold', 'Silver'], sizes: ['42mm', '46mm'] }
    ],
    specs: [
      { name: 'Display', value: 'AMOLED Touchscreen' },
      { name: 'Water Resistance', value: '50 meters' },
      { name: 'Battery Life', value: '7 days' }
    ]
  },
  {
    name: 'Wireless Bluetooth Speaker',
    description: 'Portable wireless speaker with 360-degree sound, waterproof design, and 12-hour battery life. Perfect for outdoor adventures.',
    brand: 'SoundWave',
    categoryId: 'consumer-electronics',
    subCategoryId: 'consumer-electronics-sub-3', // Audio & Video Equipment
    offerTagId: null,
    images: ['/assets/images/swiper/3.webp', '/assets/images/home-wallpaper-1.jpg'],
    variants: [
      { name: 'Standard', price: 79.99, discount: 0, stock: 40, colors: ['Black', 'Blue', 'Red'], sizes: ['One Size'] },
      { name: 'Pro Version', price: 129.99, discount: 15, stock: 25, colors: ['Black', 'Silver'], sizes: ['One Size'] }
    ],
    specs: [
      { name: 'Power Output', value: '20W' },
      { name: 'Battery Life', value: '12 hours' },
      { name: 'Waterproof Rating', value: 'IPX7' }
    ]
  },

  // Apparel & Accessories
  {
    name: 'Premium Winter Sports Jacket',
    description: 'Professional-grade waterproof and breathable winter sports jacket with thermal insulation. Perfect for skiing, snowboarding, and outdoor winter activities.',
    brand: 'WinterGear',
    categoryId: 'apparel-accessories',
    subCategoryId: 'apparel-accessories-sub-1', // Ready to Wear
    offerTagId: null,
    images: ['/assets/images/ads/winter-sports-clothing.jpg', '/assets/images/swiper/4.webp'],
    variants: [
      { name: 'Men\'s Jacket', price: 149.99, discount: 0, stock: 12, colors: ['Black', 'Navy', 'Red'], sizes: ['M', 'L', 'XL', 'XXL'] },
      { name: 'Women\'s Jacket', price: 139.99, discount: 10, stock: 15, colors: ['Black', 'Pink', 'Purple'], sizes: ['S', 'M', 'L', 'XL'] }
    ],
    specs: [
      { name: 'Material', value: 'Gore-Tex Pro' },
      { name: 'Insulation', value: 'Down Fill' },
      { name: 'Waterproof Rating', value: '20,000mm' }
    ]
  },
  {
    name: 'Professional Running Shoes',
    description: 'Lightweight running shoes with advanced cushioning technology, breathable mesh upper, and durable rubber outsole for all terrains.',
    brand: 'RunFast',
    categoryId: 'apparel-accessories',
    subCategoryId: 'apparel-accessories-sub-2', // Footwear & Headwear
    offerTagId: null,
    images: ['/assets/images/home-wallpaper-2.jpg', '/assets/images/swiper/1.webp'],
    variants: [
      { name: 'Men\'s Running', price: 129.99, discount: 0, stock: 50, colors: ['Black/White', 'Blue/White', 'Red/White'], sizes: ['8', '9', '10', '11', '12'] },
      { name: 'Women\'s Running', price: 119.99, discount: 5, stock: 45, colors: ['Black/Pink', 'Purple/White', 'Gray/White'], sizes: ['6', '7', '8', '9', '10'] }
    ],
    specs: [
      { name: 'Weight', value: '280g' },
      { name: 'Drop Height', value: '8mm' },
      { name: 'Upper Material', value: 'Mesh' }
    ]
  },

  // Lights & Lighting
  {
    name: 'Smart LED Bulb Set',
    description: 'WiFi-enabled smart LED bulbs with 16 million colors, dimming capabilities, voice control support, and energy-efficient design.',
    brand: 'SmartLight',
    categoryId: 'lights-lighting',
    subCategoryId: 'lights-lighting-sub-1', // LED Interior Lighting
    offerTagId: null,
    images: ['/assets/images/featured/top-rated.jpg', '/assets/images/swiper/3.webp'],
    variants: [
      { name: '4-Pack Standard', price: 39.99, discount: 0, stock: 30, colors: ['White'], sizes: ['A19'] },
      { name: '4-Pack Color', price: 49.99, discount: 10, stock: 25, colors: ['Multi-Color'], sizes: ['A19'] },
      { name: '8-Pack Bundle', price: 69.99, discount: 15, stock: 20, colors: ['White'], sizes: ['A19'] }
    ],
    specs: [
      { name: 'Wattage', value: '9W' },
      { name: 'Lumens', value: '800' },
      { name: 'Color Temperature', value: '2700K-6500K' }
    ]
  },

  // Manufacturing & Processing Machinery
  {
    name: 'Professional Cordless Drill',
    description: 'Heavy-duty cordless drill with brushless motor, multiple speed settings, LED work light, and long-lasting lithium-ion battery.',
    brand: 'ProTools',
    categoryId: 'manufacturing-machinery',
    subCategoryId: 'manufacturing-machinery-sub-3', // Machine Tools
    offerTagId: null,
    images: ['/assets/images/home-wallpaper-1.jpg', '/assets/images/swiper/4.webp'],
    variants: [
      { name: '18V Compact', price: 129.99, discount: 0, stock: 18, colors: ['Red', 'Black'], sizes: ['One Size'] },
      { name: '20V Max Pro', price: 149.99, discount: 10, stock: 12, colors: ['Red'], sizes: ['One Size'] },
      { name: 'Combo Kit', price: 199.99, discount: 20, stock: 8, colors: ['Red'], sizes: ['One Size'] }
    ],
    specs: [
      { name: 'Torque', value: '650 in-lbs' },
      { name: 'Speed', value: '0-2000 RPM' },
      { name: 'Battery', value: 'Lithium-Ion' }
    ]
  },

  // Arts & Crafts
  {
    name: 'Handcrafted Ceramic Vase Collection',
    description: 'Beautiful handmade ceramic vases with unique artistic patterns and glazes. Each piece is individually crafted by skilled artisans.',
    brand: 'ArtisanCraft',
    categoryId: 'arts-crafts',
    subCategoryId: 'arts-crafts-sub-4', // Gifts & Souvenirs
    offerTagId: null,
    images: ['/assets/images/sideline/gift.avif', '/assets/images/home-wallpaper-2.jpg'],
    variants: [
      { name: 'Small Collection', price: 24.99, discount: 0, stock: 15, colors: ['Natural', 'Blue Glaze', 'Green Glaze'], sizes: ['6 inch'] },
      { name: 'Medium Collection', price: 34.99, discount: 5, stock: 10, colors: ['Natural', 'Blue Glaze'], sizes: ['10 inch'] },
      { name: 'Large Statement', price: 49.99, discount: 0, stock: 8, colors: ['Natural'], sizes: ['14 inch'] }
    ],
    specs: [
      { name: 'Material', value: 'Handcrafted Ceramic' },
      { name: 'Finish', value: 'Food Safe Glaze' },
      { name: 'Origin', value: 'Handmade' }
    ]
  },

  // Auto, Motorcycle Parts & Accessories
  {
    name: 'Wireless Car Charger Mount',
    description: 'Universal wireless charging car mount with automatic clamping, fast charging up to 15W, and 360-degree rotation.',
    brand: 'AutoTech',
    categoryId: 'auto-motorcycle',
    subCategoryId: 'auto-motorcycle-sub-2', // Car Electronics
    offerTagId: null,
    images: ['/assets/images/ads/featured.webp', '/assets/images/home-wallpaper-3.jpg'],
    variants: [
      { name: 'Standard Mount', price: 49.99, discount: 0, stock: 22, colors: ['Black', 'Silver'], sizes: ['Universal'] },
      { name: 'Pro Mount', price: 69.99, discount: 10, stock: 18, colors: ['Black'], sizes: ['Universal'] },
      { name: 'Dashboard Mount', price: 39.99, discount: 0, stock: 25, colors: ['Black'], sizes: ['Universal'] }
    ],
    specs: [
      { name: 'Charging Power', value: '15W' },
      { name: 'Compatibility', value: 'Universal' },
      { name: 'Installation', value: 'Dashboard/Vent' }
    ]
  },

  // Sporting Goods & Recreation
  {
    name: 'Resistance Bands Workout Set',
    description: 'Complete resistance bands set with different resistance levels, door anchor, ankle straps, and workout guide for home fitness.',
    brand: 'FitPro',
    categoryId: 'sporting-goods',
    subCategoryId: 'sporting-goods-sub-1', // Fitness & Body Building
    offerTagId: null,
    images: ['/assets/images/ads/super-deals.avif', '/assets/images/home-wallpaper-4.jpg'],
    variants: [
      { name: 'Light Set', price: 24.99, discount: 0, stock: 25, colors: ['Multi-Color'], sizes: ['Light Resistance'] },
      { name: 'Heavy Set', price: 34.99, discount: 5, stock: 20, colors: ['Multi-Color'], sizes: ['Heavy Resistance'] },
      { name: 'Complete Set', price: 49.99, discount: 15, stock: 15, colors: ['Multi-Color'], sizes: ['All Levels'] }
    ],
    specs: [
      { name: 'Resistance Levels', value: '5 Levels' },
      { name: 'Material', value: 'Natural Latex' },
      { name: 'Accessories', value: 'Door Anchor, Straps' }
    ]
  },

  // Light Industry & Daily Use
  {
    name: 'Professional Chef Knife Set',
    description: 'High-quality chef knife set with ergonomic handles, razor-sharp stainless steel blades, and professional-grade construction.',
    brand: 'ChefPro',
    categoryId: 'light-industry-daily',
    subCategoryId: 'light-industry-daily-sub-1', // Kitchenware & Tableware
    offerTagId: null,
    images: ['/assets/images/home-wallpaper-5.jpg', '/assets/images/ads/user-card-ad.avif'],
    variants: [
      { name: '5-Piece Starter', price: 79.99, discount: 0, stock: 16, colors: ['Silver'], sizes: ['5-Piece'] },
      { name: '8-Piece Professional', price: 119.99, discount: 10, stock: 12, colors: ['Silver'], sizes: ['8-Piece'] },
      { name: '12-Piece Complete', price: 159.99, discount: 15, stock: 8, colors: ['Silver'], sizes: ['12-Piece'] }
    ],
    specs: [
      { name: 'Blade Material', value: 'High-Carbon Steel' },
      { name: 'Handle Material', value: 'Ergonomic Grip' },
      { name: 'Sharpness', value: 'Razor Sharp' }
    ]
  },

  // Electrical & Electronics
  {
    name: 'Smart Home Security Camera',
    description: 'Wi-Fi security camera with 1080p HD video, night vision, motion detection, and smartphone app control for home security.',
    brand: 'SecureHome',
    categoryId: 'electrical-electronics',
    subCategoryId: 'electrical-electronics-sub-5', // Electronic Components
    offerTagId: null,
    images: ['/assets/images/home-wallpaper-6.jpg', '/assets/images/user-card-bg.avif'],
    variants: [
      { name: 'Indoor Camera', price: 69.99, discount: 0, stock: 28, colors: ['White', 'Black'], sizes: ['One Size'] },
      { name: 'Outdoor Camera', price: 89.99, discount: 10, stock: 15, colors: ['White'], sizes: ['Weatherproof'] },
      { name: 'Pan & Tilt', price: 99.99, discount: 0, stock: 12, colors: ['White'], sizes: ['One Size'] }
    ],
    specs: [
      { name: 'Resolution', value: '1080p HD' },
      { name: 'Night Vision', value: '30ft Range' },
      { name: 'Storage', value: 'Cloud & Local' }
    ]
  },

  // Construction & Decoration
  {
    name: 'Eco-Friendly Bamboo Flooring',
    description: 'Sustainable bamboo flooring planks with easy click-lock installation, water resistance, and beautiful natural finish.',
    brand: 'EcoFloor',
    categoryId: 'construction-decoration',
    subCategoryId: 'construction-decoration-sub-4', // Tiles & Flooring
    offerTagId: null,
    images: ['/assets/images/home-wallpaper.webp', '/assets/images/cart.avif'],
    variants: [
      { name: 'Natural Finish', price: 3.99, discount: 0, stock: 500, colors: ['Natural'], sizes: ['Per sq ft'] },
      { name: 'Dark Stain', price: 4.49, discount: 5, stock: 300, colors: ['Dark'], sizes: ['Per sq ft'] },
      { name: 'Carbonized', price: 4.99, discount: 0, stock: 200, colors: ['Carbonized'], sizes: ['Per sq ft'] }
    ],
    specs: [
      { name: 'Material', value: 'Bamboo' },
      { name: 'Installation', value: 'Click-Lock' },
      { name: 'Water Resistance', value: 'High' }
    ]
  },

  // Industrial Equipment & Components
  {
    name: 'Industrial Air Compressor',
    description: 'Heavy-duty industrial air compressor with oil-free pump, high CFM output, and durable construction for professional use.',
    brand: 'IndustrialPro',
    categoryId: 'industrial-equipment',
    subCategoryId: 'industrial-equipment-sub-1', // Pump & Vacuum Equipment
    offerTagId: null,
    images: ['/assets/images/swiper/1.webp', '/assets/images/featured/most-popular.avif'],
    variants: [
      { name: '20 Gallon', price: 299.99, discount: 0, stock: 8, colors: ['Red'], sizes: ['20 Gallon'] },
      { name: '30 Gallon', price: 399.99, discount: 10, stock: 6, colors: ['Red'], sizes: ['30 Gallon'] },
      { name: '60 Gallon', price: 599.99, discount: 15, stock: 4, colors: ['Red'], sizes: ['60 Gallon'] }
    ],
    specs: [
      { name: 'CFM Output', value: '5.1 CFM' },
      { name: 'PSI', value: '150 PSI' },
      { name: 'Motor', value: 'Oil-Free' }
    ]
  },

  // Transportation
  {
    name: 'Electric Bike Conversion Kit',
    description: 'Complete electric bike conversion kit with motor, battery, controller, and all necessary components to convert regular bike to electric.',
    brand: 'EcoRide',
    categoryId: 'transportation',
    subCategoryId: 'transportation-sub-2', // Electric Vehicles
    offerTagId: null,
    images: ['/assets/images/swiper/2.webp', '/assets/images/home-wallpaper-1.jpg'],
    variants: [
      { name: '250W Kit', price: 399.99, discount: 0, stock: 12, colors: ['Black'], sizes: ['26 inch'] },
      { name: '500W Kit', price: 599.99, discount: 10, stock: 8, colors: ['Black'], sizes: ['26 inch'] },
      { name: '750W Pro Kit', price: 799.99, discount: 15, stock: 6, colors: ['Black'], sizes: ['26 inch'] }
    ],
    specs: [
      { name: 'Motor Power', value: '250W-750W' },
      { name: 'Battery Range', value: '25-50 miles' },
      { name: 'Max Speed', value: '20-28 mph' }
    ]
  }
];

async function seedProducts() {
  console.log('🛍️  Starting production product seeding...');

  try {
    // Check if products already exist to avoid duplicates
    const existingProducts = await prisma.product.count();
    if (existingProducts > 0) {
      console.log('📦 Products already exist, skipping product seeding');
      return;
    }

    // Get the default store
    const store = await prisma.store.findFirst();
    if (!store) {
      console.error('❌ No store found. Please run the category seeding script first.');
      return;
    }

    console.log(`✅ Using store: ${store.name}`);

    let productCount = 0;
    let variantCount = 0;
    let imageCount = 0;

    for (const productData of productsData) {
      // Check if category exists
      const category = await prisma.category.findUnique({
        where: { id: productData.categoryId }
      });

      if (!category) {
        console.warn(`⚠️  Category ${productData.categoryId} not found, skipping product: ${productData.name}`);
        continue;
      }

      // Check if subcategory exists
      const subCategory = await prisma.subCategory.findUnique({
        where: { id: productData.subCategoryId }
      });

      if (!subCategory) {
        console.warn(`⚠️  SubCategory ${productData.subCategoryId} not found, skipping product: ${productData.name}`);
        continue;
      }

      // Generate unique slug
      const productSlug = `${productData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}-${Date.now()}`;

      // Create product
      const product = await prisma.product.create({
        data: {
          name: productData.name,
          description: productData.description,
          slug: productSlug,
          brand: productData.brand,
          categoryId: productData.categoryId,
          subCategoryId: productData.subCategoryId,
          offerTagId: productData.offerTagId,
          storeId: store.id,
          freeShippingForAllCountries: Math.random() > 0.7, // Random free shipping
        }
      });

      productCount++;
      console.log(`✅ Product created: ${product.name}`);

      // Create product specs
      if (productData.specs) {
        for (const spec of productData.specs) {
          await prisma.spec.create({
            data: {
              name: spec.name,
              value: spec.value,
              productId: product.id,
            }
          });
        }
      }

      // Create variants for the product
      for (let i = 0; i < productData.variants.length; i++) {
        const variantData = productData.variants[i];
        
        const variantSlug = `${productSlug}-${variantData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;
        
        const variant = await prisma.productVariant.create({
          data: {
            variantName: variantData.name,
            variantDescription: `${productData.name} - ${variantData.name}`,
            variantImage: productData.images[0],
            slug: variantSlug,
            sku: `SKU-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            keywords: `${productData.name}, ${variantData.name}, ${category.name}, ${subCategory.name}`,
            weight: Math.floor(Math.random() * 5000) + 100, // Random weight between 100-5100g
            productId: product.id,
            isSale: variantData.discount > 0,
            saleEndDate: variantData.discount > 0 ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() : null,
          }
        });

        variantCount++;

        // Create sizes for this variant
        for (const sizeName of variantData.sizes) {
          await prisma.size.create({
            data: {
              size: sizeName,
              quantity: variantData.stock,
              price: variantData.price,
              discount: variantData.discount,
              productVariantId: variant.id,
            }
          });
        }

        // Create colors for this variant
        for (const colorName of variantData.colors) {
          await prisma.color.create({
            data: {
              name: colorName,
              productVariantId: variant.id,
            }
          });
        }

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
          imageCount++;
        }

        console.log(`  ↳ Variant created: ${variant.variantName} ($${variantData.price}, Stock: ${variantData.stock})`);
      }
    }

    console.log('🎉 Production product seeding completed successfully!');
    console.log(`📊 Summary:`);
    console.log(`   - Products: ${productCount}`);
    console.log(`   - Variants: ${variantCount}`);
    console.log(`   - Images: ${imageCount}`);
    console.log(`   - Store: ${store.name}`);

  } catch (error) {
    console.error('❌ Error during product seeding:', error);
    throw error;
  }
}

// Export for use in build scripts
module.exports = { seedProducts };

// Run if called directly
if (require.main === module) {
  seedProducts()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
