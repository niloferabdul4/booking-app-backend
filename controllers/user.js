import User from '../models/user.js'
import { createError } from '../utils/error.js'

/******* Get User Details  ***********/

export const fetchUserDetails = async (req, res, next) => {
    try {
        const currentUser = await User.findById(req.params.id)
        res.status(200).json(currentUser)
    }
    catch (error) {
        next(error)
    }
}


/******* Delete User  ***********/

export const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json({message:'User Deleted'})
    }
    catch (error) {
        next(error)
    }
}


/******* Update User  ***********/

export const updateUser = async (req, res, next) => {
    try {
        const updatedUser=await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedUser)
    }
    catch (error) {
        next(error)
    }
}

/******* Get All User  Details  ***********/

export const fetchAllUsers = async (req, res, next) => {
    try {
        const users=await User.find()
        res.status(200).json(users)
    }
    catch (error) {
        next(error)
    }
}

