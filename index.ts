import express, {Request,Response} from "express";
const app = express();

app.get('/',(req:Request,res:Response)=>{
console.log("Hello")
res.send("sab sahi hai")
})

// app.use('/addtransaction')

app.listen(3000,()=>{
console.log("port :",3000)
})