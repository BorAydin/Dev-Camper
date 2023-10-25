const express = require('express');
const { getCourses } = require('../controllers/courses');

const router = express.Router({ mergeParams: true }); // bootcampdan gelen path paramin burdaki gete eklenmip çalışması için

router.route('/').get(getCourses);

module.exports = router;
