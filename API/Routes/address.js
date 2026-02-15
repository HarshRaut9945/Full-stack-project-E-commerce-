import express from 'express'
import { addAdress } from '../controllers/address.js';
import { Authenticated } from '../Middlewares/Auth.js';

const router=express.Router()

router.post('/add',Authenticated,addAdress)
export default router;