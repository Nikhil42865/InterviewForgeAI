const { GoogleGenerativeAI} = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
    model : "gemini-2.5-flash",
});

const evaluateAnswerWithAI = async(question, answer) =>{
    const prompt = `You are an experienced technical interviewer.

    Question:
    ${question}

    Candidate Answer:
    ${answer}

    Evaluate the answer.

    Return ONLY valid JSON in this format:

    {
    "score": 0-10,
    "feedback": "Short feedback",
    "strengths": ["point1", "point2"],
    "improvements": ["point1", "point2"],
    "idealAnswer": "Ideal answer"
    }`;

    const result = await model.generateContent(prompt);

    const response = await result.response;

    let text = response.text();

    text = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

    return JSON.parse(text);
};

module.exports = {
    evaluateAnswerWithAI,
}