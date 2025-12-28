const Product = require("../Models/productModel");
const cloudinary = require("../Util/cloudinary");
const { newCloud } = require("../Util/cloudinary");

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ message: "products shown", products });
  } catch (error) {
    console.log("error in getting products", error);
    res.status(500).json({ message: "Error fetching products" });
  }
};

exports.addProducts = async (req, res) => {
  try {
    const { title, description, price, category, sizes, colors, stock } =
      req.body;

    const imageFiles = req.files;
    let imageUrls = [];

    if (!title || !price) {
      return res.status(400).json({ message: "Title and Price are required" });
    }
    if (imageFiles && imageFiles.length > 0) {
      for (const file of imageFiles) {
        const uploadResult = await newCloud(file.path);
        if (uploadResult && uploadResult.url) {
          imageUrls.push(uploadResult.url);
        }
      }
      console.log("Images uploaded to cloudinary:", imageUrls);
    }
    const safeSizes = Array.isArray(sizes)
      ? sizes.join(",")
      : (sizes || "").trim();
    const safeColors = Array.isArray(colors)
      ? colors.join(",")
      : (colors || "").trim();

    const product = new Product({
      title: title.trim(),
      description: description.trim(),
      price: Number(price),
      category: category.trim(),
      sizes: safeSizes,
      colors: safeColors,
      stock: stock ? Number(stock) : 0,
      images: imageUrls,
    });

    const saveProduct = await product.save();
    console.log("product added succesfully");

    return res
      .status(200)
      .json({ message: "product added succesfully", product: saveProduct });
  } catch (error) {
    console.log("error in adding products", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: Object.values(error.errors)
          .map((e) => e.message)
          .join(","),
      });
    }
    res.status(500).json({ success: "false", message: "error adding product" });
  }
};

exports.updateProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ _id: id });

    if (!product) {
      return res.status(400).json({ message: "Product does not exist" });
    }
    console.log("Found product to update", product.title);
    if (req.body.title) product.title = req.body.title.trim();
    if (req.body.description) product.description = req.body.description.trim();
    if (req.body.price) product.price = req.body.price;
    if (req.body.category) product.category = req.body.category.trim();
    if (req.body.stock) product.stock = Number(req.body.stock);

    if (req.body.sizes) {
      product.sizes = Array.isArray(req.body.sizes)
        ? req.body.sizes.join(",")
        : req.body.sizes.trim();
    }

    if (req.body.colors) {
      product.colors = Array.isArray(req.body.colors)
        ? req.body.colors.join(",")
        : req.body.colors.trim();
    }

    const imageFiles = req.files;

    let currentImages = product.images || [];
    if (!Array.isArray(currentImages)) {
      currentImages = product.image ? [product.image] : [];
    }

    if (imageFiles && imageFiles.length > 0) {
      const newImageUrls = [];
      for (const file of imageFiles) {
        const uploadResult = await newCloud(file.path);
        if (uploadResult && uploadResult.url) {
          newImageUrls.push(uploadResult.url);
        }
      }
      console.log("New images added:", newImageUrls);
      product.images = [...currentImages, ...newImageUrls];
    } else {
      product.images = currentImages;
    }

    const update = await product.save();

    if (update) {
      console.log("updating product success");
      return res
        .status(200)
        .json({ message: "product update succesfull", product: update });
    }
  } catch (error) {
    console.log("error updating products", error);
    res
      .status(500)
      .json({ message: "Error updating product", error: error.message });
  }
};

exports.deleteProducts = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findOneAndDelete({ _id: id });
    if (product) {
      console.log("Product deleted succesfully");
      return res.status(200).json({ message: "product deleted" });
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.log("error deleting product", error);
    return res.status(500).json({ message: "Error deleting product" });
  }
};
