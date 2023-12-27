import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"
import usersRoute from "./routes/users.js"
import cookieParser from "cookie-parser"
import cors from 'cors';
const app=express()
app.use(cors({ origin: 'http://localhost:3000' }));
dotenv.config()
// DB connection
const connect=async ()=>{
    try{
        await mongoose.connect(process.env.MONGO);
        console.log("connected to db");
    } catch(error) {
        throw error;
    }
}

mongoose.connection.on("disconnected",()=>{
    console.log("mongoDB disconnected");
})

mongoose.connection.on("connected",()=>{
    console.log("mongoDB connected");
})

// middlewares to handle any type of request to specified path
app.use(express.json())  // to send post,delete request from the route
app.use(cookieParser())   // loading the cookieParser middleware
app.use("/auth",authRoute)
app.use("/hotels",hotelsRoute)
app.use("/rooms",roomsRoute)
app.use("/users",usersRoute)

// app.use(cors()) // added extra

// error handling middleware must have these 4 Arguments
app.use((err,req,res,next)=>{
    const errorStatus=err.status || 500;
    const errorMessage=err.message || "Something went wrong"
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack
    });
    // return res.status(500).json("error from handler")
}) 

app.listen(8800,()=>{
    connect()
    console.log("server is running");
})