  import express from "express";
import { addToCart, removeProductFromCart, useCart } from "../controllers/cart.js";
  const router =express.Router();


//add to cart
router.post('/add',addToCart)

//get User Cart
router.get('/user',useCart)

// remove Product from cart
router.delete('/remove/:productId',removeProductFromCart)

//clear all cart

  export default router;
