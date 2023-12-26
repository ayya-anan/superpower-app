const catchAsync = require('../utils/catchAsync');

const getContacts = catchAsync(async (req, res) => {
  const result = { firstName: 'sample contact' };
  res.send(result);
});

module.exports = {
  getContacts,
};
