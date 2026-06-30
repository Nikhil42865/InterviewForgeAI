const Resume = require('../resume/resume.model');

const Interview = require('./interview.model');

const { generateQuestionWithAI } = require('../AI/questionGenerator');

const {generateQuestions} = require('./interview.service');
const asyncHandler = require('express-async-handler');

const createInterview = asyncHandler(async (req, res) => {
    const resume = await Resume.findById(req.params.resumeId);

    if(!resume){
        throw new Error("Resume not found");
    }

    const questions = await generateQuestionWithAI(resume.extractedText);

    const interview = await Interview.create({
        user : req.user._id,
        resume : resume._id,
        questions,
    });

    res.status(201).json({
        success : true,
        interview,
    });
});

const getInterviewById = asyncHandler(async (req, res) =>{
    const interview = await Interview.findById(req.params.interviewId);

    if(!interview){
        const error = new Error("Interview not found");
        error.statusCode = 404;
        throw error;
    }
    if(interview.user.toString() !== req.user._id.toString()){
        const error = new Error("Unauthorized access");
        error.statusCode = 403;
        throw error;
    }

    res.status(200).json({
        success : true,
        interview,
    });
});

const getMyInterviews = asyncHandler(async (req, res) =>{
    const interviews = await Interview.find({
        user : req.user._id,
    });

    res.status(200).json({
        success : true,
        count : interviews.length,
        interviews,
    });
});

const deleteInterview = asyncHandler(async (req, res) =>{
    const interview = await Interview.findById(req.params.interviewId);

    if(!interview){
        const error = new Error("Interview not found");
        error.statusCode = 404;
        throw error;
    }

    if(interview.user.toString() !== req.user._id.toString()){
        const error = new Error("Unauthorized access");
        error.statusCode = 403;
        throw error;
    }

    await interview.deleteOne();

    res.status(200).json({
        success : true,
        message : "Interview deleted Successfully",
    });
});

module.exports = {
    createInterview,
    getInterviewById,
    getMyInterviews,
    deleteInterview
}