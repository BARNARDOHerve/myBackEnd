import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();
const secret = process.env.SECRET_KEY;


exports.generalToken = (user) => {
    const {firstName, lastName, email} = user;
    return jwt.sign({firstName, lastName, email}, secret, { expiresIn: '900s'});

};
exports.decrypToken = (Token) => {
    return jwt.verify(Token, secret, (error, userInfo) =>{
        if (error) console.log(error.message);
        return userInfo;
    });
};