// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { CustomerContext } from '../../Context/customerContext';

// function Customerform() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { customerDetails } = useContext(CustomerContext);

//   // Determine if in edit mode (only if customer data exists)
//   const isEditMode = Boolean(location.state?.customerDetails?.customer || customerDetails?.customer);

//   const [formData, setFormData] = useState(location.state?.customerDetails || {
//     TenantID: 1,   // Set default value for TenantID
//     CustomerID: null, // Set CustomerID as null initially
//     FirstName: "",
//     LastName: "",
//     Email: "",
//     Password: "",
//     PhoneNumber: "",
//     Gender:"",
//     AddressLine1: "",
//     AddressLine2: "",
//     CityID: 1,
//     StateID: 1,
//     CountryID: 1,
//     ZipCode: "",
//   });

//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (isEditMode) {
//       const customer = location.state?.customerDetails?.customer || customerDetails?.customer;
//       setFormData({
//         TenantID: customer.TenantID || 1,
//         CustomerID: customer.CustomerID || null,
//         FirstName: customer.FirstName || "",
//         LastName: customer.LastName || "",
//         Email: customer.Email || "",
//         Password: "",  // Clear password if in edit mode
//         PhoneNumber: customer.PhoneNumber || "",
//         Gender: customer.Gender || "",
//         AddressLine1: customer.AddressLine1 || "",
//         AddressLine2: customer.AddressLine2 || "",
//         CityID: customer.CityID || 1,
//         StateID: customer.StateID || 1,
//         CountryID: customer.CountryID || 1,
//         ZipCode: customer.ZipCode || "",
//       });
//     }
//   }, [isEditMode, location.state?.customerDetails?.customer, customerDetails?.customer]);

//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();
  
//     // Log the form data being sent to the API
//     console.log("FormData:", formData);
  
//     try {
//       const response = await axios.post(
//         "https://imlystudios-backend-mqg4.onrender.com/api/customers/createCustomer",
//         formData
//       );
  
//       // Log the full response from the server
//       console.log("Full Response:", response);
//       console.log("Response data:", response.data);
  
//       navigate("/Customer");
//     } catch (error) {
//       console.error("Submission failed:", error);
  
//       if (error.response) {
//         console.error("Response data:", error.response.data);
//         console.error("Response status:", error.response.status);
//         console.error("Response headers:", error.response.headers);
//         setError("Failed to create customer: " + error.response.data.message);
//       } else if (error.request) {
//         console.error("No response received:", error.request);
//         setError("No response received from server.");
//       } else {
//         console.error("Error in setting up request:", error.message);
//         setError("Error: " + error.message);
//       }
//     }
//   };
  

//   const handleUpdateSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const customerId = formData.CustomerID;
  
//       // Log formData to ensure CustomerID is present
//       console.log("FormData before submission:", formData);
  
//       if (!customerId) {
//         console.error("Customer ID is missing in formData");
//         setError("Customer ID is missing.");
//         return;
//       }
  
//       console.log("Submitted details for update:", formData);
  
//       const response = await axios.put(
//         `https://imlystudios-backend-mqg4.onrender.com/api/customers/updateCustomer/${customerId}`,
//         formData
//       );
//       console.log("Update successful:", response.data);
  
//       navigate("/Customer");
//     } catch (error) {
//       console.error("Update failed:", error);
//       if (error.response) {
//         console.error("Update failed with response error:", error.response.data);
//         setError("Update failed: " + error.response.data.message);
//       } else if (error.request) {
//         console.error("Update failed with no response received:", error.request);
//         setError("No response received from server.");
//       } else {
//         console.error("Update failed with error:", error.message);
//         setError("Error: " + error.message);
//       }
//     }
//   };

//   const handleCancel = () => {
//     navigate("/Customer");
//   };

//   return (
//     <div className="px-4 sm:px-6 lg:px-8 pt-4 ml-10 lg:ml-72 w-auto">
//       <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
//         <form onSubmit={isEditMode ? handleUpdateSubmit : handleFormSubmit}>
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-xl font-semibold mb-4 px-24">Customers</h2>
//           </div>
//           <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8 px-16 md:px-24">
//             {/* First Name */}
//             <div className="flex items-center">
//               <div className="w-full">
//                 <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
//                   First Name
//                 </label>
//                 <input
//                   type="text"
//                   id="FirstName"
//                   name="FirstName"
//                   value={formData.FirstName || ""}
//                   onChange={handleFormChange}
//                   required
//                   className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                 />
//               </div>
//             </div>

//             {/* Last Name */}
//             <div>
//               <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">
//                 Last Name
//               </label>
//               <input
//                 type="text"
//                 id="LastName"
//                 name="LastName"
//                 value={formData.LastName || ""}
//                 onChange={handleFormChange}
//                 required
//                 className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//               />
//             </div>

//             {/* Email */}
//             <div>
//               <label htmlFor="Email" className="block text-sm font-medium text-gray-700">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 id="Email"
//                 name="Email"
//                 value={formData.Email || ""}
//                 onChange={handleFormChange}
//                 required
//                 className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//               />
//             </div>

//             {/* Password */}
//             <div>
//               <label htmlFor="Password" className="block text-sm font-medium text-gray-700">
//                 Password
//               </label>
//               <input
//                 id="Password"
//                 name="Password"
//                 type="password"
//                 value={formData.Password || ""}
//                 onChange={handleFormChange}
//                 className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//               />
//             </div>

//             {/* Phone Number */}
//             <div>
//               <label htmlFor="PhoneNumber" className="block text-sm font-medium text-gray-700">
//                 Phone Number
//               </label>
//               <input
//                 type="text"
//                 id="PhoneNumber"
//                 name="PhoneNumber"
//                 value={formData.PhoneNumber || ""}
//                 onChange={handleFormChange}
//                 required
//                 className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//               />
//             </div>
//                  {/* Gender */}
//                  {/* <div>
//               <label htmlFor="Gender" className="block text-sm font-medium text-gray-700">
//                 Gender
//               </label>
//               <select
//                 id="Gender"
//                 name="Gender"
//                 value={formData.Gender || ""}
//                 onChange={handleFormChange}
//                 required
//                 className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//               >
//                 <option value="">Select Gender</option>
//                 <option value="M">M</option>
//                 <option value="F">F</option>
               
//               </select>
//             </div> */}

