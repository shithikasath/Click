// controllers/shop/order-controller.js

const Order = require("../../models/Order");
const Cart = require("../../models/Cart");
const Product = require("../../models/Product");

// Create new order
const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      cartId,
      paymentId,
      payerId,
    } = req.body;

    const newOrder = new Order({
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus: orderStatus || "placed",
      paymentMethod: paymentMethod || "COD",
      paymentStatus: paymentStatus || "pending",
      totalAmount,
      orderDate: orderDate || new Date(),
      orderUpdateDate: orderUpdateDate || new Date(),
      paymentId,
      payerId,
    });

    await newOrder.save();

    // Deduct stock
    for (let item of cartItems) {
      const product = await Product.findById(item.productId);
      if (product) {
        product.totalStock = Math.max(0, product.totalStock - item.quantity);
        await product.save();
      }
    }

    // Delete cart after placing order
    if (cartId) {
      await Cart.findByIdAndDelete(cartId);
    }

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      orderId: newOrder._id,
    });
  } catch (error) {
    console.error("Create Order Error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while placing the order",
    });
  }
};

// Get all orders by user
const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId }).sort({ orderDate: -1 });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found for this user",
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.error("Fetch Orders Error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching orders",
    });
  }
};

// Get specific order details by ID
const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error("Order Detail Error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while retrieving order details",
    });
  }
};

module.exports = {
  createOrder,
  getAllOrdersByUser,
  getOrderDetails,
};
