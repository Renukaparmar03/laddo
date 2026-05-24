import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import Seller from '../models/sellerModel.js';

const protectUser = async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.userId).select('-password');

      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

const protectSeller = async (req, res, next) => {
  let token;

  token = req.cookies.jwtSeller;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.seller = await Seller.findById(decoded.sellerId).select('-password');

      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export { protectUser, protectSeller };
