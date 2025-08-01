const express = require("express");
const {
  createOrder,
  getAllOrdersByUser,
  getOrderDetails,
} = require("../../controllers/shop/order-controller");

const router = express.Router();

// Create a new order
router.post("/create", createOrder);

// Get all orders for a specific user
router.get("/list/:userId", getAllOrdersByUser);

// Get single order details
router.get("/details/:id", getOrderDetails);

module.exports = router;
