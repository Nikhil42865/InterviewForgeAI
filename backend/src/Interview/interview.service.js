const questionBank = require("./questions");

const generateQuestions = (skills) => {

    const questions = [];

    for (const skill of skills) {

        if (questionBank[skill]) {

            for (const question of questionBank[skill]) {

                questions.push({
                    skill,
                    question,
                });
            }
        }
    }

    return questions;
};

module.exports = {
    generateQuestions,
};