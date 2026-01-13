// src/controllers/notesController.js

import { Note } from '../models/note.js';
import createHttpError from 'http-errors';

export const getAllNotes = async (req, res, next) => {
  try {
    const pageNum = Number(req.query.page) || 1;
    const perPageNum = Number(req.query.perPage) || 10;
    const { tag, search } = req.query;

    const skip = (pageNum - 1) * perPageNum;

    let query = Note.find({ userId: req.user._id });

    if (tag) {
      query = query.where('tag').equals(tag);
    }

    if (typeof search === 'string') {
      const trimmed = search.trim();
      if (trimmed !== '') {
        query = query.where({ $text: { $search: trimmed } });
      }
    }

    const countQuery = query.clone();

    const [totalNotes, notes] = await Promise.all([
      countQuery.countDocuments(),
      query.skip(skip).limit(perPageNum),
    ]);

    const totalPages = Math.ceil(totalNotes / perPageNum);

    res.status(200).json({
      page: pageNum,
      perPage: perPageNum,
      totalNotes,
      totalPages,
      notes,
    });
  } catch (err) {
    next(err);
  }
};

export const getNoteById = async (req, res, next) => {
  const { noteId } = req.params;
  const note = await Note.findOne({ _id: noteId, userId: req.user._id });

  if (!note) {
    next(createHttpError(404, 'Note not found'));
    return;
  }
  res.status(200).json(note);
};
export const createNote = async (req, res) => {
  const newNote = await Note.create({ ...req.body, userId: req.user._id });
  res.status(201).json(newNote);
};

export const deleteNote = async (req, res, next) => {
  const { noteId } = req.params;
  const deletedNote = await Note.findOneAndDelete({
    _id: noteId,
    userId: req.user._id,
  });

  if (!deletedNote) {
    return next(createHttpError(404, 'Note not found'));
  }

  res.status(200).json(deletedNote);
};

export const updateNote = async (req, res, next) => {
  const { noteId } = req.params;
  const updatedNote = await Note.findOneAndUpdate(
    { _id: noteId, userId: req.user._id },
    req.body,
    {
      new: true,
    },
  );

  if (!updatedNote) {
    next(createHttpError(404, 'Note not found'));
    return;
  }

  res.status(200).json(updatedNote);
};
