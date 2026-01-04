const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const {
  getProducts,
  addProducts,
  updateProducts,
  deleteProducts,
} = require("../Controller/productController");
const { requireSignin } = require("../Middlewares/auth"); 
const router = express.Router();

const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() + "-" + file.originalname.replace(/\s+/g, "-");
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024,
  },
});

router.get("/getProducts", getProducts);

router.post(
  "/addProducts",
  requireSignin,
  upload.array("images", 10),
  addProducts
);

router.put(
  "/updateProducts/:id",
  requireSignin,
  upload.array("images", 10),
  updateProducts
);

router.delete("/deleteProducts/:id", requireSignin, deleteProducts);

router.get("/", (req, res) => res.send("Route working"));

module.exports = router;
