const httpStatus = require('http-status');
const { Deal } = require('../../models');
const ApiError = require('../../utils/ApiError');

/**
 * Create a Deal
 * @param {Object} dealBody
 * @returns {Promise<Deal>}
 */
const createDeal = async (dealBody) => {
  return Deal.create(dealBody);
};

/**
 * Query for Deals
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryDeals = async (filter, options) => {
  const deals = await Deal.paginate(filter, options);
  return deals;
};

/**
 * Get Deal by id
 * @param {ObjectId} id
 * @returns {Promise<Deal>}
 */
const getDealById = async (id) => {
  return Deal.findById(id);
};

/**
 * Update Deal by id
 * @param {ObjectId} dealId
 * @param {Object} updateBody
 * @returns {Promise<Deal>}
 */
const updateDealById = async (dealId, updateBody) => {
  const deal = await getDealById(dealId);
  if (!deal) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Deal not found');
  }
  Object.assign(deal, updateBody);
  await deal.save();
  return deal;
};

/**
 * Delete Deal by id
 * @param {ObjectId} dealId
 * @returns {Promise<Deal>}
 */
const deleteDealById = async (dealId) => {
  const deal = await getDealById(dealId);
  if (!deal) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Deal not found');
  }
  await deal.remove();
  return deal;
};

module.exports = {
  createDeal,
  queryDeals,
  getDealById,
  updateDealById,
  deleteDealById,
};
