import nodemailer from 'nodemailer'
export function sendMail(to: string, subject: string, text?: string, html?: string) {
  const config = useRuntimeConfig()
  const transporter = nodemailer.createTransport({
    host: 'mail.privateemail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: config.email.username,
      pass: config.email.password,
    },
  })

  const mailOptions = {
    from: "Nik's blog <niklas.grieger@devnik.dev>",
    to,
    subject,
    text,
    html,
  }

  return transporter
    .sendMail(mailOptions)
    .then(() => {
      console.log('Email sent successfully to :' + to)
    })
    .catch((error) => {
      console.log('Error sending email:', error)
      throw new Error('Failed to send email')
    })
}
