import express from 'express'
import { login, register, users } from '../controllers/user.js';

const router=express.Router();


// register user
router.post('/register',register)  // /api.user/register

//login user
router.post('/login',login)  

//get all user
router.get('/all',users)  


export default router