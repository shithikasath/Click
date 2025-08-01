const express = require("express");
const {
  getAllOrdersOfAllUsers,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} = require("../../controllers/admin/order-controller");

const router = express.Router();

// Get all orders (admin access)
router.get("/get", getAllOrdersOfAllUsers);

// Get specific order details
router.get("/details/:id", getOrderDetailsForAdmin);

// Update order status
router.put("/update/:id", updateOrderStatus);

module.exports = router;
