import express from 'express';
import {addComment, readComment} from '../controller/blogCommentContr.js';
import { auth } from '../midleware/auth.js';

const commentRouter = express.Router();

commentRouter.post('Blogs/comment/:_id', auth, addComment);
commentRouter.get('Blogs/comment/:_id', readComment);



export default commentRouter;