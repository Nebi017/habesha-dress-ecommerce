import OrderModel from "../models/orderModel.js";
import User from "../models/userModel.js";

// placing orders using COD method
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      amount,
      address,
      status: "placed",
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new OrderModel(orderData);
    await newOrder.save();
    await User.findByIdAndUpdate(userId, { cartData: {} });
    res.status(200).json({
      success: true,
      message: "Order Placed Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// placing orders using stripe method
const placeOrderStripe = async (req, res) => {};

// get all orders for admin
const allOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// get all orders for user
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await OrderModel.find({ userId });

    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//order status update for admin
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    await OrderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { placeOrder, placeOrderStripe, allOrders, userOrders, updateStatus };
