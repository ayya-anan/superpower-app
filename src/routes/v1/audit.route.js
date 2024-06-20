const express = require('express');
const { Audit } = require('@sliit-foss/mongoose-audit');

const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;

const EXCLUDES_KEY = ['_id'];

const router = express.Router();

const getChangedValues = (data, key, result) => {
  if (typeof data === 'object' && !Array.isArray(data) && data !== null) {
    const oldValue = data.from;
    const newValue = data.to;
    if (oldValue && newValue) {
      result.push(`${key} from ${oldValue} to ${newValue}`);
    } else if (newValue) {
      result.push(`${key} created as ${newValue}`);
    }
  } else {
    data.forEach((d, i) => {
      // eslint-disable-next-line no-restricted-syntax
      for (const k in d) {
        // eslint-disable-next-line no-prototype-builtins
        if (d.hasOwnProperty(k)) {
          if (k.includes(EXCLUDES_KEY)) {
            return;
          }
          getChangedValues(d[k], `${key}[${i}].${k}`, result);
        }
      }
    });
  }
};

router.get('/:table/:id/histories', (req, res, next) => {
  const historyList = [];

  Audit.find({ entity_id: ObjectId(req.params.id), entity: 'Deal' })
    .then((histories) => {
      histories.forEach((history) => {
        const changedValues = [];
        const changedFields = [];
        getChangedValues(history.changes, '', changedValues);
        // eslint-disable-next-line no-restricted-syntax
        for (const key in history.changes) {
          // eslint-disable-next-line no-prototype-builtins
          if (history.changes.hasOwnProperty(key)) {
            if (key.includes(EXCLUDES_KEY)) {
              return;
            }
            getChangedValues(history.changes[key], key, changedValues);
          }
        }
        const comment = `modified ${changedFields.concat(changedValues).join(', ')}`;
        historyList.push({
          changedBy: history.user,
          changedAt: history.created_at,
          changedData: changedValues,
          comment,
        });
      });

      res.json(historyList);
    })
    .catch(next);
});

module.exports = router;
