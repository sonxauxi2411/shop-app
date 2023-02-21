const nodeMailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");

//key sendgrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//send mail
const sendMail = async (to, subject, html) => {
  try {
    const msg = {
      to: to,
      from: process.env.EMAIL_FROM,
      subject: subject,
      html: html,
    };
    await sgMail.send(msg);
    console.log("send mail");
  } catch (error) {
    console.log(error);
  }
};



module.exports = sendMail;
