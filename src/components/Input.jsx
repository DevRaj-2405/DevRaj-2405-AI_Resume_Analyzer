// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom';

// export default function Input() {
//     const navigate=useNavigate();
    
//     const [input,setInput]=useState("");
//     const[loading,setLoading]=useState(false);
//     const[error,setError]=useState("network error")
//     async function submit(){
        
//             setLoading(true)
//        const res= await gemini(input,setError)
//        setLoading(false)
//        localStorage.setItem('input',JSON.stringify(res));
//        navigate('/report')
        
       

//     }
//   return (
//     <div className="flex flex-col justify-center items-center">

//       <textarea
//         name="userInput"
//         id="userInput"
//         value={input}
//         onChange={(e)=>setInput (e.target.value)}
//         className="text-center font-light border-4 border-blue-500 w-[90vw] h-[30vh] rounded-4xl p-10"
//       />

//        {error && <div 
  
//       className=' p-6  text-red-900 rounded-4xl text-3xl'
//       >

      
//       {error}
//       </div>}

//     </div>

//       <button onSubmit={submit} className="m-6 p-6 border bg-blue-500 text-white rounded-4xl"
//       disabled={loading}
//       >
//         Submit Your Resume
//       </button>

    
//   );
// }




// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom';

// export default function Input() {
//     const navigate = useNavigate();
    
//     const [input, setInput] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     async function submit() {
       

//         setLoading(true);
//         const res = await gemini(input, setError);
//         setLoading(false);
//         localStorage.setItem('input', JSON.stringify(res));
//         navigate('/report');
//     }

//     return (
//         <div className="flex flex-col justify-center items-center">

//             <textarea
//                 name="userInput"
//                 id="userInput"
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 className="text-center font-light border-4 border-blue-500 w-[90vw] h-[30vh] rounded-4xl p-10"
//             />

//             {error && (
//                 <div className="p-6 text-red-900 rounded-4xl text-3xl">
//                     {error}
//                 </div>
//             )}

//             <button
//                 onClick={submit}
//                 className="m-6 p-6 border bg-blue-500 text-white rounded-4xl"
//                 disabled={loading}
//             >
//                 Submit Your Resume
//             </button>

//         </div>
//     );
// }




// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom';
// import { gemini } from '../gemini/gemini'
// export default function Input() {
//     const navigate = useNavigate();
    
//     const [input, setInput] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     async function submit() {
       
//         setLoading(true);

//         const res = await gemini(input, setError);

//         setLoading(false);

//         localStorage.setItem('input', JSON.stringify(res));

//         navigate('/report');
//     }

//     return (
//         <div className="flex flex-col justify-center items-center">

//             <textarea
//                 name="userInput"
//                 id="userInput"
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 className="text-center font-light border-4 border-blue-500 w-[90vw] h-[30vh] rounded-4xl p-10"
//             />

//             {error && (
//                 <div className="p-6 text-red-900 rounded-4xl text-3xl">
//                     {error}
//                 </div>
//             )}

//             <button
//                 onClick={submit}
//                 className="m-6 p-6 border bg-blue-500 text-white rounded-4xl"
//                 disabled={loading}
//             >
//                 {loading ? "Analyzing..." : "Submit Your Resume"}
//             </button>

//         </div>
//     );
// }


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { gemini } from "../gemini/gemini";
import {
    BsFileEarmarkText,
    BsStars,
    BsArrowRight,
    BsShieldCheck
} from "react-icons/bs";

