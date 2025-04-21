import express from 'express';
import {admin, protect} from '../config/authMiddleware.js'
import asyncHandler from '../config/asyncHandler.js';
import {multerPost} from '../config/multer.js'
const router = express.Router();

import { PostController } from '../controllers/post.js';
const post = new PostController();

router.get('/', asyncHandler(post.getAll))
router.get('/:id', post.findPost)

router.post('/new', protect, admin, multerPost, post.createPost);
router.put('/:id', protect, admin, multerPost, post.updatePost);
router.delete('/:id', protect, admin, post.deletePost);

export default router