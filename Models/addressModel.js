const mongoose = require("mongoose");
const { nonEmptyString } = require("../validator");

const addressSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fullName: {
      type: String,
      required: true,
      validate: {
        validator: nonEmptyString,
        message: "Full Name cannot be empty",
      },
    },
    phone: {
      type: String,
      required: true,
      validate: { validator: nonEmptyString, message: "Phone cannot be empty" },
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", addressSchema);
