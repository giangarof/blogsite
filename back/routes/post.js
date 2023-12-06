import express from 'express';
import {createPost, updatePost, deletePost, findPost, getAll} from '../controllers/post.js';
import {multerPost} from '../config/multer.js'
const router = express.Router();

router.get('/', getAll)
router.get('/:id', findPost)

router.post('/new', multerPost, createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

export default router