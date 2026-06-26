const express = require('express');
const { createInterview, getInterviewById, getMyInterviews, deleteInterview } = require('./interview.controller');
const { protect } = require('../modules/auth/auth.middleware');

const router = express.Router();

router.post(
    "/generate/:resumeId",
    protect,
    createInterview
);

router.get(
    "/:interviewId",
    protect,
    getInterviewById,
);

router.get(
    "/",
    protect,
    getMyInterviews
);

router.delete(
    "/:interviewId",
    protect,
    deleteInterview
);

module.exports = router;