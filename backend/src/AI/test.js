require("dotenv").config({
    path: "../../.env",
});

const Resume = require("../resume/resume.model");
const mongoose = require("mongoose");

const {
    generateQuestionWithAI,
} = require("./questionGenerator");

async function run() {

    await mongoose.connect(process.env.MONGO_URI);

    const resume = await Resume.findOne();

    const questions = await generateQuestionWithAI(
        resume.extractedText
    );

    console.log(questions);
}

run();