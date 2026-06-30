const { GoogleGenerativeAI} = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
    model : "gemini-2.5-flash",
});

const generateInterviewReport = async( responses )=>{
    const prompt = `
    You are a Senior Technical Interviewer.

    Below are interview responses.

    ${JSON.stringify(responses, null, 2)}

    Analyze the candidate.

    Return ONLY valid JSON.

    {
        "technicalLevel":"Beginner | Intermediate | Advanced",
        "strengths":[
            "...",
            "..."
        ],
        "weaknesses":[
            "...",
            "..."
        ],
        "studyPlan":[
            "...",
            "..."
        ],
        "hiringRecommendation":"Hire | Consider | Reject",
        "summary":"Short paragraph"
    }
    `;

    const result = await model.generateContent(prompt);

    const response = await result.response;

    let text = response.text();

    text = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    return JSON.parse(text);
}

module.exports = {
    generateInterviewReport,
}