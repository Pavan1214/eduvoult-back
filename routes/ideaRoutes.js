const express = require('express');
const router = express.Router();
const {
  getAllIdeas,
  createIdea,
  updateIdea,
  deleteIdea,
} = require('../controllers/ideaController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(getAllIdeas)
  .post(protect, createIdea);

router.route('/:id')
  .put(protect, updateIdea)
  .delete(protect, deleteIdea);

module.exports = router;