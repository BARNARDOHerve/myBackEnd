import  express from 'express';
import {auth,adminAuth} from '../midleware/auth.js';
import { user_signup, user_login, single_user, all_users, delete_user, update_user } from '../controller/userAuthForms.js';



const userRouter = express.Router();


userRouter.post('/signup', user_signup);

userRouter.post('/login', user_login);

userRouter.get('/', [auth, adminAuth], all_users);

userRouter.get('/:id', [auth, adminAuth], single_user);

userRouter.put('/:id', auth, update_user);

userRouter.delete('/:id', [auth, adminAuth], delete_user);



export default userRouter;