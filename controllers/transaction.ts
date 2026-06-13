import { Request,Response } from "express"
import transactionSchema from "../models/transactionSchema";
import categorySchema from "../models/categorySchema";
import { AuthRequest } from "./requestInterface";
import mongoose from "mongoose";
export const addTransaction =async (req:AuthRequest,res:Response)=>{

    try{
       
        let {userId} = req.user

        


        const {title,amount,category,type,date,notes,paymentMethod} = req.body;
        
        
   
          const categoryDoc = await categorySchema.findOne({
  name:category
});


if (!categoryDoc) {
  return res.status(404).json({
    message: "Category not found",
  });
}



const transaction = await transactionSchema.create({
  title,
  amount,
  category: categoryDoc._id,
  type,
  paymentMethod,
  date,
  notes,
  user: userId,
});

if(transaction){
    return res.status(200).json({
        success:true
    })
}
        

    }catch(err){
        return res.status(500).json({
            message:err
        })

    }
    

}

export const getTransactions = async (req:AuthRequest,res:Response)=>{

  try{
    let {userId} = req.user
    

    let data = await transactionSchema.find({user:userId}).populate("category").sort({createdAt:-1})
    

    if(!data) return res.status(404).json({message:"Not Found"})

    

    return res.status(200).json(data);
    


  }catch(error){
    return res.status(500).json({
        message:error
    })

  }
}

  export const updateTransaction = async(req:AuthRequest,res:Response)=>{
    try{
      let {userId} = req.user;
      let {_id,title,amount,type,category,paymentMethod,date,notes} = req.body

      
      let categoryName = await categorySchema.findOne({name:category});
      
      if(!categoryName){
   return res.status(400).json({
      message:"Category Not Found"
   })
}
    
    



      let transaction = await transactionSchema.findOneAndUpdate({
      _id,
      user:userId
    },{title,amount,type,category:categoryName?._id,paymentMethod,date,notes},{returnDocument:"after"});

      
      if(!transaction) return res.status(400).json({message:"Not Found"})

        return res.status(200).send("Done")

    }catch(Err){
      return res.status(500).json({message:Err})
    }
  }

export const deleteTransaction = async (req:AuthRequest,res:Response)=>{
  try{

    let {userId} = req.user;
    let {id} = req.body;
    let data = await transactionSchema.deleteOne({_id:id,user:userId})
    if(!data) return res.status(404).json({
      message:"No Matched Transaction Found"
    })

    return res.status(200).json({
      success:true
    })

}catch(err){
    return res.status(500).json({
      message:err
    })
  }
}


export const getTransactionAmount = async(req:AuthRequest,res:Response)=>{
  try{

    let {userId} = req.user;

    let summary = await transactionSchema.aggregate([
      {
        $match:{
          user:new mongoose.Types.ObjectId(userId)
        }

      },
      {
        $group:{
          _id:null,
          totalIncome:{
            $sum:{
              $cond:[{$eq:["$type","income"]},"$amount",0]
            }
          },
          totalExpense:{
            $sum:{
              $cond:[{$eq:["$type","expense"]},"$amount",0]
            }
          },
          totalTransactions:{
            $sum:1
          }
        }

      },
      {
        $project:{
          _id:0,
          totalIncome:1,
          totalExpense:1,
          totalTransactions:1
        }

      }
    ])

    if(!summary) return res.status(404).json({message:"No Data found"})

    return res.status(200).json(summary);

  }catch(err){
    return res.status(500).json({
      message:"Internal Server Error"
    })
  }
}

export const getExpenseCategory =  async (req:AuthRequest,res:Response)=>{
  try{
    let {userId} = req.user

   
    let summary = await transactionSchema.aggregate([
      {
        $match:{
          user:new mongoose.Types.ObjectId(userId),
          type:"expense"
        }

      },
      {
        $group:{
          _id:"$category",
          totalExpense:{$sum:"$amount"}
        }

      },
      {
        $lookup:{
          from:"categories",
          localField:"_id",
          foreignField:"_id",
          as:"category"


        
        }

      },
      {
        $unwind:"$category"
      },
      {
        $project:{
          _id:0,
          category:"$category.name",
          totalExpense:1
        }
      }
    ])

    if(!summary) return res.status(404).json({message:"No Data Found"})

    return res.status(200).json(summary)
    
  }catch(err){
    return res.status(500).json({
      message:"Internal server error"
    })
  }
}

export const getRecentTransactions = async (req:AuthRequest,res:Response)=>{
   try{
    let {userId} = req.user 
    

    let data = await transactionSchema.find({user:userId}).populate("category").limit(5).sort({createdAt:-1})
    

    if(!data) return res.status(404).json({message:"Not Found"})

    

    return res.status(200).json(data);
    


  }catch(error){
    return res.status(500).json({
        message:error
    })

  }
}