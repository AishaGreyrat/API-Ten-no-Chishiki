const express = require('express');
const router = express.Router();



const userRouter = require('./userRouter');

router.post('/', userRouter);


module.exports = router;