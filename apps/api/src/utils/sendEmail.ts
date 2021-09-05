import * as nodemailer from 'nodemailer';

// async..await is not allowed in global scope, must use a wrapper
export async function sendEmail(to: string, html: string) {
  //   const testAccount = await nodemailer.createTestAccount();

  //   console.log(testAccount);

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'k4yswkv3j4wdbzfj@ethereal.email', // generated ethereal user
      pass: 'SSrD38cmdt2uAMzKun', // generated ethereal password
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to, // list of receivers
    subject: 'Hello ✔', // Subject line
    html,
  });

  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}
