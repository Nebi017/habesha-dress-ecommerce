import express from "express";

import {
  placeOrder,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe,
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/authUser.js";

const orderRouter = express.Router();
//payment routes
orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/stripe", authUser, placeOrderStripe);

// user routes
orderRouter.post("/userorders", authUser, userOrders);

// admin routes
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);
// verify ppyment
orderRouter.post('/verifyStripe, authUser, verifyStripe')
export default orderRouter;
