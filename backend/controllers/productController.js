import { v2 as cloudinary } from "cloudinary";
import Product from "../models/productModel.js";
// function for add product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      bestSeller,
    } = req.body;
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );
    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      category,
      subCategory,
      price: Number(price),
      bestSeller: bestSeller === "true" ? true : false,
      image: imagesUrl,
      date: Date.now(),
    };

    console.log(productData);
    const product = new Product(productData);
    await product.save();
    // check if all fields are filled
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !subCategory ||
      !bestSeller
    ) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    res
      .status(200)
      .json({ success: true, message: "Product added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// function for list product
const listProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// function for remove product
// Backend - productController.js
const removeProduct = async (req, res) => {
  try {
    // Change from req.params.id to req.body.id
    const deletedProduct = await Product.findByIdAndDelete(req.body.id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      deletedProduct,
    });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// function for single product
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { addProduct, listProducts, removeProduct, singleProduct };
