import express from 'express';
import {create, getAll} from '../controllers/note.js';
import {admin, protect} from '../config/authMiddleware.js'
import asyncHandler from '../config/asyncHandler.js';
const router = express.Router();

router.get('/', asyncHandler(getAll))
router.post('/create', asyncHandler(create))


export default router