//             {/* Address Line 1 */}
//             <div>
//               <label htmlFor="AddressLine1" className="block text-sm font-medium text-gray-700">
//                 Address Line 1
//               </label>
//               <input
//                 type="text"
//                 id="AddressLine1"
//                 name="AddressLine1"
//                 value={formData.AddressLine1 || ""}
//                 onChange={handleFormChange}
//                 required
//                 className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//               />
//             </div>

//             {/* Address Line 2 */}
//             <div>
//               <label htmlFor="AddressLine2" className="block text-sm font-medium text-gray-700">
//                 Address Line 2
//               </label>
//               <input
//                 type="text"
//                 id="AddressLine2"
//                 name="AddressLine2"
//                 value={formData.AddressLine2 || ""}
//                 onChange={handleFormChange}
//                 className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//               />
//             </div>

//             {/* City ID */}
//             <div>
//               <label htmlFor="CityID" className="block text-sm font-medium text-gray-700">
//                 City ID
//               </label>
//               <input
//                 type="number"
//                 id="CityID"
//                 name="CityID"
//                 value={formData.CityID || ""}
//                 onChange={handleFormChange}
//                 required
//                 className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//               />
//             </div>

//             {/* State ID */}
//             <div>
//               <label htmlFor="StateID" className="block text-sm font-medium text-gray-700">
//                 State ID
//               </label>
//               <input
//                 type="number"
//                 id="StateID"
//                 name="StateID"
//                 value={formData.StateID || ""}
//                 onChange={handleFormChange}
//                 required
//                 className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//               />
//             </div>

//             {/* Country ID */}
//             <div>
//               <label htmlFor="CountryID" className="block text-sm font-medium text-gray-700">
//                 Country ID
//               </label>
//               <input
//                 type="number"
//                 id="CountryID"
//                 name="CountryID"
//                 value={formData.CountryID || ""}
//                 onChange={handleFormChange}
//                 required
//                 className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//               />
//             </div>

//             {/* Zip Code */}
//             <div>
//               <label htmlFor="ZipCode" className="block text-sm font-medium text-gray-700">
//                 Zip Code
//               </label>
//               <input
//                 type="text"
//                 id="ZipCode"
//                 name="ZipCode"
//                 value={formData.ZipCode || ""}
//                 onChange={handleFormChange}
//                 required
//                 className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//               />
//             </div>
//           </div>

//           {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

//               {/* Buttons */}
//           <div className="mt-6 flex justify-end gap-4">
//             <button
//               type="submit"
//               className="inline-flex justify-center rounded-md border border-transparent bg-custom-darkblue py-2 px-4 text-sm font-medium text-white hover:text-black shadow-sm hover:bg-custom-lightblue focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//             >
//               Save
//             </button>
//             <button
//               type="button"
//               onClick={handleCancel}
//               className="inline-flex justify-center rounded-md border border-transparent bg-red-500 py-2 px-4 text-sm font-medium text-white hover:text-black shadow-sm hover:bg-red-200"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Customerform;


// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { CustomerContext } from '../../Context/customerContext';

// function Customerform() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { customerDetails } = useContext(CustomerContext);

//   // Determine if in edit mode (only if customer data exists)
//   const isEditMode = Boolean(location.state?.customerDetails?.customer || customerDetails?.customer);

//   const [formData, setFormData] = useState(location.state?.customerDetails || {
//     TenantID: 1,   // Set default value for TenantID
//     CustomerID: null, // Set CustomerID as null initially
//     FirstName: "",
//     LastName: "",
//     Email: "",
//     Password: "",
//     PhoneNumber: "",
//     Gender:"",
//     AddressLine1: "",
//     AddressLine2: "",
//     CityID: 1,
//     StateID: 1,
//     CountryID: 1,
//     ZipCode: "",
//   });

//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (isEditMode) {
//       const customer = location.state?.customerDetails?.customer || customerDetails?.customer;
//       setFormData({
//         TenantID: customer.TenantID || 1,
//         CustomerID: customer.CustomerID || null,
//         FirstName: customer.FirstName || "",
//         LastName: customer.LastName || "",
//         Email: customer.Email || "",
//         Password: "",  // Clear password if in edit mode
//         PhoneNumber: customer.PhoneNumber || "",
//         Gender: customer.Gender || "",
//         AddressLine1: customer.AddressLine1 || "",
//         AddressLine2: customer.AddressLine2 || "",
//         CityID: customer.CityID || 1,
//         StateID: customer.StateID || 1,
//         CountryID: customer.CountryID || 1,
//         ZipCode: customer.ZipCode || "",
//       });
//     }
//   }, [isEditMode, location.state?.customerDetails?.customer, customerDetails?.customer]);

//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   // const handleFormSubmit = async (event) => {
//   //   event.preventDefault();
  
//   //   // Log the form data being sent to the API
//   //   console.log("FormData:", formData);
  
//   //   try {
//   //     const response = await axios.post(
//   //       "https://imlystudios-backend-mqg4.onrender.com/api/customers/createCustomer",
//   //       formData
//   //     );
  
//   //     // Log the full response from the server
//   //     console.log("Full Response:", response);
//   //     console.log("Response data:", response.data);
  
//   //     navigate("/Customer");
//   //   } catch (error) {
//   //     console.error("Submission failed:", error);
  
//   //     if (error.response) {
//   //       console.error("Response data:", error.response.data);
//   //       console.error("Response status:", error.response.status);
//   //       console.error("Response headers:", error.response.headers);
//   //       setError("Failed to create customer: " + error.response.data.message);
//   //     } else if (error.request) {
//   //       console.error("No response received:", error.request);
//   //       setError("No response received from server.");
//   //     } else {
//   //       console.error("Error in setting up request:", error.message);
//   //       setError("Error: " + error.message);
//   //     }
//   //   }
//   // };
  

//   // const handleUpdateSubmit = async (event) => {
//   //   event.preventDefault();
//   //   try {
//   //     const customerId = formData.CustomerID;
  
//   //     // Log formData to ensure CustomerID is present
//   //     console.log("FormData before submission:", formData);
  
//   //     if (!customerId) {
//   //       console.error("Customer ID is missing in formData");
//   //       setError("Customer ID is missing.");
//   //       return;
//   //     }
  
//   //     console.log("Submitted details for update:", formData);
  
//   //     const response = await axios.put(
//   //       `https://imlystudios-backend-mqg4.onrender.com/api/customers/updateCustomer/${customerId}`,
//   //       formData
//   //     );
//   //     console.log("Update successful:", response.data);
  
