import express from 'express';
const router = express.Router();

import posts from './post';

router.use('/posts', posts);

export default router
