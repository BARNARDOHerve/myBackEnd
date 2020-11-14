import express from 'express';
import {auth,adminAuth} from '../midleware/auth.js';
import {validateblog} from '../midleware/validation.js';
import {addComment, readComment, deleteComment} from '../controller/blogCommentContr.js'
import {createBlog, singleBlog, allBlogs, updateBlog, deleteBlog} from '../controller/blogContr.js';

const blogRouter = express.Router();

//----------------------creating a blog--------------------------
blogRouter.post('/', auth, validateblog, createBlog);

blogRouter.get('/', allBlogs);

blogRouter.get('/:id', singleBlog);

blogRouter.put('/:id', auth, updateBlog);

blogRouter.delete('/:id', [auth, adminAuth], deleteBlog);

// ---------------commenting on blog----------------
blogRouter.post('/comments/:_id', auth, addComment);
blogRouter.get('/comments/:_id', readComment);
blogRouter.get('/comments/:_id', [auth, adminAuth], deleteComment);


export default blogRouter;