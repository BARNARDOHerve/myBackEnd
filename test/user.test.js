
import request from 'supertest';
import mongoose from 'mongoose';
import User from '../src/models/userAuthMod.js';
import app from '../app.js';



describe('myTest', () => {
    let token;
    let user;
    beforeEach( async () => {
        const user1 = {
            _id: mongoose.Types.ObjectId().toHexString(),
            firstName:"winny",
            lastName:"baho",
            email:"bahowinny@gmail.com",
            password:"baho-123"
        };
        user = {
            firstName:"winny",
            lastName:"winny",
            email:"bahowinny@gmail.com",
            password: 'Barnardo.12'
        }
    })
    afterEach( async () => await User.deleteMany());
    
    it("it should get all user", async (done) => {
        await request(app)
            .get('/users')

        expect(user).not.toBe(null)
        done();
    });
    
    it("it should get one user", async (done) => {
        const user = {
            firstName:"winny",
            lastName:"winny",
            email:"bahowinny@gmail.com",
            password: 'Barnardo.12'
        }
        const newUser = await User(user)
        const savedUser = await newUser.save()
        const id = savedUser._id;
        await request(app)
            .get(`/users/user/${id}`)

        expect(user).not.toBe(null)
        done();
    });
    
    it("it should signup new user", async () => {
        await request(app)
            .post('/users/signup')
            .send(user);

        expect(user).not.toBe(null)

    });
    
    it("it should login", async () => {
        const user = {
            firstName:"winny",
            lastName:"winny",
            email:"bahowinny@gmail.com",
            password: 'Barnardo.12'
        }
        const res = await request(app)
            .post('/users/login')
            .send(user);

        expect(user).not.toBe(null)

    });
    
    it('update my user', async (done) => {
        const updateuser = await User(user);
        const id = updateuser._id;
        const res = await request(app)
            .put(`/users/Update/${id}`)
            .send({
                firstName:"winny",
                lastName:"winny",
                email:"bahowinny@gmail.com",
                password: 'Barnardo.12'
            })
        expect(res.status).toBe(200);
        done();
    });
    
    it('deleting user', async (done) => {
            const userToBeDeleted = await User(user);
            const deleteduser = await userToBeDeleted.save();
            const id = deleteduser._id;
            
            const res = await request(app)
                .delete(`/users/Delete/${id}`)
            expect(res.status).toBe(200);
            done();
        })
});
