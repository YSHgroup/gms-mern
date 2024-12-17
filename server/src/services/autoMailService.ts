import { MailerArg } from "@/types/mail";
import nodemailer from "nodemailer";
import { MailOptions } from "nodemailer/lib/json-transport";


type MailerFunction = (arg: MailerArg) => Promise<any>;

export const sendEmail: MailerFunction = async ({
  receiverEmail,
  subject,
  content,
  date,
}) => {
  const serverHost = process.env.MAIL_SERVER_HOST;
  const serverName = process.env.MAIL_SERVER_NAME;
  const serverPassword = process.env.MAIL_SERVER_PASSWORD;

  const transporter = nodemailer.createTransport({
    host: serverHost,
    port: 587,
    secure: false,
    auth: {
      user: serverName,
      pass: serverPassword,
    },
  });

  let mailOptions: MailOptions = {
    from: serverName,
    to: receiverEmail,
    subject: subject,
    text: content,
    date: date,
    // html: `<p>${content}</p><br><p>This email was sent on ${date}</p>`,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("Error MESSAGE", error.message);
        reject({ success: false, message: error.message });
      } else {
        console.log("Email sent ", info);
        resolve({
          success: true,
          message: "The email has been sent successfully.",
        });
      }
    });
  });
};
