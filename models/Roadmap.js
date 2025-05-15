const mongoose = require('mongoose');

const weekPlanSchema = new mongoose.Schema({
  week: {
    type: Number,
    required: true
  },
  topics: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course' // ✅ Updated ref
    }
  ]
});

const roadmapSchema = new mongoose.Schema({
  learnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  weeks: {
    type: Number,
    required: true
  },
  weekWisePlan: [weekPlanSchema],
  progress: {
    type: Map,
    of: {
      type: String,
      enum: ['Not Started', 'In Progress', 'Completed'],
      default: 'Not Started'
    }
  },
  startedAt: {
    type: Date,
    default: Date.now
  },
  completedAt: {
    type: Date
  }
}, { timestamps: true });

module.exports = mongoose.model('Roadmap', roadmapSchema);


// const mongoose = require('mongoose');

// const weekPlanSchema = new mongoose.Schema({
//   week: {
//     type: Number,
//     required: true
//   },
//   topics: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Course.topics'  // This is for reference; in practice, just ObjectId
//     }
//   ]
// });

// const roadmapSchema = new mongoose.Schema({
//   learnerId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   courseId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Course',
//     required: true
//   },
//   weeks: {
//     type: Number,
//     required: true
//   },
//   weekWisePlan: [weekPlanSchema],
//   progress: {
//     type: Map,
//     of: {
//       type: String,
//       enum: ['Not Started', 'In Progress', 'Completed'],
//       default: 'Not Started'
//     }
//   },
//   startedAt: {
//     type: Date,
//     default: Date.now
//   },
//   completedAt: {
//     type: Date
//   }
// }, { timestamps: true });

// module.exports = mongoose.model('Roadmap', roadmapSchema);



// // const mongoose = require('mongoose');

// // const roadmapSchema = new mongoose.Schema({
// //   learnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
// //   courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
// //   weeks: Number,
// //   weekWisePlan: [
// //     {
// //       week: Number,
// //       topics: [mongoose.Schema.Types.ObjectId],
// //     },
// //   ],
// //   progress: Object,
// // });

// // module.exports = mongoose.model('Roadmap', roadmapSchema);