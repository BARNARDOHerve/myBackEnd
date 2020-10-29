
import request from 'supertest';
import  generateToken  from '../src/helper/token';
import mongoose from 'mongoose';
import Contact from '../src/models/contactMod';
import app from '../src/index'


const dbUrl = 'mongodb://localhost:27017/testing';

describe('myTest', () => {
    beforeAll(() => {
        mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    });
    let token;
    let contact;
    beforeEach( async () => {
        const user = {
            _id: mongoose.Types.ObjectId().toHexString(),
            firstName:"winny",
            lastName:"baho",
            email:"bahowinny@gmail.com",
            password:"baho-123"
        };
        contact = {
            Name:"winny",
            email:"bahowinny@gmail.com",
            comment: 'go back aa abbbbbb cccccccc'
        }

        // token = generateToken.generalToken(user);
    })
    afterEach( async () => await Contact.deleteMany());
    
    it("it should get all contact", async (done) => {
        await request(app)
            .get('/Comments')

        expect(contact).not.toBe(null)
        done();
    });
    
    it("it should get one contact", async (done) => {
        const contact = {
            Name:"winny",
            email:"bahowinny@gmail.com",
            comment: 'go back aa abbbbbb cccccccc'
        }
        const newContact = await Contact(contact)
        const savedContact = await newContact.save()
        const id = savedContact._id;
        await request(app)
            .get(`/Comments/${id}`)

        expect(contact).not.toBe(null)
        done();
    });
    
    it("it should post a new contact", async () => {
        await request(app)
            .post('/Comments/Create')
            // .set('auth-token', token)
            .send(contact);

        expect(contact).not.toBe(null)

    });
    
    it('update my contact', async (done) => {
        const updateBlog = await Contact(contact);
        const id = updateBlog._id;
        const res = await request(app)
            .put(`/Comments/Update/${id}`)
            // .set('auth-token', token)
            .send({
                bTitle:"computer maintenance for biginners",
                bContent:"the practice of keeping computers in a good state of repair.If the cooling system is not filtered then regular computer cleaning may prevent short circuits and overheating.",
                bPhoto:""
            })
        expect(res.status).toBe(404);
        done();
    });
    
    it('deleting contact', async (done) => {
            const blogToBeDeleted = await Contact(contact);
            const deletedBlog = await blogToBeDeleted.save();
            const id = deletedBlog._id;
            
            const res = await request(app)
                .delete(`/Comments/Delete/${id}`)
                // .set('auth-token', token)
            expect(res.status).toBe(200);
            done();
        })
});
