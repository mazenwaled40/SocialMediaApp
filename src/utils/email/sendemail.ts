import nodemailer from 'nodemailer';

export const sendEmail = async ({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) => {
  const transporter = nodemailer.createTransport({
    host: "stmp.@example.com",
    port: 587,
    service: "gmail",
    auth: {
      user: "mazenwaled780@gmail.com",
      pass: "jusm mqfp vkaa kgam",
    },
  });

  const info = await transporter.sendMail({
    from: "mazenwaled",
    to,
    subject,
    html,
  });

  return info;
};