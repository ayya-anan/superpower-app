const express = require('express');
const dealController = require('../../../controllers/leads/deal.controller');

const router = express.Router();

router.route('/').post(dealController.createDeal).get(dealController.getDeals);

router.route('/:dealId').get(dealController.getDeal).patch(dealController.updateDeal).delete(dealController.deleteDeal);

module.exports = router;
