import express from 'express'
import { addProduct, deleteProduct, getproducts, getproductsByID, updateProduct } from '../controllers/product.js';
const router=express.Router();

//add product
router.post('/add',addProduct)

//get product
router.get('/all',getproducts)
// get product by id
router.get('/:id',getproductsByID)

//update product by id
router.put('/:id',updateProduct)

router.delete('/:id',deleteProduct)

export default router