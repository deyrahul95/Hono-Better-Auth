import FormData from "form-data";
import Mailgun from "mailgun.js";

type SendEmailParams = {
  to: string;
  subject: string;
  text: string;
};

export async function sendEmail({ to, subject, text }: SendEmailParams) {
  const mailGunDomain = process.env.MAILGUN_DOMAIN;
  const mailGunApiKey = process.env.MAILGUN_API_KEY;
  const environment = process.env.ENVIRONMENT;

  if (environment === "DEV") {
    console.log(
      `Sending email to: ${to}, Subject: ${subject} and Text: ${text}`,
    );
    return;
  }

  if (!mailGunApiKey || !mailGunDomain) {
    throw new Error(
      "OOPS!!! Env Key Missing!! Please add 'MAILGUN_DOMAIN' and 'MAILGUN_API_KEY' to your env variables!",
    );
  }

  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    username: "api",
    key: mailGunApiKey!,
  });

  try {
    const data = await mg.messages.create(mailGunDomain, {
      from: `MailGun <noreply@${mailGunDomain}>`,
      to,
      subject,
      text,
    });
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
