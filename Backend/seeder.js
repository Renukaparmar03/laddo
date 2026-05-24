import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Product from './models/productModel.js';
import Seller from './models/sellerModel.js';

dotenv.config();

connectDB();

const productsData = [
  {
    title: 'Fresh Red Onion',
    price: 32,
    weight: '1kg',
    image: 'https://images.unsplash.com/photo-1508747703725-719777637510?w=300&q=80',
    category: 'Grocery & Kitchen',
    description: 'Fresh and organic red onions.',
  },
  {
    title: 'Fresh Potato (Aloo)',
    price: 28,
    weight: '1kg',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=300&q=80',
    category: 'Grocery & Kitchen',
    description: 'Farm fresh potatoes.',
  },
  {
    title: 'Aashirvaad Shudh Chakki Atta',
    price: 245,
    weight: '5kg',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&q=80',
    category: 'Grocery & Kitchen',
    description: 'Premium whole wheat chakki atta.',
  },
  {
    title: "Lay's India's Magic Masala",
    price: 20,
    weight: '48g',
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300&q=80',
    category: 'Snacks & Drinks',
    description: 'Delicious masala flavoured potato chips.',
  },
  {
    title: 'Coca-Cola Soft Drink',
    price: 40,
    weight: '750ml',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=300&q=80',
    category: 'Snacks & Drinks',
    description: 'Refreshing carbonated soft drink.',
  },
  {
    title: 'Nivea Soft Cream',
    price: 299,
    weight: '200ml',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&q=80',
    category: 'Beauty & Personal Care',
    description: 'Light moisturizing cream for face, hands and body.',
  }
];

const importData = async () => {
  try {
    await Product.deleteMany();

    // Find or create a default seller
    let seller = await Seller.findOne({ email: 'admin@seller.com' });
    if (!seller) {
      seller = await Seller.create({
        businessName: 'Admin Store',
        ownerName: 'Admin',
        email: 'admin@seller.com',
        password: 'password123',
        phone: '9999999999',
        address: 'HQ'
      });
    }

    const sampleProducts = productsData.map((p) => {
      return { 
        name: p.title,
        price: p.price,
        image: p.image,
        category: p.category,
        brand: 'Generic',
        description: p.description,
        weight: p.weight,
        countInStock: 100,
        seller: seller._id 
      };
    });

    await Product.insertMany(sampleProducts);

    console.log('Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
