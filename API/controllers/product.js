import {Products} from "../Models/Product.js"
import bcrypt from  'bcryptjs'

//add product
 export const addProduct=async(req,res)=>{
    const {title,description,price,category,qty,imgSrc} = req.body
    try{
        let product=await Products.create({
            title,
            description,
            price,
            category,
            qty,
            imgSrc,
        });
         res.json({message:'Product added sucessfully..!',product})
    }catch(error){
        res.json(error.message)
    }
 }

 // gett product

export const getproducts = async (req, res) => {
  try {
    let products = await Products.find().sort({ createdAt: -1 });
    res.json({ message: "All Products", products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Find product by id

export const getproductsByID = async (req, res) => {
  const { id } = req.params; // get product ID from URL
  try {
    const product = await Products.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Specific found", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const updateProduct = async (req, res) => {
  const { id } = req.params; // Product ID
  const { title, description, price, category, qty, imgSrc } = req.body;
  try {
    // Find product by ID and update
    const updatedProduct = await Products.findByIdAndUpdate(
      id,
      { title, description, price, category, qty, imgSrc },
      { new: true, runValidators: true } // return the updated doc & validate schema
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Products.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
