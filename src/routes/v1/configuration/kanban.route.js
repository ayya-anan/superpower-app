const express = require('express');
const kanbanController = require('../../../controllers/configuration/kanban.controller');

const router = express.Router();

router.route('/').post(kanbanController.createKanban).get(kanbanController.getKanbans);

router
  .route('/:kanbanId')
  .get(kanbanController.getKanban)
  .patch(kanbanController.updateKanban)
  .delete(kanbanController.deleteKanban);

module.exports = router;
