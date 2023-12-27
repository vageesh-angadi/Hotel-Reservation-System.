import express from 'express';
import { deleteUser, getUser, getUsers, updateUser } from '../controller/userCont.js';
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js';

const router=express.Router()

// router.get("/",(req,res)=>{
//     res.send("hotels route here")
// })

// router.get("/checkAuthentication",verifyToken,(req,res,next)=>{
//     res.send("you are logged in");
// })
// router.get("/checkUser/:id",verifyUser,(req,res,next)=>{
//     res.send("you are logged and can delete your account");
// })
// router.get("/checkAdmin/:id",verifyAdmin,(req,res,next)=>{
//     res.send("Hello Admin, you are logged and can delete any account");
// })

// UPDATE
router.put("/:id",verifyUser,updateUser);   // to update user info
// DELETE
router.delete("/:id",verifyUser,deleteUser)   // to delete user info
// GET
router.get("/:id",verifyUser,getUser);   // to get the particular user info
// GETALL
router.get("/",verifyAdmin,getUsers);     // to get all user info
export default router;