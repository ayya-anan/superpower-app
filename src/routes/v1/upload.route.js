const express = require('express');
const uploadController = require('../../controllers/upload.controller');

const router = express.Router();

const upload = require('../../utils/fileparser');

router.post('/', upload.array('files'), uploadController.createUpload);
router.get('/:type/:id', uploadController.getUploads);
router.route('/:uploadId').delete(uploadController.deleteUpload);

module.exports = router;
