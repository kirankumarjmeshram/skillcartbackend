const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');
const { createCourse, getCourses, getCourseById, updateCourse } = require('../controllers/courseController');

router.post('/', auth, role('creator'), createCourse);
router.get('/', getCourses);
router.get('/:id', getCourseById);
router.put('/:id', auth, role('creator'), updateCourse);

module.exports = router;