//   //     navigate("/Customer");
//   //   } catch (error) {
//   //     console.error("Update failed:", error);
//   //     if (error.response) {
//   //       console.error("Update failed with response error:", error.response.data);
//   //       setError("Update failed: " + error.response.data.message);
//   //     } else if (error.request) {
//   //       console.error("Update failed with no response received:", error.request);
//   //       setError("No response received from server.");
//   //     } else {
//   //       console.error("Update failed with error:", error.message);
//   //       setError("Error: " + error.message);
//   //     }
//   //   }
//   // };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();
  
//     // Log the form data being sent to the API
//     console.log("FormData:", formData);
  
//     const isUpdate = formData.CustomerID ? true : false;  // Check if we're updating or creating
//     const apiUrl = "https://imlystudios-backend-mqg4.onrender.com/api/customers/createOrUpdateCustomer";
  
//     try {
//       const response = await axios.post(apiUrl, formData);  // Use the same API for both create and update
      
//       // Log the full response from the server
//       console.log("Full Response:", response);
//       console.log("Response data:", response.data);
  
//       // Navigate to the customer page
//       navigate("/Customer");
//     } catch (error) {
//       console.error("Submission failed:", error);
  
//       if (error.response) {
//         console.error("Response data:", error.response.data);
//         console.error("Response status:", error.response.status);
//         console.error("Response headers:", error.response.headers);
//         setError(`Failed to ${isUpdate ? 'update' : 'create'} customer: ` + error.response.data.message);
//       } else if (error.request) {
//         console.error("No response received:", error.request);
//         setError("No response received from server.");
//       } else {
//         console.error("Error in setting up request:", error.message);
//         setError("Error: " + error.message);
//       }
//     }
// };




//   const handleCancel = () => {
//     navigate("/Customer");
//   };

//   return (
//     <div className="px-4 sm:px-6 lg:px-8 pt-4 ml-10 lg:ml-72 w-auto">
//       <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
//         {/* <form onSubmit={isEditMode ? handleUpdateSubmit : handleFormSubmit}> */}
//           <form onSubmit={handleFormSubmit}>
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-xl font-semibold mb-4 px-24">Customers</h2>
//           </div>
//           <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8 px-16 md:px-24">
//             {/* First Name */}
//             <div className="flex items-center">
//               <div className="w-full">
//                 <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
//                   First Name
//                 </label>
//                 <input
//                   type="text"
//                   id="FirstName"
//                   name="FirstName"
//                   value={formData.FirstName || ""}
//                   onChange={handleFormChange}
//                   required
//                   className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                 />
//               </div>
//             </div>

//             {/* Last Name */}
//             <div>
//               <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">
//                 Last Name
//               </label>
//               <input
//                 type="text"
//                 id="LastName"
//                 name="LastName"
//                 value={formData.LastName || ""}
//                 onChange={handleFormChange}
//                 required
//                 className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//               />
//             </div>

//             {/* Email */}
//             <div>
//               <label htmlFor="Email" className="block text-sm font-medium text-gray-700">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 id="Email"
//                 name="Email"
//                 value={formData.Email || ""}
//                 onChange={handleFormChange}
//                 required
//                 className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//               />
//             </div>

//             {/* Password */}
//             <div>
//               <label htmlFor="Password" className="block text-sm font-medium text-gray-700">
//                 Password
//               </label>
//               <input
//                 id="Password"
//                 name="Password"
//                 type="password"
//                 value={formData.Password || ""}
//                 onChange={handleFormChange}
//                 className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//               />
//             </div>

//             {/* Phone Number */}
//             <div>
//               <label htmlFor="PhoneNumber" className="block text-sm font-medium text-gray-700">
//                 Phone Number
//               </label>
//               <input
//                 type="text"
//                 id="PhoneNumber"
//                 name="PhoneNumber"
//                 value={formData.PhoneNumber || ""}
//                 onChange={handleFormChange}
//                 required
//                 className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//               />
//             </div>
//                  {/* Gender */}
//                  <div>
//               <label htmlFor="Gender" className="block text-sm font-medium text-gray-700">
//                 Gender
//               </label>
//               <select
//                 id="Gender"
//                 name="Gender"
//                 value={formData.Gender || ""}
//                 onChange={handleFormChange}
//                 required
//                 className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//               >
//                 <option value="">Select Gender</option>
//                 <option value="M">M</option>
//                 <option value="F">F</option>
               
//               </select>
//             </div>

//             {/* Address Line 1 */}
//             <div>
//               <label htmlFor="AddressLine1" className="block text-sm font-medium text-gray-700">
//                 Address Line 1
//               </label>
//               <input
//                 type="text"
//                 id="AddressLine1"
//                 name="AddressLine1"
//                 value={formData.AddressLine1 || ""}
//                 onChange={handleFormChange}
//                 required
//                 className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//               />
//             </div>

//             {/* Address Line 2 */}
//             <div>
//               <label htmlFor="AddressLine2" className="block text-sm font-medium text-gray-700">
//                 Address Line 2
//               </label>
//               <input
//                 type="text"
//                 id="AddressLine2"
//                 name="AddressLine2"
//                 value={formData.AddressLine2 || ""}
//                 onChange={handleFormChange}
//                 className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//               />
//             </div>

//             {/* City ID */}
//             <div>
//               <label htmlFor="CityID" className="block text-sm font-medium text-gray-700">
//                 City ID
//               </label>
//               <input
//                 type="number"
//                 id="CityID"
//                 name="CityID"
//                 value={formData.CityID || ""}
//                 onChange={handleFormChange}
//                 required
//                 className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//               />
//             </div>

//             {/* State ID */}
//             <div>
//               <label htmlFor="StateID" className="block text-sm font-medium text-gray-700">
//                 State ID
//               </label>
//               <input
//                 type="number"
//                 id="StateID"
//                 name="StateID"
//                 value={formData.StateID || ""}
//                 onChange={handleFormChange}
//                 required
//                 className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//               />
//             </div>

//             {/* Country ID */}
//             <div>
//               <label htmlFor="CountryID" className="block text-sm font-medium text-gray-700">
//                 Country ID
//               </label>
//               <input
//                 type="number"
//                 id="CountryID"
//                 name="CountryID"
//                 value={formData.CountryID || ""}
//                 onChange={handleFormChange}
//                 required
//                 className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//               />
//             </div>

