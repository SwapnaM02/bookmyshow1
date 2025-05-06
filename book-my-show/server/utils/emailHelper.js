
// const nodemailer = require("nodemailer");
// const fs = require("fs");
// const dotenv = require("dotenv");
// const path = require("path");
// dotenv.config();

// const { SENDGRID_API_KEY } = process.env;

// function replaceContent(content, creds) {
//   const allKeys = Object.keys(creds); // {name: "John", otp: "1234"} -> ["name", "otp"]
//   allKeys.forEach(function (key) {
//     content = content.replace(`#{${key}}`, creds[key]);
//   });
//   return content; // Hello John, your otp is 1234
// }
// async function EmailHelper(templateName, receiverEmail, creds) {
//   try {
//     const templatePath = path.join(__dirname, "email_templates", templateName);
//     const content = await fs.promises.readFile(templatePath, "utf-8");
//     const emailDetails = {
//       to: receiverEmail,
//       from: "puttamoninirmal01@gmail.com",
//       // subject: `Hi ${creds.name}, your otp is ${creds.otp}`,
//       subject:templateName==="otp.html"?"OTP verificatio":"ticket confirmation",
//       html: replaceContent(content, creds),
//     };
//     const transportDetails = {
//       host: "smtp.sendgrid.net",
//       port: 587,
//       auth: {
//         user: "apikey",
//         pass: SENDGRID_API_KEY,
//       },
//     };
//     const transporter = nodemailer.createTransport(transportDetails);
//     await transporter.sendMail(emailDetails);
//     console.log("email sent");
//   } catch (err) {
//     console.error(err);
//   }
// }

// module.exports = EmailHelper;

const nodemailer = require("nodemailer");
const fs = require("fs");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();
function replaceContent(content, creds) {
   const allKeysArr = Object.keys(creds);
  allKeysArr.forEach(function (key) {
    content = content.replace(`#{${key}}`, creds[key]);
  });
  return content;
}

async function EmailHelper(templateName, receiverEmail, creds) {
  console.log("i am inside email helper")
  try {
    const templatePath = path.join(__dirname, "email_templates", templateName);
    let content = await fs.promises.readFile(templatePath, "utf-8");
    const emailDetails = {
      to: receiverEmail,
      from:{
        name:"bookmyshow",
        address:process.env.USER,
      },
      subject: "Mail from BOOK MY SHOW",
      text: `Hi ${creds.name}, this is your reset OTP: ${creds.otp}`,
      html: replaceContent(content, creds),
    };
    const transportDetails = {
      
      service:'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.USER, // use environment variables for sensitive information
        pass: process.env.PASSWORD
      },
      tls: { rejectUnauthorized: false }
    };
    const transporter = nodemailer.createTransport(transportDetails);
    await transporter.sendMail(emailDetails);
    console.log("Email sent successfully");
  } catch (err) {
    console.log("Error sending email:", err);
  }
}

module.exports = EmailHelper;