export default function Input() {
    const navigate = useNavigate();

    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function submit() {
        if (!input.trim()) {
            setError("Please enter your resume first.");
            return;
        }

        setError(null);
        setLoading(true);

        try {
            console.log("Sending resume to Gemini...");

            const res = await gemini(input, setError);

            console.log("Gemini result received:", res);

            if (!res) {
                setLoading(false);
                return;
            }

            localStorage.setItem("input", JSON.stringify(res));

            console.log("Result saved to localStorage");
            console.log("Going to report page...");

            setLoading(false);

            navigate("/report");
        } catch (error) {
            console.error("Submit error:", error);

            setError(
                error.message ||
                    "Something went wrong while analyzing the resume."
            );

            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-10">

            {/* Heading */}
            <div className="text-center mb-8 sm:mb-10">

                <div className="flex justify-center mb-4">
                    <div className="p-4 rounded-2xl bg-blue-100 text-blue-600">
                        <BsFileEarmarkText className="text-3xl sm:text-4xl" />
                    </div>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-700">
                    Analyze Your Resume
                </h1>

                <p className="mt-3 text-sm sm:text-base lg:text-lg text-gray-500 max-w-2xl mx-auto">
                    Paste your resume below and let AI analyze your strengths,
                    weaknesses and overall resume quality.
                </p>

            </div>


            {/* Input Container */}
            <div className="w-full max-w-4xl">

                <div className="bg-white rounded-3xl shadow-xl border border-blue-100 p-4 sm:p-6 lg:p-8">

                    <textarea
                        name="userInput"
                        id="userInput"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Paste your resume here..."
                        className="
                            w-full
                            h-64
                            sm:h-72
                            lg:h-80
                            resize-none
                            rounded-2xl
                            border-2
                            border-blue-200
                            focus:border-blue-500
                            focus:ring-4
                            focus:ring-blue-100
                            outline-none
                            p-4
                            sm:p-6
                            text-sm
                            sm:text-base
                            lg:text-lg
                            text-gray-700
                            transition-all
                        "
                    />

                    {/* Character hint */}
                    <div className="flex justify-between items-center mt-3 px-1">

                        <p className="text-xs sm:text-sm text-gray-400">
                            Paste your complete resume for better analysis.
                        </p>

                        <p className="text-xs sm:text-sm text-gray-400">
                            {input.length} characters
                        </p>

                    </div>


                    {/* Error */}
                    {error && (
                        <div className="mt-5 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm sm:text-base">
                            {error}
                        </div>
                    )}


                    {/* Submit Button */}
                    <button
                        onClick={submit}
                        disabled={loading}
                        className="
                            mt-6
                            w-full
                            sm:w-auto
                            sm:min-w-[240px]
                            mx-auto
                            flex
                            justify-center
                            items-center
                            gap-3
                            px-6
                            py-4
                            rounded-2xl
                            bg-blue-600
                            hover:bg-blue-700
                            active:scale-[0.98]
                            disabled:opacity-60
                            disabled:cursor-not-allowed
                            text-white
                            font-semibold
                            text-sm
                            sm:text-base
                            transition-all
                            duration-200
                        "
                    >
                        {loading ? (
                            <>
                                <BsStars className="animate-pulse text-xl" />
                                Analyzing...
                            </>
                        ) : (
                            <>
                                <BsStars className="text-xl" />
                                Submit Your Resume
                                <BsArrowRight className="text-xl" />
                            </>
                        )}
                    </button>

                </div>


                {/* Features */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">

                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-blue-50">
                        <BsStars className="text-blue-600 text-xl shrink-0" />
                        <div>
                            <p className="font-semibold text-gray-700 text-sm">
                                AI Analysis
                            </p>
                            <p className="text-xs text-gray-500">
                                Intelligent resume evaluation
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-green-50">
                        <BsShieldCheck className="text-green-600 text-xl shrink-0" />
                        <div>
                            <p className="font-semibold text-gray-700 text-sm">
                                Detailed Feedback
                            </p>
                            <p className="text-xs text-gray-500">
                                Strengths and weaknesses
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-purple-50 sm:col-span-2 lg:col-span-1">
                        <BsFileEarmarkText className="text-purple-600 text-xl shrink-0" />
                        <div>
                            <p className="font-semibold text-gray-700 text-sm">
                                Resume Score
                            </p>
                            <p className="text-xs text-gray-500">
                                Get an overall resume rating
                            </p>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    );
}