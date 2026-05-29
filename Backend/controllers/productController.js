import Product from '../models/productModel.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    let query = {};
    if (req.query.sellerId) {
      query.seller = req.query.sellerId;
    }
    
    let products = await Product.find(query).populate('seller', 'status');
    
    if (req.query.approved === 'true') {
      products = products.filter(p => p.isApproved && p.seller && p.seller.status === 'approved');
    }
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Seller
export const createProduct = async (req, res) => {
  try {
    const { title, price, discountPrice, originalPrice, brand, status, description, image, images, category, stock, sellerId, dynamicFields, customAttributes } = req.body;

    const product = new Product({
      title,
      price,
      discountPrice,
      originalPrice,
      brand,
      status,
      description,
      image,
      images,
      category,
      stock,
      dynamicFields,
      customAttributes,
      seller: sellerId || req.body.seller // fallback for now
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Seller
export const updateProduct = async (req, res) => {
  try {
    const { title, price, discountPrice, originalPrice, brand, status, description, image, images, category, stock, dynamicFields, customAttributes } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      product.title = title || product.title;
      product.price = price || product.price;
      product.discountPrice = discountPrice !== undefined ? discountPrice : product.discountPrice;
      product.originalPrice = originalPrice !== undefined ? originalPrice : product.originalPrice;
      product.brand = brand || product.brand;
      product.status = status || product.status;
      product.description = description || product.description;
      product.image = image || product.image;
      product.images = images || product.images;
      product.category = category || product.category;
      product.stock = stock !== undefined ? stock : product.stock;
      product.dynamicFields = dynamicFields !== undefined ? dynamicFields : product.dynamicFields;
      product.customAttributes = customAttributes !== undefined ? customAttributes : product.customAttributes;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Seller
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update product approval status
// @route   PUT /api/products/:id/approve
// @access  Private/Admin
export const updateProductApproval = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      product.isApproved = req.body.isApproved;
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
