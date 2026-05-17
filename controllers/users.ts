import { Request,Response } from "express"
import userSchema from "../models/userSchema"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config()

export const signup =async (req:Request,res:Response)=>{
    try{
        // console.log(req.body)
        let {name,email,password,avatar} = req.body
        let user = await userSchema.findOne({email})
        

        if(user){
            return res.status(400).json({
  success: false,
  message: "User already exists"
});

        }


        bcrypt.genSalt(10,(err,salt)=>{
            if(err) return res.status(500).json("Internal Server Error")
            bcrypt.hash(password,salt,async(err,hash)=>{
        if(err) return res.status(500).json("Internal Server Error Hashing Failed")
            let user = await userSchema.create({name,email,password:hash,avatar});
        let token = jwt.sign({email},process.env.SECRETKEY as string)
        res.cookie("token", token, {
  httpOnly: true,
  expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
});
        })

        })

        // let data = await userSchema.create({name,email,})

    }catch(err){
        console.log(err)
        
        res.status(500).json({
            message:`Internal Server Error : ${err}`
        })
    }
}


