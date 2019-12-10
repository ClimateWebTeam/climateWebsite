function errorRemove(){
var errorlist = document.getElementById('errorlist');
errorlist.innerHTML = '';
}

//define get the form values

var expView = document.getElementById("expView");
var img = document.getElementById("expTarget");
var expImg = document.getElementById("expImg");

function expand() {
	console.log("Onclick event active")
	expView.style.display = "block";
	expImg.src = img.src;
	expView.onclick = function() {
		expView.style.display = "none";
	}
}

//New function for passing data

function sendData(e){
	//Possibly validate on client side here
	
	//Create a new formData object
	
	let formData = new FormData(form);
	
	//Create an object to send the data from the form in JSON format
	
	let Params = {
		headers: {
			'Content-type': 'application/json'
		},
		body: JSON.stringify({
			firstname: formData.get('firstname'),
			lastname: formData.get('lastname'),
			email: formData.get('email'),
			gender: formData.get('gender')
		}),
		method: "POST"
	}
	
	//Fetch the data back from the server
	
	fetch('http://localhost:3000/formData', Params)
	.then(response => response.json())
	.then(data => {
		
		//If statement to check for errors
		
		if (data.success === "Okay"){
			console.log("Successful Data Entry");
			
			let error = document.querySelector('.error');
			
			
			error.innerHTML += `<li class="errormessagesuccess">Confirmation email has been sent successfully</li>`
		
		}
		else{
			let error = document.querySelector('.error');
		
			//Reset errors ater every refresh
		
			error.innerHTML = "";
		
			//document.querySelector('.errorContainer').style.display = "block";
		
			data.errors.forEach(function(err){
				error.innerHTML += `<li class="errormessage">${err.msg}</li>`
			});
		}
		
		
	})
	.catch(err => console.log(err))
}

let form = document.querySelector('form');
try {
	form.addEventListener("submit", (event) => {
		event.preventDefault();
		sendData();
	})}
catch(err) {console.log(err)};

