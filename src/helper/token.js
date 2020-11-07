import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();
const secret = process.env.SECRET_KEY;


export const generalToken = (user) => {
    const {firstName, lastName, email, _id, admin} = user;
    return jwt.sign({firstName, lastName, email, _id, admin}, secret, { expiresIn: '1d'});

};
// export const decrypToken = (Token) => {
//     return jwt.verify(Token, secret, (error, userInfo) =>{
//         if (error) console.log(error.message);
//         return userInfo;
//     });
// };