// import React, { useEffect, useState } from 'react'

// export default function Report() {
 
//     function extract (){
//         let input=localStorage.getItem('input')
//          input=input.replace(/```json/g,"").replace(/```/g,"")
//           input= JSON.parse(input);
//           console.log(input)
//           input=JSON.parse(input);
//           input=JSON.parse(input);

//           console.log(typeof input,"input res type")

//         setData({
//             score:input.score,
//             positives:input.positives,
//             negatives:input.negatives,
//             analysis:input.analysis

//         })
//     }

// const [data,setData]=useState({
//      score:input.score,
//             positives:[],
//             negatives:[],
//             analysis:''

// })

//     useEffect(()=>{
//         extract()

//     },[])
//   return (
//     <div className="text-white h-screen p-4">

//       <div className="p-6 w-[50%] m-auto font-bold rounded-3xl text-6xl text-center bg-white text-blue-700 border-2">
//         Report
//       </div>

//       <div className="h-[30vh] m-10 flex justify-around text-black ">

//         <div className="w-[30%] h-full m-2 bg-blue-400 rounded-full p-16">
//           <h1 className="font-bold text-center">
//             Total Marks
//           </h1>

//           <p className="text-center text-7xl">
//             {data.score}/100
//           </p>
//         </div>

//         <div className="w-[70%] h-full m-2 text-blue-600 font-bold border-4 p-10 flex flex-col justify-center items-stretch gap-8 rounded-3xl">

//          <div className="w-full min-h-[50%] border-b-2 pb-6 overflow-scroll">
//             <h1 className="font-bold text-center text-lg">
//               Positives
//             </h1>

//             <p className="text-center text-md">{
//                 data?.positives.map((val)=><li>{val}</li>)
//                 }
             
//             </p>
//           </div>

//           <div className="text-red-600 font-bold w-full min-h-[50%] overflow-scroll">
//             <h1 className="font-bold text-center text-lg">
//               Negatives
//             </h1>

//             <p className="text-center text-md">
//              {
//                 data?.negatives.map((val)=><li>{val}</li>)
//              }
//             </p>
//           </div> 

//         </div>
//       </div>

//       <div className="text-black w-full h-[40%] text-center">
        
//         <h1 className='font-bold text-center text-lg m-10'>Detailed Analysis</h1>
//         <p className='font-medium '>{
//           data.analysis}
//         </p>
//       </div>

//     </div>
//   )
// }





// import React, { useEffect, useState } from "react";

// export default function Report() {

//     const [data, setData] = useState({
//         score: 0,
//         positives: [],
//         negatives: [],
//         analysis: ""
//     });

//     useEffect(() => {

//         const storedInput = localStorage.getItem("input");

//         console.log("Stored input from localStorage:", storedInput);

//         if (!storedInput) {
//             console.log("No input found in localStorage");
//             return;
//         }

//         try {

//             let input = JSON.parse(storedInput);

//             console.log("After first JSON.parse:", input);
//             console.log("Type:", typeof input);

//             while (typeof input === "string") {

//                 input = input
//                     .replace(/```json/g, "")
//                     .replace(/```/g, "")
//                     .trim();

//                 try {
//                     input = JSON.parse(input);
//                 } catch (error) {
//                     console.error("Could not parse Gemini string:", error);
//                     break;
//                 }
//             }

//             console.log("Final report data:", input);

//             if (!input || typeof input !== "object") {
//                 console.error("Invalid report data:", input);
//                 return;
//             }

//             const score = Number(input.score) || 0;

//             const positives = Array.isArray(input.positives)
//                 ? input.positives
//                 : [];

//             const negatives = Array.isArray(input.negatives)
//                 ? input.negatives
//                 : [];

//             const analysis = input.analysis
//                 ? String(input.analysis)
//                 : "";

//             setData({
//                 score,
//                 positives,
//                 negatives,
//                 analysis
//             });

//         } catch (error) {

//             console.error("Report Error:", error);

//         }

//     }, []);

//     return (
//         <div className="text-white min-h-screen p-4">

//             {/* REPORT TITLE */}

//             <div className="p-6 w-[50%] m-auto font-bold rounded-3xl text-6xl text-center bg-white text-blue-700 border-2">
//                 Report
//             </div>


