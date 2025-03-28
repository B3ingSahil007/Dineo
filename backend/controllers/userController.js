import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
import validator from 'validator'

// const createToken = (id) => {
//     return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: '100d' })
// }
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY)
}

const comparePassword = async (enteredPassword, comparePassword) => {
    return await bcrypt.compare(enteredPassword, comparePassword)
}

// User Log-In
const userLogIn = async (req, res) => {
    const { email, password } = req.body
    try {
        const userExist = await userModel.findOne({ email })
        if (!userExist) {
            return res.status(400).json({ success: false, message: 'User Not Found, Please Sign-Up First' })
        }

        const isPasswordMatch = await comparePassword(password, userExist.hashedPassword)
        if (isPasswordMatch) {
            const token = createToken(userExist._id)
            return res.status(200).json({ success: true, data: "User Login Successful", token })
        } else {
            res.status(401).json({ success: false, message: "Invalid E-Mail Or Password" })
        }

    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: "Internal Server Error !! - User Log-In" })
    }
}

// All Users
const listUserInfo = async (req, res) => {
    try {
        const users = await userModel.find({})
        res.status(201).json({ success: true, data: users })

    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: "Internal Server Error, Getting Users List!!" })
    }
};

// User Sign-Up
const userSignUp = async (req, res) => {
    const { firstname, lastname, mobileNumber, email, password, confirmPassword } = req.body
    try {
        const userExist = await userModel.findOne({ email })
        if (userExist) {
            console.log("Registered E-Mail Is Already Exists :", email);
            res.status(400).json({ status: false, message: "Registered E-Mail Is Already Exists", email })
        }

        if (!validator.isEmail(email)) {
            console.log("E-Mail Is Not Correct, Please Enter A Valid E-Mail :", email);
            return res.status(400).json({ success: false, message: "E-Mail Is Not Correct, Please Enter A Valid E-Mail" })
        }

        if (password.length < 8) {
            console.log("Please Enter Password More Than 8 Characters");
            return res.status(400).json({ success: false, message: "Please Enter Password More Than 8 Characters" })
        }

        if (password !== confirmPassword) {
            console.log("Passwords Do Not Match, Enter Correct Password");
            return res.status(400).json({ success: false, message: "Passwords Do Not Match, Enter Correct Password" });
        }

        const saltRound = 10
        const hashedPassword = await bcrypt.hash(password, saltRound)

        const userCreated = await userModel.create({ firstname, lastname, email, mobileNumber, password, confirmPassword, hashedPassword })
        const token = createToken(userCreated._id)
        res.status(201).json({ success: true, message: "User Created Successfully, Please Log-In", userCreated, token })
        // console.log(req.body);

    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: "Internal Server Error !! - User Sign-Up" })
    }
}

export { userSignUp, userLogIn, listUserInfo }
