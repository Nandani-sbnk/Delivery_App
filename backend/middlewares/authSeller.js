
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