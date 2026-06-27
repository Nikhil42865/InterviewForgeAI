const express = require('express');
const router = express.Router();
const { protect } = require('../modules/auth/auth.middleware');
const { startSession, submitAnswer } = require('./interviewSession.controller');

router.post(
    '/start/:interviewId',
    protect,
    startSession
);

router.put(
    "/:sessionId/answer",
    protect,
    submitAnswer
);

module.exports = router;