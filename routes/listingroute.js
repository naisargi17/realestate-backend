import { createListing, deleteListing, updateListing, getListing, getListings } from '../controller/listingcontroller.js';
import { verifyToken } from '../utils/verifyUser.js';
import express from 'express';
const router = express.Router();

router.post('/create' ,createListing);
router.delete('/delete/:id', verifyToken, deleteListing);
router.post('/update/:id', verifyToken,updateListing);
router.get('/get/:id', getListing);
router.get('/get', getListings);

export default router;