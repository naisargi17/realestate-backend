import express from "express";
import { test } from "../controller/usercontroller.js";
import { verifyToken } from "../utils/verifyUser.js";
import { updateUser,deleteUser,getUserListings,getUser } from "../controller/usercontroller.js";

const router = express.Router();

router.get('/test',test);
router.post('/update/:id', verifyToken,updateUser)
router.delete('/delete/:id', verifyToken,deleteUser)
router.get('/listings/:id', verifyToken, getUserListings)
router.get('/:id', verifyToken, getUser)
export default router;