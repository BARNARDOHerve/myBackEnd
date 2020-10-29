import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();
const secret = process.env.SECRET_KEY

export const auth = (req, res, next) => {

    const authorization = req.headers.authorization;
    const token = authorization && authorization.split(' ')[1];
    if (!token){
        res.status(403).json({message: "please login"})
    }
    jwt.verify(token, secret, (err, user) => {
        if (err) res.status(401).json({message: "please login again"});
        req.user = user;
        next()
    })
    
}

// module.exports = auth;