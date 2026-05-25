import { Request,Response } from "express"
import transactionSchema from "../models/transactionSchema";
import categorySchema from "../models/categorySchema";
import { AuthRequest } from "./requestInterface";
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
    

    let data = await transactionSchema.find({user:userId}).populate("category")
    

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



    let transaction = await transactionSchema.findOneAndUpdate({_id,user:userId},{title,amount,type,category,paymentMethod,date,notes},{new:true});

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