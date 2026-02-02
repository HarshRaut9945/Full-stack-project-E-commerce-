import {User} from "../Models/User.js"
import bcrypt from  'bcryptjs'

export const register=async(req,res)=>{
    const{name,email,password}=req.body;
    try{
      let user =await User.findOne({email})
      if(user)
         return res.json({message:"User Already Exist",success:false})
      const hashpass=await bcrypt.hash(password,10)
      user =await User.create({name,email,password:hashpass})
      res.json({message:"User register sucessfuly...!",user,success:true})
    }catch(error){
      res.json({message:error.message})
    }
}

//user loging
export const login=async (req,res)=>{
  const {email,password}=req.body;
  try{
 let user =await User.findOne({email})
   if(!user) return res.json({message:"User Not Find",success:false})
      const validpassword=await bcrypt.compare(password,user.password)
    if(!validpassword)
       return res.json({message:"Invalid Credential",success:false})
    res.json({message:`Welcome ${user.name}`,success:true,user})
           
  } catch(error){
       res.json({message:error.message})
  }
}

// get all users
export const users=async(req,res)=>{
  try{
      let users=await User.find().sort({createdAt:-1});
      res.json(users);
  }catch(error){
     res.json({message:error.message})
  }
}

// get all user'S

