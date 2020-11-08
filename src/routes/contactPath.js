import express from 'express';
import { createComment, singleComment, allComments, deleteComment } from '../controller/contactContr.js'
import {auth,adminAuth} from '../midleware/auth.js';


const contactRoute = express.Router();



contactRoute.post('/Query/Create', createComment);

contactRoute.get('/Queries', [auth, adminAuth], allComments);

contactRoute.get('/Queries/:id', [auth, adminAuth], singleComment);

contactRoute.delete('/Queries/:id', [auth, adminAuth], deleteComment);



export default contactRoute;

