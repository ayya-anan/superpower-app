const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const ApiError = require('../../utils/ApiError');
const catchAsync = require('../../utils/catchAsync');
const { kanbanService } = require('../../services');

const createKanban = catchAsync(async (req, res) => {
  const kanban = await kanbanService.createKanban(req.body);
  res.status(httpStatus.CREATED).send(kanban);
});

const getKanbans = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  options.populate = 'org , accountManager';
  const result = await kanbanService.queryKanbans(filter, options);
  res.send(result);
});

const getKanban = catchAsync(async (req, res) => {
  const kanban = await kanbanService.getKanbanById(req.params.kanbanId);
  if (!kanban) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Kanban not found');
  }
  res.send(kanban);
});

const updateKanban = catchAsync(async (req, res) => {
  const kanban = await kanbanService.updateKanbanById(req.params.kanbanId, req.body);
  res.send(kanban);
});

const deleteKanban = catchAsync(async (req, res) => {
  await kanbanService.deleteKanbanById(req.params.kanbanId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createKanban,
  getKanbans,
  getKanban,
  updateKanban,
  deleteKanban,
};
