import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();
const secret = process.env.SECRET_KEY;


export const generalToken = (user) => {
    const {firstName, lastName, email, _id, admin} = user;
    try {
        return jwt.sign({firstName, lastName, email, _id, admin}, secret, { expiresIn: '43200s'});
    }
    catch (error) {
        throw new Error(`Token is not generated.`);
    }
};
