import express from 'express';
import {addComment, readComment} from '../controller/blogCommentContr.js';
import { auth } from '../midleware/auth.js';

const commentRouter = express.Router();

commentRouter.post('Blogs/comment/:id', auth, addComment);
commentRouter.get('Blogs/comment/:id', readComment)



export default commentRouter;