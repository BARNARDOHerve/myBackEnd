import blogCollection from '../models/blogMod';



export const createBlog = (req, res, next) => {
    blogCollection.create(req.body)
     .then((blog) => {
        console.log('Blog Created', blog);
        res.statusCode = 200;
        res.json(blog);
    }, (err) => next(err))
    .catch((err) => next(err));
 };

 export const singleBlog = async (req, res) => {
    try {
        let {id} = req.params;
        await blogCollection.findById(id).then((blogs) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'Application/json');
            res.json(blogs);
        })
    } catch (error) {
        throw new Error(error);
    }
};

export const allBlogs = (req, res, next) => {
    blogCollection.find({})
    .then((blogs) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(blogs);
    }, (err) => next(err))
    .catch((err) => next(err));
 };

 export const updateBlog = async (req, res, next) => {
     try {
         const blog = await blogCollection.findByIdAndUpdate({_id: req.params.id }, req.body);
         const updatedBlog = await blogCollection.findOne({_id: req.params.id });
         res.status(200).send(updatedBlog);
     } 
     catch (error) {
         res.status(400).json(error)
     }
 };

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
        console.log(error);
        res.status(500).json({ status: 403, error: 'invalid blog Id '});
     };
  
};