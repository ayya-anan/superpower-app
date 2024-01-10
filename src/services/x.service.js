const httpStatus = require('http-status');
const { X } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a x
 * @param {Object} xBody
 * @returns {Promise<x>}
 */
const createx = async (type, xBody) => {
  // eslint-disable-next-line no-console
  console.log(xBody);
  return X.get(type).create(xBody);
};

/**
 * Query for xs
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryxs = async (type, filter, options) => {
  const xs = await X.get(type).paginate(filter, options);
  return xs;
};

/**
 * Get x by id
 * @param {ObjectId} id
 * @returns {Promise<x>}
 */
const getxById = async (type, id) => {
  return X.get(type).findById(id);
};

/**
 * Update x by id
 * @param {ObjectId} xId
 * @param {Object} updateBody
 * @returns {Promise<x>}
 */
const updatexById = async (type, xId, updateBody) => {
  const xbyId = await getxById(type, xId);
  if (!xbyId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'x not found');
  }
  Object.assign(xbyId, updateBody);
  await xbyId.save();
  return xbyId;
};

/**
 * Delete x by id
 * @param {ObjectId} xId
 * @returns {Promise<x>}
 */
const deletexById = async (type, xId) => {
  const xbyId = await getxById(type, xId);
  if (!xbyId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'x not found');
  }
  await xbyId.remove();
  return xbyId;
};

module.exports = {
  createx,
  queryxs,
  getxById,
  updatexById,
  deletexById,
};
