  import express from "express";
import { addToCart, useCart } from "../controllers/cart.js";
  const router =express.Router();


//add to cart
router.post('/add',addToCart)

//get User Cart
router.get('/user',useCart)

  export default router;
