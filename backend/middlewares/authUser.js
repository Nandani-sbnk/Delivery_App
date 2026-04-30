import jwt from 'jsonwebtoken'


const authUser = async (req,res,next)=>{
    const {token} = req.cookies

    if(!token){
        return res.json({success:false , message :"Not Authorized"})
    }

    try{
        const tokenDecode = jwt.verify(token,process.env.JWT_SECRET)
        if(tokenDecode.id){
            req.userId = tokenDecode.id
        }else{
            return res.json({success:false ,message:"Not Authorized"})
        } 
        next()
    }catch(error){
        res.json({success:false ,message:error.message})
    }
}

export default authUser

// import jwt from "jsonwebtoken";

// const authUser = (req, res, next) => {
//     const { token } = req.cookies;

//     if (!token) {
//         return res.json({ success: false, message: "Not Authorized" });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

//         if (!decoded.id) {
//             return res.json({ success: false, message: "Not Authorized" });
//         }

//         req.body.userId = decoded.id; // ✅ correct place for your project

//         next();
//     } catch (error) {
//         return res.json({ success: false, message: error.message });
//     }
// };

// export default authUser;