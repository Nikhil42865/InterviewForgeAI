const evaluateAnswer = (question , answer) =>{
    let score = 0;
    let feedback = "";

    if(!answer || answer.trim() === ""){
        return {
            score: 0,
            feedback: "No answer provided",

        };
    }

    if(answer.length > 20){
        score += 3;
    }

    if(answer.toLowerCase().includes("function")){
        score += 2;
    }

     if (
        answer.toLowerCase().includes("scope")
    ) {
        score += 2;
    }

    feedback =
        score >= 8
            ? "Excellent answer."
            : score >= 5
            ? "Good answer, but can be improved."
            : "Needs improvement.";


    return {
        score,
        feedback
    };
};

module.exports = {
    evaluateAnswer,
}