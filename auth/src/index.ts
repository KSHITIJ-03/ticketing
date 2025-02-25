import express from 'express';
import 'express-async-errors'; // to throw errors immedieately for async functions
import mongoose from 'mongoose';
import {json} from 'body-parser'
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { signoutRouter } from './routes/signout';

import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express()
app.set('trust proxy', true)
app.use(json())

app.use(
    cookieSession({
        signed: false, // jwt is already encrypted 
        secure: true
    })
)

// app.get('/api/users/currentuser', (req, res) => {
//     console.log('this is current user');
//     res.send('this is current user')
// })

app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)

app.all('*', () => {
    throw new NotFoundError()
})

app.use(errorHandler)


const start = async () => {

    if(!process.env.JWT_KEY) {
        throw new Error('env variables are not defined!!')
    }
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017')
        console.log('db is connected');
    } catch(err) {
        console.error(err)
    }
    app.listen(3000, () => {
        console.log('auth on 3000!')
    })
}

start();
