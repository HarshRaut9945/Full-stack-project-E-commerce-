  import express from "express";
import { addToCart, clearCart, decreaseproductToQy, removeProductFromCart, useCart } from "../controllers/cart.js";
  
import { Authenticated } from "../Middlewares/Auth.js";
const router =express.Router();


//add to cart
router.post('/add',Authenticated,addToCart)

//get User Cart
router.get('/user',useCart)

// remove Product from cart
router.delete('/remove/:productId',Authenticated,removeProductFromCart)

//clear all cart
router.delete('/clear',Authenticated,clearCart)

// decrease item qty
router.post('/--qty',Authenticated,decreaseproductToQy)


  export default router;
