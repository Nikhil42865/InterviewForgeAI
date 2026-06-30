require("dotenv").config();

const {
    generateInterviewReport,
} = require("./reportGenerator");

async function run() {

    const responses = [

        {
            question: "What is Closure?",
            answer:
                "A closure remembers variables from lexical scope.",
            score: 9,
        },

        {
            question: "Explain Event Loop.",
            answer:
                "Node.js uses an event loop to handle asynchronous tasks.",
            score: 8,
        },

        {
            question: "Explain MongoDB Aggregation.",
            answer:
                "Aggregation is used for processing documents.",
            score: 6,
        }

    ];

    const report =
        await generateInterviewReport(responses);

    console.log(report);
}

run();