const createReport = require('docx-templates').default;
const fs = require('fs');

const template = fs.readFileSync('./src/templates/invoice.docx');
const catchAsync = require('../utils/catchAsync');

const createInvoice = catchAsync(async (req, res) => {
  const buffer = await createReport({
    template,
    data: req.body,
  });

  fs.writeFileSync('report.docx', buffer);
  res.send(fs);
});

module.exports = {
  createInvoice,
};
