import  express from 'express';
import { user_signup, user_login, single_user, all_users, delete_user, update_user } from '../controller/userAuthForms.js';
import { auth, adminAuth } from '../midleware/auth';



const userRouter = express.Router();


userRouter.post('/users/signup', user_signup);

userRouter.post('/users/login', user_login);

userRouter.get('/users', auth, adminAuth, all_users);

userRouter.get('/users/user/:id', auth, adminAuth, single_user);

userRouter.put('/users/Update/:id', auth, adminAuth, update_user);

userRouter.delete('/users/Delete/:id', auth, adminAuth, delete_user);



export default userRouter;