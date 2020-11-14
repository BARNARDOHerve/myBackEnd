import blogCollection from '../models/blogMod.js';

// add a blog to the db
export const createBlog = async (req,res,next)=>{
    try {
        const { bTitle, bContent} = req.body;
        const { firstName, lastName } = req.user;

        const blog = await blogCollection.findOne({bTitle});
        
        if (blog) return res.status(400).json({msg: 'Blog published before'})
        
        const newBlog = await blogCollection({
            bTitle,
            bPublisher: { firstName, lastName },
            bContent
        })

        const savedBlog = await newBlog.save();

        return res.status(201).json({msg: 'blog created', savedBlog})
    } catch (error) {
        res.status(400).json(`Error: ${error}`);
        // return res.status(500).json({msg: err.message})
    }
};

// get a single blog from db
export const singleBlog = async (req, res) => {
    try {
        let {id} = req.params;
        await blogCollection.findById(id).then((blogs) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'Application/json');
            res.json(blogs);
        })
    } catch (error) {
        // throw new Error(error);
        res.status(400).json(`Error: ${error}`);
    }
};

// get list of all blogs from db
export const allBlogs = (req, res, next) => {
    blogCollection.find({})
    .then((blogs) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(blogs);
    }, (err) => next(err))
    .catch((err) => next(err));
};

// update a blog in the db
export const updateBlog = async (req, res, next) => {
     try {
        const blog = await blogCollection.findByIdAndUpdate({_id: req.params.id }, req.body);
        const updatedBlog = await blogCollection.findOne({_id: req.params.id });
        res.status(200).send(updatedBlog);
     } 
     catch (error) {
        res.status(400).json(`Error: ${error}`);
     }
};

// delete a blog from the db
export const deleteBlog = async (req, res, next) => {
     let { id } = req.params;

     try {
         const existBlog = await blogCollection.find({_id: id});

         if (existBlog.length) {
             try {
                const delete_blog = await blogCollection.deleteOne({_id: id});
                res.status(200).json({message: `blog deleted ${existBlog}`, delete_blog})
             } catch (error) {
                throw new Error(error);
             };
         }
         else {
            res.status(404).json({ status: 403, error: 'blog Id does not exist'});
         };
     } 
     catch (error) {
        // console.log(error);
        res.status(500).json({ status: 403, error: 'invalid blog Id '});
     };
  
};