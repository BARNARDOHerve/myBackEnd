import User from '../models/userAuthMod';  
import { generalToken } from '../helper/token';
import hashPassword from '../configuration/hashpassword';
import bcrypt from 'bcryptjs';



export const user_signup = async (req, res) => {
    try {

        const { firstName, lastName, email, password} = req.body;

        const checkUser = await User.findOne({email});
        if (checkUser) {
            return res.status(400).json({error: 'Email already exist!'});
        }
        
        const hPassword = await hashPassword(password);

        const newUser =  new User({
            firstName,
            lastName,
            email,
            password: hPassword
        });
    
        const savedUser = await newUser.save();
        return res.status(201).json({msg: 'Account created successfully', savedUser})
    } catch (err) {
        return res.status(500).json({error: err.message})
    }
}; 

export const user_login = async (req, res) => {
    try {
     
        const { email, password} = req.body;
        
        const checkUser = await User.findOne({email});
        if (!checkUser) {
            return res.status(400).json({error: 'the account is invalid'});
        }

        const validPassword = await bcrypt.compare(password, checkUser.password);

        if (!validPassword) {
            return res.status(400).json({error: 'invalid password'});
        }
        const token = await generalToken(checkUser)
        console.log("checkuser", checkUser)
        return res.status(200).json({msg: 'Account loged-in successfully', checkUser, token})
    } catch (err) {
        return res.status(500).json({error: err.message})
    }
}; 

export const update_user = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate({_id: req.params.id }, req.body);
        const updatedBlog = await User.findOne({_id: req.params.id });
        res.status(200).send(updatedBlog);
    } 
    catch (error) {
        res.status(400).json(error)
    }
};

export const single_user = async (req, res) => {
    try {
        let {id} = req.params;
        await User.findById(id).then((users) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'Application/json');
            res.json(users);
        })
    } catch (error) {
        throw new Error(error);
    }
};

export const all_users = (req, res, next) => {
    User.find({})
    .then((users) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(users);
    }, (err) => next(err))
    .catch((err) => next(err));
 };

export const delete_user = async (req, res, next) => {
    let { id } = req.params;

    try {
        const existuser = await User.find({_id: id});

        if (existuser.length) {
            try {
               const deleteUser = await User.deleteOne({_id: id});
               res.status(200).json({message: `comment deleted ${existuser}`, deleteUser})
            } catch (error) {
                throw new Error(error);
            };
        }
        else {
           res.status(404).json({ status: 403, error: 'user Id does not exist'});
        };
    } 
    catch (error) {
       console.log(error);
       res.status(500).json({ status: 403, error: 'invalid user Id '});
    };
 
};




   