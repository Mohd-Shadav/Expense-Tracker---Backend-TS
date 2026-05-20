import express from "express"
import { addTransaction, getTransactions } from "../controllers/transaction";
import isLoggedIn from "../middleware/isLoggedIn";
import { AuthRequest } from "../controllers/requestInterface";
const router = express.Router();

router.post('/addtransaction',isLoggedIn,(req, res) => addTransaction(req as AuthRequest, res))
router.get('/gettransactions',isLoggedIn,(req,res)=>{
    getTransactions(req as AuthRequest,res)
})


export default router;