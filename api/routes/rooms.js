import express from 'express';
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom } from '../controller/roomCont.js';
import { verifyAdmin } from '../utils/verifyToken.js';
const router=express.Router()

// router.get("/",(req,res)=>{
//     res.send("rooms route here")
// })

// router.get("/",(req,res)=>{
//     res.send("hotels route here")
// })
// POST
router.post("/:hotelid",verifyAdmin,createRoom);
// UPDATE
router.put("/:id",verifyAdmin,updateRoom);
// DELETE
router.delete("/:id/:hotelid",verifyAdmin,deleteRoom)
// GET
router.get("/:id",getRoom); 
// GETALL
router.get("/",getRooms);

export default router;