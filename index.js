const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');

let urlencoded = bodyParser.urlencoded({extended: false});

app.use(bodyParser.json());
app.use(urlencoded);

app.use(express.static(__dirname + '/'))

app.get('/', (request, response) => {
	
	response.sendFile(path.join(__dirname + '/index.html'));
	
});

app.post('/formdata', [

	check('name')
	.not().isEmpty()

], (request, response) => {
	
	const errors = validationResult(request)
	
	of (!errors.isEmpty()){
		return response.status(422).json({
			errors: errors.array()
		})
	}
	
	response.status(202).json({
		success: 'Okay'
	})
	
	console.log(request.body.name);
	
	
	
})

app.listen(port, () => console.log('Server Running'));