import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();
const secret = process.env.SECRET_KEY

export const auth = (req, res, next) => {
    const token = req.header('authorization');
    if (!token){
        res.status(403).json({message: "please login"})
    }
    try {
        const verification =  jwt.verify(token, secret);
        req.user = verification;
        next();
    } catch (error) {
        return res.status(401).json({message: error.message });
    }
};

export const adminAuth = (req, res, next) => {
    const { admin } = req.user;
 
    if (!admin) return res.status(401).json({msg: 'Access denied!'})
 
    return next();
};
