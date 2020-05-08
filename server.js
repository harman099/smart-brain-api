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
		connectionString: process.env.DATABASE_URL,
		ssl: false
	}
});

const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.send('IT IS WORKING');
});
app.post('/signin', signin.handleSignin(db, bcrypt));
app.post('/register', (req, res) => {
	register.handleRegister(req, res, db, bcrypt, salt);
});
app.get('/profile/:id', (req, res) => {
	profile.handleProfile(req, res, db);
});
app.put('/image', (req, res) => {
	image.handleImage(req, res, db);
});
app.post('/imageurl', (req, res) => {
	image.handleApiCall(req, res);
});

const PORT = process.env.PORT;
app.listen(PORT || 3000, () => {
	console.log(`APP IS RUNNING ON PORT ${PORT}`);
});
