const express = require('express')
const app = express()
const port = 3000

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

app.get('/', (req, res) => res.send('Hello World!'))

console.log("Hello World")

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

//https://express-validator.github.io/docs/ - Website for Docs