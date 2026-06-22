// import React from "react";
// import { headers } from "next/headers";
// import { redirect } from "next/navigation";
// import { auth } from "@/lib/auth"; // tomar better-auth instance path
// import { GetProposalById } from "@/ServerActions/proposal";
// // import { GetProposalById } from "@/lib/actions/proposal"; // tomar actual path diye thik koro

// const FreelancerOverviewPage = async () => {
//   const session = await auth.api.getSession({
//     headers: await headers(),
//   });

//   const user = session?.user;
//   if (!user) {
//     redirect("/login");
//   }

//   const freelancerId = user.id;

//   // --- Proposals (Express API theke) ---
//   const proposals = [];
//   const result = await GetProposalById({ path: "myProposals", freelancerId });
//   proposals.push(...result);

//   const totalProposals = proposals.length;
//   const acceptedProposalsList = proposals.filter((p) => p.status === "accepted");
//   const submitedProposalsList = proposals.filter((p) => p.status === "submited");

//   const acceptedProposals = acceptedProposalsList.length;
//   const submitedProposals = submitedProposalsList.length;

//   const earnings = submitedProposalsList.reduce(
//     (sum, p) => sum + (Number(p.proposedBudget) || 0),
//     0
//   );

//   const stats = {
//     totalProposals,
//     acceptedProposals,
//     submitedProposals,
//     earnings,
//   };

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-2xl font-bold text-gray-800">
//           Welcome back, {user.name}
//         </h1>
//         <p className="text-gray-500">Here's an overview of your activity</p>
//       </div>

//       <div className="grid grid-cols-4 gap-6">
//         <div className="bg-white p-6 rounded-xl border shadow-sm">
//           <p className="text-gray-500 font-medium">Total Proposals</p>
//           <h3 className="text-3xl font-bold">{stats.totalProposals}</h3>
//         </div>
//         <div className="bg-white p-6 rounded-xl border shadow-sm">
//           <p className="text-gray-500 font-medium">Accepted</p>
//           <h3 className="text-3xl font-bold text-green-600">
//             {stats.acceptedProposals}
//           </h3>
//         </div>
//         <div className="bg-white p-6 rounded-xl border shadow-sm">
//           <p className="text-gray-500 font-medium">Submited</p>
//           <h3 className="text-3xl font-bold text-green-600">
//             {stats.submitedProposals}
//           </h3>
//         </div>
//         <div className="bg-white p-6 rounded-xl border shadow-sm">
//           <p className="text-gray-500 font-medium">Earnings</p>
//           <h3 className="text-3xl font-bold text-blue-600">
//             ${stats.earnings.toLocaleString()}
//           </h3>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FreelancerOverviewPage;

import React from 'react';

const page = () => {
  return (
    <div>
      
    </div>
  );
};

export default page;