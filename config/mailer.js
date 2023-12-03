const nodemailer = require('nodemailer')
const userEmail = process.env.USER;
const password = process.env.PASSWORD;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: userEmail,
    pass: password
  },
  tls: {
    rejectUnauthorized: false
  }
});

module.exports = {
  transporter
}
