import  express from 'express';
import { user_signup, user_login, single_user, all_users, delete_user, update_user } from '../controller/userAuthForms'



const userRouter = express.Router();


userRouter.post('/users/signup', user_signup);

userRouter.post('/users/login', user_login);

userRouter.get('/users', all_users);

userRouter.get('/users/user/:id', single_user);

userRouter.put('/users/Update/:id', update_user);

userRouter.delete('/users/Delete/:id', delete_user);



export default userRouter;