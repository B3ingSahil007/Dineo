import jwt from 'jsonwebtoken'

// authMiddleware.js me debug add karo
const nativeauthMiddleware = async (req, res, next) => {
    const { token } = req.headers
    if (!token) {
        return res.json({ success: false, message: "Not Authorized, Login Again" })
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET_KEY)
        console.log("🔐 User ID from token:", token_decode.id);
        
        // ✅ Dono jagah set karo
        req.body.userId = token_decode.id
        req.userId = token_decode.id; // Important for controllers
        
        next();
    } catch (error) {
        console.error("Token Verification Error :", error);
        res.json({ success: false, message: "Error: " + error.message })
    }
}
export default nativeauthMiddleware