const { tokenForgot } = require('../helpers/forgotToken');
const userModel = require('../models/personModel');
const { transporter } = require('../../config/mailer');

const forgotController = async (req, res) => {

  try {

    const user = await userModel.findOne({ email: req.body.email })
    if (!user) {
      res.status(409)
      res.send({
        error: 'Inexistente'
      })
      return
    }

    const tokenForget = await tokenForgot(user)
    const emailUser = process.env.USER;
    const mailOptions = {
      from: emailUser,
      to: req.body.email,
      subject: 'Recuperación de contraseña de Pets World',
      html: `
          <!DOCTYPE html>
        <html>
          <head>
          <style>
          * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
          }
          html,
          body {
              width: 100%;
              color: black;
          }
          header{
              margin-bottom: 0.5rem;
          }
          h1 {
              padding: 1rem;
              text-align: center;
          }
          p {
              padding: 1rem;
              font-size: 16px;
              line-height: 1.5;
              text-align: justify;

          }
          h3{
              padding: 1rem;
              text-align: left;
          }
          h2,h4{
              padding: 1rem;
          }
          footer{
              margin-top: 0.5rem;
          }
      </style>
          </head>
          <body>
          <h1> Somos el equipo de PETS WORLD </h1>
          <h2>Buen Día, ${user.name}</h2>
          <p> Su solicitud de recuperación de contraseña ha sido recibida.</p>
          <p> Para restablecer su contraseña por favor ingrese el código en el campo correspondiente, tenga en cuenta que el código caducará en 7 minutos. </p>
          <h3> Usuario: ${user.email} <br>
              Código: <p> ${tokenForget} </p>
          </h3>
          <h4>Si usted NO realizó esta solicitud omita este mensaje.</h4>
          <p> Si presenta inconvenientes comuníquese con petsworld223@gmail.com </p>
          </body>
          <footer>
    </footer>
        </html>
        `


    };
    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        res.status(409)
        res.send('Error al enviar correo electrónico.', error);
      } else {
        res.status(200);
        res.send('Correo electrónico. Enviado Exitosamente');
      }
    });
  } catch (e) {
    res.status(500)
    res.send({ error: 'Something happened' })
  }
};

module.exports = { forgotController }
