
import jwt from "jsonwebtoken"
import User from "../models/user.models.js"


export const verifyJWT = async (req, res, next) => {
    try {
        const token = req.cookies?.Token || req.header("Authorization")?.replace("Bearer ", "")

        if (!token) {
            return res.status(401).json({ message: "Unauthorized request there" })
        }

        const decodedtoken = jwt.verify(token, process.env.TOKEN_SECRETE)

        const user = await User.findById(decodedtoken?._id).select(
            "-password"
        )
        if (!user) {
            return res.status(400).json({ message: "Invalid Access token" })
        }
        req.user = user
        next()
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        return res.status(401).json({ message: "Invalid or expired token" });
    }

}

export default verifyJWT
