const express = require('express');
const diffHistory = require('mongoose-audit-trail');

const router = express.Router();

router.get('/:table/:id/histories', (req, res) => {
  diffHistory
    .getHistories(req.table, req.id, ['status'])
    .then((histories) => {
      res.json(histories);
    })
    // eslint-disable-next-line no-console
    .catch();
});

module.exports = router;
