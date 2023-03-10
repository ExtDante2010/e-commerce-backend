import expressAsyncHandler from "express-async-handler";
import nodemailer from "nodemailer";

export const sendEmail = expressAsyncHandler(async (data, req, res) => {
  async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "lisa.hettinger@ethereal.email",
        pass: "Wb1xBDef7HBzW7G8PJ",
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Hey 👻" <aldairlugo1995@gmail.com>', // sender address
      to: data.to, // list of receivers
      subject: data.subject, // Subject line
      text: data.text, // plain text body
      html: data.html, // html body
    });

    console.log("Message sent: %s", info.messageId);

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
  main().catch(console.error);
});
