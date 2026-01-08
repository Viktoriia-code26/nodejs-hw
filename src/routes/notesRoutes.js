// src/routes/notesRoutes.js

import { Router } from 'express';
import {
  getAllNotes,
  getNoteById,
  createNote,
  deleteNote,
  updateNote,
} from '../controllers/notesController.js';

const router = Router();
router.post('/notes', createNote);
router.get('/notes', getAllNotes);
router.delete('/notes/:noteId', deleteNote);
router.get('/notes/:noteId', getNoteById);
router.patch('/notes/:noteId', updateNote);
export default router;
