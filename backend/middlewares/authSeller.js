// import jwt from 'jsonwebtoken'

// const authSeller = async( req,res ,next)=>{
//     const {sellerToken} = req.cookies

//     if(!sellerToken){
//         return res.json({success:false ,message:"Not Authorized"})

//     }

//     try{
//         const tokenDecode = jwt.verify(sellerToken,process.env.JWT_SECRET)

//         if (tokenDecode.email) {
//           req.body.sellerEmail = tokenDecode.email;
//         } else {
//           return res.json({ success: false, message: "Not Authorized" });
//         }
//         next()
//     }catch(error){
//         res.json({success:false,message:error.message})
//     }
// }

// export default authSeller

import jwt from 'jsonwebtoken'

const authSeller = (req, res, next) => {
    try {
        const { sellerToken } = req.cookies

        if (!sellerToken) {
            return res.json({ success: false, message: "Not Authorized" })
        }

        const decoded = jwt.verify(sellerToken, process.env.JWT_SECRET)

        
        req.seller = {
            email: decoded.email
        }

        next()

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export default authSeller