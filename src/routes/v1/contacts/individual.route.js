const express = require('express');
const validate = require('../../../middlewares/validate');
const individualValidation = require('../../../validations/contacts/individual.validation');
const individualController = require('../../../controllers/contacts/individual.controller');
const allocationController = require('../../../controllers/contacts/task-allocation.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(individualValidation.createIndividual), individualController.createIndividual)
  .get(validate(individualValidation.getIndividuals), individualController.getIndividuals);

router
  .route('/:individualId')
  .get(validate(individualValidation.getIndividual), individualController.getIndividual)
  .patch(validate(individualValidation.updateIndividual), individualController.updateIndividual)
  .delete(validate(individualValidation.deleteIndividual), individualController.deleteIndividual);

router
  .route('/getTotalHours/')
  .post(allocationController.getTotalHours);

module.exports = router;
