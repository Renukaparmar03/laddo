export const CATEGORIES = [
  { id: 1, name: 'All', icon: 'Store' },
  { id: 2, name: 'Grocery & Kitchen', icon: 'ShoppingBasket', color: '#FFFDD0', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=120&q=80' },
  { id: 3, name: 'Snacks & Drinks', icon: 'Cookie', color: '#FFF0F5', image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=120&q=80' },
  { id: 4, name: 'Beauty & Personal Care', icon: 'Sparkles', color: '#F3E5F5', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=120&q=80' },
  { id: 5, name: 'Fashion', icon: 'Shirt', color: '#E3F2FD', image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=120&q=80' },
  { id: 6, name: 'Electronics', icon: 'Laptop', color: '#E6E6FA', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=120&q=80' },
  { id: 7, name: 'Mobiles', icon: 'Smartphone', color: '#E3F2FD', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=120&q=80' },
  { id: 8, name: 'Furniture', icon: 'Lamp', color: '#F3E5F5', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=120&q=80' },
  { id: 9, name: 'Shoes', icon: 'Footprints', color: '#FFF0F5', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=120&q=80' },
  { id: 10, name: 'Toys', icon: 'Gamepad2', color: '#E6E6FA', image: 'https://images.unsplash.com/photo-1559251606-c623743a6d76?w=120&q=80' },
];

export const SUBCATEGORIES = {
  'Grocery & Kitchen': [
    { id: 'veg_fruits', name: 'Vegetables & Fruits', image: 'https://images.unsplash.com/photo-1610348725531-843dff147e2c?w=100&q=80' },
    { id: 'atta_rice', name: 'Atta, Rice & Dal', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=100&q=80' },
    { id: 'oil_ghee', name: 'Oil & Ghee', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=100&q=80' },
    { id: 'spices', name: 'Spices & Salt', image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=100&q=80' }
  ],
  'Snacks & Drinks': [
    { id: 'chips', name: 'Chips & Crisps', image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=100&q=80' },
    { id: 'drinks', name: 'Cold Drinks & Juices', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=100&q=80' },
    { id: 'sweets', name: 'Sweets & Chocolates', image: 'https://images.unsplash.com/photo-1581798459219-318e76aecc7b?w=100&q=80' }
  ],
  'Beauty & Personal Care': [
    { id: 'skincare', name: 'Skincare', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=100&q=80' },
    { id: 'haircare', name: 'Haircare', image: 'https://images.unsplash.com/photo-1527799851257-359321b38524?w=100&q=80' }
  ],
  'Fashion': [
    { id: 'wear', name: 'Apparel & Clothes', image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=100&q=80' }
  ],
  'Electronics': [
    { id: 'audio', name: 'Audio & Earbuds', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=100&q=80' }
  ],
  'Mobiles': [
    { id: 'phones', name: 'Smartphones', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100&q=80' }
  ],
  'Furniture': [
    { id: 'home_furniture', name: 'Home Furniture', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=100&q=80' }
  ],
  'Shoes': [
    { id: 'footwear', name: 'Footwear', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&q=80' }
  ],
  'Toys': [
    { id: 'plush_toys', name: 'Soft Toys & Games', image: 'https://images.unsplash.com/photo-1559251606-c623743a6d76?w=100&q=80' }
  ]
};

export const PRODUCTS = [
  // Grocery & Kitchen -> Vegetables & Fruits
  {
    id: 101,
    title: 'Fresh Red Onion',
    price: 32,
    weight: '1kg',
    rating: 4.8,
    deliveryTime: '10 mins',
    image: 'https://images.unsplash.com/photo-1508747703725-719777637510?w=300&q=80',
    isVeg: true,
    category: 'Grocery & Kitchen',
    subCategory: 'Vegetables & Fruits'
  },
  {
    id: 102,
    title: 'Fresh Potato (Aloo)',
    price: 28,
    weight: '1kg',
    rating: 4.7,
    deliveryTime: '12 mins',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=300&q=80',
    isVeg: true,
    category: 'Grocery & Kitchen',
    subCategory: 'Vegetables & Fruits'
  },
  {
    id: 103,
    title: 'Hybrid Tomato',
    price: 45,
    weight: '500g',
    rating: 4.9,
    deliveryTime: '15 mins',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&q=80',
    isVeg: true,
    category: 'Grocery & Kitchen',
    subCategory: 'Vegetables & Fruits'
  },
  {
    id: 104,
    title: 'Fresh Robusta Banana',
    price: 39,
    weight: '6 units',
    rating: 4.6,
    deliveryTime: '10 mins',
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&q=80',
    isVeg: true,
    category: 'Grocery & Kitchen',
    subCategory: 'Vegetables & Fruits'
  },

  // Grocery & Kitchen -> Atta, Rice & Dal
  {
    id: 105,
    title: 'Aashirvaad Shudh Chakki Atta',
    price: 245,
    weight: '5kg',
    rating: 4.9,
    deliveryTime: '18 mins',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&q=80',
    isVeg: true,
    category: 'Grocery & Kitchen',
    subCategory: 'Atta, Rice & Dal'
  },
  {
    id: 106,
    title: 'Fortune Premium Basmati Rice',
    price: 135,
    weight: '1kg',
    rating: 4.8,
    deliveryTime: '15 mins',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&q=80',
    isVeg: true,
    category: 'Grocery & Kitchen',
    subCategory: 'Atta, Rice & Dal'
  },

  // Grocery & Kitchen -> Oil & Ghee
  {
    id: 107,
    title: 'Fortune Kachi Ghani Mustard Oil',
    price: 172,
    weight: '1L',
    rating: 4.7,
    deliveryTime: '15 mins',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&q=80',
    isVeg: true,
    category: 'Grocery & Kitchen',
    subCategory: 'Oil & Ghee'
  },
  {
    id: 108,
    title: 'Amul Pure Cow Ghee',
    price: 360,
    weight: '500ml',
    rating: 4.9,
    deliveryTime: '14 mins',
    image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=300&q=80',
    isVeg: true,
    category: 'Grocery & Kitchen',
    subCategory: 'Oil & Ghee'
  },

  // Grocery & Kitchen -> Spices & Salt
  {
    id: 109,
    title: 'Tata Salt Iodized',
    price: 28,
    weight: '1kg',
    rating: 4.9,
    deliveryTime: '10 mins',
    image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=300&q=80',
    isVeg: true,
    category: 'Grocery & Kitchen',
    subCategory: 'Spices & Salt'
  },

  // Snacks & Drinks -> Chips & Crisps
  {
    id: 201,
    title: "Lay's India's Magic Masala",
    price: 20,
    weight: '48g',
    rating: 4.8,
    deliveryTime: '12 mins',
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300&q=80',
    isVeg: true,
    category: 'Snacks & Drinks',
    subCategory: 'Chips & Crisps'
  },
  {
    id: 202,
    title: 'Kurkure Masala Munch',
    price: 20,
    weight: '90g',
    rating: 4.7,
    deliveryTime: '10 mins',
    image: 'https://images.unsplash.com/photo-1600957244633-c98826088bc7?w=300&q=80',
    isVeg: true,
    category: 'Snacks & Drinks',
    subCategory: 'Chips & Crisps'
  },
  {
    id: 203,
    title: 'Pringles Sour Cream & Onion',
    price: 110,
    weight: '107g',
    rating: 4.8,
    deliveryTime: '15 mins',
    image: 'https://images.unsplash.com/photo-1518047601542-79f18c655718?w=300&q=80',
    isVeg: true,
    category: 'Snacks & Drinks',
    subCategory: 'Chips & Crisps'
  },

  // Snacks & Drinks -> Cold Drinks & Juices
  {
    id: 204,
    title: 'Coca-Cola Soft Drink',
    price: 40,
    weight: '750ml',
    rating: 4.6,
    deliveryTime: '10 mins',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=300&q=80',
    isVeg: true,
    category: 'Snacks & Drinks',
    subCategory: 'Cold Drinks & Juices'
  },
  {
    id: 205,
    title: 'Real Activ Orange Juice',
    price: 120,
    weight: '1L',
    rating: 4.7,
    deliveryTime: '15 mins',
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=300&q=80',
    isVeg: true,
    category: 'Snacks & Drinks',
    subCategory: 'Cold Drinks & Juices'
  },

  // Snacks & Drinks -> Sweets & Chocolates
  {
    id: 206,
    title: 'Cadbury Dairy Milk Silk',
    price: 80,
    weight: '60g',
    rating: 4.9,
    deliveryTime: '12 mins',
    image: 'https://images.unsplash.com/photo-1581798459219-318e76aecc7b?w=300&q=80',
    isVeg: true,
    category: 'Snacks & Drinks',
    subCategory: 'Sweets & Chocolates'
  },

  // Beauty & Personal Care -> Skincare
  {
    id: 301,
    title: 'Nivea Soft Cream',
    price: 299,
    weight: '200ml',
    rating: 4.8,
    deliveryTime: '15 mins',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&q=80',
    isVeg: true,
    category: 'Beauty & Personal Care',
    subCategory: 'Skincare'
  },
  {
    id: 302,
    title: "L'Oreal Total Repair Shampoo",
    price: 349,
    weight: '340ml',
    rating: 4.7,
    deliveryTime: '20 mins',
    image: 'https://images.unsplash.com/photo-1527799851257-359321b38524?w=300&q=80',
    isVeg: true,
    category: 'Beauty & Personal Care',
    subCategory: 'Haircare'
  },

  // Other Fallbacks matching original category array to avoid errors
  {
    id: 401,
    title: 'Casual Summer T-Shirt',
    price: 599,
    weight: 'L Size',
    rating: 4.4,
    deliveryTime: '1 day',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&q=80',
    isVeg: true,
    category: 'Fashion',
    subCategory: 'Apparel & Clothes'
  },
  {
    id: 501,
    title: 'boAt Airdopes Bluetooth Earbuds',
    price: 1299,
    weight: '1 unit',
    rating: 4.5,
    deliveryTime: '25 mins',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&q=80',
    isVeg: false,
    category: 'Electronics',
    subCategory: 'Audio & Earbuds'
  },
  {
    id: 601,
    title: 'Redmi Note 13 Pro',
    price: 19999,
    weight: '1 unit',
    rating: 4.6,
    deliveryTime: 'Tomorrow',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&q=80',
    isVeg: true,
    category: 'Mobiles',
    subCategory: 'Smartphones'
  },
  {
    id: 701,
    title: 'Wooden Laptop Study Table',
    price: 1499,
    weight: '3kg',
    rating: 4.6,
    deliveryTime: '2 days',
    image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=300&q=80',
    isVeg: true,
    category: 'Furniture',
    subCategory: 'Home Furniture'
  },
  {
    id: 801,
    title: 'Sports Running Shoes',
    price: 1899,
    weight: '1 pair',
    rating: 4.5,
    deliveryTime: 'Tomorrow',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80',
    isVeg: false,
    category: 'Shoes',
    subCategory: 'Footwear'
  },
  {
    id: 901,
    title: 'Soft Plush Teddy Bear',
    price: 499,
    weight: '1 unit',
    rating: 4.9,
    deliveryTime: '30 mins',
    image: 'https://images.unsplash.com/photo-1559251606-c623743a6d76?w=300&q=80',
    isVeg: true,
    category: 'Toys',
    subCategory: 'Soft Toys & Games'
  }
];
