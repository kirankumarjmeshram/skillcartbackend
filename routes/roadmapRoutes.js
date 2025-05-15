const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');
const { generateRoadmap, getRoadmap } = require('../controllers/roadmapController');

router.post('/generate', auth, role('learner'), generateRoadmap);
router.get('/:courseId', auth, role('learner'), getRoadmap);

module.exports = router;