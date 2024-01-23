import User from "../models/user.js"
import { createError } from "../utils/error.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const signup = async (req, res, next) => {
    try {

        const existingUser = await User.findOne({ email: req.body.email })
        if (existingUser) {
            next(createError(404, 'User Already Exist'))
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 8);

        const newUser = await new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })
        await newUser.save()
        res.status(200).json(newUser)
    }
    catch (error) {
        next(error)
    }


}


export const login = async (req, res, next) => {
    try {

        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            next(createError('400', 'User Not Found'))
        }
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if (!isPasswordCorrect) {
            return next(createError(400, 'Wrong Password'))
        }

        //hide the user info in jsonwebtoken and store as a cookie
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET)
        const { password, isAdmin, ...otherDetails } = user._doc

        res.cookie('access_token', token, { httpOnly: true})                     // send token to cookie named 'access-token'
            .status(200)
            .json({ details: { ...otherDetails }, isAdmin });
    }
    catch (error) {
        next(error)
    }
}

