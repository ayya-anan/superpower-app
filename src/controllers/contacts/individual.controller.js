const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const ApiError = require('../../utils/ApiError');
const catchAsync = require('../../utils/catchAsync');
const { individualService } = require('../../services');

const createIndividual = catchAsync(async (req, res) => {
  const individual = await individualService.createIndividual(req.body);
  res.status(httpStatus.CREATED).send(individual);
});

const getIndividuals = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await individualService.queryIndividuals(filter, options);
  res.send(result);
});

const getIndividual = catchAsync(async (req, res) => {
  const individual = await individualService.getIndividualById(req.params.individualId);
  if (!individual) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Individual not found');
  }
  res.send(individual);
});

const updateIndividual = catchAsync(async (req, res) => {
  const individual = await individualService.updateIndividualById(req.params.individualId, req.body);
  res.send(individual);
});

const deleteIndividual = catchAsync(async (req, res) => {
  await individualService.deleteIndividualById(req.params.individualId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createIndividual,
  getIndividuals,
  getIndividual,
  updateIndividual,
  deleteIndividual,
};
