import request from 'supertest';
import mongoose from 'mongoose';
import config from '../src/configuration/config.js'
import {generalToken} from '../src/helper/token.js';
import blogCollection from '../src/models/blogMod.js';
import app from '../app.js';

const databaseUrl = config.TESTING_DB;

jest.useFakeTimers();

describe("Testing Blog's features", () => { 

    describe('select all Blogs or one', () => {
        beforeAll(() => {
            mongoose.connect(databaseUrl, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex:true
            });
        });
        
        let token;
        
        beforeEach( async () => {
            const user1 = {
                _id: mongoose.Types.ObjectId().toHexString(),
                firstName:"winny",
                lastName:"baho",
                email:"bahowinny@gmail.com",
                password: 'Baho-123'
            };
            
            token = generalToken(user1);
        });
        
        afterEach(async () => await blogCollection.deleteMany());
        
        it('select a list of all blogs', async (done) => {
            const res = await request(app)
                .get('/blogs')
                .set('authorization', token);
                
            expect(res.status).toEqual(200);
            done();
        });
        
        
        it('select a single blog', async (done) => {
            // eslint-disable-next-line no-unused-vars
            const blog1 = {
                    bTitle: 'Blog 1',
                    bPublisher: 'Winny Baho',
                    bContent: 'This is my first blog'
                };
                
                const newBlog = await blogCollection(blog1); 
                const addedBlog = await newBlog.save();
                const id = addedBlog._id;
                
            const res = await request(app)
                .get(`/Blogs/${id}`)
                .set('authorization', token);
                
            expect(res.status).toEqual(200);
            done();
        });
    });
    
    describe('create a blog', () => {
        beforeAll(() => {
            mongoose.connect(databaseUrl, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex:true
            })
        });
        
        let token;
        let blog;
        
        beforeEach( async () => {
            const user1 = {
                _id: mongoose.Types.ObjectId().toHexString(),
                firstName:"winny",
                lastName:"baho",
                email:"bahowinny@gmail.com",
                password: 'Baho-123'
            };
            
            blog = {
                bTitle: 'Blog 1',
                bPublisher: user1.firstName.lastName,
                bContent: 'This is my first blog'
            };
            
            token = generalToken(user1);
        });
        
        afterEach(async () => await blogCollection.deleteMany());
        
        it('should create a blog', async (done) => {
            const res = await request(app)
                .post('/Blogs')
                .set('authorization', token)
                .send(blog);
                
            expect(blog).not.toBe(null);
            expect(res.status).toBe(201);
            done();
        });
    });
    
    describe('Delete a Blog post', () => {
        beforeAll(() => {
            mongoose.connect(databaseUrl, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex:true
            });
        });
        
        let token;
        
        beforeEach( async () => {
            const user1 = {
                _id: mongoose.Types.ObjectId().toHexString(),
                firstName:"winny",
                lastName:"baho",
                email:"bahowinny@gmail.com",
                password: 'Baho-123',
                admin: true,
                role:"Admin"
            };
            
            token = generalToken(user1);
        });
        
        afterEach(async () => await blogCollection.deleteMany());
        
        it('Delete a blog from db', async (done) => {
            const blog1 = {
                bTitle: 'Blog 1',
                bPublisher: 'Winny Baho',
                bContent: 'This is my first blog'
            };
            
            const newBlog = await blogCollection(blog1);
            const addedBlog = await newBlog.save();
            const id = addedBlog._id;
            
            const res = await request(app)
                .delete(`/Blogs/${id}`)
                .set('authorization', token);
                
            expect(res.status).toEqual(200);
            done();
        });
    });
    
    describe('Update a Blog post', () => {
        beforeAll(() => {
            mongoose.connect(databaseUrl, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex:true
            });
        });
        
        let token;
        
        beforeEach( async () => {
            const user1 = {
                _id: mongoose.Types.ObjectId().toHexString(),
                firstName:"winny",
                lastName:"baho",
                email:"bahowinny@gmail.com",
                password: 'Baho-123'
            };
            
            token = generalToken(user1);
        });
        
        afterEach(async () => await blogCollection.deleteMany());
        
        it('Update a blog', async (done) => {
            const blog1 = {
                bTitle: 'Blog 1',
                bPublisher: 'Winny Baho',
                bContent: 'This is my first blog'
            };
            
            const newBlog = await blogCollection(blog1);
            const addedBlog = await newBlog.save();
            const id = addedBlog._id;
            
            const res = await request(app)
                .put(`/Blogs/${id}`)
                .set('authorization', token)
                .send({  
                    bTitle: 'Blog 1',
                    bContent: 'This is my first blog,This is my first blog.'
                });
                
            expect(res.status).toEqual(200);
            done();
        });
    });
});


