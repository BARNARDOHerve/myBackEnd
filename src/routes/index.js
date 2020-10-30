import express from 'express';
import mongoose from 'mongoose';
import userRouter from './userPath';
import blogRouter from './blogPath';
import contactRoute from './contactPath';
import dotenv from 'dotenv';


const app = express();

app.use(express.json());
app.use('/', userRouter);
app.use('/', blogRouter); 
app.use('/', contactRoute);


dotenv.config();
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`App running on port ${PORT}`));

mongoose.connect("mongodb://localhost:27017/myCapstoneProject", {

    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology:true

  }, 

  () => console.log("MongoDB connected .........")

)
export default app;

