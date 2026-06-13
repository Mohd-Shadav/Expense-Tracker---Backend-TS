import {Response} from "express"
import { AuthRequest } from "./requestInterface"
import categorySchema from "../models/categorySchema";

export const addCategory =async (req:AuthRequest,res:Response)=>{
    try{
        let {userId} = req.user;
        let {name,type,color,icon} = req.body
        let trimmedName =name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

        let cat = await categorySchema.findOne({name:trimmedName})

        if(cat){
            return res.status(400).json({
                message:"Category Already Exist"
            })
        }


      

        let data = await categorySchema.create({
            name:trimmedName,type,color,icon,user:userId
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

export const getCategories = async(req:AuthRequest,res:Response)=>{

    try{
        let {userId} = req.user
        

        let data = await categorySchema.find({user:userId})
        

        if(!data) return res.status(404).json({
            message:"Category Not found"
        })

        return res.status(200).json(data);

    }catch(Err){
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }

}

export const updateCategory = async (req:AuthRequest,res:Response)=>{
    try{
        let {userId} = req.user;
        let {_id,name,type,color,icon} = req.body;
        // console.log(req.body)

        let category = await categorySchema.findOneAndUpdate({user:userId,_id:_id},{
            name,
            type,
            color,
            icon

        },{returnDocument:"after"})

       

         if(!category) return res.status(400).json({message:"Not Found"})

        return res.status(200).send("Done")


    }catch(error){
        alert(error)
    }
}

export const deleteCategory = async (req:AuthRequest,res:Response)=>{
  
    try{
        let {userId} = req.user
        let {id} = req.body;
        
        
        
        let data = await categorySchema.deleteOne({user:userId,_id:id});

        if(!data) return res.status(404).json({message:"Category Not Found"})

            return res.status(200).json({
                success:true
            })

    }catch(err){
        return res.status(500).json({
            message:err
        })
    }
}