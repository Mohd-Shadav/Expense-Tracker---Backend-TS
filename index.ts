import express, {Request,Response} from "express";
const app = express();
require('dotenv').config();
import userRoutes from "./routes/userRoutes"
import cors from "cors"

import connectDB from "./database/db"
import cookieParser from "cookie-parser";
connectDB();
app.use(cors({
    origin:["http://localhost:5173"],
      credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.get('/',(req:Request,res:Response)=>{
console.log("Hello")
res.send("sab sahi hai")
})

app.use('/user',userRoutes)

app.listen(3000,()=>{
console.log("port :",3000)
})