import mongoose,{Schema,Document, Types} from "mongoose"

export interface ICategory extends Document{
    user:Types.ObjectId,
    name:string,
    type:"income"|"expense"|"prefer no to say",
    color?:string,
    icon?:string
}
const categorySchema = new Schema<ICategory>(
    {
        user:{
            type:Schema.Types.ObjectId,
            ref:"user",
            required:true,


        }  ,
         name: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },

    color: {
      type: String,
      default: "#000000",
    },

    icon: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model<ICategory>("Category",categorySchema)