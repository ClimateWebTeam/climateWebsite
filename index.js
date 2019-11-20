//Definitions for NodeJS Packages

const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const fs = require('fs');

//Not sure what this does yet

let urlencoded = bodyParser.urlencoded({extended: true});

//Includes bodyParser package and urlencoded package in file in JSON format

app.use(bodyParser.json());
app.use(urlencoded);

//Specifies directory for using the express module

app.use(express.static(__dirname + '/'))

//Creates a get request to send the index.html file to the server to be hosted

app.get('/', (request, response) => {
	
	//Specifies the index.html file using the __dirname function
	
	response.sendFile(path.join(__dirname + '/index.html'));
	
});

//Creates a post request for recieving the information from the HTML form

app.post('/formdata', [

	//Begin the validation of the response from the HTML form

	//Checks to see if 'name' element of the form is empty
	
	check('firstname')
	.not().isEmpty().withMessage('FirstName cannot be empty')
	.isLength({
		min: 3
	}).withMessage('FirstName must be at least 3 characters')
	.isAlpha().withMessage('First name cannot contain numbers or special characters'),
	
	check('lastname')
	.not().isEmpty().withMessage('Last name cannot be empty')
	.isLength({
		min: 3
	}).withMessage('LastName must be at least 3 characters')
	.isAlpha().withMessage('LastName cannot contain numbers or special characters'),
	//Includes generic error message

	check('email', 'Email is not valid')
	.isEmail(),
	
], (request, response) => {
	console.log(request.body.firstname)
	console.log(request.body)
	console.log(request.body.email)
	//Creates a response to serve with the validation with info about any errors
	
	const errors = validationResult(request)
	
	//If statement to check if there are any errors to report to the HTMl
	
	if (!errors.isEmpty()){
		
		//If there are errors present then display a 422 error to the HTML and add the error to the errors array
		
		return response.status(422).json({
			errors: errors.array()
		})
	}
	
	//If there are no errors then send a code 202 to let the HTml know everything is okay
	var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
    user: 'ben.f.cooper@gmail.com',
    pass: 'Coopster123'
	}
	});

	console.log(request.body.email);

	var mailOptions = {
	from: 'ben.f.cooper@gmail.com',
	to: request.body.email,
	subject: 'Sending Email using Node.js',
	text: 'Hey ' + request.body.firstname + ', \n Welcome to the CMP Newsletter, we are glad to have you',
	};

	transporter.sendMail(mailOptions, function(error, info){
	if (error) {
    console.log(error);
	} else {
    console.log('Email sent: ' + info.response);
	}
	});
	response.status(202).json({
		success: 'Okay'
	})
	
	console.log("Send Email Now")
	
	//Show the content of the name input in the console
	
	console.log(request.body.name);
	
		var obj = JSON.parse(fs.readFileSync('/climateWebsite/JS/emails.json', 'utf8'));
		console.log(obj);
		
		var newObj = JSON.stringify(obj) + '\n' + JSON.stringify(request.body);
	
	fs.writeFile('/climateWebsite/JS/emails.json', JSON.stringify(newObj) + '\n', function(err) {
		if(err){
			return console.log(err);
		}
		
		console.log("Information saved");
	})
	
	
	
})

//Get the application to listen on port 3000 for requests

app.listen(port, () => console.log('Server Running'));



