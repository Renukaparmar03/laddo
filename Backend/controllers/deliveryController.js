import Delivery from '../models/deliveryModel.js';

// @desc    Register a new delivery partner
// @route   POST /api/delivery/register
// @access  Public
export const registerDelivery = async (req, res) => {
  try {
    const { name, phone, password, city, vehicle, licenseNo, aadharNo } = req.body;

    const deliveryExists = await Delivery.findOne({ phone });

    if (deliveryExists) {
      return res.status(400).json({ message: 'Delivery partner already exists' });
    }

    const delivery = await Delivery.create({
      name,
      phone,
      password,
      city,
      vehicle,
      licenseNo,
      aadharNo,
      status: 'pending' // Default status
    });

    if (delivery) {
      res.status(201).json({
        _id: delivery._id,
        name: delivery.name,
        phone: delivery.phone,
        status: delivery.status,
        message: 'Registration successful. Waiting for admin approval.'
      });
    } else {
      res.status(400).json({ message: 'Invalid delivery partner data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Auth delivery partner & get token
// @route   POST /api/delivery/login
// @access  Public
export const authDelivery = async (req, res) => {
  try {
    const { phone, password } = req.body;

    const delivery = await Delivery.findOne({ phone });

    if (delivery && (await delivery.matchPassword(password))) {
      if (delivery.status === 'pending') {
        return res.status(401).json({ message: 'Account pending approval from admin' });
      }
      if (delivery.status === 'rejected') {
        return res.status(401).json({ message: 'Account rejected by admin' });
      }

      res.json({
        _id: delivery._id,
        name: delivery.name,
        phone: delivery.phone,
        city: delivery.city,
        vehicle: delivery.vehicle,
        status: delivery.status,
        // Add token here if using JWT
      });
    } else {
      res.status(401).json({ message: 'Invalid phone number or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all delivery partners
// @route   GET /api/delivery
// @access  Private/Admin
export const getDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find({});
    res.json(deliveries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update delivery status
// @route   PUT /api/delivery/:id/status
// @access  Private/Admin
export const updateDeliveryStatus = async (req, res) => {
  try {
    const delivery = await Delivery.findById(req.params.id);

    if (delivery) {
      delivery.status = req.body.status || delivery.status;
      const updatedDelivery = await delivery.save();
      res.json(updatedDelivery);
    } else {
      res.status(404).json({ message: 'Delivery partner not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
