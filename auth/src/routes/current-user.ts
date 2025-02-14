import express from 'express';

const router = express.Router();

router.get('/api/users/currentuser', (req, res) => {
    res.send('this is  current user')
})

export {router as currentUserRouter}; 