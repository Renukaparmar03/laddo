import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Category from './models/categoryModel.js';

dotenv.config();

connectDB();

const categoriesData = [
  { name: 'Grocery & Kitchen', icon: 'ShoppingBasket', color: '#FFFDD0', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=120&q=80' },
  { name: 'Snacks & Drinks', icon: 'Cookie', color: '#FFF0F5', image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=120&q=80' },
  { name: 'Beauty & Personal Care', icon: 'Sparkles', color: '#F3E5F5', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=120&q=80' },
  { name: 'Fashion', icon: 'Shirt', color: '#E3F2FD', image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=120&q=80' },
  { name: 'Electronics', icon: 'Laptop', color: '#E6E6FA', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=120&q=80' },
  { name: 'Mobiles', icon: 'Smartphone', color: '#E3F2FD', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=120&q=80' },
  { name: 'Furniture', icon: 'Lamp', color: '#F3E5F5', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=120&q=80' },
  { name: 'Shoes', icon: 'Footprints', color: '#FFF0F5', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=120&q=80' },
  { name: 'Toys', icon: 'Gamepad2', color: '#E6E6FA', image: 'https://images.unsplash.com/photo-1559251606-c623743a6d76?w=120&q=80' },
];

const seedCategories = async () => {
  try {
    await Category.deleteMany();
    await Category.insertMany(categoriesData);
    console.log('Categories Seeded Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error seeding categories: ${error.message}`);
    process.exit(1);
  }
};

seedCategories();
