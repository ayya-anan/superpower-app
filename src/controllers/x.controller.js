const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { xService } = require('../services');

const createX = catchAsync(async (req, res) => {
  const x = await xService.createx(req.body);
  res.status(httpStatus.CREATED).send(x);
});

const getXs = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  // eslint-disable-next-line no-console
  const result = await xService.queryxs(req.params.xType, filter, options);
  res.send(result);
});

const getX = catchAsync(async (req, res) => {
  const x = await xService.getxById(req.params.xId);
  if (!x) {
    throw new ApiError(httpStatus.NOT_FOUND, 'x not found');
  }
  res.send(x);
});

const updateX = catchAsync(async (req, res) => {
  const x = await xService.updatexById(req.params.xId, req.body);
  res.send(x);
});

const deleteX = catchAsync(async (req, res) => {
  await xService.deletexById(req.params.xId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createX,
  getXs,
  getX,
  updateX,
  deleteX,
};