//             {/* Zip Code */}
//             <div>
//               <label htmlFor="ZipCode" className="block text-sm font-medium text-gray-700">
//                 Zip Code
//               </label>
//               <input
//                 type="text"
//                 id="ZipCode"
//                 name="ZipCode"
//                 value={formData.ZipCode || ""}
//                 onChange={handleFormChange}
//                 required
//                 className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//               />
//             </div>
//           </div>

//           {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

//               {/* Buttons */}
//           <div className="mt-6 flex justify-end gap-4">
//             <button
//               type="submit"
//               className="inline-flex justify-center rounded-md border border-transparent bg-custom-darkblue py-2 px-4 text-sm font-medium text-white hover:text-black shadow-sm hover:bg-custom-lightblue focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//             >
//               Save
//             </button>
//             <button
//               type="button"
//               onClick={handleCancel}
//               className="inline-flex justify-center rounded-md border border-transparent bg-red-500 py-2 px-4 text-sm font-medium text-white hover:text-black shadow-sm hover:bg-red-200"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Customerform;



import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CustomerContext } from "../../Context/customerContext";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Combobox } from '@headlessui/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import CustomerSearch from '../Orders/CustomerSearch';
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/20/solid';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Table, TableBody, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

// Define Styled Components
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#003375',
    // backgroundColor: '#F0E68C',
    color: theme.palette.common.white,
    fontWeight: 'bold',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const steps = ['Customer Details', 'Address','Orders'];
const genderOptions = [
  { id: "M", name: "Male" },
  { id: "F", name: "Female" },
];

function AddCustomers() {
  const navigate = useNavigate();
  const location = useLocation();
  const { customerDetails } = useContext(CustomerContext);
  // const [selectedGender, setSelectedGender] = useState(null);
const [selectedReferralType, setSelectedReferralType] = useState(null);
const [selectedReferenceSubOption, setSelectedReferenceSubOption] = useState(null);
const [selectedSocialMediaPlatform, setSelectedSocialMediaPlatform] = useState(null);
const [query, setQuery] = useState('');
const [orderDetails, setOrderDetails] = useState({ refereeName: '' });
// const [error, setError] = useState('');
const [entries, setEntries] = useState("");

const handleReferralTypeChange = (type) => setSelectedReferralType(type);
const handleReferenceSubOptionChange = (option) => setSelectedReferenceSubOption(option);
const handleSocialMediaPlatformChange = (platform) => setSelectedSocialMediaPlatform(platform);
const handleRefereeNameChange = (e) => setOrderDetails({ ...orderDetails, refereeName: e.target.value });


  const isEditMode = Boolean(location.state?.customerDetails?.customer || customerDetails?.customer);
// Customer form data state
const [customerFormData, setCustomerFormData] = useState(location.state?.customerDetails ||{
  TenantID: 1,
  CustomerID: 0, // Set to 0 instead of null as per your request
  FirstName: "",
  LastName: "",
  Email: "",
  Password: "",
  ConfirmPassword: "",
  PhoneNumber: "",
  Gender: "",
  Comments: "", // Added Comments field as per your request
});

// Address form data state
const [addressFormData, setAddressFormData] = useState(location.state?.customerDetails ||{
  AddressLine1: "",
  AddressLine2: "",
  CityID: "",
  StateID: "",
  CountryID: "", // You had an extra `CountryID` field; I assume this is intentional
  ZipCode: ""
});

  const [error, setError] = useState("");
  const [selectedGender, setSelectedGender] = useState(customerFormData.Gender || "");
  const [activeStep, setActiveStep] = useState(0);
  const [countries, setCountries] = useState([]); // For storing countries
  const [states, setStates] = useState([]); // For storing states
  const [cities, setCities] = useState([]); // For storing cities
  const [selectedCountry, setSelectedCountry] = useState(null); 
  const [selectedState, setSelectedState] = useState(null); // State to store selected state
const [selectedCity, setSelectedCity] = useState(null);   // State to store selected city
    
  useEffect(() => {
    if (isEditMode) {
      const customer = location.state?.customerDetails?.customer || customerDetails?.customer;
      
      // Populate customer form data
      setCustomerFormData({
        TenantID: customer.TenantID || 1,
        CustomerID: customer.CustomerID || 0,
        FirstName: customer.FirstName || "",
        LastName: customer.LastName || "",
        Email: customer.Email || "",
        Password: "", // Clear password if in edit mode
        ConfirmPassword: "",
        PhoneNumber: customer.PhoneNumber || "",
        Gender: customer.Gender || "",
        Comments: customer.Comments || "", // Use existing value if available
      });
  
      // Populate address form data
      setAddressFormData({
        AddressLine1: customer.AddressLine1 || "",
        AddressLine2: customer.AddressLine2 || "",
        CityID: customer.CityID || "",
        StateID: customer.StateID || "",
        CountryID: customer.CountryID || "",
        ZipCode: customer.ZipCode || ""
      });
    }
  }, [isEditMode, location.state?.customerDetails?.customer, customerDetails?.customer]);
  

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setCustomerFormData({
      ...customerFormData,
      [name]: value,
    });
  };

  const handleGenderChange = (gender) => {
    setSelectedGender(gender);
    setCustomerFormData({ ...customerFormData, Gender: gender.id });
  };
// Handle changes for customer form
const handleCustomerFormChange = (e) => {
  const { name, value } = e.target;
  setCustomerFormData({
    ...customerFormData,
    [name]: value,
  });
};

// Handle changes for address form
const handleAddressFormChange = (e) => {
  const { name, value } = e.target;
  setAddressFormData({
    ...addressFormData,
    [name]: value,
  });
};

