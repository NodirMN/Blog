import express from 'express';
import multer from 'multer';
import cors from "cors";
import mongoose from 'mongoose';
import {
    registerValidation,
    loginValidation,
    postCreateValidation,
} from './validations.js'

import  {UserController,PostController} from './controllers/index.js';

import {hendleValidationErrors,checkAuth} from './utils/index.js';



////////////////////////////////////*



mongoose
    .connect('mongodb+srv://nodir:8I6YHrziLWB7KmP9@cluster0.kasy5.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log(('DB error', err)))

////////////////////////////////////*

const app = express()
const storage = multer.diskStorage({
    destination:(_, __, cb)=>{
        cb(null, 'uploads')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
})

const  upload = multer({ storage })
//////////////////////*
app.use(express.json())

app.use('/uploads', express.static('uploads'));
app.use(cors())

////////////////////////////////////////*

app.post('/auth/login', loginValidation, hendleValidationErrors, UserController.login)
app.post('/auth/register', registerValidation, hendleValidationErrors, UserController.register)
app.get('/auth/me', checkAuth, UserController.getme)

//////////////////////////// *
app.post('/upload', checkAuth, upload.single('image'),(req,res)=>{
    res.json({
        url: `/uploads/${req.file.originalname}`
    })
})  


////////////////////////////////*
app.get('/posts',  PostController.getAll)
app.get('/posts/:id',  PostController.getOne)
app.post('/posts', checkAuth, postCreateValidation, hendleValidationErrors, PostController.create)
app.delete('/posts/:id', checkAuth, PostController.remove)
app.patch('/posts/:id', checkAuth, hendleValidationErrors, PostController.update)






app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log("Server is running");
});