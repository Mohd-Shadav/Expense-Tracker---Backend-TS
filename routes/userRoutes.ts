import express from "express";
import { authentication, login, logout, signup } from "../controllers/users";
import isLoggedIn from "../middleware/isLoggedIn";

const router = express.Router();


router.post('/signup',signup);
router.post('/login',login)
router.get('/auth',isLoggedIn,authentication)
router.get('/logout',logout)


export default router;