const handleFormSubmit = async (event) => {
  event.preventDefault();

  // Log the form data being sent to the API
  console.log("Customer Form Data:", customerFormData);
  console.log("Address Form Data:", addressFormData);

  const isUpdate = customerFormData.CustomerID ? true : false; // Check if we're updating or creating
  const customerApiUrl = "https://imlystudios-backend-mqg4.onrender.com/api/customers/createOrUpdateCustomer";
  const addressesApiUrl = "https://imlystudios-backend-mqg4.onrender.com/api/customers/createOrUpdateAddress";

  try {
    // First, create or update the customer
    const customerResponse = await axios.post(customerApiUrl, customerFormData);
    console.log("Customer Response:", customerResponse);
    
    const customerId = customerResponse.data.CustomerID; // Assuming the response includes CustomerID

    // Now, update the addresses using the separate API
    const addressData = {
      CustomerID: customerId, // Use the CustomerID from the response
      Addresses: [{
        AddressLine1: addressFormData.AddressLine1,
        AddressLine2: addressFormData.AddressLine2,
        CityID: addressFormData.CityID,
        StateID: addressFormData.StateID,
        CountryID: addressFormData.CountryID,
        ZipCode: addressFormData.ZipCode
      }]
    };

    const addressResponse = await axios.post(addressesApiUrl, addressData);
    console.log("Addresses Response:", addressResponse);

    // Navigate to the customer page after both requests succeed
    navigate("/Customer");
  } catch (error) {
    console.error("Submission failed:", error);

    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
      setError(`Failed to ${isUpdate ? 'update' : 'create'} customer: ` + error.response.data.message);
    } else if (error.request) {
      console.error("No response received:", error.request);
      setError("No response received from server.");
    } else {
      console.error("Error in setting up request:", error.message);
      setError("Error: " + error.message);
    }
  }
};


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const customerId = customerFormData.CustomerID;
  
        if (!customerId) return; // Ensure customerId exists
  
        const response = await axios.get(`https://imlystudios-backend-mqg4.onrender.com/api/customers/customers/getOrderByCustomerId/${customerId}`);
        setOrders(response.data.orders || []); 
        console.log("Fetched Orders:", response.data.orders);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };
  
    // Only call fetchOrders if customerId exists
    if (customerFormData.CustomerID) {
      fetchOrders();
    }
  }, [customerFormData.CustomerID]);  // Watch for changes in formData.CustomerID
  
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://imlystudios-backend-mqg4.onrender.com/api/cities/getCountries');
        const countryData = response.data.data; // Extract 'data' from response
        setCountries(countryData); // Set the countries state
        console.log("Fetched countries:", countryData); // Log to check data
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
  
    fetchCountries(); // Call on component mount
  }, []);
 
  const fetchStatesByCountry = async (countryId) => {
    if (!countryId) return;
    
    try {
      const response = await axios.get(`https://imlystudios-backend-mqg4.onrender.com/api/cities/getStatesByCountry?$filter=CountryID eq ${countryId}`);
      if (response.data.status === "SUCCESS") {
        setStates(response.data.data || []); // Ensure data is set to `states`
      }
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };
  
  
  const fetchCitiesByState = async (stateId) => {
    if (!stateId) return;
  
    try {
      const response = await axios.get(`https://imlystudios-backend-mqg4.onrender.com/api/cities/getCitiesByState?$filter=StateID eq ${stateId}`);
      
      // Assuming the response follows a similar structure to the one for states
      if (response.data.status === "SUCCESS") {
        setCities(response.data.data || []); // Ensure the response data is assigned correctly
      }
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };
  
  const handleCountryChange = (selectedCountry) => {
    if (!selectedCountry) return;
    
    setSelectedCountry(selectedCountry); // Store selected country object
    setAddressFormData({ ...addressFormData, CountryID: selectedCountry.CountryID }); // Update formData with CountryID
    fetchStatesByCountry(selectedCountry.CountryID); // Fetch states based on selected country
  };
  
 
  const handleStateChange = (state) => {
    setSelectedState(state); // Set the selected state
    setAddressFormData({ ...addressFormData, StateID: state.StateID }); // Update form data
    fetchCitiesByState(state.StateID); // Fetch cities for the selected state
  };
  
  const handleCityChange = (city) => {
    setSelectedCity(city); // Set the selected city
    setAddressFormData({ ...addressFormData, CityID: city.CityID }); // Update form data
  };
  
    
  const handleError = (error) => {
    console.error("Error:", error);
    if (error.response) {
      setError("Failed to create customer: " + error.response.data.message);
    } else if (error.request) {
      setError("No response received from server.");
    } else {
      setError("Error: " + error.message);
    }
  };

  const handleReset = () => {
    setActiveStep(0);
  
    // Reset customer form data
    setCustomerFormData({
      TenantID: 1,
      CustomerID: null,
      FirstName: "",
      LastName: "",
      Email: "",
      Password: "",
      ConfirmPassword: "",
      PhoneNumber: "",
      Gender: "",
      Comments: "" // Make sure to include this as well
    });
  
    // Reset address form data
    setAddressFormData({
      AddressLine1: "",
      AddressLine2: "",
      CityID: "",
      StateID: "",
      CountryID: "",
      ZipCode: ""
    });
  };
  

  const isStepOptional = (step) => step === 1;

  const isStepSkipped = (step) => false;

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };


  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);


const handleAddOrder = () => {
  // Create a new address object
  const newAddress = {
    AddressLine1: addressFormData.AddressLine1,
    AddressLine2: addressFormData.AddressLine2,
    CityID: selectedCity ? selectedCity.CityName : '',
    StateID: selectedState ? selectedState.StateName : '',
    CountryID: selectedCountry ? selectedCountry.CountryName : '',
    ZipCode: addressFormData.ZipCode,
  };

  // Add the new address to the formData.Addresses array
  setAddressFormData((prevData) => ({
    ...prevData,
    Addresses: [...prevData.Addresses, newAddress],
    // Clear input fields after adding the address
    AddressLine1: '',
    AddressLine2: '',
    ZipCode: '',
  }));

  // Clear selected dropdown values (if necessary)
  setSelectedCity(null);
  setSelectedState(null);
  setSelectedCountry(null);
};

// Edit function (set the selected address for editing)
const handleEdit = (index) => {
  const addressToEdit =addressFormData.Addresses[index];
  setAddressFormData({
    ...addressFormData,
    AddressLine1: addressToEdit.AddressLine1,
    AddressLine2: addressToEdit.AddressLine2,
    ZipCode: addressToEdit.ZipCode,
  });
  setSelectedCity({ CityID: addressToEdit.CityID });
  setSelectedState({ StateID: addressToEdit.StateID });
  setSelectedCountry({ CountryID: addressToEdit.CountryID });
  // You can also set a flag or index to identify which item is being edited
};


const handleDelete = (index) => {
  // Update the addressFormData by filtering out the selected address
  setAddressFormData({
    ...addressFormData,
    Addresses: addressFormData.Addresses.filter((_, i) => i !== index),
  });

  // Optionally, if customerFormData also has an Addresses field or needs updating
  setCustomerFormData({
    ...customerFormData,
    Addresses: customerFormData.Addresses.filter((_, i) => i !== index),
  });
};

