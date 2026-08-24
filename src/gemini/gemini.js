// import { GoogleGenAI } from "@google/genai";

//  const ai=new GoogleGenAI({apiKey:import.meta.env.VITE_GEMINI_API_KEY});
// //  export async function gemini(input, setError) {
// //     try{
// //     const response=await ai.models.generateContent({
// //         model:"gemini-2.5-pro",
// //         contents:input,
// //     })
// //     return response.text;
// // }
// // catch(error){
// //     setError("An Error Occured")

// // }
// //  }

// //  main()

// //  const prompt= `
// //  You are an expert AI evaluator analyzing candidate's interview or test performance.
// //  Input details:
 
// //  ${}

// //  Your task:
// //  Generate a structurec and personalized performance report in JSON format with the following
// //  {
// //  "score":"numeric score out 100 based on overall performance",
// //  "positives":"list of strong points in concise bullet style",
// //  "negatives: "list of weak points in concise bullet style",
// //  "analysis":"detailed paragraph explaining reasoning behind,score,improvement areas, and"
// //  }

// //  Scoring logic:
// //  -Consider accuracy, clarity , confidence and technical technique dept.
// //  -Be fair and specific - avoid genric statements.
// //  -Keep tone professional but slightly motivating.

// //  Output format:
// //  Return Only the JSON object, no extra text.
// //  Example:
// // {
// // "score":78,
// // "positives":["Good understanding of Python fundamentals","Clen code structure"],
// // "negatives:["Needs stronger backend API design","Missed optimization"],
// // "analysis":"You demonstrate a solid grasp of Python,but struggled with React architecture"
// // }

// //  `;


//   export async function gemini(input, setError) {
//     try{
//     const response=await ai.models.generateContent({
//         model:"gemini-2.5-pro",
//         contents:`
//  You are an expert AI evaluator analyzing candidate's interview or test performance.
//  Input details:
 
//  ${input}

//  Your task:
//  Generate a structurec and personalized performance report in JSON format with the following
//  {
//  "score":"numeric score out 100 based on overall performance",
//  "positives":"list of strong points in concise bullet style",
//  "negatives: "list of weak points in concise bullet style",
//  "analysis":"detailed paragraph explaining reasoning behind,score,improvement areas, and"
//  }

//  Scoring logic:
//  -Consider accuracy, clarity , confidence and technical technique dept.
//  -Be fair and specific - avoid genric statements.
//  -Keep tone professional but slightly motivating.

//  Output format:
//  Return Only the JSON object, no extra text.
//  Example:
// {
// "score":78,
// "positives":["Good understanding of Python fundamentals","Clen code structure"],
// "negatives:["Needs stronger backend API design","Missed optimization"],
// "analysis":"You demonstrate a solid grasp of Python,but struggled with React architecture"
// }

//  `,
//     })
//     return response.text;
// }
// catch(error){
//     setError("An Error Occured")

// }
//  }

//  main()



import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

export async function gemini(input, setError) {
    console.log("Gemini function started");

    try {
        if (!apiKey) {
            throw new Error(
                "Gemini API key is missing. Check your .env.local file."
            );
        }

        console.log("Gemini API key found");

        const ai = new GoogleGenAI({
            apiKey: apiKey
        });

        console.log("Gemini client created");

        const response = await ai.models.generateContent({
            model: "gemini-3.6-flash",

            contents: `
You are an expert professional resume evaluator.

Analyze the candidate's resume below.

CANDIDATE RESUME:

${input}

Return ONLY a valid JSON object using exactly this structure:

{
    "score": 78,
    "positives": [
        "Strong technical foundation",
        "Good project experience",
        "Clear career direction"
    ],
    "negatives": [
        "Needs more professional experience",
        "Some technical areas need greater depth"
    ],
    "analysis": "Detailed personalized analysis of the candidate's resume."
}

Evaluation requirements:

1. score must be a number from 0 to 100.
2. positives must be an array of strings.
3. negatives must be an array of strings.
4. analysis must be a string.
5. Evaluate the actual resume content.
6. Consider education, technical skills, projects, experience, problem-solving ability and career readiness.
7. Give specific feedback rather than generic statements.
8. Keep the analysis professional and constructive.

IMPORTANT:

Return ONLY the JSON object.

Do NOT use markdown.
Do NOT use code fences.
Do NOT add text before the JSON.
Do NOT add text after the JSON.
`
        });

        console.log("Raw Gemini response:", response.text);

        if (!response.text) {
            throw new Error("Gemini returned an empty response.");
        }

        let cleanedResponse = response.text.trim();

        if (cleanedResponse.startsWith("```json")) {
            cleanedResponse = cleanedResponse
                .replace(/^```json/, "")
                .replace(/```$/, "")
                .trim();
        }

        console.log("Cleaned Gemini response:", cleanedResponse);

        const result = JSON.parse(cleanedResponse);

        console.log("Parsed Gemini result:", result);

        if (
            typeof result.score !== "number" ||
            !Array.isArray(result.positives) ||
            !Array.isArray(result.negatives) ||
            typeof result.analysis !== "string"
        ) {
            throw new Error(
                "Gemini returned an invalid report format."
            );
        }

        return result;

    } catch (error) {
        console.error("Gemini error:", error);

        if (error?.status === 429) {
            setError(
                "Gemini API quota exceeded. Please check your Gemini API plan and quota."
            );
        } else {
            setError(
                error?.message ||
                "An error occurred while analyzing the resume."
            );
        }

        return null;
    }
}