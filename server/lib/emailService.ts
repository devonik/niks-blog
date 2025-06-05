import nodemailer from 'nodemailer'
export function sendMail(to: string, subject: string, text?: string, html?: string) {
  const transporter = nodemailer.createTransport({
    host: 'mail.privateemail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'niklas.grieger@devnik.dev',
      pass: 'DevNichamo94',
    },
  })

  const mailOptions = {
    from: "Nik's blog <niklas.grieger@devnik.dev>",
    to,
    subject,
    text,
    html,
  }

  return transporter.sendMail(mailOptions)
}
