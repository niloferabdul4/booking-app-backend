import express from 'express'
import { fetchUserDetails ,deleteUser,updateUser,fetchAllUsers} from '../controllers/user.js'
import { verifyToken } from '../utils/verifyJWT.js'
const router=express.Router()

router.get('/:id',fetchUserDetails)
router.delete('/:id',deleteUser)
router.put('/:id',updateUser)
router.get('/',fetchAllUsers)
router.get('/checkAuthentication',verifyToken,(req,res,next)=>{
    res.send('You are logged in')
  })    // first verifyToken =>if success authenticate
export default router;