import User from "../models/User.js";

// export const updateCart = async (req,res)=>{
//     try{
//         const { cartItems } = req.body   
//         const userId = req.userId       

//         await User.findByIdAndUpdate(userId ,{cartItems})

//         res.json({success :true, message:"Cart Updated"})
//         console.log("API HIT")
// console.log("req.userId:", req.userId)
// console.log("req.body:", req.body)
        
//     }catch(error){
//         console.log(error.message)
//         res.json({success:false,message:error.message})
//     }
// }

export const updateCart = async (req,res)=>{
    try{
        const { cartItems } = req.body
        const userId = req.userId

        if(!userId){
            return res.json({ success:false, message:"No userId" })
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { cartItems },
            { new: true }
        )

        console.log("UPDATED USER:", updatedUser)

        res.json({success :true, message:"Cart Updated"})
        
    }catch(error){
        console.log(error.message)
        res.json({success:false,message:error.message})
    }
}