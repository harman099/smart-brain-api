const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '30d4681d1e364504ad6060ac80dc6910'
});

const handleApiCall = (req, res) => {	
app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		  .then(data =>{
		  	res.json(data);
		  })
		  .catch(err => res.status(400).json('UNABLE TO WORK WITH API'))
}

const handleImage = (req, res, db)=>{
	const {id} = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err => res.status(400).json('UNABLE TO GET ENTRIES'))
}

module.exports ={ 
	handleImage: handleImage,
	handleApiCall: handleApiCall
 };