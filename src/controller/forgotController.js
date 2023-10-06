const { tokenForgot } = require('../helpers/forgotToken');
const personModel = require('../models/personModel');
const { transporter } = require('../../config/mailer');
const response = require('../helpers/response');
const { ERROR_RESPONSES } = require('../constansts');
require('../constansts')

const forgotController = async (req, res) => {
  try{
    const person = await personModel.findOne({person_email: req.body.person_email})
    if(!person) {
      response.error(req, res, ERROR_RESPONSES.invalid, 409)
      return;
    }
    const tokenForget = await tokenForgot(person)

    const emailUser = process.env.USER;
    const mailOptions = {
      from: emailUser,
      to: req.body.email,
      subject: 'Recuperación de contraseña PETS WORLD',
      html: `
      <!DOCTYPE html>
        <html>
          <head>
            <style>

            </style>
          </head>
          <header>
          </header>
          <body>
            <h1> BIENVENIDO A PETS WORLD </h1>
          <h2>Buen día, ${user.name}</h2>
          <p> Su solicitud de recuperación de contraseña ha sido recibida.</p>
          <p> Para restablecer su contraseña por favor ingrese el código en el campo correspondiente, tenga en cuenta que el código caducará en 7 minutos. </p>
          <h3> Usuario: ${user.email} <br>
               Código: <p> ${tokenForget} </p>
          </h3>
          <h4>Si usted NO realizó esta solicitud omita este mensaje.</h4>
    </footer>
        </html>
      `
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        response.error(req, res, `Error sending email, ${error}`, 409);
      } else {
        response.success(req, res, 'Email sent correctly');
      }
    })

    return
  } catch (e) {
    response.error(req, res, 'Something happened', 500)
  };
};

module.exports = { forgotController };
