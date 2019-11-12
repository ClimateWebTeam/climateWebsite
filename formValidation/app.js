const express = require('express')
const app = express()
const port = 3000
const validate = require('express-validator');

app.get('/', (req, res) => res.send('Hello World!'))

console.log("Hello World")

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

//Example of form validation https://www.npmjs.com/package/express-validation
//nodemailer module for sending emails
//https://express-validator.github.io/docs/ - Website for Docs