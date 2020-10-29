import express from 'express';
import {createBlog, singleBlog, allBlogs, updateBlog, deleteBlog} from '../controller/blogContr';
import { auth } from '../midleware/auth';
import { validateblog } from '../midleware/validation';



const blogRouter = express.Router();


blogRouter.post('/Blogs/Create', auth, validateblog, createBlog);

blogRouter.get('/Blogs', allBlogs);

blogRouter.get('/Blogs/Blog/:id', singleBlog);

blogRouter.put('/Blogs/Update/:id', updateBlog);

blogRouter.delete('/Blogs/Delete/:id', deleteBlog);



export default blogRouter;