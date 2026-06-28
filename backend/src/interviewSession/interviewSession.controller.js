const asyncHandler = require('express-async-handler');
const Interview = require('../Interview/interview.model');
const InterviewSession = require('./interviewSession.model');
const {evaluateAnswer} = require('./evaluator');

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
        questionId : item._id,
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

const submitAnswer = asyncHandler(async  (req, res)=>{
    const {questionId, answer} = req.body;

    const session = await InterviewSession.findById( req.params.sessionId);

    if(!session){
        const error = new Error("Session not found");
        error.statusCode = 404;
        throw error;
    }

    if(session.user.toString() !== req.user._id.toString()){
        const error = new Error("Unauthorized Access");
        error.statusCode = 403;
        throw error;
    }

    const response = session.responses.id(questionId);

    if(!response){
        const error = new Error("Question not found");
        error.statusCode = 404;
        throw error;
    }

    response.answer = answer;

    const result = evaluateAnswer(
        response.question,
        answer
    );

    response.score = result.score;
    response.feedback = result.feedback;

    await session.save();

    res.status(200).json({
        success : true,
        message : "Answer submitted successfully",
        response
    });
});

const finishInterview = asyncHandler(async (req, res) =>{
    const session = await InterviewSession.findById(req.params.sessionId);

    if(!session){
        const error = new Error("Session not found");
        error.statusCode = 404;
        throw error;
    }

    if(session.user.toString() !== req.user._id.toString()){
        const error = new Error("Unauthorized Access");
        error.statusCode =  403;
        throw error;
    }

    let totalScore = 0;
    let answeredQuestions = 0;

   for (const response of session.responses) {

        if (response.answer.trim() !== "") {

            totalScore += response.score;
            answeredQuestions++;

        }

    }

   const averageScore =
    answeredQuestions > 0
        ? totalScore / answeredQuestions
        : 0;

    session.totalScore = totalScore;
    session.averageScore = averageScore;
    session.isCompleted = true;

    await session.save();

    res.status(200).json({
        success : true,
        message : "Interview session completed",
        result : {
            totalScore,
            averageScore,
            answeredQuestions,
            questionsAnswered : session.responses.length,
        },
    });
});

module.exports = {
    startSession,
    submitAnswer,
    finishInterview,
}