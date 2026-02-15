import express from 'express'
import { addAdress, getAdress } from '../controllers/address.js';
import { Authenticated } from '../Middlewares/Auth.js';

const router=express.Router()
//add address
router.post('/add',Authenticated,addAdress)

//get address
router.get('/get',Authenticated,getAdress)

export default router;