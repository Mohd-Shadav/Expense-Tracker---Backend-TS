import express from "express"
import { addTransaction, deleteTransaction, getTransactions, updateTransaction } from "../controllers/transaction";
import isLoggedIn from "../middleware/isLoggedIn";
import { AuthRequest } from "../controllers/requestInterface";
const router = express.Router();

router.post('/addtransaction',isLoggedIn,(req, res) => addTransaction(req as AuthRequest, res))

router.get('/gettransactions',isLoggedIn,(req,res)=>{
    getTransactions(req as AuthRequest,res)
})

router.put('/updatetransaction',isLoggedIn,(req,res)=>updateTransaction(req as AuthRequest,res))

router.delete('/deleteTransaction',isLoggedIn,(req,res)=>deleteTransaction(req as AuthRequest,res))

export default router;