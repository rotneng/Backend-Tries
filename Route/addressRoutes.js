const express = require("express");
const router = express.Router();
const {
  addAddress,
  updateAddress,
  deleteAddress,
  getAddresses,
} = require("../Controller/addressController");
const { requireSignin } = require("../Middlewares/auth");

router.get("/", requireSignin, getAddresses);

router.post("/add", requireSignin, addAddress);

router.put("/update/:id", requireSignin, updateAddress);

router.delete("/delete/:id", requireSignin, deleteAddress);

module.exports = router;