// import request from 'supertest';
// import  {generateToken}  from '../src/helper/token.js';
// import mongoose from 'mongoose';
// import Blog from '../src/models/blogMod.js';
// import app from '../app.js';


// // ----------------------------------------- CREATE A BLOG (or post blog)---------------------------------------------------------

// describe('myTest', () => {

//     let token;
//     let blog;
//     beforeEach( async () => {
//         const user = {
//             _id: mongoose.Types.ObjectId().toHexString(),
//             firstName:"winny",
//             lastName:"baho",
//             email:"bahowinny@gmail.com",
//             password:"baho-123"
//         };
//         blog = {
//             bTitle:"computer maintenance",
//             bContent:"the practice of keeping computers in a good state of repair.If the cooling system is not filtered then regular computer cleaning may prevent short circuits and overheating.",
//             bPublisher: user.firstName.lastName,
//             bPhoto:""
//         }
        
//     })
//     afterEach( async () => await Blog.deleteMany());
//     it("it should post a new blog", async () => {
//         await request(app)
//             .post('/Blogs/Create')
//             .send(blog);

//         expect(blog).not.toBe(null)

//     });
// });


// //   ----------------------------------------------- READ ALL BLOGS -----------------------------------------------

// describe('read blog', () => {
//     beforeEach( async () => {
//         const user = {
//             _id: mongoose.Types.ObjectId().toHexString(),
//             firstName:"winny",
//             lastName:"baho",
//             email:"bahowinny@gmail.com",
//             password:"baho-123"
//         };
//     })
//     afterEach( async () => await Blog.deleteMany());
//     it('read All Blogs', async (done) => {
//         const res = await request(app)
//             .get('/Blogs')
//         expect(res.status).toBe(200);
//         done();
//     });
    
//     it('read one Blog', async (done) => {
//         const blog = {
//             bTitle:"computer maintenance",
//             bContent:"the practice of keeping computers in a good state of repair.If the cooling system is not filtered then regular computer cleaning may prevent short circuits and overheating.",
//             bPublisher: 'Anyone',
//             bPhoto:""
//         }
//         const newBlog = await Blog(blog)
//         const savedBlog = await newBlog.save()
//         const id = savedBlog._id
//         const res = await request(app)
//             .get(`/Blogs/${id}`)
//         expect(res.status).not.toBe(null);
//         done();
//     });
// });


// //   ----------------------------------------------- UPDATE BLOG -----------------------------------------------

// describe('update Blog', () => {
//     let blog;
//     beforeEach( async () => {
//         const user = {
//             _id: mongoose.Types.ObjectId().toHexString(),
//             firstName:"winny",
//             lastName:"baho",
//             email:"bahowinny@gmail.com",
//             password:"baho-123"
//         };
//         blog = {
//             bTitle:"computer maintenance",
//             bContent:"the practice of keeping computers in a good state of repair.If the cooling system is not filtered then regular computer cleaning may prevent short circuits and overheating.",
//             bPublisher: user.firstName.lastName,
//             bPhoto:""
//         }
//     })
//     afterEach( async () => await Blog.remove());
    
//     it('update my blog', async (done) => {
//         const updateBlog = await Blog(blog);
//         const id = updateBlog._id;
//         const res = await request(app)
//             .put(`/Blogs/${id}`)
//             .send({
//                 bTitle:"computer maintenance for biginners",
//                 bContent:"the practice of keeping computers in a good state of repair.If the cooling system is not filtered then regular computer cleaning may prevent short circuits and overheating.",
//                 bPhoto:""
//             })
//         expect(res.status).toBe(200);
//         done();
//     })
// });

// // ------------------------------------------- DELETE BLOG -----------------------------------------------------

// describe('Deleting Blog', () => {
//     let token;
//     let blog;
//     beforeEach( async () => {
//         const user1 = {
//             _id: mongoose.Types.ObjectId().toHexString(),
//             admin: true,
//             role:"Admin",
//             firstName:"winny",
//             lastName:"baho",
//             email:"bahowinny@gmail.com",
//             password:"baho-123"
//         };
//         blog = {
//             bTitle:"computer maintenance",
//             bContent:"the practice of keeping computers in a good state of repair.If the cooling system is not filtered then regular computer cleaning may prevent short circuits and overheating.",
//             bPublisher: user.firstName,
//             bPhoto:""
//         }
//         token = generateToken(user1);
//     })
//     afterEach( async () => await Blog.remove());
//     it('deleting blog', async (done) => {
//         const blogToBeDeleted = await Blog(blog);
//         const deletedBlog = await blogToBeDeleted.save();
//         const id = deletedBlog._id;
        
//         const res = await request(app)
//             .delete(`/Blogs/${id}`)
//         expect(res.status).toBe(200);
//         done();
//     })
// });
