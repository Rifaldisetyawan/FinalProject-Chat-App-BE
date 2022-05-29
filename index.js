const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./Routes/userRoutes')
const messageRoutes = require('./Routes/messageRoutes')
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.use('/api/auth',userRoutes)
app.use('/api/messages',messageRoutes)

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log('db connection success');
}).catch((err)=>{
    console.log(err.message);
})

const server = app.listen(process.env.PORT,()=>{
    console.log(`server started on port ${process.env.PORT}`);
})