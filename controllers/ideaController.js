const Idea = require('../models/Idea');

// @desc    Get all ideas
exports.getAllIdeas = async (req, res) => {
  try {
    const ideas = await Idea.find()
      .populate('author', 'displayName profilePic')
      .sort({ createdAt: -1 });
    res.json(ideas);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a new idea
exports.createIdea = async (req, res) => {
  try {
    const { title, content } = req.body;
    const idea = new Idea({
      title,
      content,
      author: req.user.id,
    });
    const createdIdea = await idea.save();
    // Populate the author info before sending it back
    const populatedIdea = await Idea.findById(createdIdea._id).populate('author', 'displayName profilePic');
    res.status(201).json(populatedIdea);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update an idea
exports.updateIdea = async (req, res) => {
  try {
    const { title, content } = req.body;
    const idea = await Idea.findById(req.params.id);

    if (!idea) {
      return res.status(404).json({ message: 'Idea not found' });
    }
    // Check if the logged-in user is the author
    if (idea.author.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    idea.title = title;
    idea.content = content;
    const updatedIdea = await idea.save();
    const populatedIdea = await Idea.findById(updatedIdea._id).populate('author', 'displayName profilePic');
    res.json(populatedIdea);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete an idea
exports.deleteIdea = async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);

    if (!idea) {
      return res.status(404).json({ message: 'Idea not found' });
    }
    if (idea.author.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await idea.deleteOne();
    res.json({ message: 'Idea removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};