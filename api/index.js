const express = require('express');
const app = express();
const cors = require('cors');
const Rg = require('./schema/theSchema');
const bcrypt=require('bcryptjs')
const dbConnect = require('./config/database');
const { JsonWebTokenError } = require('jsonwebtoken');
require("dotenv").config();
const jwt=require('jsonwebtoken');
const salt=bcrypt.genSaltSync(10);
const secret='sumitbhardwaj';
const cookieParser=require('cookie-parser');
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000',
}));

app.use(express.json());
app.use(cookieParser());
app.get('/test', (req, res) => {
    res.send('ok ok ok');
});

// Wrap the registration route in an async function
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    
    try {
        
        const output = await Rg.create({ name, email, password:bcrypt.hashSync(password,salt)});
        res.json(output);
    } catch (error) {
        // alert('failed');
        console.error(error);
        res.status(500).json({ error: 'Registration failed' });
    }
});

app.post('/login',async (req,res)=>{
    
    try{
        const {email,password} = req.body;
        const output=await Rg.findOne({email:email});
        if(output){
            const passOk = bcrypt.compareSync(password,output.password);
            if(passOk){
                jwt.sign({email:output.email,id:output._id},secret,{},(err,token)=>{
                    if(err) throw err;
                    res.cookie('token',token).json(output);
                })
                // res.status(201).json('login success');
            }
            else{
                res.status(452).json({
                    message:'login fail',
                    value:passOk,
                });
            }
        }
        else{
            alert('you have not Registered. Register to Login');
        }
    }
    catch(error){
        res.status(401).send('failed to login register instead');
    }
})

// app.get('/profile',(req,res)=>{
//     const {token}=req.cookies;
//     if(token){
//         jwt.verify(token,secret,{},(err,user)=>{
//             if(err){
//                 throw err;
//             }
//             res.json(user);
//         })
//     }
//     else{
//         res.json(null);
//     }
//     res.json(`user info`);
// })

dbConnect();

const PORT = process.env.PORT || 4500;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
