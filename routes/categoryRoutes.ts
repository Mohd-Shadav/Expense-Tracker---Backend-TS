import express from "express"
import isLoggedIn from "../middleware/isLoggedIn";
import { AuthRequest } from "../controllers/requestInterface";
import { addCategory, deleteCategory, getCategories } from "../controllers/category";
const router = express.Router()

router.post('/addcategory',isLoggedIn,(req,res)=>addCategory(req as AuthRequest,res))

router.get("/getcategories",isLoggedIn,(req,res)=>getCategories(req as AuthRequest,res))

router.delete('/deletecategory',isLoggedIn,(req,res)=>deleteCategory(req as AuthRequest,res))



export default router;