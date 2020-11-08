import express from 'express';
import {auth,adminAuth} from '../midleware/auth.js';
import {validateblog} from '../midleware/validation.js';
import {addComment, readComment} from '../controller/blogCommentContr.js'
import {createBlog, singleBlog, allBlogs, updateBlog, deleteBlog} from '../controller/blogContr.js';

const blogRouter = express.Router();

//----------------------creating a blog--------------------------
blogRouter.post('/Blogs/Create', auth, validateblog, createBlog);

blogRouter.get('/Blogs', [auth, adminAuth], allBlogs);

blogRouter.get('/Blogs/:id', [auth, adminAuth], singleBlog);

blogRouter.put('/Blogs/:id', auth, updateBlog);

blogRouter.delete('/Blogs/:id', [auth, adminAuth], deleteBlog);

 // ---------------commenting on blog----------------
 blogRouter.post('/comments/:_id', auth, addComment);
 blogRouter.get('/comments/:_id', readComment);

export default blogRouter;