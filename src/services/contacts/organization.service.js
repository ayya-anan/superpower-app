const httpStatus = require('http-status');
const { Organization } = require('../../models');
const ApiError = require('../../utils/ApiError');

/**
 * Create a Organization
 * @param {Object} OrganizationBody
 * @returns {Promise<Organization>}
 */
const createOrganization = async (OrganizationBody) => {
  return Organization.create(OrganizationBody);
};

/**
 * Query for Organizations
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryOrganizations = async (filter, options) => {
  const Organizations = await Organization.paginate(filter, options);
  return Organizations;
};

/**
 * Get Organization by id
 * @param {ObjectId} id
 * @returns {Promise<Organization>}
 */
const getOrganizationById = async (id) => {
  return Organization.findById(id);
};

/**
 * Update Organization by id
 * @param {ObjectId} OrganizationId
 * @param {Object} updateBody
 * @returns {Promise<Organization>}
 */
const updateOrganizationById = async (OrganizationId, updateBody) => {
  const organization = await getOrganizationById(OrganizationId);
  if (!organization) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Organization not found');
  }
  Object.assign(organization, updateBody);
  await organization.save();
  return organization;
};

/**
 * Delete Organization by id
 * @param {ObjectId} OrganizationId
 * @returns {Promise<Organization>}
 */
const deleteOrganizationById = async (OrganizationId) => {
  const organization = await getOrganizationById(OrganizationId);
  if (!organization) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Organization not found');
  }
  await organization.remove();
  return organization;
};

module.exports = {
  createOrganization,
  queryOrganizations,
  getOrganizationById,
  updateOrganizationById,
  deleteOrganizationById,
};
