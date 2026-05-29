import Order from '../models/orderModel.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Public (should be Private/User but using Public for MVP)
export const addOrderItems = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      user
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      res.status(400).json({ message: 'No order items' });
      return;
    }

    // Group items by seller
    const itemsBySeller = {};
    orderItems.forEach(item => {
      const sellerId = item.seller;
      if (!itemsBySeller[sellerId]) {
        itemsBySeller[sellerId] = [];
      }
      itemsBySeller[sellerId].push(item);
    });

    const createdOrders = [];

    // Create an order for each seller
    for (const sellerId in itemsBySeller) {
      const sellerItems = itemsBySeller[sellerId];
      
      const calcItemsPrice = sellerItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
      const calcTaxPrice = Math.round(calcItemsPrice * 0.05); // Assume 5% GST
      const calcShippingPrice = calcItemsPrice > 199 ? 0 : 25; // Simple shipping logic
      const calcHandlingFee = 2;
      const calcTotalPrice = calcItemsPrice + calcTaxPrice + calcShippingPrice + calcHandlingFee;

      // Generate a unique order ID
      const orderId = `ORD-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

      const order = new Order({
        orderId,
        orderItems: sellerItems,
        user: user || '000000000000000000000000', // Dummy User ID
        shippingAddress: shippingAddress || { address: 'Not provided', city: 'Unknown', postalCode: '000000' },
        paymentMethod: paymentMethod || 'COD',
        itemsPrice: calcItemsPrice,
        taxPrice: calcTaxPrice,
        shippingPrice: calcShippingPrice,
        totalPrice: calcTotalPrice,
        isPaid: paymentMethod && paymentMethod !== 'COD',
        paidAt: paymentMethod && paymentMethod !== 'COD' ? Date.now() : null
      });

      const createdOrder = await order.save();
      createdOrders.push(createdOrder);

      // Emit real-time notification to the seller
      const io = req.app.get('io');
      if (io) {
        io.to(`seller_${sellerId}`).emit('newOrder', createdOrder);
      }
    }

    res.status(201).json(createdOrders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all orders for a specific seller
// @route   GET /api/orders/seller/:id
// @access  Public
export const getSellerOrders = async (req, res) => {
  try {
    const sellerId = req.params.id;
    // Find all orders that contain at least one item from this seller
    const orders = await Order.find({ 'orderItems.seller': sellerId })
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    
    // Calculate stats specifically for this seller
    let totalSales = 0;
    let pendingOrders = 0;

    orders.forEach(order => {
      if (order.status === 'Pending') pendingOrders++;
      
      // Only sum up sales for items belonging to this seller
      order.orderItems.forEach(item => {
        if (item.seller.toString() === sellerId) {
          totalSales += item.price * item.qty;
        }
      });
    });

    res.json({
      orders,
      totalOrders: orders.length,
      totalSales,
      pendingOrders
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all orders for a specific user
// @route   GET /api/orders/user/:id
// @access  Public
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Public
export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.status = req.body.status || order.status;
      if (req.body.rejectionReason) {
        order.rejectionReason = req.body.rejectionReason;
      }
      if (req.body.status === 'Delivered') {
        order.isDelivered = true;
        order.deliveredAt = Date.now();
      }
      const updatedOrder = await order.save();

      const io = req.app.get('io');
      if (io) {
        // Notify user of status update
        io.to(`user_${updatedOrder.user}`).emit('orderUpdated', updatedOrder);
        
        // If order is accepted, notify delivery boys
        if (updatedOrder.status === 'Accepted / Preparing') {
          // Send populated order so delivery boy has seller address
          const populatedOrder = await Order.findById(updatedOrder._id)
            .populate('orderItems.seller', 'businessName address phone');
          io.to('delivery_boys').emit('newDeliveryRequest', populatedOrder);
        }
      }

      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all orders available for delivery
// @route   GET /api/orders/available-for-delivery
// @access  Public
export const getAvailableForDelivery = async (req, res) => {
  try {
    const orders = await Order.find({ 
      status: 'Accepted / Preparing',
      deliveryBoy: null
    }).populate('orderItems.seller', 'businessName address phone').populate('user', 'name email').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get orders assigned to a specific delivery boy
// @route   GET /api/orders/delivery-boy/:id
// @access  Public
export const getDeliveryBoyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ deliveryBoy: req.params.id })
      .populate('orderItems.seller', 'businessName address phone')
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Assign delivery boy to an order
// @route   PUT /api/orders/:id/assign
// @access  Public
export const assignDeliveryBoy = async (req, res) => {
  try {
    const { deliveryBoyId } = req.body;
    
    // Find the order and update it only if it is not already assigned
    const order = await Order.findOneAndUpdate(
      { _id: req.params.id, deliveryBoy: null },
      { deliveryBoy: deliveryBoyId, status: 'Assigned' },
      { new: true }
    );

    if (order) {
      const io = req.app.get('io');
      if (io) {
        // Notify all delivery boys that this order is no longer available
        io.to('delivery_boys').emit('deliveryAssigned', order._id);
        
        // Notify the user
        io.to(`user_${order.user}`).emit('orderUpdated', order);
      }
      res.json(order);
    } else {
      res.status(400).json({ message: 'Order already assigned or not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
