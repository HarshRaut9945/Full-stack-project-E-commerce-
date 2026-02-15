import { Address } from "../Models/Address.js";

export const addAdress = async (req, res) => {
  try {
    const { fullName, address, city, state, country, pincode, phoneNumber } =
      req.body;

    const userId = req.user;

    const userAddress = await Address.create({
      userId,
      fullName,
      address,
      city,
      state,
      country,
      pincode,
      phoneNumber,
    });

    res.json({
      message: "Address Added",
      userAddress,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAdress = async (req, res) => {
  try {
    const userId = req.user;
    const addresses = await Address
      .find({ userId })
      .sort({ createdAt: -1 });
    res.json({
      message: "User address",
      userAddress: addresses[0] || null
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
