let form = document.querySelector('form');

form.onsubmit = sendData;

function sendData(e){
	e.preventDefault();
	
	//Possibly validate on client side here
	
	let formData = new FormData(form);
	
	let Params = {
		headers: {
			'Content-type': 'application/json'
		},
		body: JSON..stringify({
			name: formData.get('name')
		}),
		method: "POST"
	}
	
	fetch('http://localhost:3000/formData', Params)
	.then(response => response.json())
	.then(data => {
		
		console.log(data);
		
	})
	.catch(err => console.log(err))
	
}



var body = document.getElementsByTagName('body')[0];

function toggleForm() {
	body.classList.toggle('form-active');
}