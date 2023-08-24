const express = require('express');
const { getNotes, createNote, getNoteById, UpdateNote, deleteNote } = require('../controllers/noteControllers');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(protect, getNotes);
router.route('/create').post(protect, createNote);
router.route('/:id').get(getNoteById).put(protect,UpdateNote).delete(protect,deleteNote);

module.exports = router;
