
import request from 'supertest';
import  generateToken  from '../src/helper/token';
import mongoose from 'mongoose';
import Blog from '../src/models/blogMod';
import app from '../src/index'


const dbUrl = 'mongodb://localhost:27017/testing';

// ----------------------------------------- CREATE A BLOG (or post blog)---------------------------------------------------------

describe('myTest', () => {
    beforeAll(() => {
        mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    });
    let token;
    let blog;
    beforeEach( async () => {
        const user = {
            _id: mongoose.Types.ObjectId().toHexString(),
            firstName:"winny",
            lastName:"baho",
            email:"bahowinny@gmail.com",
            password:"baho-123"
        };
        blog = {
            bTitle:"computer maintenance",
            bContent:"the practice of keeping computers in a good state of repair.If the cooling system is not filtered then regular computer cleaning may prevent short circuits and overheating.",
            bPublisher: user.firstName.lastName,
            bPhoto:""
        }

        // token = generateToken.generalToken(user);
    })
    afterEach( async () => await Blog.deleteMany());
    it("it should post a new blog", async () => {
        await request(app)
            .post('/Blogs/Create')
            // .set('auth-token', token)
            .send(blog);

        expect(blog).not.toBe(null)

    });
});


//   ----------------------------------------------- READ ALL BLOGS -----------------------------------------------

describe('read blog', () => {

    beforeAll(() => {
        mongoose.connect('mongodb://localhost:27017/testing', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    });
    let token;
    beforeEach( async () => {
        const user = {
            _id: mongoose.Types.ObjectId().toHexString(),
            firstName:"winny",
            lastName:"baho",
            email:"bahowinny@gmail.com",
            password:"baho-123"
        };
        // token = generateToken.generalToken(user);
    })
    afterEach( async () => await Blog.deleteMany());
    it('read All Blogs', async (done) => {
        const res = await request(app)
            .get('/Blogs')
            // .set('auth-token', token);
        expect(res.status).toBe(200);
        done();
    });
    
    it('read one Blog', async (done) => {
        const blog = {
            bTitle:"computer maintenance",
            bContent:"the practice of keeping computers in a good state of repair.If the cooling system is not filtered then regular computer cleaning may prevent short circuits and overheating.",
            bPublisher: 'Anyone',
            bPhoto:""
        }
        const newBlog = await Blog(blog)
        const savedBlog = await newBlog.save()
        const id = savedBlog._id
        const res = await request(app)
            .get(`/Blogs/Blog${id}`)
            // .set('auth-token', token);
            
        expect(res.status).not.toBe(null);
        done();
    });
});


//   ----------------------------------------------- UPDATE BLOG -----------------------------------------------

describe('update Blog', () => {
    let blog;
    beforeAll(() => {
        mongoose.connect('mongodb://localhost:27017/testing', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    });
    let token;
    beforeEach( async () => {
        const user = {
            _id: mongoose.Types.ObjectId().toHexString(),
            firstName:"winny",
            lastName:"baho",
            email:"bahowinny@gmail.com",
            password:"baho-123"
        };
        // token = generateToken.generalToken(user);
        blog = {
            bTitle:"computer maintenance",
            bContent:"the practice of keeping computers in a good state of repair.If the cooling system is not filtered then regular computer cleaning may prevent short circuits and overheating.",
            bPublisher: user.firstName.lastName,
            bPhoto:""
        }
    })
    afterEach( async () => await Blog.remove());
    
    it('update my blog', async (done) => {
        const updateBlog = await Blog(blog);
        const id = updateBlog._id;
        const res = await request(app)
            .put(`/Blogs/Update/${id}`)
            // .set('auth-token', token)
            .send({
                bTitle:"computer maintenance for biginners",
                bContent:"the practice of keeping computers in a good state of repair.If the cooling system is not filtered then regular computer cleaning may prevent short circuits and overheating.",
                bPhoto:""
            })
        expect(res.status).toBe(200);
        done();
    })
});

// ------------------------------------------- DELETE BLOG -----------------------------------------------------

describe('Deleting Blog', () => {
    let blog;
    let token;
    beforeEach( async () => {
        const user = {
            _id: mongoose.Types.ObjectId().toHexString(),
            firstName:"winny",
            lastName:"baho",
            email:"bahowinny@gmail.com",
            password:"baho-123"
        };
        // token = generateToken.generalToken(user);
        blog = {
            bTitle:"computer maintenance",
            bContent:"the practice of keeping computers in a good state of repair.If the cooling system is not filtered then regular computer cleaning may prevent short circuits and overheating.",
            bPublisher: user.firstName,
            bPhoto:""
        }
    })
    afterEach( async () => await Blog.remove());
    it('deleting blog', async (done) => {
        const blogToBeDeleted = await Blog(blog);
        const deletedBlog = await blogToBeDeleted.save();
        const id = deletedBlog._id;
        
        const res = await request(app)
            .delete(`/Blogs/Delete/${id}`)
            // .set('auth-token', token)
        expect(res.status).toBe(200);
        done();
    })
});