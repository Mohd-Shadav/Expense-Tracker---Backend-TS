import {Response} from "express"
import { AuthRequest } from "./requestInterface"
import categorySchema from "../models/categorySchema";

export const addCategory =async (req:AuthRequest,res:Response)=>{
    try{
        let {userId} = req.user;
        let {name,type,color,icon} = req.body

        let data = await categorySchema.create({
            name,type,color,icon,user:userId
        })

        if(data){
            return res.status(200).json({
                success:true
            })
        }

    }catch(err){
        return res.status(500).json({message:err})
    }

}