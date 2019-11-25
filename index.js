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
	subject: 'CMP Newsletter 2019',
	text: 'Hey ' + request.body.firstname + ", \n \n \t Welcome to the CMP Newsletter, we are glad to have you on board. Here is some more information about the service that we offer: \n \n \t It has been a remarkable 12 months. Globally, the impacts of the changing climate have become increasingly visible. Public protests have led to widespread awareness of the risks of further climate change - and the remedies. And we have seen a renewed desire from governments around the world to step up their response." +
"Here in the UK, there are grounds for optimism. In May, the Committee’s Net Zero report offered compelling analysis of the need to reduce greenhouse gas emissions in the UK effectively to zero by 2050 – and provided evidence that we could meet this new goal at a cost already agreed by Parliament. The net-zero target meets the UK’s obligations under the Paris Agreement and responds to the urgent need for action highlighted by the IPCC in last year’s landmark Special Report on 1.5°C of global warming." +  
"\n \n We welcome strongly the UK Parliament’s decision to make net zero law – and the corresponding decisions of the Welsh Assembly and the Scottish Parliament. These are positive steps which are of fundamental consequence for the future path of our economy, our society and the climate. Carbon neutrality has now become a mainstream goal." +
"\n \n But tougher targets do not themselves reduce emissions. New plans must be drawn up to deliver them. And even if net zero is achieved globally, our climate will continue to warm in the short-term, and sea level will continue to rise for centuries. We must plan for this reality. Climate change adaptation is a defining challenge for every government, yet there is only limited evidence of the present UK Government taking it sufficiently seriously.  " +
"\n \n It is time to act. Next year may see the UK host the most important global climate summit since Paris in 2015. Our credibility in the COP26 Presidency rests on real action at home. " +
"\n \n The Adaptation and Mitigation Committees have reviewed the UK Government’s approach to climate change adaptation and emissions reduction. Our reports are published in parallel, as required under the Climate Change Act. We find a substantial gap between current plans and future requirements and an even greater shortfall in action. " +
"\n \n Planning for climate change adaptation is a statutory obligation but the National Adaptation Programme (NAP) is incomplete. Of the 56 risks and opportunities identified in the UK’s Climate Change Risk Assessment, 21 have no formal actions in the NAP. Furthermore, we have been unable to give high scores for managing risk to any of the sectors we have assessed in this report. We are now seeing the substantial impacts of a global temperature rise of just 1°C. The Paris Agreement targets a threshold of well below 2°C, ideally 1.5°C, but current global plans give only a 50% chance of meeting 3°C. " +
"\n \n In these circumstances, although the UK is committed to working for global action to parallel our own adoption of a net-zero statutory target, it is prudent to plan adaptation strategies for a scenario of 4°C, but there is little evidence of adaptation planning for even 2°C. Government cannot hide from these risks.  " +
"\n \n \t" + "Thanks For Signing Up!",
	};

	//Error function to print callback

	function callback(error){
		console.log(error)
	}

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
	
	console.log(request.body);
	
	//Read the json file and add on the new information
	
	fs.readFile('JS/emails.json', 'utf8', function readFileCallback(err, data){
    if (err){
        console.log(err);
    } else {
    obj = JSON.parse(data); 
    obj.table.push(request.body);
    json = JSON.stringify(obj); 
    fs.writeFile('JS/emails.json', json, 'utf8', callback); 
}});
	
	
	
		
	})
	
	
	
})

//Get the application to listen on port 3000 for requests

app.listen(port, () => console.log('Server Running'));



