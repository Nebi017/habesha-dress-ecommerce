import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
const addToCart = async (req, res) => {
  try {
    const { userId, itemId, measurements } = req.body; // Changed `size` to `measurements`
    const sizeKey = Object.values(measurements).join("-"); // Create the key like "90-70"
    const userData = await User.findById(userId);
    let cartData = userData.cartData;

    // Check if the item already exists in cart
    if (cartData[itemId]) {
      if (cartData[itemId][sizeKey]) {
        cartData[itemId][sizeKey].quantity += 1; // Increase quantity
      } else {
        cartData[itemId][sizeKey] = { quantity: 1, measurements }; // Add new measurements
      }
    } else {
      cartData[itemId] = {}; // Add new product if not in cart
      cartData[itemId][sizeKey] = { quantity: 1, measurements };
    }

    // Save the updated cartData back to the user
    await User.findByIdAndUpdate(userId, { cartData });
    res.status(200).json({ success: true, message: "Item added to cart" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    const userData = await User.findById(userId);
    let cartData = userData.cartData;

    if (quantity === 0) {
      delete cartData[itemId][size];

      // Remove the whole item if all sizes are deleted
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    } else {
      // Update the quantity normally
      if (!cartData[itemId]) {
        cartData[itemId] = {};
      }
      cartData[itemId][size] = quantity;
    }

    await User.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Cart Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const getUserCart = async (req, res) => {
  try {
    const token = req.headers.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Make sure secret matches
    const userId = decoded.id;
    console.log("Decoded token:", decoded);

    const userData = await User.findById(userId);
    console.log("User data:", userData);
    const cartData = userData.cartData;
    console.log("cartData:", cartData);

    res.status(200).json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart };
