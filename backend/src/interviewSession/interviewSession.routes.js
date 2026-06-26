const express = require('express');
const router = express.Router();
const { protect } = require('../modules/auth/auth.middleware');
const { startSession } = require('./interviewSession.controller');

router.post(
    '/start/:interviewId',
    protect,
    startSession
),

module.exports = router;