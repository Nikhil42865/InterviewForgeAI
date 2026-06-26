const asyncHandler = require('express-async-handler');
const pdf = require('pdf-parse');
const fs = require('fs');
const Resume = require('./resume.model');
const { extractSkills } = require('./resume.service');

const uploadResume = asyncHandler(async (req, res) =>{
    res.status(200).json({
        success : true,
        file : req.file,
        message : "Resume Uploaded Successfully",
    });
});

const uploadResumeFile = asyncHandler(async(req, res) =>{
    console.log(pdf);
    console.log(req.file);
    const filePath = req.file.path;
    const dataBuffer = fs.readFileSync(filePath);

    const data = await pdf(dataBuffer);

    res.status(200).json({
        success : true,
        text : data.text,
    });

    // console.log("req.file =", req.file);
    // console.log("req.body =", req.body);

    // res.status(200).json({
    //     success: true,
    //     file: req.file,
    //     body: req.body,
    // });

});

const resumeController = asyncHandler(async (req, res) => {

    if (!req.file) {
        const error = new Error("Resume file is required");
        error.statusCode = 400;
        throw error;
    }

    const dataBuffer = fs.readFileSync(req.file.path);

    const data = await pdf(dataBuffer);

    const resume = await Resume.create({
        user: req.user._id,
        originalFileName: req.file.originalname,
        filePath: req.file.path,
        extractedText: data.text,
    });

    res.status(201).json({
        success: true,
        resumeId: resume._id,
    });

});

const getMyResume = asyncHandler(async (req, res) => {
    const resume = await Resume.find({
        user : req.user._id
    });

    res.status(200).json({
        success : true,
        count : resume.length,
        resume,
    })
});

const getResumeById = asyncHandler(async (req, res) =>{
    const resume = await Resume.findById(
        req.params.id
    );

    if(!resume){
        const error = new Error("Resume Not Found");
        error.statusCode = 404;
        throw error;
    };

    if(resume.user.toString() !== req.user._id.toString()){
        const error = new Error("Unauthorized Access");
        error.statusCode = 403;
        throw error;
    };

    res.status(200).json({
        success : true,
        resume,
    });
});

const extractResumeSkills = asyncHandler(async (req, res) =>{
     const resume =
        await Resume.findById(
            req.params.id
        );

    if (!resume) {
        const error =
            new Error(
                "Resume not found"
            );

        error.statusCode = 404;

        throw error;
    }

    if (
        resume.user.toString() !==
        req.user._id.toString()
    ) {
        const error = new Error(
            "Unauthorized Access"
        );

        error.statusCode = 403;

        throw error;
    }

    const skills =
        extractSkills(
            resume.extractedText
        );

    resume.skills = skills;

    await resume.save();

    res.status(200).json({
        success: true,
        skills,
    });
});

module.exports = {
    uploadResume,
    uploadResumeFile,
    resumeController,
    getMyResume,
    getResumeById,
    extractResumeSkills,
};