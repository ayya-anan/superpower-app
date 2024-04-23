// const fs = require('fs');
const nodemailer = require('nodemailer');
const httpStatus = require('http-status');

// eslint-disable-next-line import/no-extraneous-dependencies
const sgMail = require('@sendgrid/mail');
const config = require('../config/config');
const logger = require('../config/logger');

const transport = nodemailer.createTransport(config.email.smtp);

/* istanbul ignore next */
if (config.env !== 'test') {
  transport
    .verify()
    .then(() => logger.info('Connected to email server'))
    .catch(() => logger.warn('Unable to connect to email server. Make sure you have configured the SMTP options in .env'));
}

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
// const sendEmail = async (to, subject, text, html = false) => {
//   const msg = { from: config.email.from, to, subject, text, html, headers: { 'Content-Type': 'text/html' } };
//   await transport.sendMail(msg);
// };

// const template = fs.readFileSync('./src/templates/invoice.docx');
const catchAsync = require('../utils/catchAsync');
// , upload.single('file'),
const createInvoice = catchAsync(async (req, res) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  // eslint-disable-next-line prefer-destructuring
  const file = req.file;
  const msg = {
    to: ['jerinjose.j@gmail.com', 'k.karthikeyan@raisusa.com', 'subhavenkat@raisusa.com'], // Change to your recipient
    from: 'Expert people Management <k.karthikeyan@raisusa.com>', // Change to your verified sender
    templateId: 'd-dc1b9185e6ef43fcaa6614de4a1cc1cc',
    attachments: [
      {
        filename: file.originalname,
        content: file.buffer.toString('base64'),
        type: file.mimetype,
        disposition: 'attachment',
      },
    ],
  };
  sgMail
    .send(msg)
    .then(() => {
      res.status(httpStatus.CREATED).send('Email sent successfully');
    })
    .catch(() => {
      // console.log(error); // Remove this line
    });

  // const buffer = await createReport({
  //   template,
  //   data: req.body,
  // });

  // fs.writeFileSync('report.docx', buffer);
  // res.send(fs);
});

module.exports = {
  createInvoice,
};
