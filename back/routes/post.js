import express from 'express';
import {createPost, updatePost, deletePost, findPost, getAll} from '../controllers/post.js';
import {admin, protect} from '../config/authMiddleware.js'
import asyncHandler from '../config/asyncHandler.js';
import {multerPost} from '../config/multer.js'
const router = express.Router();

router.get('/', asyncHandler(getAll))
router.get('/:id', findPost)

router.post('/new', protect, admin, multerPost, createPost);
router.put('/:id', protect, admin, multerPost, updatePost);
router.delete('/:id', protect, admin, deletePost);

export default router