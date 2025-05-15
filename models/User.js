// models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  role: { type: String, enum: ['creator', 'learner'], required: true },
  name: String,
  email: { type: String, unique: true, required: true },
  password: String,
  xp: { type: Number, default: 0 },
  badges: { type: [String], default: [] },
  profileSetup: { type: Boolean, default: false },
  interests: [String],
  goals: String,
  weeklyTime: Number,
  avatarUrl: String,
  skills: { type: [String], default: [] },

  // ✅ Add these fields
  enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  progress: {
    type: Map,
    of: {
      completedTopics: [String],
      lastAccessed: Date,
    },
    default: {},
  },
});

module.exports = mongoose.model('User', userSchema);

// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   role: { type: String, enum: ['creator', 'learner'], required: true },
//   name: String,
//   email: { type: String, unique: true },
//   password: String,
//   xp: { type: Number, default: 0 },
//   badges: { type: [String], default: [] }, // ✅ Added default
// });

// module.exports = mongoose.model('User', userSchema);


// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   role: { type: String, enum: ['creator', 'learner'], required: true },
//   name: String,
//   email: { type: String, unique: true },
//   password: String,
//   xp: { type: Number, default: 0 },
//   badges: [String],
// });

// module.exports = mongoose.model('User', userSchema);