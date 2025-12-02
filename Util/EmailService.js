const { text } = require("body-parser");
const nodemailer = require("nodemailer");

const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",

    auth: {
      user: "rotneng@gmail.com",
      pass: "xmqyewamsirsaeyo",
    },
  });
};

const emailLayout = (otp) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <h1>Welcome To Scarlett Marque Store, Enjoy Shopping</h1>
        <p>Signup Succesfull</p>
        <p>Your Verification code is ${otp}</p>
    </body>
    </html>`;
};

const sendEmail = async (email, otp) => {
  try {
    const transporter = createTransporter();
    const info = await transporter.sendMail({
      from: "rotneng@gmail.com",
      to: email,
      subject: "Welcome to Scarlett Marque",
      text: `Your verification token is ${otp}`,
      html: emailLayout(otp),
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.log("Error sending Email", error);
  }
};

module.exports = { createTransporter, sendEmail };
