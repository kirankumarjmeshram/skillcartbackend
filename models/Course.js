const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  order: Number,
  title: String,
  videos: [String],
  blogs: [String],
  notes: String,
  quiz: [
    {
      question: String,
      options: [String],
      correctAnswer: String,
    },
  ],
});

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  skill: String,
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  topics: [topicSchema],
});

module.exports = mongoose.model('Course', courseSchema);