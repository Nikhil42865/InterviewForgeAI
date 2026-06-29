require("dotenv").config({
    path: "../../.env",
});

const { evaluateAnswerWithAI } = require("./gemini");

(async () => {

    const result = await evaluateAnswerWithAI(
        "What is a closure in JavaScript?",
        "A closure is a function that remembers variables from its lexical scope."
    );

    console.log(result);

})();