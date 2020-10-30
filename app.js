import express from 'express';
import mongoose from 'mongoose';
import userRouter from './src/routes/userPath.js';
import blogRouter from './src/routes/blogPath.js';
import contactRoute from './src/routes/contactPath.js';
// import dotenv from 'dotenv';


const app = express();

app.use(express.json());
app.use('/', userRouter);
app.use('/', blogRouter); 
app.use('/', contactRoute);

app.get('/', (req, res) => {
    res.send('welcome to my heroku.........');
});

mongoose.connect("mongodb://localhost:27017/myCapstoneProject", {

    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology:true

  }, 

  () => console.log("MongoDB connected .........")

)
export default app;