//             {/* SCORE + POSITIVE/NEGATIVE */}

//             <div className="h-[30vh] m-10 flex justify-around text-black">


//                 {/* SCORE */}

//                 <div className="w-[30%] h-full m-2 bg-blue-400 rounded-full p-16 flex flex-col justify-center">

//                     <h1 className="font-bold text-center">
//                         Total Marks
//                     </h1>

//                     <p className="text-center text-7xl">
//                         {data.score}/100
//                     </p>

//                 </div>


//                 {/* POSITIVE + NEGATIVE BOX */}

//                 <div className="w-[70%] h-full m-2 text-blue-600 font-bold border-4 p-6 flex flex-col rounded-3xl">


//                     {/* POSITIVES */}

//                     <div className="h-1/2 w-full flex flex-col justify-center border-b-2 overflow-y-auto">

//                         <h1 className="font-bold text-center text-lg mb-3">
//                             Positives
//                         </h1>

//                         <ul className="text-center text-md">

//                             {data.positives.length > 0 ? (

//                                 data.positives.map((val, index) => (
//                                     <li key={index}>
//                                         {val}
//                                     </li>
//                                 ))

//                             ) : (

//                                 <li>
//                                     No positive points available.
//                                 </li>

//                             )}

//                         </ul>

//                     </div>


//                     {/* NEGATIVES */}

//                     <div className="h-1/2 w-full flex flex-col justify-center text-red-600 overflow-y-auto">

//                         <h1 className="font-bold text-center text-lg mb-3">
//                             Negatives
//                         </h1>

//                         <ul className="text-center text-md">

//                             {data.negatives.length > 0 ? (

//                                 data.negatives.map((val, index) => (
//                                     <li key={index}>
//                                         {val}
//                                     </li>
//                                 ))

//                             ) : (

//                                 <li>
//                                     No negative points available.
//                                 </li>

//                             )}

//                         </ul>

//                     </div>

//                 </div>

//             </div>


//             {/* DETAILED ANALYSIS */}

//             <div className="text-black w-full min-h-[40%] text-center">

//                 <h1 className="font-bold text-center text-lg m-10">
//                     Detailed Analysis
//                 </h1>

//                 <p className="font-medium">
//                     {data.analysis || "No detailed analysis available."}
//                 </p>

//             </div>

//         </div>
//     );
// }



import React, { useEffect, useState } from "react";

