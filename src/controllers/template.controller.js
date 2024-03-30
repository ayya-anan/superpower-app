// const createReport = require('docx-templates').default;
const he = require('he');
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
const sendEmail = async (to, subject, text, html = false) => {
  const msg = { from: config.email.from, to, subject, text, html, headers: { 'Content-Type': 'text/html' } };
  await transport.sendMail(msg);
};

// const template = fs.readFileSync('./src/templates/invoice.docx');
const catchAsync = require('../utils/catchAsync');

const createInvoice = catchAsync(async (req, res) => {
  const subject = 'Quote';
  const to = 'jerinjose.j@gmail.com';
  const content = he.decode(req.body.content);
  try {
    const response = await sendEmail(to, subject, '', content);
    res.status(httpStatus.OK).send({ response });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: error.message });
  }
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: 'jerinjose.j@gmail.com', // Change to your recipient
    from: config.email.from, // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };
  sgMail
    .send(msg)
    .then(() => {})
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
