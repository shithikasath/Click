const Order = require("../../models/Order");

// Get all orders placed by all users (for admin)
const getAllOrdersOfAllUsers = async (req, res) => {
  try {
    const orders = await Order.find().sort({ orderDate: -1 }); // latest first

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found!",
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (e) {
    console.error("Error in getAllOrdersOfAllUsers:", e);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching orders.",
    });
  }
};

// Get specific order details by ID (for admin)
const getOrderDetailsForAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (e) {
    console.error("Error in getOrderDetailsForAdmin:", e);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching order details.",
    });
  }
};

// Update order status (e.g., from "Pending" to "Shipped")
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    order.orderStatus = orderStatus;
    order.orderUpdateDate = new Date();
    await order.save();

    res.status(200).json({
      success: true,
      message: "Order status updated successfully!",
    });
  } catch (e) {
    console.error("Error in updateOrderStatus:", e);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating order status.",
    });
  }
};

module.exports = {
  getAllOrdersOfAllUsers,
  getOrderDetailsForAdmin,
  updateOrderStatus,
};
