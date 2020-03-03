const express = require('express');
const router = express.Router();
const posts = require('./post');

router.use('/posts', posts);

module.exports = router
