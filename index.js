//Definitions for NodeJS Packages

const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const mail = require('nodemailer');

//Not sure what this does yet

let urlencoded = bodyParser.urlencoded({extended: false});

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
	.isAlpha().withMessage('FirstName cannot contain numbers or special characters'),
	
	check('lastname')
	.not().isEmpty().withMessage('LastName cannot be empty')
	.isLength({
		min: 3
	}).withMessage('LastName must be at least 3 characters')
	.isAlpha().withMessage('LastName cannot contain numbers or special characters'),
	//Includes generic error message

	//Removed for now, will work out multiple checks later

	check('email', 'Email is not valid')
	.isEmail(),
	
], (request, response) => {
	
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
	
	response.status(202).json({
		success: 'Okay'
	})
	
	console.log("Send Email Now")
	
	//Show the content of the name input in the console
	
	console.log(request.body.name);
	
	
	
})

//Get the application to listen on port 3000 for requests

app.listen(port, () => console.log('Server Running'));



var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'youremail@gmail.com',
    pass: 'yourpassword'
  }
});

var mailOptions = {
  from: 'youremail@gmail.com',
  to: 'myfriend@yahoo.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});