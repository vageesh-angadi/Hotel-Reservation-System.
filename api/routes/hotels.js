import express from 'express';
import { countByCity, countByType, createHotel, deleteHotel, getHotel, getHotels, updateHotel } from '../controller/hotelCont.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router=express.Router()
// router.get("/",(req,res)=>{
//     res.send("hotels route here")
// })
// POST
router.post("/",verifyAdmin,createHotel);
// UPDATE
router.put("/:id",verifyAdmin,updateHotel);
// DELETE
router.delete("/:id",verifyAdmin,deleteHotel)
// GET
router.get("/find/:id",getHotel); 
// GETALL
router.get("/",getHotels);
// COUNTBYCITY
router.get("/countByCity",countByCity);
// COUNTBYTYPE
router.get("/countByType",countByType);
export default router;