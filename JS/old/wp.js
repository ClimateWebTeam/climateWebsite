
/*newsletter form*/

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

//define get the form values

let form = document.querySelector('form');

//Create a new variable to send the data to the server

form.onsubmit = sendData;

//New function for passing data

function sendData(e){
	e.preventDefault();
	
	//Possibly validate on client side here
	
	//Create a new formData object
	
	let formData = new FormData(form);
	
	//Create an object to send the data from the form in JSON format
	
	let Params = {
		headers: {
			'Content-type': 'application/json'
		},
		body: JSON..stringify({
			name: formData.get('name')
			email: formData.get('email')
		}),
		method: "POST"
	}
	
	//Fetch the data back from the server
	
	fetch('http://localhost:3000/formData', Params)
	.then(response => response.json())
	.then(data => {
		
		//If statement to check for errors
		
		if (data.success === "Okay"){
			console.log(Successful);
		}
		else{
			let error = document.querySelector('.error');
		
			//Reset errors ater every refresh
		
			error.innerHTML = "";
		
			//document.querySelector('.errorContainer').style.display = "block";
		
			data.errors.forEach(function(err){
				error.innerHTML += `<li>${err.msg}</li>`
			});
		}
		
		
		
		console.log(data);
		
	})
	.catch(err => console.log(err))
	
}






/


