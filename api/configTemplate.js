const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Outlook365',
  host: 'smtp.office365.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  tls: {
    ciphers: 'SSLv3',
    rejectUnauthorized: false,
  },
  auth: {
    user: '', // votre adresse mail
    pass: '', // votre mot de passe
  },
});

module.exports = transporter;
