const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD } = process.env;

const config = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "dariakolysnychenko@meta.ua",
    pass: META_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(config);

//   const emailOptions = {
//     from: "dariakolysnychenko@meta.ua",
//     to: "daryakolisnik@gmail.com",
//     subject: "Nodemailer test",
//     text: "Привіт. Ми тестуємо надсилання листів!",
//   };

//   transporter
//     .sendMail(emailOptions)
//     .then((info) => console.log(info))
//     .catch((err) => console.log(err));


const sendEmail = async (data) => {
  const email = { ...data, from: "dariakolysnychenko@meta.ua" };
  await transporter.sendMail(email);
  console.log("Email sent");
  return true;
};

module.exports = sendEmail;
