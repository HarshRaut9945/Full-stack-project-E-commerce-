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

//Remove Product
export const removeProductFromcart=
