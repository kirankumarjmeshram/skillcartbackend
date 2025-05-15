const Roadmap = require('../models/Roadmap');
const User = require('../models/User');

// Generate roadmap for a learner and a course
exports.generateRoadmap = async (req, res) => {
  try {
    const { learnerId, courseId, weeks, weekWisePlan } = req.body;

    if (!learnerId || !courseId || !weeks || !weekWisePlan || !Array.isArray(weekWisePlan)) {
      return res.status(400).json({ message: 'Missing or invalid fields in request body' });
    }

    // Check if roadmap already exists for learner and course
    const existingRoadmap = await Roadmap.findOne({ learnerId, courseId });
    if (existingRoadmap) {
      return res.status(409).json({ message: 'Roadmap already exists for this learner and course' });
    }

    // Create roadmap
    const roadmap = new Roadmap({
      learnerId,
      courseId,
      weeks,
      weekWisePlan,
      progress: {}, // empty progress initially
      startedAt: new Date(),
    });

    await roadmap.save();

    res.status(201).json({ message: 'Roadmap generated successfully', roadmap });
  } catch (err) {
    console.error('Error in generateRoadmap:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get roadmap by learner and course (courseId from params, learnerId from req.user)
exports.getRoadmap = async (req, res) => {
  try {
    const learnerId = req.user.userId;
    const courseId = req.params.courseId;

    const roadmap = await Roadmap.findOne({ learnerId, courseId })
      .populate('weekWisePlan.topics') // populate topics if needed
      .exec();

    if (!roadmap) {
      return res.status(404).json({ message: 'Roadmap not found' });
    }

    res.json({ roadmap });
  } catch (err) {
    console.error('Error in getRoadmap:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Mark topic as completed, update XP and badges
exports.completeTopic = async (req, res) => {
  try {
    const { learnerId, courseId, topicId, xpEarned } = req.body;

    if (!learnerId || !courseId || !topicId || typeof xpEarned !== 'number') {
      return res.status(400).json({ message: 'Missing or invalid fields in request body' });
    }

    // Find learner's roadmap for the course
    const roadmap = await Roadmap.findOne({ learnerId, courseId });
    if (!roadmap) {
      return res.status(404).json({ message: 'Roadmap not found' });
    }

    // Mark topic as completed
    roadmap.progress = roadmap.progress || {};
    roadmap.progress[topicId] = 'Completed';
    await roadmap.save();

    // Add XP to learner
    const user = await User.findById(learnerId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.xp = (user.xp || 0) + xpEarned;

    // Award "Topic Master" badge if all topics completed
    const allCompleted = Object.values(roadmap.progress).every(status => status === 'Completed');
    user.badges = user.badges || [];

    if (allCompleted && !user.badges.includes("Topic Master")) {
      user.badges.push("Topic Master");
    }

    await user.save();

    return res.json({
      message: "Topic marked as completed",
      xp: user.xp,
      badges: user.badges,
    });
  } catch (err) {
    console.error('Error in completeTopic:', err);
    res.status(500).json({ message: "Internal server error" });
  }
};



// const Roadmap = require('../models/Roadmap');
// const User = require('../models/User');

// exports.completeTopic = async (req, res) => {
//   try {
//     const { learnerId, courseId, topicId, xpEarned } = req.body;

//     // Update topic progress to "Completed"
//     const roadmap = await Roadmap.findOne({ learnerId, courseId });
//     if (!roadmap) return res.status(404).json({ message: 'Roadmap not found' });

//     roadmap.progress[topicId] = "Completed";
//     await roadmap.save();

//     // Add XP to learner
//     const user = await User.findById(learnerId);
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     user.xp += xpEarned;

//     // Award badges (basic logic)
//     if (!user.badges.includes("Topic Master")) {
//       const allCompleted = Object.values(roadmap.progress).every(status => status === "Completed");
//       if (allCompleted) {
//         user.badges.push("Topic Master");
//       }
//     }

//     await user.save();

//     return res.json({ message: "Topic marked as completed", xp: user.xp, badges: user.badges });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
