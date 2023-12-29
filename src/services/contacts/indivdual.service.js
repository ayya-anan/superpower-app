const httpStatus = require('http-status');
const { Individual } = require('../../models');
const ApiError = require('../../utils/ApiError');

/**
 * Create a Individual
 * @param {Object} IndividualBody
 * @returns {Promise<Individual>}
 */
const createIndividual = async (IndividualBody) => {
  return Individual.create(IndividualBody);
};

/**
 * Query for Individuals
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryIndividuals = async (filter, options) => {
  const Individuals = await Individual.paginate(filter, options);
  return Individuals;
};

/**
 * Get Individual by id
 * @param {ObjectId} id
 * @returns {Promise<Individual>}
 */
const getIndividualById = async (id) => {
  return Individual.findById(id);
};

/**
 * Update Individual by id
 * @param {ObjectId} IndividualId
 * @param {Object} updateBody
 * @returns {Promise<Individual>}
 */
const updateIndividualById = async (IndividualId, updateBody) => {
  const individual = await getIndividualById(IndividualId);
  if (!individual) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Individual not found');
  }
  Object.assign(individual, updateBody);
  await individual.save();
  return individual;
};

/**
 * Delete Individual by id
 * @param {ObjectId} IndividualId
 * @returns {Promise<Individual>}
 */
const deleteIndividualById = async (IndividualId) => {
  const individual = await getIndividualById(IndividualId);
  if (!individual) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Individual not found');
  }
  await individual.remove();
  return individual;
};

module.exports = {
  createIndividual,
  queryIndividuals,
  getIndividualById,
  updateIndividualById,
  deleteIndividualById,
};
