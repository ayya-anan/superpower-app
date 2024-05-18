const httpStatus = require('http-status');
const { Kanban } = require('../../models');
const ApiError = require('../../utils/ApiError');

/**
 * Create a Kanban
 * @param {Object} kanbanBody
 * @returns {Promise<Kanban>}
 */
const createKanban = async (kanbanBody) => {
  return Kanban.create(kanbanBody);
};

/**
 * Query for Kanbans
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryKanbans = async (filter, options) => {
  const kanbans = await Kanban.paginate(filter, options);
  return kanbans;
};

/**
 * Get Kanban by id
 * @param {ObjectId} id
 * @returns {Promise<Kanban>}
 */
const getKanbanById = async (id) => {
  return Kanban.findById(id);
};

/**
 * Update Kanban by id
 * @param {ObjectId} kanbanId
 * @param {Object} updateBody
 * @returns {Promise<Kanban>}
 */
const updateKanbanById = async (kanbanId, updateBody) => {
  const kanban = await getKanbanById(kanbanId);
  if (!kanban) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Kanban not found');
  }
  Object.assign(kanban, updateBody);
  await kanban.save();
  return kanban;
};

/**
 * Delete Kanban by id
 * @param {ObjectId} kanbanId
 * @returns {Promise<Kanban>}
 */
const deleteKanbanById = async (kanbanId) => {
  const kanban = await getKanbanById(kanbanId);
  if (!kanban) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Kanban not found');
  }
  await kanban.remove();
  return kanban;
};

module.exports = {
  createKanban,
  queryKanbans,
  getKanbanById,
  updateKanbanById,
  deleteKanbanById,
};
