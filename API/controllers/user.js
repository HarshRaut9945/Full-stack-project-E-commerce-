import {User} from "../Models/User.js"
import bcrypt from  'bcryptjs'
import jwt from 'jsonwebtoken'

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
// export const login=async (req,res)=>{
//   const {email,password}=req.body;
//   try{
//  let user =await User.findOne({email})
//    if(!user) return res.json({message:"User Not Find",success:false})
//       const validpassword=await bcrypt.compare(password,user.password)
//     if(!validpassword)
//        return res.json({message:"Invalid Credential",success:false})

//     const token=jwt.sign({userId:user._id},"!@#$^&()",{
//       expiresIn:'365d'
//     })
//     res.json({message:`Welcome ${user.name}`,token,success:true})
           
//   } catch(error){
//        res.json({message:error.message})
//   }
// }

// USER LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false
      });
    }

    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
        success: false
      });
    }

    // generate token
    const token = jwt.sign(
      { userId: user._id },
      "!@#$^&()",
      { expiresIn: "365d" }
    );

    return res.status(200).json({
      message: `Welcome ${user.name}`,
      token,
      success: true
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false
    });
  }
};


// get all users
export const users=async(req,res)=>{
  try{
      let users=await User.find().sort({createdAt:-1});
      res.json(users);
  }catch(error){
     res.json({message:error.message})
  }
}

// get profile
export const profile=async(req,res)=>{
  res.json({user:req.user})
}

