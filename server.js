const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');

const register = require('./Controllers/register');
const signin = require('./Controllers/signin');
const profile = require('./Controllers/profile');
const image = require('./Controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : ' ',
    database : 'smart-brain'
  }
});

const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res)=>{res.send(db.users)})
app.post('/signin', (req,res) => {signin.handleSignin(req, res, db, bcrypt)})
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt, saltRounds)})
app.get('/profile/:id', (req,res) => {profile.handleProfile(req, res, db)})
app.put('/image', (req, res) => {image.handleImage(req,res,db)})
app.post('/imageurl', (req, res) => {image.handleApiCall(req,res)})

app.listen(3000, ()=>{
	console.log('app running on port 3000');
})