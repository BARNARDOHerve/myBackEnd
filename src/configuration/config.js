import dotenv from 'dotenv';

dotenv.config();

export default {
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL1,
    TESTING_DB: process.env.TESTING_DB,

    
    SECRET_KEY: process.env.SECRET_KEY 
}