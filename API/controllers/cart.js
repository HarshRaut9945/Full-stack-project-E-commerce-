import { Cart } from "../Models/Cary.js";

//
export const addToCart = async (req, res) => {
  // Destructure product details coming from request body
  const { productId, title, price, qty, imgSrc } = req.body;

  // TEMP: hardcoded userId (later replace with req.user._id from auth)
  const userId = "697f98bab461b951d36b8d56";

  try {
    // 1️⃣ Check if cart already exists for this user
    let cart = await Cart.findOne({ userId });

    // 2️⃣ If cart does NOT exist, create a new one
    if (!cart) {
      cart = new Cart({
        userId,
        items: [], // start with empty items array
      });
    }

    // 3️⃣ Check if the product is already present in cart
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    // 4️⃣ If product already exists → increase quantity
    if (itemIndex > -1) {
      cart.items[itemIndex].qty += qty;
      cart.items[itemIndex].price+=price*qty
    } 
    // 5️⃣ If product is new → push into cart items
    else {
      cart.items.push({
        productId,
        title,
        price,   // unit price (do NOT change later)
        qty,
        imgSrc,
      });
    }

    // 6️⃣ Save cart to MongoDB
    await cart.save();

    // 7️⃣ Send success response
    res.status(201).json({
      message: "Product added to cart",
      cart,
    });

  } catch (error) {
    // 8️⃣ Handle server / database errors
    res.status(500).json({
      message: error.message,
    });
  }
};

// get Useer Cart
export const useCart=async(req,res)=>{
      const userId = "697f98bab461b951d36b8d56";

      let cart=await Cart.findOne({userId});
      if(!cart) return res.json({message:'Cart not found'})
        res.json({message:"user cart",cart})
}

// Remove product from cart
export const removeProductFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    // Temporary hardcoded userId (later replace with JWT user id)
    const userId = "697f98bab461b951d36b8d56";
    // Find user's cart
    const cart = await Cart.findOne({ userId });
    // If cart does not exist
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    // Filter out the product to be removed
    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );
    // Save updated cart
    await cart.save();
    // Send success response
    res.status(200).json({
      message: "Product removed from cart successfully",
      cart,
    });
  } catch (error) {
    // Handle unexpected errors
    res.status(500).json({ message: error.message });
  }
};


// Clear entire cart
export const clearCart = async (req, res) => {
  try {
    const userId = "697f98bab461b951d36b8d56";
    // Find user's cart
    let cart = await Cart.findOne({ userId });
    // If cart does not exist, create a new empty cart
    if (!cart) {
      cart = new Cart({
        userId,
        items: [], // empty cart
      });
    } else {
      // If cart exists, clear all items
      cart.items = [];
    }
    // Save cart to database
    await cart.save();
    // Send response
    res.status(200).json({
      message: "Cart cleared successfully",
      cart,
    });
  } catch (error) {
    // Handle unexpected server errors
    res.status(500).json({ message: error.message });
  }
};


// Decrease product quantity in cart
export const decreaseproductToQy = async (req, res) => {
  const { productId } = req.body;
  const userId = "697f98bab461b951d36b8d56";
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    // 3️⃣ Find product index in cart
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );
    // 4️⃣ If product not found in cart
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }
    // 5️⃣ If quantity is more than 1 → decrease qty
    if (cart.items[itemIndex].qty > 1) {
      cart.items[itemIndex].qty -= 1;
    } 
    // 6️⃣ If quantity becomes 1 → remove product from cart
    else {
      cart.items.splice(itemIndex, 1);
    }
    // 7️⃣ Save updated cart
    await cart.save();

    // 8️⃣ Send response
    res.status(200).json({
      message: "Product quantity decreased",
      cart,
    });

  } catch (error) {
    // 9️⃣ Handle errors
    res.status(500).json({ message: error.message });
  }
};
