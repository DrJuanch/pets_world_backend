const { transporter } = '../../config/mailer.js';

const sendConfirmationEmail = async (recipientEmail, confirmationToken) => {
  try {
    const mailOptions = {
      from: userEmail,
      to: recipientEmail,
      subject: 'Hola pet amigo, ¡confirma tu correo! ',
      html: `<p>Please click <a href="http://yourapp.com/confirm/${confirmationToken}">here</a> to confirm your email.</p>`,
    };

    await transporter.sendMail(mailOptions);
    console.log('Confirmation email sent successfully.');
  } catch (error) {
    console.error('Error sending confirmation email:', error);
  }
};

module.exports = {
  sendConfirmationEmail,
};
