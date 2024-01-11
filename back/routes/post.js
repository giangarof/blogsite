import express from 'express';
import {createPost, updatePost, deletePost, findPost, getAll} from '../controllers/post.js';
import {admin, protect, auth} from '../config/authMiddleware.js'
import {multerPost} from '../config/multer.js'
const router = express.Router();

router.get('/', auth, getAll)
router.get('/:id', findPost)

router.post('/new', protect, admin, multerPost, createPost);
router.put('/:id', multerPost, updatePost);
router.delete('/:id', deletePost);

export default router