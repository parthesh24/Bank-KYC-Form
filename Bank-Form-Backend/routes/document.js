// Install multer first:
// npm install multer

const express = require('express');
const multer = require('multer');
const { getDocuments, addDocuments } = require('../controllers/documentControllers');
const router = express.Router();

// Configure multer for file upload
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// Create middleware to handle multiple files
const uploadFields = upload.fields([
  { name: 'customerphoto', maxCount: 1 },
  { name: 'customersignature', maxCount: 1 },
  { name: 'aadharcardimage', maxCount: 1 },
  { name: 'addressproof', maxCount: 1 },
  { name: 'otherdocuments', maxCount: 1 }
]);

router.post('/:userid', uploadFields, addDocuments);
router.get('/:userid', getDocuments);

module.exports = router;