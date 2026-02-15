import { Cart } from "../Models/Cary.js";

// Add to cart
export const addToCart = async (req, res) => {
  const { productId, title, price, qty, imgSrc } = req.body;
  const userId = req.user;   // ✅ from auth middleware

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [],
      });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].qty += qty;
      cart.items[itemIndex].price += price * qty;
    } else {
      cart.items.push({
        productId,
        title,
        price,
        qty,
        imgSrc,
      });
    }

    await cart.save();

    res.status(201).json({
      message: "Product added to cart",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get User Cart
export const useCart = async (req, res) => {
  const userId = req.user;   // ✅ fixed

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.json({ message: "User cart", cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove product
export const removeProductFromCart = async (req, res) => {
  const userId = req.user;   // ✅ fixed
  const { productId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();

    res.status(200).json({
      message: "Product removed",
      cart,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Clear cart
export const clearCart = async (req, res) => {
  const userId = req.user;   // ✅ fixed

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [],
      });
    } else {
      cart.items = [];
    }

    await cart.save();

    res.status(200).json({
      message: "Cart cleared",
      cart,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Decrease qty
export const decreaseproductToQy = async (req, res) => {
  const userId = req.user;   // ✅ fixed
  const { productId } = req.body;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Product not in cart" });
    }

    if (cart.items[itemIndex].qty > 1) {
      cart.items[itemIndex].qty -= 1;
    } else {
      cart.items.splice(itemIndex, 1);
    }

    await cart.save();

    res.status(200).json({
      message: "Quantity decreased",
      cart,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
