const express = require("express");
const multer = require("multer");
const {
  getProducts,
  addProducts,
  updateProducts,
  deleteProducts,
} = require("../Controller/productController");
const { requireSignin } = require("../Middlewares/auth");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
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