// const handleDelete = (index) => {
//   if (Array.isArray(addressFormData.Addresses)) {
//     setAddressFormData({
//       ...addressFormData,
//       Addresses: addressFormData.Addresses.filter((_, i) => i !== index),
//     });
//   }
  
//   if (Array.isArray(customerFormData.Addresses)) {
//     setCustomerFormData({
//       ...customerFormData,
//       Addresses: customerFormData.Addresses.filter((_, i) => i !== index),
//     });
//   }
// };


const handleCancel = () => {
  navigate("/Customer");
};

  return (
    <>
      
      <div className="p-8 mr-10 mb-7 sm:px-6 lg:px-8 pt-4 ml-10 lg:ml-80 w-1/8 mt-8 bg-white shadow-lg rounded-lg">
        <Box sx={{ width: '100%' }}>
          <Stepper activeStep={activeStep} className="mb-6" alternativeLabel>
            {steps.map((label, index) => (
              <Step key={label} completed={isStepSkipped(index) ? false : undefined}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography className="text-center text-xl mb-4">
                All steps completed - you're finished
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }} className="justify-center">
                <Button onClick={handleReset} className="bg-blue-500 text-white hover:bg-blue-700 px-4 py-2 rounded">
                  Reset
                </Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: '1fr' },
                  gap: 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                  pt: 2,
                }}
              >
                {activeStep === 0 && (

<div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
  {/* First Name */}
  <div className="flex items-center gap-4">
    <label className="w-1/3 text-xs font-medium text-gray-700">First name</label>
    <input
      type="text"
      name="FirstName"
      value={customerFormData.FirstName}
      onChange={handleFormChange}
      className={`p-1 w-full border rounded-md ${error ? 'border-red-500' : 'border-gray-400'}`}
    />
  </div>

  {/* Last Name */}
  <div className="flex items-center gap-4">
    <label className="w-1/3 text-xs font-medium text-gray-700">Last name</label>
    <input
      type="text"
      name="LastName"
      value={customerFormData.LastName}
      onChange={handleFormChange}
      className={`p-1 w-full border rounded-md ${error ? 'border-red-500' : 'border-gray-400'}`}
    />
  </div>

  {/* Phone Number */}
  <div className="flex items-center gap-4">
    <label className="w-1/3 text-xs font-medium text-gray-700">Phone Number</label>
    <input
      type="text"
      name="PhoneNumber"
      value={customerFormData.PhoneNumber}
      onChange={handleFormChange}
      className={`p-1 w-full border rounded-md ${error ? 'border-red-500' : 'border-gray-400'}`}
    />
  </div>

  <div className="flex items-center gap-4">
    <label className="w-1/3 text-xs font-medium text-gray-700">Alternate Phone Number</label>
    <input
      type="text"
      name="AlternatePhoneNumber"
      value={customerFormData.AlgternatePhoneNumber}
      onChange={handleFormChange}
      className={`p-1 w-full border rounded-md ${error ? 'border-red-500' : 'border-gray-400'}`}
    />
  </div>

  {/* Email */}
  <div className="flex items-center gap-4">
    <label className="w-1/3 text-xs font-medium text-gray-700">Email</label>
    <input
      type="email"
      name="Email"
      value={customerFormData.Email}
      onChange={handleFormChange}
      className={`p-1 w-full border rounded-md ${error ? 'border-red-500' : 'border-gray-400'}`}
    />
  </div>

  {/* Password */}
  <div className="flex items-center gap-4">
    <label className="w-1/3 text-xs font-medium text-gray-700">Password</label>
    <input
      type="password"
      name="Password"
      value={customerFormData.Password}
      onChange={handleFormChange}
      className={`p-1 w-full border rounded-md ${error ? 'border-red-500' : 'border-gray-400'}`}
    />
  </div>

  {/* Confirm Password */}
  <div className="flex items-center gap-4">
    <label className="w-1/3 text-xs font-medium text-gray-700">Confirm Password</label>
    <input
      type="password"
      name="ConfirmPassword"
      value={customerFormData.ConfirmPassword}
      onChange={handleFormChange}
      className={`p-1 w-full border rounded-md ${error ? 'border-red-500' : 'border-gray-400'}`}
    />
  </div>

  {/* Gender */}
  <div className="flex items-center gap-4">
    <label className="w-1/3 text-xs font-medium text-gray-700">Gender</label>
    <Combobox value={selectedGender} onChange={handleGenderChange}>
      <div className="relative w-full">
        <Combobox.Input
          className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
          displayValue={(gender) => gender.name}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </Combobox.Button>
        <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {genderOptions.map((gender) => (
            <Combobox.Option
              key={gender.id}
              className={({ active }) =>
                `relative cursor-default select-none py-2 pl-3 pr-9 ${
                  active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                }`
              }
              value={gender}
            >
              {({ selected, active }) => (
                <>
                  <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                    {gender.name}
                  </span>
                  {selected && (
                    <span
                      className={`absolute inset-y-0 right-0 flex items-center pr-4 ${
                        active ? 'text-white' : 'text-indigo-600'
                      }`}
                    >
                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  )}
                </>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </div>
    </Combobox>
  </div>

  {/* Comments */}
  <div className="flex items-center gap-4">
    <label className="w-1/3 text-xs font-medium text-gray-700">Comments</label>
    <textarea
      name="comments"
      value={customerFormData?.comments || ""}
      onChange={handleFormChange}
      className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
      rows="1"
    />
  </div>

 <div className="flex flex-col gap-4">
  {/* Referred By Field */}
  <div className="flex items-center gap-4">
    <label className="w-1/3 text-xs font-medium text-gray-700">Referred By</label>
    <div className="w-full">
      <Combobox as="div" value={selectedReferralType} onChange={handleReferralTypeChange}>
        <div className="relative">
          <Combobox.Input
            className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            onChange={(event) => setQuery(event.target.value)}
            displayValue={(type) => type || ''}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </Combobox.Button>

          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {['Social Media', 'Walk-In', 'Reference'].map((type, index) => (
              <Combobox.Option
                key={index}
                value={type}
                className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-indigo-600 hover:text-white"
              >
                <span className="block truncate font-normal group-data-[selected]:font-semibold">
                  {type}
                </span>
                <span className="absolute inset-y-0 right-0 hidden items-center pr-4 text-indigo-600 group-data-[selected]:flex group-data-[focus]:text-white">
                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                </span>
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </div>
      </Combobox>
    </div>
  </div>

  {/* Conditional Rendering for Reference */}
  {selectedReferralType === 'Reference' && (
   
    <div className="flex flex-col gap-4">
  {/* Reference Sub-option */}
  <div className="flex items-center gap-4">
    <label className="w-1/3 text-xs font-medium text-gray-700">Reference Sub-option</label>
    <div className="w-full">
      <Combobox as="div" value={selectedReferenceSubOption} onChange={handleReferenceSubOptionChange}>
        <div className="relative">
          <Combobox.Input
            className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            onChange={(event) => setQuery(event.target.value)}
            displayValue={(option) => option || ''}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </Combobox.Button>

          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {['Director', 'Employee', 'Existing'].map((option, index) => (
              <Combobox.Option
                key={index}
                value={option}
                className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-indigo-600 hover:text-white"
              >
                <span className="block truncate font-normal group-data-[selected]:font-semibold">
                  {option}
                </span>
                <span className="absolute inset-y-0 right-0 hidden items-center pr-4 text-indigo-600 group-data-[selected]:flex group-data-[focus]:text-white">
                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                </span>
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </div>
      </Combobox>
    </div>
  </div>
</div>

  )}

  {/* Conditional Rendering for Social Media */}
  {selectedReferralType === 'Social Media' && (

    <div className="flex flex-col gap-4">
  {/* Social Media Platform */}
  <div className="flex items-center gap-4">
    <label className="w-1/3 text-xs font-medium text-gray-700">Social Media Platform</label>
    <div className="w-full">
      <Combobox as="div" value={selectedSocialMediaPlatform} onChange={handleSocialMediaPlatformChange}>
        <div className="relative">
          <Combobox.Input
             className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            onChange={(event) => setQuery(event.target.value)}
            displayValue={(platform) => platform || ''}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </Combobox.Button>

          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {['Facebook', 'Instagram', 'Twitter'].map((platform, index) => (
              <Combobox.Option
                key={index}
                value={platform}
                className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-indigo-600 hover:text-white"
              >
                <span className="block truncate font-normal group-data-[selected]:font-semibold">
                  {platform}
                </span>
                <span className="absolute inset-y-0 right-0 hidden items-center pr-4 text-indigo-600 group-data-[selected]:flex group-data-[focus]:text-white">
                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                </span>
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </div>
      </Combobox>
    </div>
  </div>
</div>

    
  )}

  {/* Error Message */}
  {error && <p className="mt-2 text-red-600 text-xs">{error}</p>}
</div>

<div className="mt-6 flex justify-end gap-4">
            <button
              type="submit"
              onClick={handleFormSubmit}
              className="inline-flex justify-center rounded-md border border-transparent bg-custom-darkblue py-2 px-4 text-sm font-medium text-white hover:text-black shadow-sm hover:bg-custom-lightblue focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="inline-flex justify-center rounded-md border border-transparent bg-red-500 py-2 px-4 text-sm font-medium text-white hover:text-black shadow-sm hover:bg-red-200"
            >
              Cancel
            </button>
          </div>

</div>


                )}
                {activeStep === 1 && (

<div>
{/* Address Form */}
<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
  <div className="flex items-center gap-4">
  <label className="w-1/3 text-xs font-medium text-gray-700">Address Line 1</label>
  <input
    type="text"
    name="AddressLine1"
    value={addressFormData.AddressLine1}
    onChange={handleFormChange}
    className={`p-1 w-full border rounded-md ${error ? 'border-red-500' : 'border-gray-400'}`}
  />
</div>

<div className="flex items-center gap-4">
    <label className="w-1/3 text-xs font-medium text-gray-700">Address Line 2</label>
    <input
      type="text"
      name="AddressLine2"
      value={addressFormData.AddressLine2}
      onChange={handleFormChange}
      className={`p-1 mt-2 mb-1 w-full border rounded-md ${error ? 'border-red-500' : 'border-gray-400'}`}
    />
  </div>

 <div className="flex items-center gap-4">
      <label className="w-1/3 text-xs font-medium text-gray-700">Country</label>
      <div className="w-full">
        <Combobox as="div" value={selectedCountry} onChange={handleCountryChange}>
          <div className="relative">
            <Combobox.Input
              className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              onChange={(event) => setQuery(event.target.value)} // Set the query for filtering
              displayValue={(country) => country?.CountryName || ''} // Display selected country name
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </Combobox.Button>

            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {countries
                .filter((country) =>
                  country.CountryName.toLowerCase().includes(query.toLowerCase())
                )
                .map((country) => (
                  <Combobox.Option
                    key={country.CountryID}
                    value={country} // Pass the full country object to onChange
                    className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-indigo-600 hover:text-white"
                  >
                    <span className="block truncate font-normal group-data-[selected]:font-semibold">
                      {country.CountryName}
                    </span>
                    <span className="absolute inset-y-0 right-0 hidden items-center pr-4 text-indigo-600 group-data-[selected]:flex group-data-[focus]:text-white">
                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  </Combobox.Option>
                ))}
            </Combobox.Options>
          </div>
        </Combobox>
      </div>
    </div>



<div className="flex items-center gap-4">
  <label className="w-1/3 text-xs font-medium text-gray-700">State</label>
  <div className="w-full">
    <Combobox as="div" value={selectedState} onChange={handleStateChange}>
      <div className="relative">
        <Combobox.Input
          className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
          onChange={(event) => setQuery(event.target.value)} // Handle the search query
          displayValue={(state) => state?.StateName || ''} // Show the selected state name
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </Combobox.Button>

        <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {states
            .filter((state) => state.StateName.toLowerCase().includes(query.toLowerCase())) // Filter based on query
            .map((state) => (
              <Combobox.Option
                key={state.StateID}
                value={state}
                className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-indigo-600 hover:text-white"
              >
                <span className="block truncate font-normal group-data-[selected]:font-semibold">
                  {state.StateName}
                </span>
                <span className="absolute inset-y-0 right-0 hidden items-center pr-4 text-indigo-600 group-data-[selected]:flex group-data-[focus]:text-white">
                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                </span>
              </Combobox.Option>
            ))}
        </Combobox.Options>
      </div>
    </Combobox>
  </div>
</div>
<div className="flex items-center gap-4">
  <label className="w-1/3 text-xs font-medium text-gray-700">City</label>
  <div className="w-full">
    <Combobox as="div" value={selectedCity} onChange={handleCityChange}>
      <div className="relative">
        <Combobox.Input
          className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
          onChange={(event) => setQuery(event.target.value)} // Handle the search query
          displayValue={(city) => city?.CityName || ''} // Show the selected city name
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </Combobox.Button>

        <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {cities
            .filter((city) => city.CityName.toLowerCase().includes(query.toLowerCase())) // Filter based on query
            .map((city) => (
              <Combobox.Option
                key={city.CityID}
                value={city}
                className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-indigo-600 hover:text-white"
              >
                <span className="block truncate font-normal group-data-[selected]:font-semibold">
                  {city.CityName}
                </span>
                <span className="absolute inset-y-0 right-0 hidden items-center pr-4 text-indigo-600 group-data-[selected]:flex group-data-[focus]:text-white">
                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                </span>
              </Combobox.Option>
            ))}
        </Combobox.Options>
      </div>
    </Combobox>
  </div>
</div>



  <div className="flex items-center gap-4">
    <label className="w-1/3 text-xs font-medium text-gray-700">Zip Code</label>
    <input
      type="text"
      name="ZipCode"
      value={addressFormData.ZipCode}
      onChange={handleFormChange}
      className={`p-1 mt-2 mb-1 w-full border rounded-md ${error ? 'border-red-500' : 'border-gray-400'}`}
    />
  </div>

 
   <div className="flex justify-end col-span-2">
      <button
        onClick={handleAddOrder}
        className="inline-flex items-center gap-x-1.5 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
      >
        Add <span className="text-lg"><IoMdAddCircleOutline /></span>
      </button>
        
    </div>      
</div>

 <TableContainer component={Paper} className="mt-4">
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>Address Line 1</StyledTableCell>
            <StyledTableCell>Address Line 2</StyledTableCell>
            <StyledTableCell>City</StyledTableCell>
            <StyledTableCell>State</StyledTableCell>
            <StyledTableCell>Zip Code</StyledTableCell>
            <StyledTableCell>Actions</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {addressFormData.Addresses.length > 0 &&
            addressFormData.Addresses.map((address, index) => {
              // Check if the address is an object
              if (typeof address === 'object') {
                return (
                  <StyledTableRow key={index}>
                    <StyledTableCell>{address.AddressLine1 || ''}</StyledTableCell>
                    <StyledTableCell>{address.AddressLine2 || ''}</StyledTableCell>
                    <StyledTableCell>{address.CityID || ''}</StyledTableCell>
                    <StyledTableCell>{address.StateID || ''}</StyledTableCell>
                    <StyledTableCell>{address.ZipCode || ''}</StyledTableCell>
                    <StyledTableCell>
                      <Button
                        onClick={() => handleEdit(index)}
                        startIcon={<FaEdit />}
                        variant="contained"
                        color="primary"
                        size="small"
                        className="mr-2"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(index)}
                        startIcon={<FaTrashAlt />}
                        variant="contained"
                        color="secondary"
                        size="small"
                      >
                        Delete
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                );
              } else if (typeof address === 'string') {
                // Handle case if address is still a string
                const addressParts = address.split(", ");
                return (
                  <StyledTableRow key={index}>
                    <StyledTableCell>{addressParts[0] || ''}</StyledTableCell>
                    <StyledTableCell>{addressParts[1] || ''}</StyledTableCell>
                    <StyledTableCell>{addressParts[2] || ''}</StyledTableCell>
                    <StyledTableCell>{addressParts[3] || ''}</StyledTableCell>
                    <StyledTableCell>{addressParts[4] || ''}</StyledTableCell>
                    <StyledTableCell>{addressParts[5] || ''}</StyledTableCell>
                  </StyledTableRow>
                );
              }
              return null;
            })}
        </TableBody>
      </Table>
    </TableContainer> 

<div className="mt-6 flex justify-end gap-4">
            <button
              type="submit"
              onClick={handleFormSubmit}
              className="inline-flex justify-center rounded-md border border-transparent bg-custom-darkblue py-2 px-4 text-sm font-medium text-white hover:text-black shadow-sm hover:bg-custom-lightblue focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="inline-flex justify-center rounded-md border border-transparent bg-red-500 py-2 px-4 text-sm font-medium text-white hover:text-black shadow-sm hover:bg-red-200"
            >
              Cancel
            </button>
          </div>

</div>     
                )}
                  {activeStep === 2 && (

<TableContainer component={Paper} className="mt-4">
<Table>
  <TableHead>
    <TableRow>
      <StyledTableCell>Order ID</StyledTableCell>
      <StyledTableCell>Order Date</StyledTableCell>
      <StyledTableCell>Total Amount</StyledTableCell>
      <StyledTableCell>Status</StyledTableCell>
    </TableRow>
  </TableHead>

  <TableBody>
    {orders.map((order) => (
      <StyledTableRow key={order.OrderID}>
        <StyledTableCell>{order.OrderID}</StyledTableCell>
        <StyledTableCell>{new Date(order.OrderDate).toLocaleDateString()}</StyledTableCell>
        <StyledTableCell>${order.TotalAmount}</StyledTableCell>
        <StyledTableCell>{order.OrderStatus}</StyledTableCell>
      </StyledTableRow>
    ))}
  </TableBody>
</Table>
</TableContainer>
 
  )}
                
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }} className="justify-between">
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className="bg-gray-300 text-gray-700 hover:bg-gray-400 px-4 py-2 rounded"
                >
                  Back
                </Button>
                {/* <Button
                  // onClick={activeStep === steps.length - 1 ? (isEditMode ? handleUpdateSubmit : handleFormSubmit) : handleNext}
                  onClick={activeStep === steps.length - 1 ? (handleFormSubmit) : handleNext}
                  className="bg-blue-500 text-white hover:bg-blue-700 px-4 py-2 rounded"
                >
                  {activeStep === steps.length - 1 ? (isEditMode ? 'Update' : 'Submit') : 'Next'}
                </Button> */}
                <Button
  onClick={handleNext}
  className="bg-blue-500 text-white hover:bg-blue-700 px-4 py-2 rounded"
>
  {activeStep === steps.length - 1 ? (isEditMode ? 'Update' : 'Submit') : 'Next'}
</Button>

              </Box>
            </React.Fragment>
          )}
        </Box>
      </div>
      
    </>
  );
}

export default AddCustomers;

