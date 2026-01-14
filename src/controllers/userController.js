// src/controllers/userController.js
import createHttpError from 'http-errors';
import { User } from '../models/user.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const updateUserAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(createHttpError(400, 'No file'));
    }

    const uploadResult = await saveFileToCloudinary(req.file.buffer);

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { avatar: uploadResult.secure_url },
      { new: true },
    );

    if (!updatedUser) {
      return next(createHttpError(404, 'User not found'));
    }

    return res.status(200).json({ url: updatedUser.avatar });
  } catch (err) {
    return next(err);
  }
};
