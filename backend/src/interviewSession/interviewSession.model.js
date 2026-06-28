const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
    questionId: mongoose.Schema.Types.ObjectId,

    question : {
        type : String,
        required : true,
    },

    answer : {
        type : String,
        default : "",
    },

    score : {
        type : Number,
        default : 0,
    },

    feedback : {
        type : String,
        default : "",
    },
});

const interviewSessionSchema = new mongoose.Schema({
    interview : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Interview",
        required : true,
    },

    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },

    responses : [responseSchema],
    
    totalScore : {
        type : Number,
        default : 0,
    },

    isCompleted: {
        type: Boolean,
        default: false,
    },

    totalScore: {
        type: Number,
        default: 0,
    },

    averageScore: {
        type: Number,
        default: 0,
    },
},
{
    timestamps : true,
})

module.exports = mongoose.model("InterviewSession", interviewSessionSchema);