export default function Report() {

    const [data, setData] = useState({
        score: 0,
        positives: [],
        negatives: [],
        analysis: ""
    });

    useEffect(() => {

        const storedInput = localStorage.getItem("input");

        console.log("Stored report:", storedInput);

        if (!storedInput) {
            return;
        }

        try {

            const input = JSON.parse(storedInput);

            console.log("Report data:", input);

            setData({
                score: input.score || 0,
                positives: Array.isArray(input.positives)
                    ? input.positives
                    : [],
                negatives: Array.isArray(input.negatives)
                    ? input.negatives
                    : [],
                analysis: input.analysis || ""
            });

        } catch (error) {

            console.error("Report Error:", error);

        }

    }, []);


    return (

        <div className="min-h-screen bg-slate-950 text-white px-4 py-8 sm:px-6 md:px-10">

            <div className="max-w-6xl mx-auto">


                {/* Header */}

                <div className="text-center mb-8 sm:mb-10 md:mb-12">

                    <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 px-4 py-2 rounded-full mb-5">

                        <span className="text-blue-400 text-lg">
                            ✦
                        </span>

                        <span className="text-blue-400 text-sm sm:text-base font-semibold">
                            AI Resume Analysis
                        </span>

                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4">
                        Resume Report
                    </h1>

                    <p className="text-slate-400 text-sm sm:text-base md:text-lg">
                        Here's what our AI found in your resume.
                    </p>

                </div>


                {/* SCORE */}

                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 mb-6 sm:mb-8 shadow-xl">

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-8">

                        <div className="text-center sm:text-left">

                            <p className="text-slate-400 text-sm sm:text-base mb-2">
                                Overall Resume Score
                            </p>

                            <h2 className="text-xl sm:text-2xl font-bold">
                                Resume Strength
                            </h2>

                        </div>


                        <div className="flex items-center justify-center">

                            <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full border-[10px] sm:border-[12px] border-blue-500/20 flex items-center justify-center">

                                <div className="text-center">

                                    <p className="text-4xl sm:text-5xl font-bold text-blue-400">
                                        {data.score}
                                    </p>

                                    <p className="text-slate-500 text-sm">
                                        / 100
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>


                {/* POSITIVES + NEGATIVES */}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-7 mb-6 sm:mb-8">


                    {/* POSITIVES */}

                    <div className="bg-slate-900 border border-green-500/20 rounded-3xl p-5 sm:p-7 shadow-xl">

                        <div className="flex items-center gap-3 mb-6">

                            <div className="w-12 h-12 flex items-center justify-center bg-green-500/10 rounded-2xl">

                                <span className="text-green-400 text-2xl">
                                    ✓
                                </span>

                            </div>

                            <div>

                                <h2 className="text-xl sm:text-2xl font-bold text-green-400">
                                    Positives
                                </h2>

                                <p className="text-slate-500 text-xs sm:text-sm">
                                    What's working well
                                </p>

                            </div>

                        </div>


                        <div className="space-y-3 sm:space-y-4">

                            {data.positives.length > 0 ? (

                                data.positives.map((value, index) => (

                                    <div
                                        key={index}
                                        className="group flex gap-3 sm:gap-4 p-4 sm:p-5 bg-green-500/5 border border-green-500/10 rounded-2xl transition-all duration-300 hover:bg-green-500/10 hover:border-green-500/30 hover:-translate-y-1"
                                    >

                                        <span className="text-green-400 text-lg flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                                            ✓
                                        </span>

                                        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                                            {value}
                                        </p>

                                    </div>

                                ))

                            ) : (

                                <p className="text-slate-500">
                                    No positive points available.
                                </p>

                            )}

                        </div>

                    </div>


                    {/* NEGATIVES */}

                    <div className="bg-slate-900 border border-red-500/20 rounded-3xl p-5 sm:p-7 shadow-xl">

                        <div className="flex items-center gap-3 mb-6">

                            <div className="w-12 h-12 flex items-center justify-center bg-red-500/10 rounded-2xl">

                                <span className="text-red-400 text-2xl">
                                    ✕
                                </span>

                            </div>

                            <div>

                                <h2 className="text-xl sm:text-2xl font-bold text-red-400">
                                    Negatives
                                </h2>

                                <p className="text-slate-500 text-xs sm:text-sm">
                                    Areas that need improvement
                                </p>

                            </div>

                        </div>


                        <div className="space-y-3 sm:space-y-4">

                            {data.negatives.length > 0 ? (

                                data.negatives.map((value, index) => (

                                    <div
                                        key={index}
                                        className="group flex gap-3 sm:gap-4 p-4 sm:p-5 bg-red-500/5 border border-red-500/10 rounded-2xl transition-all duration-300 hover:bg-red-500/10 hover:border-red-500/30 hover:-translate-y-1"
                                    >

                                        <span className="text-red-400 text-lg flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                                            ✕
                                        </span>

                                        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                                            {value}
                                        </p>

                                    </div>

                                ))

                            ) : (

                                <p className="text-slate-500">
                                    No negative points available.
                                </p>

                            )}

                        </div>

                    </div>

                </div>


                {/* DETAILED ANALYSIS */}

                <div className="bg-slate-900 border border-blue-500/20 rounded-3xl p-5 sm:p-7 md:p-8 shadow-xl">

                    <div className="flex items-center gap-3 mb-6">

                        <div className="w-12 h-12 flex items-center justify-center bg-blue-500/10 rounded-2xl">

                            <span className="text-blue-400 text-2xl">
                                ↗
                            </span>

                        </div>

                        <div>

                            <h2 className="text-xl sm:text-2xl font-bold">
                                Detailed Analysis
                            </h2>

                            <p className="text-slate-500 text-xs sm:text-sm">
                                AI-generated evaluation
                            </p>

                        </div>

                    </div>


                    <div className="bg-slate-950 rounded-2xl p-5 sm:p-6 border border-slate-800">

                        <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-7 sm:leading-8">
                            {data.analysis ||
                                "No detailed analysis available."}
                        </p>

                    </div>

                </div>


            </div>

        </div>

    );
}

