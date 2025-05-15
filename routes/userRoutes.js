const express = require('express');
const router = express.Router();
const { completeTopic } = require('../controllers/roadmapController');
const User = require('../models/User');
router.post('/complete-topic', completeTopic);
// PUT /api/users/profile-setup/:id
router.put("/profile-setup/:id", async (req, res) => {
  try {
    const { interests, goals, weeklyTime, avatarUrl, skills, name } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        profileSetup: true,
        interests,
        goals,
        weeklyTime,
        avatarUrl,
        skills,
        ...(name && { name }) // only update name if provided
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Profile setup failed", error: err.message });
  }
});
router.put('/:id/enroll', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { enrolledCourses } = req.body;

    if (Array.isArray(enrolledCourses)) {
      user.enrolledCourses = enrolledCourses;
      await user.save();
      res.status(200).json(user);
    } else {
      res.status(400).json({ message: "Invalid enrolledCourses format" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});
module.exports = router;
