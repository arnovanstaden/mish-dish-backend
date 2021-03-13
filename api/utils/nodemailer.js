const nodemailer = require("nodemailer");

// Nodemailer Transport Setup
let transporter = nodemailer.createTransport({
    host: "mail.webdacity.co.za",
    port: 465,
    secure: true, // upgrade later with STARTTLS
    auth: {
        user: "themishdish@webdacity.co.za",
        pass: process.env.NODEMAILER_PW
    },
    tls: {
        rejectUnauthorized: false
    }
});

transporter.verify(function (error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log("Server is ready to take our messages: themishdish@");
    }
});

module.exports = transporter