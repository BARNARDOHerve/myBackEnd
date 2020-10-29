import express from 'express';
import { createComment, singleComment, allComments, deleteComment } from '../controller/contactContr'



const contactRoute = express.Router();



contactRoute.post('/Comments/Create', createComment);

contactRoute.get('/Comments', allComments);

contactRoute.get('/Commments/comment/:id', singleComment);

contactRoute.delete('/Comments/Delete/:id', deleteComment);



export default contactRoute;

