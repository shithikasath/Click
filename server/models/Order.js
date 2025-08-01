const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    cartId: { type: String },
    cartItems: [
      {
        productId: { type: String },
        title: { type: String },
        image: { type: String },
        price: { type: Number }, // Changed to Number
        quantity: { type: Number },
      },
    ],
    addressInfo: {
      addressId: { type: String },
      address: { type: String },
      city: { type: String },
      pincode: { type: String },
      phone: { type: String },
      notes: { type: String },
    },
    orderStatus: { type: String, default: "Processing" },
    paymentMethod: { type: String }, // e.g., "COD" or "Online"
    paymentStatus: { type: String, default: "Pending" },
    totalAmount: { type: Number, required: true },
    orderDate: { type: Date, default: Date.now },
    orderUpdateDate: { type: Date, default: Date.now },
    paymentId: { type: String },
    payerId: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
