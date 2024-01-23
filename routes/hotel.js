import express from 'express'
import { addHotel,updateHotel,getHotelDetails,deleteHotel,fetchAllHotels } from '../controllers/hotel.js'
const router=express.Router()

router.post ('/add',addHotel)
router.put('/:id',updateHotel)
router.delete('/:id',deleteHotel)
router.get('/:id',getHotelDetails)
router.get('/',fetchAllHotels)


export default router;