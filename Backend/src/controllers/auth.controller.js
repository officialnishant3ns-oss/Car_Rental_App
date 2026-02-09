import User from "../models/user.models.js"
import jwt from "jsonwebtoken"

const Register = async (req, res) => {
    try {
        const { fullname, email, password } = req.body
        if (!fullname || !email || !password) {
            return res.status(400).json({ message: "Something is Missing {email,password,Fullname}" })
        }
        const userExist = await User.findOne({ email })
        if (userExist) {
            return res.status(400).json({ message: "user already exist go For Login" })
        }
        const user = await User.create({
            fullname: fullname,
            email: email,
            password: password
        })
        const createdUser = await User.findById(user._id).select("-otp -password")
        if (!createdUser) {
            return res.status(500).json({ message: "Something went wrong creating the user" })
        }
        return res.status(200).json({ success: true, message: "User Register successfully", user: createdUser })

    } catch (error) {
        console.error("Register Error::", error)
        return res.status(500).json({success: true, message: "Something went wrong while Registering User" })
    }
}
const Login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: "Something is Missing {email,password}" })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "User Don't exist go For Register" })
        }
        const validpassword = await user.isPassword(password)
        if (!validpassword) {
            return res.status(400).json({ message: "Password not valid" })
        }
        const Token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRETE, { expiresIn: process.env.TOKEN_EXPIRY })

        const createdUser = await User.findById(user._id).select("-password")
        if (!createdUser) {
            return res.status(500).json({ message: "Something went wrong creating the user" })
        }
        const options = {
            httpOnly: true,
            secure: true
        }
        return res
            .status(200)
            .cookie("Token", Token, options)
            .json({
                success: true,
                message: "User signed in successfully",
                user: createdUser,
                Token
            })

    } catch (error) {
        console.error("Register Error::", error)
        return res.status(500).json({ message: "Something went wrong while Login User" })

    }
}
const Logout = async (req, res) => {
    try {
  
         const options = {
            httpOnly: true,
            secure: true
        }
        return res.status(200).clearCookie("Token", options)
            .json({   success: true,message: "User SignOut Successfully" }
            )


    } catch (error) {
        console.error("Register Error::", error)
        return res.status(500).json({ message: "Something went wrong while Login User" })

    }
}
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password -createdAt -updatedAt -__v')
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    return res.status(200).json({
      message: "User fetched successfully",
      user
    })

  } catch (error) {
    console.error("Get User Error:", error);
    return res.status(500).json({ message: "Server error while fetching user" })
  }
}



export { Register, Login,Logout,getUser }