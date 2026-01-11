// src/models/note.js

import { Schema } from 'mongoose';
import { model } from 'mongoose';

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    tag: {
      type: String,
      default: 'Todo',
      enum: [
        'Todo',
        'Work',
        'Personal',
        'Meeting',
        'Shopping',
        'Ideas',
        'Travel',
        'Finance',
        'Health',
        'Important',
      ],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
noteSchema.index(
  { title: 'text', tag: 'text' },
  {
    name: 'NotesTextIndex',
    weights: { title: 10, tag: 5 },
    default_language: 'english',
  },
);
export const Note = model('Note', noteSchema, 'notes');
