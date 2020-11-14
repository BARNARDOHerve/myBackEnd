import express from 'express';
import { createComment, singleComment, allComments, deleteComment } from '../controller/contactContr.js'
import {auth,adminAuth} from '../midleware/auth.js';


const contactRoute = express.Router();



contactRoute.post('/', createComment);

contactRoute.get('/', [auth, adminAuth], allComments);

contactRoute.get('/:id', [auth, adminAuth], singleComment);

contactRoute.delete('/:id', [auth, adminAuth], deleteComment);



export default contactRoute;

