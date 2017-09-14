const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');
require('dotenv').load();

// const apiKey = require('sendgrid')
console.log(process.env.SENDGRID_API_KEY);
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', './views');

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    const data = {
        person: {
            firstName: "Cameron",
            lastName: "Pelina",
        }
    }

    res.render('index', data);
});

app.post('/contact', (req,res) => {
    res.render('contact');
});



app.post('/thanks', (req,res) => {
    console.log(req.body);
    const msg = {
        to: 'cpelina88@gmail.com',
        from: 'test@example.com',
        subject: 'contact info for' + req.body.firstName,
        text: 'contact',
        html: '<p>' + req.body.firstName + '</p><p>' + req.body.lastName + '</p><p>' + req.body.email + '</p>',
      };
      sgMail.send(msg);
    res.render('thanks', { contact: req.body });
    
});

app.listen(8080, () => {
    console.log('listening at http://localhost:8080');
});







