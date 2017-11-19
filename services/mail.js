'use strict';
const nodemailer = require('nodemailer');
const config = require('../config')

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: config.smtp.url,
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: config.smtp.user, // generated ethereal user
    pass: config.smtp.password  // generated ethereal password
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false
}
});


const sendMail = (user) => {
  // setup email data with unicode symbols
  let mailOptions = {
    from: '"CO-SPORT 👻" <noreply@co-sport.com>', // sender address
    to: user.email, // list of receivers
    subject: 'CO-SPORT / Bienvenue', // Subject line
    html: `Bienvenue <b>${user.username}</b> </br> <p>Merci pour votre inscription a co-sport !</p>` // html body
  };
  if (process.env.NOD_ENV === 'production') {
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
  }

}

module.exports = {
  transporter,
  sendMail,
};