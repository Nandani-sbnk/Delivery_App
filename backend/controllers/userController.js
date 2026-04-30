import User from "../models/User.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists"
      });
    }
    const hashPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
  name,
  email,
  password: hashPassword,
  cartItems: {}  
});

    const token= jwt.sign({id:user._id}, process.env.JWT_SECRET,{expiresIn:'7d'})

    res.cookie('token',token ,{
        httpOnly:true,
        secure: process.env.NODE_ENV === 'production',

        sameSite:process.env.NODE_ENV === 'production'?'none':'strict',

        maxAge: 7*24*60*60*1000
    })
    const userResponse = {
      
      name: user.name,
      email: user.email,
    };
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: userResponse
    });

  } catch (error) {
    console.error("Register Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

export const login = async (req,res)=>{
  try{
    const {email , password} = req.body

    if(!email || !password){
      return res.json({success:false , message: "Email and password are required"})
    }  
    const user = await User.findOne({email})

    if(!user){
      return res.json({success:false ,message:"Invalid email or password"})
    }

    const isMatch = await bcrypt.compare(password,user.password)

    if(!isMatch){
      return res.json({success:false ,message:"Invalid email or password"})
    }

    const token= jwt.sign({id:user._id}, process.env.JWT_SECRET,{expiresIn:'7d'})

    res.cookie('token',token ,{
        httpOnly:true,
        secure: process.env.NODE_ENV === 'production',

        sameSite:process.env.NODE_ENV === 'production'?'none':'strict',

        maxAge: 7*24*60*60*1000
    })
    const userResponse = {
      
      name: user.name,
      email: user.email,
    };
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: userResponse
    });

    }catch(error){
      console.error("Register Error:", error.message);
      res.status(500).json({
      success: false,
      message: "Server error"
    });
    }
  }

// export const isAuth = async(req,res)=>{
//   try{
//     const {userId} = req.body
//     const user = await User.findById(userId).select("password")

//     return res.json({success:true ,user})
//   }catch(error){
//     console.log(error.message)
//     res.json({success:false, message:error.message})
//   }
// }

export const isAuth = async(req,res)=>{
  try{
    const userId = req.userId   

    const user = await User.findById(userId).select("-password")

    return res.json({success:true ,user})
  }catch(error){
    console.log(error.message)
    res.json({success:false, message:error.message})
  }
}

export const logout = async(req,res)=>{
  try{
    res.clearCookie('token',{
      httpOnly:true,
      secure:process.env.NODE_ENV === 'production',
      sameSite :process.env.NODE_ENV ==="production"?"none":"strict"
    })
    return res.json({success:true,message:"Logged out"})
  }catch(error){
    console.log(error.message)
    res.json({success:false,message:error.message})
  }
}