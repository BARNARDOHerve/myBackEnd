import express from 'express';
import mongoose from 'mongoose';
import userRouter from './src/routes/userPath.js';
import blogRouter from './src/routes/blogPath.js';
import contactRoute from './src/routes/contactPath.js';
import config from './src/configuration/config.js';


const app = express();

const dbUrl = config.DATABASE_URL;

app.use(express.json());
app.use('/', userRouter);
app.use('/', blogRouter); 
app.use('/', contactRoute);



app.get('/', (req, res) => {
    res.send("welcome to my heroku, it is running don't worry.........");
});

mongoose.connect(dbUrl, {

    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology:true

  }, 

  () => console.log("MongoDB connected .........")

)
export default app;

