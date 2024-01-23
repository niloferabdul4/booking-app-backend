import express from 'express'
import { signup,login} from '../controllers/auth.js'

const router=express.Router()

router.post ('/login',login)
router.post('/signup',signup)


export default router;
