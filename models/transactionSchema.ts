import mongoose,{Schema,Document, Types} from "mongoose"

export interface ITransaction extends Document{
    user:Types.ObjectId,
    title:string,
    amount:number,
    type:"income" | "expense",
    category:Types.ObjectId,
    notes?:string,
    date:Date,
    paymentMethod?:"UPI"|"cash"|"bank"|"card",
    createdAt:Date

}

const transactionSchema = new Schema<ITransaction>(
    {
        user:{
            type:Schema.Types.ObjectId,
            ref:"user",
            required:true,

        },
        title:{
            type:String,
            required:true

        },
        amount:{
            type:Number,
            required:true
        },
        type:{
            type:String,
            enum:["income","expense"],
            required:true
        },
        category:{
            type:Schema.Types.ObjectId,
            ref:"category",
            required:true
        },
        notes:{
            type:String
        },
        date:{
            type:Date,
            default:Date.now
        },
        paymentMethod: {
      type: String,
      enum: ["cash", "upi", "bank", "card"],
      default: "cash",
    },
  },
  {
    timestamps: true,
  }

    
)

export default mongoose.model<ITransaction>("transaction",transactionSchema)