import request from 'supertest';
import mongoose from 'mongoose';
import config from '../src/configuration/config.js'
import {generalToken} from '../src/helper/token.js';
import contactCollection from '../src/models/contactMod.js';
import app from '../app.js';

const databaseUrl = config.TESTING_DB;

jest.useFakeTimers();

describe('Testing Queries', () => {

    describe('select all queries or one', () => {
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
                password: "Baho-123",
                admin: true,
                role:"Admin"
            };
            
            token = generalToken(user1);
        });
        
        afterEach(async () => await contactCollection.deleteMany());
        
        it('select a list of all queries', async (done) => {
            const res = await request(app)
                .get('/Queries')
                .set('authorization', token);
                
            expect(res.status).toEqual(200);
            done();
        });
        
        it('select a single query', async (done) => {
            const query1 = {
                Name: 'brave chichi',
                email: 'brave@bob.com',
                comment: 'This is my first query 1'
            };
            const newQuery = await contactCollection(query1);
            const addedQuery = await newQuery.save();
            const id = addedQuery._id;
                
            const res = await request(app)
                .get(`/Queries/${id}`)
                .set('authorization', token);
                
            expect(res.status).toEqual(200);
            done();
        });
    });
    
    describe('create a query', () => {
        beforeAll(() => {
            mongoose.connect(databaseUrl, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex:true
            })
        });
        let token;
        let query;
        
        beforeEach( async () => {
            const user1 = {
                _id: mongoose.Types.ObjectId().toHexString(),
                firstName:"winny",
                lastName:"baho",
                email:"bahowinny@gmail.com",
                password: "Baho-123",
            };
            
            query = {
                Name: user1.name,
                email: user1.email,
                comment: 'This is my first query 1'
            };
            
            token = generalToken(user1);
        });
        
        afterEach(async () => await contactCollection.deleteMany());
        
        it('create query', async (done) => {
            await request(app)
                .post('/Queries')
                .set('authorization', token)
                .send(query);
                
            expect(query).not.toBe(null);
            done();
        });
    });
    
    describe('Delete a query', () => {
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
                firstName:"winny",
                lastName:"baho",
                email:"bahowinny@gmail.com",
                password: "Baho-123",
                admin: true,
                role:"Admin"
            };

            token = generalToken(user1);
        });
        
        afterEach(async () => await contactCollection.deleteMany());
        
        it('Delete a query from db', async (done) => {
            const query1 = {
                Name: 'brave chichi',
                email: 'brave@bob.com',
                comment: 'This is my first query 1'
            };
            
            const newQuery = await contactCollection(query1);
            const addedQuery = await newQuery.save();
            const id = addedQuery._id;
            
            const res = await request(app)
                .delete(`/Queries/${id}`)
                .set('authorization', token);
                
            expect(res.status).toEqual(200);
            done();
        });
    });
});












// import request from 'supertest';
// import mongoose from 'mongoose';
// import Contact from '../src/models/contactMod.js';
// import app from '../app.js';


// describe('myTest', () => {
//     let contact;
//     beforeEach( async () => {
//         const user = {
//             _id: mongoose.Types.ObjectId().toHexString(),
//             firstName:"winny",
//             lastName:"baho",
//             email:"bahowinny@gmail.com",
//             password:"baho-123"
//         };
//         contact = {
//             Name:"winny",
//             email:"bahowinny@gmail.com",
//             comment: 'go back aa abbbbbb cccccccc'
//         }
//     })
//     afterEach( async () => await Contact.deleteMany());
    
//     it("it should get all contact", async (done) => {
//         await request(app)
//             .get('/Comments')

//         expect(contact).not.toBe(null)
//         done();
//     });
    
//     it("it should get one contact", async (done) => {
//         const contact = {
//             Name:"winny",
//             email:"bahowinny@gmail.com",
//             comment: 'go back aa abbbbbb cccccccc'
//         }
//         const newContact = await Contact(contact)
//         const savedContact = await newContact.save()
//         const id = savedContact._id;
//         await request(app)
//             .get(`/Comments/${id}`)

//         expect(contact).not.toBe(null)
//         done();
//     });
    
//     it("it should post a new contact", async () => {
//         await request(app)
//             .post('/Comments/Create')
//             .send(contact);

//         expect(contact).not.toBe(null)

//     });
    
//     it('update my contact', async (done) => {
//         const updateBlog = await Contact(contact);
//         const id = updateBlog._id;
//         const res = await request(app)
//             .put(`/Comments/Update/${id}`)
//             .send({
//                 bTitle:"computer maintenance for biginners",
//                 bContent:"the practice of keeping computers in a good state of repair.If the cooling system is not filtered then regular computer cleaning may prevent short circuits and overheating.",
//                 bPhoto:""
//             })
//         expect(res.status).toBe(404);
//         done();
//     });
    
//     it('deleting contact', async (done) => {
//             const blogToBeDeleted = await Contact(contact);
//             const deletedBlog = await blogToBeDeleted.save();
//             const id = deletedBlog._id;
            
//             const res = await request(app)
//                 .delete(`/Comments/Delete/${id}`)
//             expect(res.status).toBe(200);
//             done();
//         })
// });
