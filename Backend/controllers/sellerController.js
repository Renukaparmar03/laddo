import Seller from '../models/sellerModel.js';
import jwt from 'jsonwebtoken';

const generateToken = (res, sellerId) => {
  const token = jwt.sign({ sellerId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  res.cookie('jwtSeller', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

// @desc    Auth seller/set token
// @route   POST /api/sellers/auth
// @access  Public
export const authSeller = async (req, res) => {
  const { email, password } = req.body;

  try {
    const seller = await Seller.findOne({ email });

    if (seller && (await seller.matchPassword(password))) {
      if (seller.status === 'pending') {
        res.status(403).json({ status: 'pending', message: 'Your account is still pending admin approval. Please wait for activation.' });
        return;
      }
      if (seller.status === 'rejected') {
        res.status(403).json({ status: 'rejected', message: 'Your seller account is not approved yet' });
        return;
      }
      if (seller.status === 'suspended') {
        res.status(403).json({ status: 'suspended', message: 'Your account has been suspended by the admin.' });
        return;
      }

      generateToken(res, seller._id);
      res.status(200).json({
        _id: seller._id,
        businessName: seller.businessName,
        ownerName: seller.ownerName,
        email: seller.email,
        status: seller.status,
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Register a new seller
// @route   POST /api/sellers
// @access  Public
export const registerSeller = async (req, res) => {
  const { businessName, ownerName, email, password, phone, address } = req.body;

  try {
    const sellerExists = await Seller.findOne({ email });

    if (sellerExists) {
      res.status(400).json({ message: 'Seller already exists' });
      return;
    }

    const seller = await Seller.create({
      businessName,
      ownerName,
      email,
      password,
      phone,
      address,
    });

    if (seller) {
      res.status(201).json({
        _id: seller._id,
        businessName: seller.businessName,
        ownerName: seller.ownerName,
        email: seller.email,
        status: seller.status,
      });
    } else {
      res.status(400).json({ message: 'Invalid seller data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Logout seller
// @route   POST /api/sellers/logout
// @access  Public
export const logoutSeller = async (req, res) => {
  res.cookie('jwtSeller', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: 'Seller logged out' });
};

// @desc    Get seller profile
// @route   GET /api/sellers/profile
// @access  Private
export const getSellerProfile = async (req, res) => {
  try {
    const seller = await Seller.findById(req.seller._id);

    if (seller) {
      res.status(200).json({
        _id: seller._id,
        businessName: seller.businessName,
        ownerName: seller.ownerName,
        email: seller.email,
        phone: seller.phone,
        address: seller.address,
        status: seller.status,
      });
    } else {
      res.status(404).json({ message: 'Seller not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all sellers
// @route   GET /api/sellers
// @access  Public/Admin
export const getAllSellers = async (req, res) => {
  try {
    const query = {};
    if (req.query.status) {
      query.status = req.query.status;
    }
    const sellers = await Seller.find(query);
    res.json(sellers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update seller status
// @route   PUT /api/sellers/:id/status
// @access  Public/Admin
export const updateSellerStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const seller = await Seller.findById(req.params.id);

    if (seller) {
      seller.status = status;
      const updatedSeller = await seller.save();
      res.json(updatedSeller);
    } else {
      res.status(404).json({ message: 'Seller not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const seller = await Seller.findOne({ email });
    if (!seller) return res.status(404).json({ message: 'Seller not found' });
    seller.password = newPassword;
    await seller.save();
    res.json({ message: 'Password reset successful' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
