const asyncHandler = require('express-async-handler');
const Interview = require('../Interview/interview.model');
const InterviewSession = require('./interviewSession.model');

const startSession = asyncHandler(async(req, res) =>{
    const interview = await Interview.findById(req.params.interviewId);

    if(!interview){
        const error = new Error("Interview not found");
        error.statusCode = 404;
        throw error;
    }

    if(interview.user.toString() !== req.user._id.toString()){
        const error = new Error("Unauthorized Access");
        error.statusCode = 403;
        throw error;
    }

    const responses = interview.questions.map((item) => ({
        question : item.question,
    }));

    const session = await InterviewSession.create({
        interview : interview._id,
        user : req.user._id,
        responses,
    });

    res.status(201).json({
        success : true,
        sessionId : session._id,
    });
});

module.exports = {
    startSession,
}