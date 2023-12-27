import User from "../models/User.js"
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js";
import jwt  from "jsonwebtoken";
export const register=async (req,res,next)=>{
    try{
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt); // encrypt the password , req.body has the data recieved from the route.
        const newUser= new User({
            username:req.body.username,
            email:req.body.email,
            password:hash
        })
        await newUser.save();
        res.status(200).json("new User registered")
    }catch(error){
        next(error);
    }
}

export const login=async (req,res,next)=>{
    try{
        const user=await User.findOne({username:req.body.username});
        if(!user) return next(createError(404,"user not found"));
        const isPasswordCorrect=bcrypt.compareSync(req.body.password, user.password);
        if(!isPasswordCorrect) return next(createError(400,"password is wrong"));
        const token=jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT); // create a token with id, isAdmin i.e. only limited information is stored.
        const {password, isAdmin, ...otherDetails}=user._doc;
        res.cookie("access_token",token,{ // send token before json
            httpOnly:true    // this does not allow any client secrete to reach this cookie
        }).status(200).json({otherDetails});
    }catch(error){
        next(error);
    }
}
