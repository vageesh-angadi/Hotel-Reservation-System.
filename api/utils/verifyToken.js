import  jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken=(req,res,next)=>{
    const token = req.cookies.access_token;
    if(!token){
        return next(createError(401,"you are not authenticated"));
    }
    // verify the token with the one present in env
    jwt.verify(token,process.env.JWT,(err,user)=>{
        if(err) return next(createError(403,"token is invalid!"));
        req.user=user;
        return next();
    })
}

export const verifyUser=(req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.id===req.params.id || req.user.isAdmin) {
            next();
        }else{
            if(err) return next(createError(403,"you are not authorised"));
        } 
    })
}

export const verifyAdmin=(req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if(req.user.isAdmin) {
            next();
        }else{
            if(err) return next(createError(403,"you are not authorised"));
        } 
    })
}