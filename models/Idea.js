const mongoose = require('mongoose');

const IdeaSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
  },
  content: {
    type: String,
    required: [true, 'Please add your idea content'],
  },
}, { timestamps: true });

module.exports = mongoose.model('Idea', IdeaSchema);