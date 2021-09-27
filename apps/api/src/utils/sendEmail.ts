import { resetLinkTemplate } from './emailTemplates/index';
import * as nodemailer from 'nodemailer';

import { template } from 'lodash';
import { ShoppingListResponse } from '../resolvers/types/shoppingList';
import { getShoppingListHTML } from './emailTemplates/getShoppingListHTML';

type EmailType = 'reset' | 'shoppingList';

export async function sendEmail(
  to: string,
  data: string | ShoppingListResponse,
  type: EmailType
) {
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

function getTemplate(type: EmailType, data: string | ShoppingListResponse) {
  if (type == 'reset') {
    const compiled = template(resetLinkTemplate);
    return compiled({ resetLink: data });
  } else if (typeof data !== 'string' && data.shoppingLists) {
    return getShoppingListHTML(data.shoppingLists);
  } else {
    return '';
  }
}
