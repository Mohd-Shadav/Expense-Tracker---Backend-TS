import express, {Request,Response} from "express";
const app = express();
require('dotenv').config();
import userRoutes from "./routes/userRoutes"

import connectDB from "./database/db"
connectDB();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/',(req:Request,res:Response)=>{
console.log("Hello")
res.send("sab sahi hai")
})

app.use('/user',userRoutes)

app.listen(3000,()=>{
console.log("port :",3000)
})