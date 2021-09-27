import * as nodemailer from 'nodemailer';

import { template } from 'lodash';

type EmailType = 'reset' | 'shoppingList';

export async function sendEmail(to: string, data: string, type: EmailType) {
  let subject = '';

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const html = getTemplate(type, data);

  if (type === 'reset') {
    subject = 'Reset password';
  } else {
    subject = 'Ithiri weekly shopping list';
  }

  // send mail with defined transport object
  await transporter.sendMail({
    from: '"ithiri"<ithiri@no-reply.com> ',
    to,
    subject,
    html,
  });
}

function getTemplate(type: EmailType, data: string) {
  if (type == 'reset') {
    const compiled = template(resetLinkTemplate);
    return compiled({ resetLink: data });
  } else {
    return '';
  }
}

const resetLinkTemplate = `
<div>
  <div style="display: flex; align-items: center; justify-content: center; margin-top: 2rem; margin-bottom: 2rem;">
    <img
      src="https://ithiri.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fimage%2Fassets%2Fimg%2Flogo.acfbb1243f6badb0c8277c9771bd0e34.png&w=128&q=75"
      alt="logo" />
  </div>
  </div>
  <div style="font-size: 1rem; margin-bottom: 1rem; font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif"">
     Please use this URL to reset your password
  </div>
  <div style="font-size: 1rem; font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif"">
      <a href="<%= resetLink %>">Reset url</a>
  </div>
`;
