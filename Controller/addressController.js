const Address = require("../Models/addressModel");

exports.addAddress = async (req, res) => {
  try {
    const userId = req.user.userId || req.user._id;
    const { fullName, phone, address, city, state } = req.body;

    const newAddress = new Address({
      user: userId,
      fullName,
      phone,
      address,
      city,
      state,
    });

    const savedAddress = await newAddress.save();

    return res.status(201).json({
      message: "Address added successfully",
      address: savedAddress,
    });
  } catch (error) {
    console.log("Error adding address:", error);
    return res.status(500).json({ message: "Error adding address" });
  }
};

exports.updateAddress = async (req, res) => {
  try {
    const userId = req.user.userId || req.user._id;
    const addressId = req.params.id;
    const { fullName, phone, address, city, state } = req.body;

    const updatedAddress = await Address.findOneAndUpdate(
      { _id: addressId, user: userId },
      { fullName, phone, address, city, state },
      { new: true }
    );

    if (!updatedAddress) {
      return res
        .status(404)
        .json({ message: "Address not found or not authorized" });
    }

    return res.status(200).json({
      message: "Address updated successfully",
      address: updatedAddress,
    });
  } catch (error) {
    console.log("Error updating address:", error);
    return res.status(500).json({ message: "Error updating address" });
  }
};

exports.deleteAddress = async (req, res) => {
  try {
    const userId = req.user.userId || req.user._id;
    const addressId = req.params.id;

    const deletedAddress = await Address.findOneAndDelete({
      _id: addressId,
      user: userId,
    });

    if (!deletedAddress) {
      return res
        .status(404)
        .json({ message: "Address not found or not authorized" });
    }

    return res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    console.log("Error deleting address:", error);
    return res.status(500).json({ message: "Error deleting address" });
  }
};

exports.getAddresses = async (req, res) => {
  try {
    const userId = req.user.userId || req.user._id;
    const addresses = await Address.find({ user: userId });

    return res.status(200).json({ addresses });
  } catch (error) {
    console.log("Error fetching addresses:", error);
    return res.status(500).json({ message: "Error fetching addresses" });
  }
};
