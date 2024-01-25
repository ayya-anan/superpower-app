// const createReport = require('docx-templates').default;
const he = require('he');
// const fs = require('fs');
const nodemailer = require('nodemailer');
const httpStatus = require('http-status');

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
  const to = 'k.karthikeyan@raisusa.com';
  const content = he.decode(req.body.content);
  await sendEmail(to, subject, '', content);
  res.status(httpStatus.NO_CONTENT).send();

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
