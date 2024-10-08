// import React from 'react';

// const StatusBadge = ({ status }) => {
//   const badgeColor =
//   status === "Shipped"
//     ? "bg-blue-100 text-blue-800 ring-blue-700/30" // Blue background and text for Shipped
//     : status === "Processed"
//     ? "bg-teal-100 text-teal-800 ring-teal-700/30" // Teal background and text for Processed
//     : status === "Cancelled"
//     ? "bg-red-100 text-red-800 ring-red-700/30" // Red background and text for Cancelled
//     : status === "Pending"
//     ? "bg-yellow-100 text-yellow-800 ring-yellow-700/30" // Yellow background and text for Pending
//     : status === "Processing"
//     ? "bg-orange-100 text-orange-800 ring-orange-700/30" // Orange background and text for Processing
//     : status === "Completed"
//     ? "bg-green-100 text-green-800 ring-green-700/30" // Green background and text for Completed
//     : "bg-gray-100 text-gray-800 ring-gray-700/30"; // Default color for any undefined status
//   return (
//     <span
//       className={`inline-flex items-center justify-center rounded-full w-32 h-8 text-xs font-semibold ring-1 ring-inset ${badgeColor}`}
//     >
//       {status}
//     </span>
//   );
// };

// export default StatusBadge;



// import React from 'react';

// const StatusBadge = ({ status }) => {
//   const badgeColor =
//     status === "Quick Quote"
//       ? "bg-blue-100 text-blue-800 ring-blue-700/30" // Blue for Quick Quote
//       : status === "Initial Design"
//         ? "bg-teal-100 text-teal-800 ring-teal-700/30" // Teal for Initial Design
//         : status === "Initial Measurements"
//           ? "bg-yellow-100 text-yellow-800 ring-yellow-700/30" // Yellow for Initial Measurements
//           : status === "Revised Design (R1)"
//             ? "bg-orange-100 text-orange-800 ring-orange-700/30" // Orange for Revised Design (R1)
//             : status === "Revised Design (R2)"
//               ? "bg-red-100 text-red-800 ring-red-700/30" // Red for Revised Design (R2)
//               : status === "Revised Design (R3)"
//                 ? "bg-pink-100 text-pink-800 ring-pink-700/30" // Pink for Revised Design (R3)
//                 : status === "Revised Design (R4)"
//                   ? "bg-purple-100 text-purple-800 ring-purple-700/30" // Purple for Revised Design (R4)
//                   : status === "Final Measurement"
//                     ? "bg-indigo-100 text-indigo-800 ring-indigo-700/30" // Indigo for Final Measurement
//                     : status === "Signup Document"
//                       ? "bg-gray-100 text-gray-800 ring-gray-700/30" // Gray for Signup Document
//                       : status === "Production"
//                         ? "bg-green-100 text-green-800 ring-green-700/30" // Green for Production
//                         : status === "PDI"
//                           ? "bg-teal-200 text-teal-800 ring-teal-700/30" // Teal for PDI
//                           : status === "Dispatch"
//                             ? "bg-orange-200 text-orange-800 ring-orange-700/30" // Orange for Dispatch
//                             : status === "Installation"
//                               ? "bg-yellow-200 text-yellow-800 ring-yellow-700/30" // Yellow for Installation
//                               : status === "Completion"
//                                 ? "bg-blue-200 text-blue-800 ring-blue-700/30" // Blue for Completion
//                                 : "bg-gray-100 text-gray-800 ring-gray-700/30"; // Default color

//   return (
//     <span
//       className={`inline-flex items-center justify-center rounded-full w-32 h-8 text-xs font-semibold ring-1 ring-inset ${badgeColor}`}
//     >
//       {status}
//     </span>
//   );
// };

// export default StatusBadge;



import React from "react";

const StatusBadge = ({ status }) => {
  const badgeColor =
    status === "Shipped"
      ? "bg-blue-100 text-blue-800 ring-blue-700/30" // Blue background and text for Shipped
      : status === "Pending"
      ? "bg-blue-100 text-blue-800 ring-blue-700/30" // Yellow background and text for Pending
      : status === "Quick Quote"
      ? "bg-teal-100 text-teal-800 ring-teal-700/30" // Yellow background and text for Quick Quote
      : status === "Processing"
      ? "bg-orange-100 text-orange-800 ring-orange-700/30" // Orange background and text for Processing
      : status === "Initial Design"
      ? "bg-indigo-100 text-indigo-800 ring-indigo-700/30" // Indigo background and text for Initial Design
      : status === "Initial Measurement"
      ? "bg-indigo-100 text-indigo-800 ring-indigo-700/30" // Indigo background and text for Initial Design
      : status === "Revised Design"
      ? "bg-purple-100 text-purple-800 ring-purple-700/30" // Purple background and text for Revised Design
      : status === "Final Measurement"
      ? "bg-gray-100 text-gray-800 ring-gray-700/30" // Gray background and text for Production
      : status === "SignUp Document"
      ? "bg-gray-100 text-gray-800 ring-gray-700/30" // Gray background and text for Production
      : status === "Production"
      ? "bg-gray-100 text-gray-800 ring-gray-700/30" // Gray background and text for Production
      : status === "PDI"
      ? "bg-pink-100 text-pink-800 ring-pink-700/30" // Pink background and text for PDI
      : status === "Dispatch"
      ? "bg-teal-100 text-teal-800 ring-teal-700/30" // Teal background and text for Dispatch
      : status === "Installation"
      ? "bg-cyan-100 text-cyan-800 ring-cyan-700/30" // Cyan background and text for Installation
      : status === "Completed"
      ? "bg-green-100 text-green-800 ring-green-700/30" // Green background and text for Completed
      : status === "Cancelled"
      ? "bg-red-100 text-red-800 ring-red-700/30" // Red background and text for Cancelled
      : "bg-gray-100 text-gray-800 ring-gray-700/30"; // Default color for any undefined status

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full w-32 h-8 text-xs font-semibold ring-1 ring-inset ${badgeColor}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
