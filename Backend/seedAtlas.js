import dns from "node:dns/promises";
dns.setServers(["8.8.8.8"], ["1.1.1.1"]);
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import User from './models/userModel.js';
import Seller from './models/sellerModel.js';
import Delivery from './models/deliveryModel.js';
import Category from './models/categoryModel.js';
import Product from './models/productModel.js';
import Banner from './models/Banner.js';

dotenv.config();

const seedAtlas = async () => {
  try {
    await connectDB();
    console.log('Connected to DB');

    // Clean existing specific collections just in case
    await User.deleteMany();
    await Seller.deleteMany();
    await Delivery.deleteMany();
    await Category.deleteMany();
    await Product.deleteMany();
    await Banner.deleteMany();

    // 1. Admin Account
    const adminUser = new User({
      name: 'Admin System',
      email: 'admin@system.com',
      password: 'password123',
      role: 'admin'
    });
    await adminUser.save();

    // 2. User Account
    const normalUser = new User({
      name: 'John Doe',
      email: 'user@user.com',
      password: 'password123',
      role: 'user'
    });
    await normalUser.save();

    // 3. Seller Accounts
    const seller1 = new Seller({
      businessName: 'Fresh Mart',
      ownerName: 'Alice Smith',
      email: 'seller1@seller.com',
      password: 'password123',
      phone: '9876543210',
      address: '123 Market St, City',
      status: 'approved'
    });
    await seller1.save();

    const seller2 = new Seller({
      businessName: 'Tech Store',
      ownerName: 'Bob Jones',
      email: 'seller2@seller.com',
      password: 'password123',
      phone: '9876543211',
      address: '456 Tech Park, City',
      status: 'approved'
    });
    await seller2.save();

    // 4. Delivery Partner
    const deliveryPartner = new Delivery({
      name: 'Delivery Dave',
      phone: '9876543222',
      password: 'password123',
      city: 'Metro City',
      vehicle: 'Bike',
      aadharNo: '123456789012',
      status: 'approved'
    });
    await deliveryPartner.save();

    // 5. Categories
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
    await Category.insertMany(categoriesData);

    // 6. Products
    const productsData = [
      {
        seller: seller1._id,
        title: 'Fresh Apples (1kg)',
        image: 'https://images.unsplash.com/photo-1579613832125-5d34a13ffe2a?w=300&q=80',
        images: [{url: 'https://images.unsplash.com/photo-1579613832125-5d34a13ffe2a?w=300&q=80'}],
        category: 'Grocery & Kitchen',
        description: 'Crisp and sweet fresh apples.',
        price: 150,
        discountPrice: 120,
        stock: 50,
        isApproved: true,
        dynamicFields: { weight: '1kg' }
      },
      {
        seller: seller1._id,
        title: 'Lays Magic Masala',
        image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300&q=80',
        images: [{url: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300&q=80'}],
        category: 'Snacks & Drinks',
        description: 'Delicious masala flavoured potato chips.',
        price: 20,
        stock: 100,
        isApproved: true,
        dynamicFields: { weight: '48g' }
      },
      {
        seller: seller1._id,
        title: 'Nivea Soft Cream',
        image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&q=80',
        images: [{url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&q=80'}],
        category: 'Beauty & Personal Care',
        description: 'Light moisturizing cream for face, hands and body.',
        price: 299,
        stock: 40,
        isApproved: true,
        dynamicFields: { volume: '200ml' }
      },
      {
        seller: seller1._id,
        title: 'Mens Casual T-Shirt',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&q=80',
        images: [{url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&q=80'}],
        category: 'Fashion',
        description: 'Comfortable cotton casual t-shirt.',
        price: 499,
        stock: 30,
        isApproved: true,
        dynamicFields: { size: 'L' }
      },
      {
        seller: seller2._id,
        title: 'Wireless Bluetooth Earbuds',
        image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=300&q=80',
        images: [{url: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=300&q=80'}],
        category: 'Electronics',
        description: 'High-quality wireless earbuds with noise cancellation.',
        price: 1999,
        discountPrice: 1499,
        stock: 30,
        isApproved: true,
        dynamicFields: { color: 'Black' }
      },
      {
        seller: seller2._id,
        title: 'Samsung Galaxy M14',
        image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=300&q=80',
        images: [{url: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=300&q=80'}],
        category: 'Mobiles',
        description: 'Latest 5G smartphone with powerful battery.',
        price: 14999,
        discountPrice: 13999,
        stock: 15,
        isApproved: true,
        dynamicFields: { color: 'Blue' }
      },
      {
        seller: seller2._id,
        title: 'Wooden Office Desk',
        image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=300&q=80',
        images: [{url: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=300&q=80'}],
        category: 'Furniture',
        description: 'Solid wood ergonomic office desk.',
        price: 3500,
        stock: 5,
        isApproved: true,
        dynamicFields: { material: 'Wood' }
      },
      {
        seller: seller2._id,
        title: 'Nike Running Shoes',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80',
        images: [{url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80'}],
        category: 'Shoes',
        description: 'Lightweight and comfortable running shoes.',
        price: 2999,
        stock: 25,
        isApproved: true,
        dynamicFields: { size: '9' }
      },
      {
        seller: seller2._id,
        title: 'Lego Classic Bricks',
        image: 'https://images.unsplash.com/photo-1559251606-c623743a6d76?w=300&q=80',
        images: [{url: 'https://images.unsplash.com/photo-1559251606-c623743a6d76?w=300&q=80'}],
        category: 'Toys',
        description: 'Classic creative building bricks set for kids.',
        price: 999,
        stock: 40,
        isApproved: true,
        dynamicFields: { ageGroup: '5+' }
      }
    ];
    await Product.insertMany(productsData);

    // 6. Banners
    const bannersData = [
      {
        title: "Get 50% OFF",
        image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=80",
        location: "Home Page Top",
        status: "Active"
      },
      {
        title: "Fresh Fruits",
        image: "https://images.unsplash.com/photo-1604719312566-8fa20f162af6?w=1200&q=80",
        location: "Home Page Top",
        status: "Active"
      },
      {
        title: "Daily Essentials",
        image: "https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=1200&q=80",
        location: "Home Page Top",
        status: "Active"
      }
    ];
    await Banner.insertMany(bannersData);

    console.log('All data seeded successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedAtlas();
