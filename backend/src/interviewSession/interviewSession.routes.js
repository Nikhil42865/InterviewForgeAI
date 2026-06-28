const express = require('express');
const router = express.Router();
const { protect } = require('../modules/auth/auth.middleware');
const { startSession, submitAnswer, finishInterview } = require('./interviewSession.controller');

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

router.post(
    "/:sessionId/finish",
    protect,
    finishInterview
);

module.exports = router;