import express from 'express';
import {createPost, updatePost, deletePost, findPost} from '../controllers/post.js';
const router = express.Router();

router.get('/:id', findPost)

router.post('/new', createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

export default router