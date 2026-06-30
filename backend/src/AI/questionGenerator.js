const {GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
    model : "gemini-2.5-flash",
});

const generateQuestionWithAI = async(resumeText) => {
    const prompt = `
    You are a senior software engineering interviewer.

    Below is a candidate's resume.

    Resume:
    ${resumeText}

    Generate 15 interview questions.

    Rules:
    - Questions must match the candidate's skills.
    - Mix easy, medium and hard questions.
    - Include DSA only if resume suggests it.
    - Include backend/frontend/database questions where applicable.

    Return ONLY valid JSON.

    Format:

    [
    {
        "skill":"JavaScript",
        "question":"Explain closures."
    }
    ]
    `;

    const result = await model.generateContent(prompt);
    
    const response = await result.response;

    let text = response.text();

    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    return JSON.parse(text);

}

module.exports = {
    generateQuestionWithAI,
}