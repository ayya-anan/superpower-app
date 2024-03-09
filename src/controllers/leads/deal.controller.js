const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const ApiError = require('../../utils/ApiError');
const catchAsync = require('../../utils/catchAsync');
const { dealService } = require('../../services');

const createDeal = catchAsync(async (req, res) => {
  const deal = await dealService.createDeal(req.body);
  res.status(httpStatus.CREATED).send(deal);
});

const getDeals = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  options.populate = 'org , accountManager';
  const result = await dealService.queryDeals(filter, options);
  res.send(result);
});

const getDeal = catchAsync(async (req, res) => {
  const deal = await dealService.getDealById(req.params.dealId);
  if (!deal) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Deal not found');
  }
  res.send(deal);
});

const updateDeal = catchAsync(async (req, res) => {
  const deal = await dealService.updateDealById(req.params.dealId, req.body);
  res.send(deal);
});

const deleteDeal = catchAsync(async (req, res) => {
  await dealService.deleteDealById(req.params.dealId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createDeal,
  getDeals,
  getDeal,
  updateDeal,
  deleteDeal,
};
