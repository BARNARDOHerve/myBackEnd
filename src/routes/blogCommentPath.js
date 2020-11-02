import express from 'express';
import blogComment from '../controller/blogCommentContr.js';
import { auth } from '../midleware/auth.js';

const commentRouter = express.Router();

commentRouter.post('Blogs/comment/:_id',auth, blogComment.addComment);
commentRouter.get('Blogs/comment/:_id', blogComment.readComment)



export default commentRouter;