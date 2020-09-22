const express = require('express');
const app = express();
const port = 80;
const ejs = require('ejs');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');


// Setting App
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))


app.get('/', function (req, res) {
    res.render('index', {title : "Main"});
    console.log(req.query);
  });
app.post('/', function (req, res) {
    const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Company: ${req.body.email}</li>
      <li>Email: ${req.body.telephone}</li>
      <li>Phone: ${req.body.message}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>`;
  
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: 'mail20.mymailcheap.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'info@electrogroup.kz', // generated ethereal user
            pass: 'Electro@2019'  // generated ethereal password
        },
        tls:{
          rejectUnauthorized:false
        }
      });
  
    let mailOptions = {
      from: 'info@electrogroup.kz', // sender address
      to: 'info@electrogroup.kz', // list of receivers
      subject: 'New mail from website', // Subject line
      html: output // html body
    };
  
  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
  
      res.render('sent', {msg:'Email has been sent'});
      console.log(req.body);
   })
  
  });