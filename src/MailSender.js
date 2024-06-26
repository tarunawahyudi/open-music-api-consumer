const nodeMailer = require('nodemailer');

class MailSender {
  constructor() {
    this._transporter = nodeMailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  sendEmail(targetEmail, content) {
    const message = {
      from: 'Open Music',
      to: targetEmail,
      subject: 'Eksport Lagu dari Playlist',
      text: 'Here is the file. you can download in below link',
      attachments: [
        {
          fileName: 'songs.json',
          content,
        }
      ]
    };

    return this._transporter.sendMail(message);
  }
}

module.exports = MailSender;
