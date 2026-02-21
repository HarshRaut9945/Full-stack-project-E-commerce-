import express from "express";
import mongoose from "mongoose";
import bodyParser from 'express'
import userRouter from './Routes/user.js'
import productRouter from './Routes/product.js'
import cartRouter from './Routes/Cart.js'
import adressRouter from './Routes/address.js'

import cors from 'cors'

const app = express();
app.use(bodyParser.json())

app.use(cors({
  origin:true,
  methods:["GET","POST","PUT","DELETE"],
  credentials:true
}))

// home testing route
app.get('/',(req,res)=>res.json({message:'This is Home Route'}))

//use Router
app.use('/api/user',userRouter)

//product Router
app.use('/api/product',productRouter)

// cart Router
app.use('/api/cart',cartRouter)

//adress router
app.use('/api/address',adressRouter)

mongoose
  .connect(
    "mongodb+srv://harshraut9945_db_user:Lucylu%4012@cluster0.cscsmrp.mongodb.net/Mern_Ecomerce"
  )
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.error(err));

const port = 1000;
app.listen(port, () =>
  console.log(`Server is running on port ${port}`)
);
