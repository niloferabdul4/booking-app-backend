import mongoose from 'mongoose';
import Hotel from '../models/hotel.js'

export const addHotel=async(req,res,next)=>{
    try{
    //const {hotelData}=req.body
    const newHotel=await new Hotel(req.body);
    newHotel.save()
    res.status(200).json(newHotel)
    }
 
        catch(error){
          next(error)
      
    }

}

export const deleteHotel = async (req, res,next) => {
    try {
      //  const {_id:id}=req.params
      await Hotel.findByIdAndDelete(req.params.id);
    //   if(!mongoose.Types.ObjectId.isValid(-id)){
    //     res.status(400).json({message:'Hotel Not Found'})
    //   }

      res.status(200).json("Hotel has been deleted.");
    } catch (err) {
  next(error)
    }
  };
  
export const updateHotel=async(req,res,next)=>{
    try{
   // const {hotelData}=req.body
    //const {id}=req.params;
    const updatedHotel= await Hotel.findByIdAndUpdate(
        req.params.id,
        { $set: req.body},
        { new: true }
      );
    res.status(200).json(updatedHotel)
    }
 
        catch(error){
         next(error)
      
    }

}

export const getHotelDetails=async(req,res,next)=>{
try{
//const {id}=req.params
const hotel = await Hotel.findById(req.params.id);
res.status(200).json(hotel);
}
 
catch(error){
    next(error)

}
}

export const fetchAllHotels=async(req,res,next)=>{
    try{
   
    const allHotels=await Hotel.find()
    console.log(allHotels)
    res.status(200).json(allHotels)
    }
 
        catch(error){
          next(error)
      
    }

}