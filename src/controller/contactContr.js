import contactCollection from '../models/contactMod.js';


// create a query to the db
export const createComment = async (req, res) => {
    try {
        const { Name, email, comment} = req.body;

        const checkcomment = await contactCollection.findOne({email});
        if (checkcomment) {
            return res.status(400).json({error: 'Proccess failed'});
        }
        
        const newcomment =  new contactCollection({
            Name,
            email,
            comment
        });
    console.log(newcomment)
        const savedcomment = await newcomment.save();
        return res.status(201).json({msg: 'comment sent successfully', savedcomment})
    } catch (err) {
        return res.status(500).json({error: err.message})
    }
}; 
// select a single query from db
export const singleComment = async (req, res) => {
    try {
        let {id} = req.params;
        await contactCollection.findById(id).then((comments) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'Application/json');
            res.json(comments);
        })
    } catch (error) {
        res.status(400).json(`Error: ${error}`);
        // throw new Error(error);
    }
};

// select list of all users from db
export const allComments = (req, res, next) => {
    contactCollection.find()
    .then((contacts) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(contacts);
    })
    .catch((err) => { 
        res.status(404).json(err)
    })
 };

// update a query is not necessary

// delete a query from the db
export const deleteComment =  async (req, res, next) => {
    let { id } = req.params;

    try {
        const existcomment = await contactCollection.find({_id: id});

        if (existcomment.length) {
            try {
               const delete_comment = await contactCollection.deleteOne({_id: id});
               res.status(200).json({message: `comment deleted ${existcomment}`, delete_comment})
            } catch (error) {
                throw new Error(error);
            };
        }
        else {
           res.status(404).json({ status: 403, error: 'comment Id does not exist'});
        };
    } 
    catch (error) {
       console.log(error);
       res.status(500).json({ status: 403, error: 'invalid comment Id '});
    };
 
};