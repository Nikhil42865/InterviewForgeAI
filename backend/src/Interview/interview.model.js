const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        resume: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Resume",
            required: true,
        },

        questions: [
            {
                skill: String,
                question: String,
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model(
    "Interview",
    interviewSchema
);