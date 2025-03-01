import jwt from 'jsonwebtoken'

const authMiddleware = async (req, res, next) => {
    const { token } = req.headers
    if (!token) {
        // console.log("Not Authorized, Login Again");
        return res.json({ success: false, message: "Not Authorized, Login Again" })
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.body.userId = token_decode.id
        next();

    } catch (error) {
        console.error("Token Verification Error :", error);
        res.json({ success: false, message: "Internal Server Error During Token Verification." + error.message })
    }
}

export default authMiddleware