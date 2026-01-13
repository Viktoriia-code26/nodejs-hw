// src/routes/notesRoutes.js

import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  getAllNotes,
  getNoteById,
  createNote,
  deleteNote,
  updateNote,
} from '../controllers/notesController.js';
import {
  noteIdSchema,
  updateNoteSchema,
  createNoteSchema,
  getAllNotesSchema,
} from '../validations/notesValidation.js';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.use('/notes', authenticate);

router.post('/notes', celebrate(createNoteSchema), createNote);
router.get('/notes', celebrate(getAllNotesSchema), getAllNotes);
router.delete('/notes/:noteId', celebrate(noteIdSchema), deleteNote);
router.get('/notes/:noteId', celebrate(noteIdSchema), getNoteById);
router.patch('/notes/:noteId', celebrate(updateNoteSchema), updateNote);

export default router;
