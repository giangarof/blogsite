import express from 'express';
import {create, getAll, updateNote, deleteNote, getOneById} from '../controllers/note.js';
import {admin, protect} from '../config/authMiddleware.js'
import asyncHandler from '../config/asyncHandler.js';
const router = express.Router();

router.get('/', asyncHandler(getAll))
router.post('/new', asyncHandler(create))

router.get('/:id', asyncHandler(getOneById))

router.put('/:id', asyncHandler(updateNote))
router.delete('/:id', asyncHandler(deleteNote))

export default router