import request from 'supertest';
import mongoose from 'mongoose';
import config from '../src/configuration/config.js'
import {generalToken} from '../src/helper/token.js';
import User from '../src/models/userAuthMod.js';
import app from '../app.js';

const databaseUrl = config.TESTING_DB;

jest.useFakeTimers();

describe('signup test', () => {

    beforeAll(() => {
        mongoose.connect(databaseUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex:true
        })
    });

    afterEach(async () => await User.deleteMany());
     
    //create tests
    it("it should signup new user", async (done) => {
        const res = await request(app)
            .post('/Users/signup')
            .send({
                firstName:"winny",
                lastName:"baho",
                email:"bahowinny@gmail.com",
                password: 'Baho-123'
            });

        expect(res.status).toBe(201);
        done();
    });
});

describe('Login test', () => {
    
    beforeAll(() => {
        mongoose.connect(databaseUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex:true
        })
    });
    
    beforeEach( async () => {
        const user1 = {
            firstName:"winny",
            lastName:"baho",
            email:"bahowinny@gmail.com",
            password: 'Baho-123'
        };
        
        await request(app)
            .post('/Users/signup')
            .send(user1);
    });
    
    afterEach(async () => await User.deleteMany());
    
    // Create login tests    
    it('Login a user', async (done) => {
        const user1 = {
            email:"bahowinny@gmail.com",
            password: 'Baho-123'
        };
        
        const res = await request(app)
            .post('/Users/login')
            .send(user1);
        
        expect(res.status).toBe(200);
        done();
    });
});

describe('Get all Users or single user test', () => {
    
    beforeAll(() => {
        mongoose.connect(databaseUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex:true
        })
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
        
        await request(app)
            .post('/Users/signup')
            .send(user1);
        
        token = generalToken(user1);
    });
    
    
    afterEach(async () => await User.deleteMany());
    
    it('Get a list of all users', async (done) => {
        const res = await request(app)
            .get('/Users')
            .set('authorization', token);
        
        expect(res.status).toBe(200);
        done();
    });
    
    it('Get a single user', async (done) => {
        const user2 = {
            firstName:"winny",
            lastName:"baho",
            email:"bahowinny@gmail.com",
            password: "Baho-123",
            admin: false
        };
        
        const newUser = await User(user2);
        const addedUser = await newUser.save();
        const id = addedUser._id;
        
        const res = await request(app)
            .get(`/Users/${id}`)
            .set('authorization', token);
            
        expect(res.status).toEqual(200);
        done();
    });
});

describe('Delete a user Endpoint', () => {
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
            password:"baho-123",
            admin: true,
            role: "Admin"
        };
        token = generalToken(user1);
    });
    
    afterEach(async () => await User.deleteMany());
    
    it('Delete a user', async (done) => {
        
        const user2 = {
            firstName:"brave",
            lastName:"chichi",
            email:"brave@gmail.com",
            password:"brave-123"
        };
        
        const newUser = await User(user2);
        const addedUser = await newUser.save();
        const id = addedUser._id;
        
        const res = await request(app)
            .delete(`/Users/${id}`)
            .set('authorization', token);
            
        expect(res.status).toEqual(200);
        done();
    });
});


// describe('myTest', () => {
//     let user;

//     beforeEach( async () => {
//         const user1 = {
//             _id: mongoose.Types.ObjectId().toHexString(),
//             firstName:"winny",
//             lastName:"baho",
//             email:"bahowinny@gmail.com",
//             password:"baho-123"
//         };
//         user = {
//             firstName:"winny",
//             lastName:"winny",
//             email:"bahowinny@gmail.com",
//             password: 'Barnardo.12'
//         }

//     })
//     afterEach( async () => await User.deleteMany());
    
//     it("it should get all user", async (done) => {
//         await request(app)
//             .get('/')

//         expect(user).not.toBe(null)
//         done();
//     });
    
//     it("it should get one user", async (done) => {
//         const user = {
//             firstName:"winny",
//             lastName:"winny",
//             email:"bahowinny@gmail.com",
//             password: 'Barnardo.12'
//         }
//         const newUser = await User(user)
//         const savedUser = await newUser.save()
//         const id = savedUser._id;
//         await request(app)
//             .get(`/${id}`)

//         expect(user).not.toBe(null)
//         done();
//     });
    
//     it("it should signup new user", async () => {
//         await request(app)
//             .post('/signup')
//             .send(user);

//         expect(user).not.toBe(null)

//     });
    
//     it("it should login", async () => {
//         const user = {
//             firstName:"winny",
//             lastName:"winny",
//             email:"bahowinny@gmail.com",
//             password: 'Barnardo.12'
//         }
//         const res = await request(app)
//             .post('/login')
//             .send(user);

//         expect(user).not.toBe(null)

//     });
    
//     it('update my user', async (done) => {
//         const updateuser = await User(user);
//         const id = updateuser._id;
//         const res = await request(app)
//             .put(`/${id}`)
//             .send({
//                 firstName:"winny",
//                 lastName:"winny",
//                 email:"bahowinny@gmail.com",
//                 password: 'Barnardo.12'
//             })
//         expect(res.status).toBe(200);
//         done();
//     });
    
//     it('deleting user', async (done) => {
//             const userToBeDeleted = await User(user);
//             const deleteduser = await userToBeDeleted.save();
//             const id = deleteduser._id;
            
//             const res = await request(app)
//                 .delete(`/${id}`)
//                 .set('authorization', token)
//             expect(res.status).toBe(200);
//             done();
//         })
// });
