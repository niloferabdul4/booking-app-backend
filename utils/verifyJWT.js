
import { createError } from "./error.js"
import jwt from 'jsonwebtoken'

export const verifyToken =  (req, res, next) => {
    const token = req.cookies.access_token

    /**** if no token  ******/
    //console.log(token)
    if (!token) {
        return next(createError(401, 'You are not authenticated'))
    }

    /******  verify token is valid  ***********/
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) 
        {
            return next(createError(403, 'Token is not valid'))
        }
        req.user = user
        next()      // do next operation(ie; authenticate controller)

    })



}