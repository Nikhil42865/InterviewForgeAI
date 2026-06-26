const express = require('express');
const {protect} = require('../modules/auth/auth.middleware');

const router = express.Router();

const { upload } = require('../config/multer');
const { uploadResume,uploadResumeFile, resumeController, getMyResume, getResumeById, extractResumeSkills } = require('./resume.controller');

router.post(
    '/upload',
    protect,
    upload.single('resume'),
    resumeController
);

router.get(
    '/me',
    protect,
    getMyResume
);

router.get(
    '/:id',
    protect,
    getResumeById
);

router.get(
    '/:id/extract-skills',
    protect,
    extractResumeSkills
);

module.exports = router;