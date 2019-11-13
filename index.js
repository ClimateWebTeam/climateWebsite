const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

app.use(express.static(__dirname + '/'))

app.get('/', (request, response) => {
	
	response.sendFile(path.join(__dirname + '/index.html'));
	
});

app.listen(port, () => console.log('Server Running'));