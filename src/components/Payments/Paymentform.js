// import React, { useState, useEffect, useContext } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import { PaymentContext } from "../../Context/paymentContext";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css"; // Import the CSS for the datepicker
// import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
// import { Combobox } from "@headlessui/react";
// import {
//   GET_ALL_PAYMENTS_API,
//   CREATEORUPDATE_PAYMENT_API,
//   GET_ALL_ORDERS,
// } from "../../../src/Constants/apiRoutes";
// import { IoIosSearch } from "react-icons/io";

// function Paymentform() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { paymentDetails } = useContext(PaymentContext);
//   const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
//   const isEditMode = Boolean(
//     location.state?.paymentDetails?.payment || paymentDetails?.payment
//   );
//   const [payments, setPayments] = useState([]);
//   // Define the available payment methods here
//   const paymentMethods = [
//     "UPI",
//     "AmazonPay",
//     "PayPal",
//     "Credit Card",
//     "Debit Card",
//     "Cash",
//   ];
//   const paymentStatuses = ["Processing", "Completed", "Failed"]; // Add Payment Statuses if needed

//   // Define state for loading and error
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [searchName, setSearchName] = useState("");
  

//   const [formData, setFormData] = useState({
//     TenantID: 1,
//     PaymentMethod: "",
//     PaymentDate: new Date(), 
//     OrderNumber: "",
//     CustomerName: "",
//     TotalAmount: "",
//     AdvanceAmount: "",
//     BalanceAmount: "",
//     PaymentComments: "",
//     PaymentStatus: "Processing", 
//     CustomerID:"",
//     OrderID:"",
//   });

//   useEffect(() => {
//     if (isEditMode) {
//       const orderId =
//         location.state?.paymentDetails?.payment?.OrderID ||
//         paymentDetails?.payment?.OrderID;
//       if (orderId) {
//         setLoading(true);
//         axios
//           .get(`${GET_ALL_ORDERS}${orderId}`)
//           .then((response) => {
//             const payment = response.data;
//             setFormData({
//               TenantID: payment.TenantID || "",
//               PaymentMethod: payment.PaymentMethod || "",
//               PaymentDate: new Date(payment.PaymentDate) || new Date(), // Format date as a Date object
//               OrderNumber: payment.OrderID || "",
//               CustomerName: payment.CustomerID || "",
//               TotalAmount: payment.TotalAmount || "",
//               AdvanceAmount: payment.AdvanceAmount || "",
//               BalanceAmount: payment.BalenceAmount || "",
//               PaymentComments: payment.PaymentComments || "",
//               PaymentStatus: payment.PaymentStatus || "Processing",
//               CustomerID:payment.CustomerID||"",
//               OrderID:payment.OrderID||"",
//             });
//             setError(null); // Clear any previous error
//           })
//           .catch((err) => {
//             setError("Failed to fetch payment details.");
//             console.error("Error fetching payment details:", err);
//           })
//           .finally(() => {
//             setLoading(false);
//           });
//       }
//     }
//   }, [
//     isEditMode,
//     location.state?.paymentDetails?.payment,
//     paymentDetails?.payment,
//   ]);

//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleDateChange = (date) => {
//     setFormData({
//       ...formData,
//       PaymentDate: date, // Set the date when the user selects a new date
//     });
//   };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();
//     // Prepare the payment data for submission
//     const paymentData = {
//       TenantID: formData.TenantID,
//       PaymentMethod: selectedPaymentMethod || formData.PaymentMethod, // Use the selected payment method or default form data
//       PaymentDate: formData.PaymentDate,
//       OrderID: formData.OrderID,
//       OrderNumber: formData.OrderNumber,
//       CustomerID: formData.CustomerName,
//       TotalAmount: formData.TotalAmount,
//       AdvanceAmount: formData.AdvanceAmount || "0.00", // Default to 0 if not provided
//       BalanceAmount: formData.BalanceAmount || "0.00", // Default to 0 if not provided
//       PaymentComments: formData.PaymentComments || "",
//       PaymentStatus: formData.PaymentStatus,
//       CustomerID:formData.CustomerID,
//       OrderID:formData.OrderID,
//     };

//     console.log("Submitting payment data:", paymentData); // Log the data for debugging

//     setLoading(true); // Set loading to true while submitting

//     try {
//       const response = await axios.post(
//         CREATEORUPDATE_PAYMENT_API,
//         paymentData
//       );
//       console.log("Payment API response:", response.data); // Log the response

//       if (response.data?.StatusCode === "SUCCESS") {
//         console.log("Payment successfully created or updated.");
//         // Redirect the user to the payments list or success page
//         navigate("/Payments");
//       } else {
//         throw new Error(response.data?.message || "Payment submission failed.");
//       }
//     } catch (err) {
//       setError(`Failed to submit the payment: ${err.message}`);
//       console.error("Error submitting payment:", err); // Log the error
//     } finally {
//       setLoading(false); // Stop the loading state
//     }
//   };

//   const handleCancel = () => {
//     navigate("/Payments");
//   };
//   const getAllPayments = async (search = "") => {
//     try {
//       const response = await axios.get(
//         // GET_ALL_PAYMENTS_API,
//         GET_ALL_ORDERS,
//         {
//           params: {
//             searchText:search
//           }
//         }
//       );
//       return {
//         payments: response.data.data || [],
//         totalCount: response.data.totalRecords || 0
//       };
//     } catch (error) {
//       console.error("Error fetching payments:", error);
//       throw error;
//     }
//   };

  
// //   const handleSearchChange = async (e) => {
// //     const value = e.target.value;
// //     setSearchName(value);

// //     // Call the API with the new search value
// //     try {
// //       const paymentsData = await getAllPayments(value);
// //       setPayments(paymentsData.payments); // Store fetched payments

// //       // If you want to set the first payment into the form (or handle selection differently)
// //       if (paymentsData.payments.length > 0) {
// //         const firstPayment = paymentsData.payments[0]; // Get the first payment entry
// //         setFormData({
// //           TenantID: firstPayment.TenantID,
// //           PaymentMethod: firstPayment.PaymentMethod,
// //           PaymentDate: firstPayment.PaymentDate,
// //           OrderID: firstPayment.OrderID, // Assuming OrderID is extracted this way
// //           OrderNumber: firstPayment.Order.OrderNumber,
// //           CustomerID: firstPayment.CustomerID,
// //           TotalAmount: firstPayment.TotalAmount,
// //           AdvanceAmount: firstPayment.AdvanceAmount || '0.00', // Default to 0 if not provided
// //           BalanceAmount: firstPayment.BalanceAmount || '0.00', // Default to 0 if not provided
// //           PaymentComments: firstPayment.PaymentComments || '',
// //           PaymentStatus: firstPayment.PaymentStatus,
// //         });
// //       }
// //     } catch (error) {
// //       console.error("Error fetching payments:", error);
// //     }
// //   };

// // Function to fetch order data based on OrderNumber
// // const handleSearchChange = (e) => {
// //     const query = e.target.value.trim().toLowerCase(); // Trim and convert to lowercase
// //     setSearchName(query);
  
// //     if (query.length >= 8) {
// //       // Call the API to fetch payments based on the search query
// //       getAllPayments(query)
// //         .then((paymentsData) => {
// //           const filteredPayments = paymentsData.payments.filter((payment) => {
// //             const orderNumber = payment.Order?.OrderNumber?.toLowerCase() || "";
// //             const paymentMethod = payment.PaymentMethod?.toLowerCase() || "";
// //             const paymentComments = payment.PaymentComments?.toLowerCase() || "";
  
// //             // Filter based on order number, payment method, or payment comments
// //             return (
// //               orderNumber.includes(query) ||
// //               paymentMethod.includes(query) ||
// //               paymentComments.includes(query)
// //             );
// //           });
  
// //           setPayments(filteredPayments); // Store fetched payments
  
// //           // If you want to set the first payment into the form (or handle selection differently)
// //           if (filteredPayments.length > 0) {
// //             const firstPayment = filteredPayments[0]; // Get the first filtered payment entry
// //             setFormData({
// //               TenantID: firstPayment.TenantID,
// //               PaymentMethod: firstPayment.PaymentMethod,
// //               PaymentDate: firstPayment.PaymentDate,
// //               OrderID: firstPayment.OrderID, // Assuming OrderID is extracted this way
// //               OrderNumber: firstPayment.Order.OrderNumber,
// //               CustomerID: firstPayment.CustomerID,
// //               TotalAmount: firstPayment.TotalAmount,
// //               AdvanceAmount: firstPayment.AdvanceAmount || '0.00', // Default to 0 if not provided
// //               BalanceAmount: firstPayment.BalanceAmount || '0.00', // Default to 0 if not provided
// //               PaymentComments: firstPayment.PaymentComments || '',
// //               PaymentStatus: firstPayment.PaymentStatus,
// //             });
// //           }
// //         })
// //         .catch((error) => {
// //           console.error("Error fetching payments:", error);
// //           setPayments([]); // Clear payments on error
// //         });
// //     } else {
// //       setPayments([]); // Clear payments if the query is less than 3 characters
// //     }
// //   };
  
// // const handleSearchChange = (e) => {
// //     const query = e.target.value.trim().toLowerCase(); // Trim and convert to lowercase
// //     setSearchName(query);
  
// //     if (query.length >= 3) { // Check for 3 characters or more
// //       getAllPayments(query)
// //         .then((paymentsData) => {
// //           const filteredPayments = paymentsData.payments.filter((payment) => {
// //             const orderNumber = payment.Order?.OrderNumber?.toLowerCase() || "";
// //             const paymentMethod = payment.PaymentMethod?.toLowerCase() || "";
// //             const paymentComments = payment.PaymentComments?.toLowerCase() || "";
  
// //             // Filter based on order number, payment method, or payment comments
// //             return (
// //               orderNumber.includes(query) ||
// //               paymentMethod.includes(query) ||
// //               paymentComments.includes(query)
// //             );
// //           });
  
// //           setPayments(filteredPayments); // Store fetched payments
  
// //           if (filteredPayments.length > 0) {
// //             const firstPayment = filteredPayments[0];
// //             setFormData({
// //               TenantID: firstPayment.TenantID,
// //               PaymentMethod: firstPayment.PaymentMethod,
// //               PaymentDate: firstPayment.PaymentDate,
// //               OrderID: firstPayment.OrderID,
// //               OrderNumber: firstPayment.Order?.OrderNumber,
// //               CustomerID: firstPayment.CustomerID,
// //               TotalAmount: firstPayment.TotalAmount,
// //               AdvanceAmount: firstPayment.AdvanceAmount || '0.00',
// //               BalanceAmount: firstPayment.BalanceAmount || '0.00',
// //               PaymentComments: firstPayment.PaymentComments || '',
// //               PaymentStatus: firstPayment.PaymentStatus,
// //             });
// //           }
// //         })
// //         .catch((error) => {
// //           console.error("Error fetching payments:", error);
// //           setPayments([]); // Clear payments on error
// //         });
// //     } else {
// //       setPayments([]); // Clear payments if the query is less than 3 characters
// //     }
// //   };
  
// //   const getAllPayments = async (search = "") => {
// //     try {
// //       const response = await axios.get(GET_ALL_ORDERS, {
// //         params: {
// //           searchText: search
// //         }
// //       });
// //       return {
// //         payments: response.data.data || [], // Adjust based on the correct structure
// //         totalCount: response.data.totalRecords || 0
// //       };
// //     } catch (error) {
// //       console.error("Error fetching payments:", error);
// //       throw error;
// //     }
// //   };
  
// // const searchItems = async (orderNumber) => {
// //   try {
// //     const response = await fetch(`GET_ALL_ORDERS/${orderNumber}`);
// //     const data = await response.json();
// //     if (data && data.success) {
// //       const order = data.order;

// //       // Populate form data with the order information
// //       setFormData({
// //         PaymentMethod: order.PaymentMethod,
// //         PaymentStatus: order.PaymentStatus,
// //         PaymentDate: new Date(order.PaymentDate), // Assuming you use a date picker for this field
// //         TotalAmount: order.TotalAmount,
// //         AdvanceAmount: order.AdvanceAmount,
// //         BalanceAmount: order.BalanceAmount,
// //         PaymentComments: order.PaymentComments,
// //       });
// //     } else {
// //       console.error('Order not found');
// //     }
// //   } catch (error) {
// //     console.error('Error fetching order data:', error);
// //   }
// // };

// const handleSearchChange = (e) => {
//     const query = e.target.value.trim().toLowerCase(); // Trim and convert to lowercase
//     setSearchName(query);
  
//     if (query.length >= 3) { // Check for 3 characters or more
//       getAllPayments(query)
//         .then((paymentsData) => {
//           const filteredPayments = paymentsData.payments.filter((payment) => {
//             const orderNumber = payment.OrderNumber?.toLowerCase() || ""; // Adjusted access
//             const comments = payment.Comments?.toLowerCase() || ""; // Assuming comments are part of the order data
  
//             // Filter based on order number or comments
//             return orderNumber.includes(query) || comments.includes(query);
//           });
  
//           setPayments(filteredPayments); // Store fetched payments
  
//           if (filteredPayments.length > 0) {
//             const firstPayment = filteredPayments[0];
//             setFormData({
//               TenantID: firstPayment.TenantID,
//               PaymentMethod: firstPayment.PaymentMethod || '', // Check if available
//               PaymentDate: firstPayment.CreatedAt || '', // Using CreatedAt as PaymentDate; adjust if needed
//               OrderID: firstPayment.OrderID,
//               OrderNumber: firstPayment.OrderNumber, // Adjusted access
//               CustomerID: firstPayment.CustomerID,
//               TotalAmount: firstPayment.TotalAmount,
//               AdvanceAmount: firstPayment.AdvanceAmount || '0.00', // Default to 0 if not provided
//               BalanceAmount: firstPayment.BalanceAmount || '0.00', // Default to 0 if not provided
//               PaymentComments: firstPayment.Comments || '', // Assuming Comments are part of the order
//               PaymentStatus: firstPayment.OrderStatus || '', // Assuming OrderStatus is the payment status
//             });
//           }
//         })
//         .catch((error) => {
//           console.error("Error fetching payments:", error);
//           setPayments([]); // Clear payments on error
//         });
//     } else {
//       setPayments([]); // Clear payments if the query is less than 3 characters
//     }
//   };
  


//   return (
//     <div className="px-4 sm:px-6 lg:px-8 pt-4 sm:ml-10 lg:ml-72 w-auto">
//       <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
//         {loading && <p>Loading...</p>}
//         {error && <p className="text-red-500">{error}</p>}
//          <form onSubmit={isEditMode ? handleFormSubmit : handleFormSubmit}>
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-xl font-semibold mb-4 px-24">Payments</h2>
//           </div>

//           <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8 px-16 md:px-24">
            
       
//           <div className="relative flex w-full sm:w-[20rem]">
//   <label htmlFor="searchName" className="sr-only">
//     Search
//   </label>
//   <input
//     id="searchName"
//     type="text"
//     placeholder="Search by Name, Email, or Mobile"
//     value={searchName}
//     onChange={handleSearchChange}  // Updated to call the API
//     className="w-full p-2 pr-10 border border-gray-300 rounded-md"
//   />
//   <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
//     <IoIosSearch />
//   </div>
// </div>


//             <div className="w-full sm:w-64">
//               <label
//                 htmlFor="PaymentMethod"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Payment Method
//               </label>
//               <div className="relative mt-1">
//                 <Combobox
//                   value={selectedPaymentMethod}
//                   onChange={setSelectedPaymentMethod}
//                 >
//                   <Combobox.Input
//                     className="w-full rounded-md border-0 bg-white py-2 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
//                     displayValue={(paymentMethod) => paymentMethod}
//                     placeholder="Select Payment Method"
//                   />
//                   <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
//                     <ChevronUpDownIcon
//                       className="h-5 w-5 text-gray-400"
//                       aria-hidden="true"
//                     />
//                   </Combobox.Button>
//                   <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
//                     {paymentMethods.map((method) => (
//                       <Combobox.Option
//                         key={method}
//                         className={({ active }) =>
//                           `relative cursor-default select-none py-2 pl-3 pr-9 ${
//                             active
//                               ? "bg-indigo-600 text-white"
//                               : "text-gray-900"
//                           }`
//                         }
//                         value={method}
//                       >
//                         {({ selected, active }) => (
//                           <>
//                             <span
//                               className={`block truncate ${
//                                 selected ? "font-semibold" : "font-normal"
//                               }`}
//                             >
//                               {method}
//                             </span>
//                             {selected && (
//                               <span
//                                 className={`absolute inset-y-0 right-0 flex items-center pr-4 ${
//                                   active ? "text-white" : "text-indigo-600"
//                                 }`}
//                               >
//                                 <CheckIcon
//                                   className="h-5 w-5"
//                                   aria-hidden="true"
//                                 />
//                               </span>
//                             )}
//                           </>
//                         )}
//                       </Combobox.Option>
//                     ))}
//                   </Combobox.Options>
//                 </Combobox>
//               </div>
//             </div>

//             <div className="w-full sm:w-64">
//               <label
//                 htmlFor="PaymentStatus"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Payment Status
//               </label>
//               <div className="relative mt-1">
//                 <Combobox
//                   value={formData.PaymentStatus}
//                   onChange={(value) =>
//                     setFormData({ ...formData, PaymentStatus: value })
//                   }
//                 >
//                   <Combobox.Input
//                     className="w-full rounded-md border-0 bg-white py-2 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
//                     displayValue={(status) => status}
//                     placeholder="Select Payment Status"
//                   />
//                   <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
//                     <ChevronUpDownIcon
//                       className="h-5 w-5 text-gray-400"
//                       aria-hidden="true"
//                     />
//                   </Combobox.Button>
//                   <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
//                     {["Processing", "Completed", "Failed"].map((status) => (
//                       <Combobox.Option
//                         key={status}
//                         className={({ active }) =>
//                           `relative cursor-default select-none py-2 pl-3 pr-9 ${
//                             active
//                               ? "bg-indigo-600 text-white"
//                               : "text-gray-900"
//                           }`
//                         }
//                         value={status}
//                       >
//                         {({ selected, active }) => (
//                           <>
//                             <span
//                               className={`block truncate ${
//                                 selected ? "font-semibold" : "font-normal"
//                               }`}
//                             >
//                               {status}
//                             </span>
//                             {selected && (
//                               <span
//                                 className={`absolute inset-y-0 right-0 flex items-center pr-4 ${
//                                   active ? "text-white" : "text-indigo-600"
//                                 }`}
//                               >
//                                 <CheckIcon
//                                   className="h-5 w-5"
//                                   aria-hidden="true"
//                                 />
//                               </span>
//                             )}
//                           </>
//                         )}
//                       </Combobox.Option>
//                     ))}
//                   </Combobox.Options>
//                 </Combobox>
//               </div>
//             </div>

    
//             {/* <div className="w-full sm:w-70">
//               <label
//                 htmlFor="PaymentDate"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Payment Date
//               </label>
//               <DatePicker
//                 selected={formData.PaymentDate} // Bind the date picker to formData.PaymentDate
//                 onChange={handleDateChange} // Handler for date changes
//                 dateFormat="dd/MM/yyyy" // Format the date as per your need
//                 className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                 placeholderText="DD/MM/YYYY" // Placeholder text for the input
//                 required
//               />
//             </div> */}
//                  <div>
//                         <label className="block text-xs font-medium text-gray-700">
//                         Payment Date
//                         </label>
//                         <input
//                           type="date"
//                           name="OrderDate"
//                           value={formData.PaymentDate}
//                           onChange={handleDateChange}
//                           className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                         />
                      
//                       </div>

//             <div className="w-full sm:w-64">
//               <label
//                 htmlFor="TotalAmount"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Total Amount
//               </label>
//               <input
//                 type="text"
//                 id="TotalAmount"
//                 name="TotalAmount"
//                 value={formData.TotalAmount || ""}
//                 onChange={handleFormChange}
//                 required
//                   className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//               />
//             </div>

//             <div className="w-full sm:w-64">
//               <label
//                 htmlFor="AdvanceAmount"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Advance Amount
//               </label>
//               <input
//                 type="text"
//                 id="AdvanceAmount"
//                 name="AdvanceAmount"
//                 value={formData.AdvanceAmount || ""}
//                 onChange={handleFormChange}
//                 className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//               />
//             </div>

//             <div className="w-full sm:w-64">
//               <label
//                 htmlFor="BalanceAmount"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Balance Amount
//               </label>
//               <input
//                 type="text"
//                 id="BalanceAmount"
//                 name="BalanceAmount"
//                 value={formData.BalanceAmount || ""}
//                 onChange={handleFormChange}
//                 className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//               />
//             </div>

//             <div className="w-full sm:w-64">
//               <label
//                 htmlFor="PaymentComments"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Payment Comments
//               </label>
//               <input
//                 type="text"
//                 id="PaymentComments"
//                 name="PaymentComments"
//                 value={formData.PaymentComments || ""}
//                 onChange={handleFormChange}
//                 className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//               />
//             </div>

//             <div className="mt-6 flex justify-end gap-4">
//               <button
//                 type="submit"
//                 className="inline-flex justify-center rounded-md border border-transparent bg-custom-darkblue py-2 px-4 text-sm font-medium text-white hover:text-black shadow-sm hover:bg-custom-lightblue focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//               >
//                 {isEditMode ? "Update Payment" : "Create Payment"}
//               </button>
//               <button
//                 type="button"
//                 onClick={handleCancel}
//                 className="inline-flex justify-center rounded-md border border-transparent bg-red-500 py-2 px-4 text-sm font-medium text-white hover:text-black shadow-sm hover:bg-red-200"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </form> 
    
//       </div>
//     </div>
//   );
// }

// export default Paymentform;


// import React, { useState, useEffect, useContext } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import { PaymentContext } from "../../Context/paymentContext";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css"; // Import the CSS for the datepicker
// import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
// import { Combobox } from "@headlessui/react";
// import {
//     GET_ALL_PAYMENTS_API,
//     CREATEORUPDATE_PAYMENT_API,
//     GET_ALL_ORDERS,
// } from "../../../src/Constants/apiRoutes";
// import { IoIosSearch } from "react-icons/io";

// function Paymentform() {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const { paymentDetails } = useContext(PaymentContext);
//     const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
//     const isEditMode = Boolean(
//         location.state?.paymentDetails?.payment || paymentDetails?.payment
//     );
//     const [payments, setPayments] = useState([]);
//     // Define the available payment methods here
//     const paymentMethods = [
//         "UPI",
//         "AmazonPay",
//         "PayPal",
//         "Credit Card",
//         "Debit Card",
//         "Cash",
//     ];
//     const paymentStatuses = ["Processing", "Completed", "Failed"]; // Add Payment Statuses if needed

//     // Define state for loading and error
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [searchName, setSearchName] = useState("");
//     const [formData, setFormData] = useState({
//         TenantID: 1,
//         PaymentMethod: "",
//         PaymentDate: new Date(),
//         OrderNumber: "",
//         CustomerName: "",
//         TotalAmount: "",
//         AdvanceAmount: "",
//         BalanceAmount: "",
//         PaymentComments: "",
//         PaymentStatus: "Processing",
//         CustomerID: "",
//         OrderID: "",
//     });
//     useEffect(() => {
//         if (isEditMode) {
//             const orderId =
//                 location.state?.paymentDetails?.payment?.OrderID ||
//                 paymentDetails?.payment?.OrderID;
//             if (orderId) {
//                 setLoading(true);
//                 axios
//                     .get(`${GET_ALL_ORDERS}${orderId}`)
//                     .then((response) => {
//                         const payment = response.data;
//                         setFormData({
//                             TenantID: payment.TenantID || "",
//                             PaymentMethod: payment.PaymentMethod || "",
//                             PaymentDate: new Date(payment.PaymentDate) || new Date(), // Format date as a Date object
//                             OrderNumber: payment.OrderID || "",
//                             CustomerName: payment.CustomerID || "",
//                             TotalAmount: payment.TotalAmount || "",
//                             AdvanceAmount: payment.AdvanceAmount || "",
//                             BalanceAmount: payment.BalenceAmount || "",
//                             PaymentComments: payment.PaymentComments || "",
//                             PaymentStatus: payment.PaymentStatus || "Processing",
//                             CustomerID: payment.CustomerID || "",
//                             OrderID: payment.OrderID || "",
//                         });
//                         setError(null); 
//                     })
//                     .catch((err) => {
//                         setError("Failed to fetch payment details.");
//                         console.error("Error fetching payment details:", err);
//                     })
//                     .finally(() => {
//                         setLoading(false);
//                     });
//             }
//         }
//     }, [
//         isEditMode,
//         location.state?.paymentDetails?.payment,
//         paymentDetails?.payment,
//     ]);

//     const handleFormChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//     };

//     const handleDateChange = (date) => {
//         setFormData({
//             ...formData,
//             PaymentDate: date, // Set the date when the user selects a new date
//         });
//     };

//     const handleFormSubmit = async (event) => {
//         event.preventDefault();
//         // Prepare the payment data for submission
//         const paymentData = {
//             TenantID: formData.TenantID,
//             PaymentMethod: selectedPaymentMethod || formData.PaymentMethod, // Use the selected payment method or default form data
//             PaymentDate: formData.PaymentDate,
//             OrderID: formData.OrderID,
//             OrderNumber: formData.OrderNumber,
//             CustomerID: formData.CustomerName,
//             TotalAmount: formData.TotalAmount,
//             AdvanceAmount: formData.AdvanceAmount || "0.00", // Default to 0 if not provided
//             BalanceAmount: formData.BalanceAmount || "0.00", // Default to 0 if not provided
//             PaymentComments: formData.PaymentComments || "",
//             PaymentStatus: formData.PaymentStatus,
//             CustomerID: formData.CustomerID,
//             OrderID: formData.OrderID,
//         };

//         console.log("Submitting payment data:", paymentData); // Log the data for debugging

//         setLoading(true); // Set loading to true while submitting

//         try {
//             const response = await axios.post(
//                 CREATEORUPDATE_PAYMENT_API,
//                 paymentData
//             );
//             console.log("Payment API response:", response.data); // Log the response

//             if (response.data?.StatusCode === "SUCCESS") {
//                 console.log("Payment successfully created or updated.");
//                 // Redirect the user to the payments list or success page
//                 navigate("/Payments");
//             } else {
//                 throw new Error(response.data?.message || "Payment submission failed.");
//             }
//         } catch (err) {
//             setError(`Failed to submit the payment: ${err.message}`);
//             console.error("Error submitting payment:", err); // Log the error
//         } finally {
//             setLoading(false); // Stop the loading state
//         }
//     };
//     const handleCancel = () => {
//         navigate("/Payments");
//     };
//     const getAllPayments = async (search = "") => {
//         try {
//             const response = await axios.get(
//                 GET_ALL_PAYMENTS_API,
//                 // GET_ALL_ORDERS,
//                 {
//                     params: {
//                         searchText: search
//                     }
//                 }
//             );
//             return {
//                 payments: response.data.data || [],
//                 totalCount: response.data.totalRecords || 0
//             };
//         } catch (error) {
//             console.error("Error fetching payments:", error);
//             throw error;
//         }
//     };
//     // const handleSearchChange = async (e) => {
//     //   const value = e.target.value;
//     //   setSearchName(value);

//     //   // Call the API with the new search value
//     //   try {
//     //     const paymentsData = await getAllPayments(value);
//     //     setPayments(paymentsData.payments); // Assuming you have setPayments state to store fetched payments
//     //   } catch (error) {
//     //     console.error("Error fetching payments:", error);
//     //   }
//     // };
//     const handleSearchChange = async (e) => {
//         const value = e.target.value;
//         setSearchName(value);
//         // Call the API with the new search value
//         try {
//             const paymentsData = await getAllPayments(value);
//             // Filter payments for exact matches only
//             const exactPayments = paymentsData.payments.filter(payment => payment.OrderID === value);
//             setPayments(exactPayments); // Store only exact matched payments
//             // If you want to set the first payment into the form (or handle selection differently)
//             if (exactPayments.length > 0) {
//                 const firstPayment = exactPayments[0]; // Get the first payment entry
//                 console.log(firstPayment);
//                 setFormData({
//                     TenantID: firstPayment.TenantID,
//                     PaymentMethod: firstPayment.PaymentMethod,
//                     PaymentDate: firstPayment.PaymentDate,
//                     OrderID: firstPayment.OrderID, // Assuming OrderID is extracted this way
//                     OrderNumber: firstPayment.Order.OrderNumber,
//                     CustomerID: firstPayment.CustomerID,
//                     TotalAmount: firstPayment.TotalAmount,
//                     AdvanceAmount: firstPayment.AdvanceAmount || '0.00', // Default to 0 if not provided
//                     BalanceAmount: firstPayment.BalanceAmount || '0.00', // Default to 0 if not provided
//                     PaymentComments: firstPayment.PaymentComments || '',
//                     PaymentStatus: firstPayment.PaymentStatus,
//                 });
//             }
//         } catch (error) {
//             console.error("Error fetching payments:", error);
//         }
//     };
//     // Function to fetch order data based on OrderNumber
//     const searchItems = async (orderNumber) => {
//         try {
//             const response = await fetch(`GET_ALL_ORDERS/${orderNumber}`);
//             const data = await response.json();
//             if (data && data.success) {
//                 const order = data.order;
// console.log(data.order)
//                 // Populate form data with the order information
//                 setFormData({
//                     PaymentMethod: order.PaymentMethod,
//                     PaymentStatus: order.PaymentStatus,
//                     PaymentDate: new Date(order.PaymentDate), 
//                     TotalAmount: order.TotalAmount,
//                     AdvanceAmount: order.AdvanceAmount,
//                     BalanceAmount: order.BalanceAmount,
//                     PaymentComments: order.PaymentComments,
//                 });
//             } else {
//                 console.error('Order not found');
//             }
//         } catch (error) {
//             console.error('Error fetching order data:', error);
//         }
//     };

 
//     const [isFocused, setIsFocused] = useState(false);
//     const [isHovered, setIsHovered] = useState(false);
//     const [results, setResults] = useState([]); // Placeholder for search results
  
//     // // Mock function to simulate search
//     // const handleSearchChange = (e) => {
//     //   const value = e.target.value;
//     //   setSearchName(value);
//     //   // TODO: Implement API call or filter logic to update `results`
//     //   setResults(mockResults(value)); // Mock function for example purposes
//     // };
  
//     // Handle item selection from dropdown
//     const handleOrderSelect = (result) => {
//       // TODO: Handle the selected result (e.g., set form data, make an API call, etc.)
//       console.log('Selected Order:', result);
//       setIsFocused(false); // Close dropdown after selection
//     };
  
//     // Handle mouse events for dropdown visibility
//     const handleMouseEnter = () => setIsHovered(true);
//     const handleMouseLeave = () => setIsHovered(false);
  
//     // Mock data for results
//     const mockResults = (query) => {
//       if (!query) return [];
//       // Example result array, replace with real data or API results
//       return [
//         { OrderID: '123', OrderNumber: 'ORD-12345', CustomerName: 'John Doe' },
//         { OrderID: '124', OrderNumber: 'ORD-12346', CustomerName: 'Jane Smith' },
//       ];
//     };
  
//     return (
//         <div className="px-4 sm:px-6 lg:px-8 pt-4 sm:ml-10 lg:ml-72 w-auto">
//             <div className="mt-6  p-6 ">
//                 {loading && <p>Loading...</p>}
//                 {error && <p className="text-red-500">{error}</p>}
//                 <form onSubmit={isEditMode ? handleFormSubmit : handleFormSubmit}>
//                     <div className="flex justify-between items-center mb-6">
//                         <h2 className="text-xl font-semibold mb-4 px-24">Payments</h2>
//                     </div>

//                     <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8 px-16 md:px-24">


//                     <div className="relative w-full sm:w-64">
//   <label
//     htmlFor="searchName"
//     className="block text-sm font-medium text-gray-700"
//   >
//     Search by Order Reference Number
//   </label>

//   {/* Input for searching */}
//   <input
//     id="searchName"
//     type="text"
//     placeholder="Search by OrderNumber"
//     value={searchName}
//     onChange={handleSearchChange} // Update searchName on change
//     onFocus={() => setIsFocused(true)} // Show dropdown on focus
//     onBlur={() => {
//       if (!isHovered) setIsFocused(false); // Hide dropdown if not hovered
//     }}
//     className="w-full p-2 pr-10 border border-gray-300 rounded-md"
//   />

//   {/* Search Icon */}
//   <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
//     <IoIosSearch />
//   </div>

//   {/* Dropdown with search results */}
//   <div
//     className={`absolute top-full mt-1 border rounded-lg p-2 w-full bg-white z-10 ${
//       searchName && isFocused ? "block" : "hidden"
//     }`}
//     style={{
//       maxHeight: "200px",
//       overflowY: "auto",
//     }}
//     onMouseEnter={handleMouseEnter}
//     onMouseLeave={handleMouseLeave}
//   >
//     {results.length > 0 ? (
//       <>
//         <div className="mb-2 text-sm text-gray-600">
//           {results.length} Result{results.length > 1 ? "s" : ""}
//         </div>

//         {/* Map over search results */}
//         {results.map((result) => (
//           <div
//             className="relative cursor-pointer flex flex-col p-2 hover:bg-gray-100"
//             key={result.OrderID} // Use unique identifier like OrderID
//             onClick={() => handleOrderSelect(result)}
//           >
//             <span className="font-medium">{result.OrderNumber}</span>
//             <div className="flex items-center text-xs text-gray-500">
//               <span>{result.CustomerName}</span> {/* Example, you can add more fields */}
//             </div>
//           </div>
//         ))}
//       </>
//     ) : (
//       <div className="p-2 text-gray-500">No results found.</div>
//     )}
//   </div>
// </div>



//                         <div className="w-full sm:w-64">
//                             <label
//                                 htmlFor="PaymentMethod"
//                                 className="block text-sm font-medium text-gray-700"
//                             >
//                                 Payment Method
//                             </label>
//                             <div className="relative mt-1">
//                                 <Combobox
//                                     value={selectedPaymentMethod}
//                                     onChange={setSelectedPaymentMethod}
//                                 >
//                                     <Combobox.Input
//                                         className="w-full rounded-md border-0 bg-white py-2 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
//                                         displayValue={(paymentMethod) => paymentMethod}
//                                         placeholder="Select Payment Method"
//                                     />
//                                     <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
//                                         <ChevronUpDownIcon
//                                             className="h-5 w-5 text-gray-400"
//                                             aria-hidden="true"
//                                         />
//                                     </Combobox.Button>
//                                     <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
//                                         {paymentMethods.map((method) => (
//                                             <Combobox.Option
//                                                 key={method}
//                                                 className={({ active }) =>
//                                                     `relative cursor-default select-none py-2 pl-3 pr-9 ${active
//                                                         ? "bg-indigo-600 text-white"
//                                                         : "text-gray-900"
//                                                     }`
//                                                 }
//                                                 value={method}
//                                             >
//                                                 {({ selected, active }) => (
//                                                     <>
//                                                         <span
//                                                             className={`block truncate ${selected ? "font-semibold" : "font-normal"
//                                                                 }`}
//                                                         >
//                                                             {method}
//                                                         </span>
//                                                         {selected && (
//                                                             <span
//                                                                 className={`absolute inset-y-0 right-0 flex items-center pr-4 ${active ? "text-white" : "text-indigo-600"
//                                                                     }`}
//                                                             >
//                                                                 <CheckIcon
//                                                                     className="h-5 w-5"
//                                                                     aria-hidden="true"
//                                                                 />
//                                                             </span>
//                                                         )}
//                                                     </>
//                                                 )}
//                                             </Combobox.Option>
//                                         ))}
//                                     </Combobox.Options>
//                                 </Combobox>
//                             </div>
//                         </div>

//                         <div className="w-full sm:w-64">
//                             <label
//                                 htmlFor="PaymentStatus"
//                                 className="block text-sm font-medium text-gray-700"
//                             >
//                                 Payment Status
//                             </label>
//                             <div className="relative mt-1">
//                                 <Combobox
//                                     value={formData.PaymentStatus}
//                                     onChange={(value) =>
//                                         setFormData({ ...formData, PaymentStatus: value })
//                                     }
//                                 >
//                                     <Combobox.Input
//                                         className="w-full rounded-md border-0 bg-white py-2 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
//                                         displayValue={(status) => status}
//                                         placeholder="Select Payment Status"
//                                     />
//                                     <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
//                                         <ChevronUpDownIcon
//                                             className="h-5 w-5 text-gray-400"
//                                             aria-hidden="true"
//                                         />
//                                     </Combobox.Button>
//                                     <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
//                                         {["Processing", "Completed", "Failed"].map((status) => (
//                                             <Combobox.Option
//                                                 key={status}
//                                                 className={({ active }) =>
//                                                     `relative cursor-default select-none py-2 pl-3 pr-9 ${active
//                                                         ? "bg-indigo-600 text-white"
//                                                         : "text-gray-900"
//                                                     }`
//                                                 }
//                                                 value={status}
//                                             >
//                                                 {({ selected, active }) => (
//                                                     <>
//                                                         <span
//                                                             className={`block truncate ${selected ? "font-semibold" : "font-normal"
//                                                                 }`}
//                                                         >
//                                                             {status}
//                                                         </span>
//                                                         {selected && (
//                                                             <span
//                                                                 className={`absolute inset-y-0 right-0 flex items-center pr-4 ${active ? "text-white" : "text-indigo-600"
//                                                                     }`}
//                                                             >
//                                                                 <CheckIcon
//                                                                     className="h-5 w-5"
//                                                                     aria-hidden="true"
//                                                                 />
//                                                             </span>
//                                                         )}
//                                                     </>
//                                                 )}
//                                             </Combobox.Option>
//                                         ))}
//                                     </Combobox.Options>
//                                 </Combobox>
//                             </div>
//                         </div>


//                         <div className="w-full sm:w-70">
//                             <label
//                                 htmlFor="PaymentDate"
//                                 className="block text-sm font-medium text-gray-700"
//                             >
//                                 Payment Date
//                             </label>
//                             <DatePicker
//                                 selected={formData.PaymentDate} // Bind the date picker to formData.PaymentDate
//                                 onChange={handleDateChange} // Handler for date changes
//                                 dateFormat="dd/MM/yyyy" // Format the date as per your need
//                                 className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                                 placeholderText="DD/MM/YYYY" // Placeholder text for the input
//                                 required
//                             />
//                         </div>

//                         <div className="w-full sm:w-64">
//                             <label
//                                 htmlFor="TotalAmount"
//                                 className="block text-sm font-medium text-gray-700"
//                             >
//                                 Total Amount
//                             </label>
//                             <input
//                                 type="text"
//                                 id="TotalAmount"
//                                 name="TotalAmount"
//                                 value={formData.TotalAmount || ""}
//                                 onChange={handleFormChange}
//                                 required
//                                 className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                             />
//                         </div>

//                         <div className="w-full sm:w-64">
//                             <label
//                                 htmlFor="AdvanceAmount"
//                                 className="block text-sm font-medium text-gray-700"
//                             >
//                                 Advance Amount
//                             </label>
//                             <input
//                                 type="text"
//                                 id="AdvanceAmount"
//                                 name="AdvanceAmount"
//                                 value={formData.AdvanceAmount || ""}
//                                 onChange={handleFormChange}
//                                 className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                             />
//                         </div>

//                         <div className="w-full sm:w-64">
//                             <label
//                                 htmlFor="BalanceAmount"
//                                 className="block text-sm font-medium text-gray-700"
//                             >
//                                 Balance Amount
//                             </label>
//                             <input
//                                 type="text"
//                                 id="BalanceAmount"
//                                 name="BalanceAmount"
//                                 value={formData.BalanceAmount || ""}
//                                 onChange={handleFormChange}
//                                 className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                             />
//                         </div>

//                         <div className="w-full sm:w-64">
//                             <label
//                                 htmlFor="PaymentComments"
//                                 className="block text-sm font-medium text-gray-700"
//                             >
//                                 Payment Comments
//                             </label>
//                             <input
//                                 type="text"
//                                 id="PaymentComments"
//                                 name="PaymentComments"
//                                 value={formData.PaymentComments || ""}
//                                 onChange={handleFormChange}
//                                 className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                             />
//                         </div>
//                         <div></div>
//                         <div className="mt-6 flex justify-end gap-4">
//                             <button
//                                 type="submit"
//                                 className="inline-flex justify-center rounded-md border border-transparent bg-custom-darkblue py-2 px-4 text-sm font-medium text-white hover:text-black shadow-sm hover:bg-custom-lightblue focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//                             >
//                                 {isEditMode ? "Update Payment" : "Create Payment"}
//                             </button>
//                             <button
//                                 type="button"
//                                 onClick={handleCancel}
//                                 className="inline-flex justify-center rounded-md border border-transparent bg-red-500 py-2 px-4 text-sm font-medium text-white hover:text-black shadow-sm hover:bg-red-200"
//                             >
//                                 Cancel
//                             </button>
//                         </div>
//                     </div>
//                 </form>

//             </div>
//         </div>
//     );
// }

// export default Paymentform;

import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { PaymentContext } from "../../Context/paymentContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the CSS for the datepicker
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Combobox } from "@headlessui/react";
import {
  GET_ALL_PAYMENTS_API,
  CREATEORUPDATE_PAYMENT_API,
  GET_ALL_ORDERS,
} from "../../../src/Constants/apiRoutes";
import { IoIosSearch } from "react-icons/io";
import { IoIosCall, IoMdMail } from 'react-icons/io'

function Paymentform() {
  const navigate = useNavigate();
  const location = useLocation();
  const { paymentDetails } = useContext(PaymentContext);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const isEditMode = Boolean(
    location.state?.paymentDetails?.payment || paymentDetails?.payment
  );
  const [payments, setPayments] = useState([]);
  // Define the available payment methods here
  const paymentMethods = [
    "UPI",
    "AmazonPay",
    "PayPal",
    "Credit Card",
    "Debit Card",
    "Cash",
  ];
  const paymentStatuses = ["Processing", "Completed", "Failed"]; // Add Payment Statuses if needed

  // Define state for loading and error
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchName, setSearchName] = useState("");
  

  const [formData, setFormData] = useState({
    TenantID: 1,
    PaymentMethod: "",
    PaymentDate: new Date(), 
    OrderNumber: "",
    CustomerName: "",
    TotalAmount: "",
    AdvanceAmount: "",
    BalanceAmount: "",
    PaymentComments: "",
    PaymentStatus: "Processing", 
    CustomerID:"",
    OrderID:"",
  });

  useEffect(() => {
    if (isEditMode) {
      const orderId =
        location.state?.paymentDetails?.payment?.OrderID ||
        paymentDetails?.payment?.OrderID;
      if (orderId) {
        setLoading(true);
        axios
          .get(`${GET_ALL_ORDERS}${orderId}`)
          .then((response) => {
            const payment = response.data;
            setFormData({
              TenantID: payment.TenantID || "",
              PaymentMethod: payment.PaymentMethod || "",
              PaymentDate: new Date(payment.PaymentDate) || new Date(), // Format date as a Date object
              OrderNumber: payment.OrderID || "",
              CustomerName: payment.CustomerID || "",
              TotalAmount: payment.TotalAmount || "",
              AdvanceAmount: payment.AdvanceAmount || "",
              BalanceAmount: payment.BalenceAmount || "",
              PaymentComments: payment.PaymentComments || "",
              PaymentStatus: payment.PaymentStatus || "Processing",
              CustomerID:payment.CustomerID||"",
              OrderID:payment.OrderID||"",
            });
            setError(null); // Clear any previous error
          })
          .catch((err) => {
            setError("Failed to fetch payment details.");
            console.error("Error fetching payment details:", err);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }
  }, [
    isEditMode,
    location.state?.paymentDetails?.payment,
    paymentDetails?.payment,
  ]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      PaymentDate: date, // Set the date when the user selects a new date
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // Prepare the payment data for submission
    const paymentData = {
      TenantID: formData.TenantID,
      PaymentMethod: selectedPaymentMethod || formData.PaymentMethod, // Use the selected payment method or default form data
      PaymentDate: formData.PaymentDate,
      OrderID: formData.OrderID,
      OrderNumber: formData.OrderNumber,
      CustomerID: formData.CustomerName,
      TotalAmount: formData.TotalAmount,
      AdvanceAmount: formData.AdvanceAmount || "0.00", // Default to 0 if not provided
      BalanceAmount: formData.BalanceAmount || "0.00", // Default to 0 if not provided
      PaymentComments: formData.PaymentComments || "",
      PaymentStatus: formData.PaymentStatus,
      CustomerID:formData.CustomerID,
      OrderID:formData.OrderID,
    };

    console.log("Submitting payment data:", paymentData); // Log the data for debugging

    setLoading(true); // Set loading to true while submitting

    try {
      const response = await axios.post(
        CREATEORUPDATE_PAYMENT_API,
        paymentData
      );
      console.log("Payment API response:", response.data); // Log the response

      if (response.data?.StatusCode === "SUCCESS") {
        console.log("Payment successfully created or updated.");
        // Redirect the user to the payments list or success page
        navigate("/Payments");
      } else {
        throw new Error(response.data?.message || "Payment submission failed.");
      }
    } catch (err) {
      setError(`Failed to submit the payment: ${err.message}`);
      console.error("Error submitting payment:", err); // Log the error
    } finally {
      setLoading(false); // Stop the loading state
    }
  };

  const handleCancel = () => {
    navigate("/Payments");
  };
  const getAllPayments = async (search = "") => {
    try {
      const response = await axios.get(
        // GET_ALL_PAYMENTS_API,
        GET_ALL_ORDERS,
        {
          params: {
            searchText:search
          }
        }
      );
      return {
        payments: response.data.data || [],
        totalCount: response.data.totalRecords || 0
      };
    } catch (error) {
      console.error("Error fetching payments:", error);
      throw error;
    }
  };
// // Function to fetch order data based on OrderNumber
// const handleSearchChange = (e) => {
//     const query = e.target.value.trim().toLowerCase(); // Trim and convert to lowercase
//     setSearchName(query);
 
//     if (query.length >= 5) { // Check for 3 characters or more
//       getAllPayments(query)
//         .then((paymentsData) => {
//           const filteredPayments = paymentsData.payments.filter((payment) => {
//             const orderNumber = payment.OrderNumber?.toLowerCase() || ""; // Adjusted access
//             const comments = payment.Comments?.toLowerCase() || ""; // Assuming comments are part of the order data
 
//             // Filter based on order number or comments
//             return orderNumber.includes(query) || comments.includes(query);
//           });
 
//           setPayments(filteredPayments); // Store fetched payments
 
//           if (filteredPayments.length > 0) {
//             const firstPayment = filteredPayments[0];
//             setFormData({
//               TenantID: firstPayment.TenantID,
//               PaymentMethod: firstPayment.PaymentMethod || '', // Check if available
//               PaymentDate: firstPayment.CreatedAt || '', // Using CreatedAt as PaymentDate; adjust if needed
//               OrderID: firstPayment.OrderID,
//               OrderNumber: firstPayment.OrderNumber, // Adjusted access
//               CustomerID: firstPayment.CustomerID,
//               TotalAmount: firstPayment.TotalAmount,
//               AdvanceAmount: firstPayment.AdvanceAmount || '0.00', // Default to 0 if not provided
//               BalanceAmount: firstPayment.BalanceAmount || '0.00', // Default to 0 if not provided
//               PaymentComments: firstPayment.Comments || '', // Assuming Comments are part of the order
//               PaymentStatus: firstPayment.OrderStatus || '', // Assuming OrderStatus is the payment status
//             });
//           }
//         })
//         .catch((error) => {
//           console.error("Error fetching payments:", error);
//           setPayments([]); // Clear payments on error
//         });
//     } else {
//       setPayments([]); // Clear payments if the query is less than 3 characters
//     }
//   };
  
// const handleSearchChange = (e) => {
//   const query = e.target.value.trim().toLowerCase(); // Trim and convert to lowercase
//   setSearchName(query);

//   if (query.length >= 4) { // Check for 3 characters or more
//     getAllPayments(query)
//       .then((paymentsData) => {
//         const filteredPayments = paymentsData.payments.filter((payment) => {
//           const orderNumber = payment.OrderNumber?.toLowerCase() || ""; // Filter by order number
//           return orderNumber.includes(query);
//         });

//         setPayments(filteredPayments); // Store fetched payments

//         if (filteredPayments.length > 0) {
//           const firstPayment = filteredPayments[0];
//           setFormData({
//             TenantID: firstPayment.TenantID,
//             PaymentMethod: firstPayment.PaymentMethod || '', // Check if available
//             PaymentDate: firstPayment.CreatedAt || '', // Using CreatedAt as PaymentDate; adjust if needed
//             OrderID: firstPayment.OrderID,
//             OrderNumber: firstPayment.OrderNumber, // Adjusted access
//             CustomerID: firstPayment.CustomerID,
//             TotalAmount: firstPayment.TotalAmount,
//             AdvanceAmount: firstPayment.AdvanceAmount || '0.00', // Default to 0 if not provided
//             BalanceAmount: firstPayment.BalanceAmount || '0.00', // Default to 0 if not provided
//             PaymentComments: firstPayment.Comments || '', // Assuming Comments are part of the order
//             PaymentStatus: firstPayment.OrderStatus || '', // Assuming OrderStatus is the payment status
//           });
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching payments:", error);
//         setPayments([]); // Clear payments on error
//       });
//   } else {
//     setPayments([]); // Clear payments if the query is less than 3 characters
//   }
// };

const handleSearchChange = (e) => {
  const query = e.target.value.trim().toLowerCase(); // Trim and convert to lowercase
  setSearchName(query);

  if (query.length >= 3) { // Trigger search only after 3 characters or more
    getAllPayments(query)
      .then((paymentsData) => {
        // Ensure you access the correct data structure
        const filteredPayments = paymentsData.data.filter((payment) => {
          const orderNumber = payment.OrderNumber?.toLowerCase() || ""; // Ensure OrderNumber is checked
          return orderNumber.includes(query);
        });

        setPayments(filteredPayments); // Store filtered payments
      })
      .catch((error) => {
        console.error("Error fetching payments:", error);
        setPayments([]); // Clear payments on error
      });
  } else {
    setPayments([]); // Clear payments if the query is less than 3 characters
  }
};
const handlePaymentClick = (payment) => {
  setFormData({
    TenantID: payment.TTenantID,
    PaymentMethod: payment.PaymentMethod || '', // Default if not available
    PaymentDate: payment.CreatedAt || '', // Using CreatedAt as PaymentDate; adjust if needed
    OrderID: payment.OrderID,
    OrderNumber: payment.OrderNumber, // OrderNumber
    CustomerID: payment.CustomerID,
    TotalAmount: payment.TotalAmount,
    AdvanceAmount: payment.AdvanceAmount || '0.00', // Default to 0 if not provided
    BalanceAmount: payment.BalanceAmount || '0.00', // Default to 0 if not provided
    PaymentComments: payment.Comments || '', // Comments from the order
    PaymentStatus: payment.OrderStatus || '', // Payment status from OrderStatus
  });
};

const handlePaymentChange = (e) => {
  const query = e.target.value.trim().toLowerCase();
  setSearchName(query);
  
  // Fetch payments logic
  if (query.length >= 5) {
      getAllPayments(query)
          .then((paymentsData) => {
              const filteredPayments = paymentsData.payments.filter((payment) => {
                  const orderNumber = payment.OrderNumber?.toLowerCase() || "";
                  const comments = payment.Comments?.toLowerCase() || "";
                  return orderNumber.includes(query) || comments.includes(query);
              });
              setFilteredPayments(filteredPayments); // Update the filtered payments
          })
          .catch((error) => {
              console.error("Error fetching payments:", error);
              setFilteredPayments([]); // Clear payments on error
          });
  } else {
      setFilteredPayments([]); // Clear payments if the query is less than 5 characters
  }
};

//  // Function to handle clicks on payment items
//  const handlePaymentClick = (payment) => {
//   console.log("Payment clicked:", payment);
//   // Additional logic for what happens on click (e.g., opening a modal or navigating)
// };

const searchItems = async (orderNumber) => {
  try {
    const response = await fetch(`GET_ALL_ORDERS/${orderNumber}`);
    const data = await response.json();
    if (data && data.success) {
      const order = data.order;

      // Populate form data with the order information
      setFormData({
        PaymentMethod: order.PaymentMethod,
        PaymentStatus: order.PaymentStatus,
        PaymentDate: new Date(order.PaymentDate), // Assuming you use a date picker for this field
        TotalAmount: order.TotalAmount,
        AdvanceAmount: order.AdvanceAmount,
        BalanceAmount: order.BalanceAmount,
        PaymentComments: order.PaymentComments,
      });
    } else {
      console.error('Order not found');
    }
  } catch (error) {
    console.error('Error fetching order data:', error);
  }
};


  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-4 sm:ml-10 lg:ml-72 w-auto">
      <div className="mt-6  p-6 ">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
         <form onSubmit={isEditMode ? handleFormSubmit : handleFormSubmit}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold mb-4 px-24">Payments</h2>
          </div>

          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8 px-16 md:px-24">
       
     {/* <div className="w-full sm:w-64">
                            <label
                                htmlFor="searchName"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Search by Order Reference Number
                            </label>
                            <input
                                id="searchName"
                                type="text"
                                placeholder="Search by OrderNumber"
                                value={searchName}
                                onChange={handleSearchChange}  // Updated to call the API
                                className="w-full p-2 pr-10 border border-gray-300 rounded-md"
                            />
                           
                        </div> */}
    {/* <input
      id="searchOrderNumber"
      type="text"
      placeholder="Search by Order Number..."
      value={searchName}
      onChange={handleSearchChange} // Call your existing handleSearchChange
      onFocus={() => setIsFocused(true)}
      onBlur={() => {
        if (!isHovered) setIsFocused(false);
      }}
      className="mt-1 p-2 pr-10 border border-gray-300 rounded-md text-sm md:text-base w-full"
    /> */}
                        {/* <div className="w-full sm:w-64">
  <div className="flex items-center justify-center relative">
                            <input
                                id="searchName"
                                type="text"
                                placeholder="Search by OrderNumber"
                                value={searchName}
                                onChange={handleSearchChange}  // Updated to call the API
                                className="w-full p-2 pr-10 border border-gray-300 rounded-md"
                            />
    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
      <IoIosSearch aria-label="Search Icon" />
    </div>
  </div>

  
  {searchName.length >= 3 && isFocused && (
    <div
      className="absolute top-full mt-1 w-full bg-white shadow-lg border border-gray-300 rounded-lg z-10"
      style={{ maxHeight: "200px", overflowY: "auto" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {filteredPayments.length > 0 ? (
        <>
          <div className="mb-2 text-sm text-gray-600 px-2">
            {filteredPayments.length} Result
            {filteredPayments.length > 1 ? "s" : ""}
          </div>

          {filteredPayments.map((payment) => (
            <div
              className="relative cursor-pointer flex flex-col p-2 hover:bg-gray-100 group"
              key={payment.OrderID}
              onClick={() => handlePaymentClick(payment)} // Handle payment selection
            >
              <span className="font-medium">{payment.OrderNumber}</span>
              <div className="flex items-center text-xs md:text-sm text-gray-500">
                <IoIosCall className="w-4 h-4 mr-1" aria-label="Phone Icon" />
                <span>{payment.CustomerID}</span>
              </div>
              <div className="flex items-center text-xs md:text-sm text-gray-500">
                <IoMdMail className="w-4 h-4 mr-1" aria-label="Email Icon" />
                <span>{payment.TotalAmount}</span>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="p-2 text-gray-500">No results found.</div>
      )}
    </div>
  )}
</div> */}

<div className="w-full sm:w-64">
  <div className="flex items-center justify-center relative">
    <input
      id="searchName"
      type="text"
      placeholder="Search by OrderNumber"
      value={searchName}
      onChange={handleSearchChange}  // Updated to call the API
      className="w-full p-2 pr-10 border border-gray-300 rounded-md"
    />
    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
      <IoIosSearch aria-label="Search Icon" />
    </div>
  </div>

  {/* Dropdown for filtered payments */}
  {searchName.length >= 3 && isFocused && (
    <div
      className="absolute top-full mt-1 w-full bg-white shadow-lg border border-gray-300 rounded-lg z-10"
      style={{ maxHeight: "200px", overflowY: "auto" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {filteredPayments.length > 0 ? (
        <>
          <div className="mb-2 text-sm text-gray-600 px-2">
            {filteredPayments.length} Result
            {filteredPayments.length > 1 ? "s" : ""}
          </div>

          {/* {filteredPayments.map((payment) => (
            <div
              className="relative cursor-pointer flex flex-col p-2 hover:bg-gray-100 group"
              key={payment.OrderID}
              onClick={() => handlePaymentClick(payment)} // Handle payment selection
            >
              <span className="font-medium">{payment.OrderNumber}</span>
              <div className="flex items-center text-xs md:text-sm text-gray-500">
                <IoIosCall className="w-4 h-4 mr-1" aria-label="Phone Icon" />
                <span>{payment.CustomerID}</span>
              </div>
              <div className="flex items-center text-xs md:text-sm text-gray-500">
                <IoMdMail className="w-4 h-4 mr-1" aria-label="Email Icon" />
                <span>{payment.TotalAmount}</span>
              </div>
            </div>
          ))} */}
          {filteredPayments.map((payment) => (
  <div
    className="relative cursor-pointer flex flex-col p-2 hover:bg-gray-100 group"
    key={payment.OrderID}
    onClick={() => handlePaymentClick(payment)} // Handle payment selection and set form data
  >
    <span className="font-medium">{payment.OrderNumber}</span>
    <div className="flex items-center text-xs md:text-sm text-gray-500">
      <IoIosCall className="w-4 h-4 mr-1" aria-label="Phone Icon" />
      <span>{payment.CustomerID}</span>
    </div>
    <div className="flex items-center text-xs md:text-sm text-gray-500">
      <IoMdMail className="w-4 h-4 mr-1" aria-label="Email Icon" />
      <span>{payment.TotalAmount}</span>
    </div>
  </div>
))}

        </>
      ) : (
        <div className="p-2 text-gray-500">No results found.</div>
      )}
    </div>
  )}
</div>


            <div className="w-full sm:w-64">
              <label
                htmlFor="PaymentMethod"
                className="block text-sm font-medium text-gray-700"
              >
                Payment Method
              </label>
              <div className="relative mt-1">
                <Combobox
                  value={selectedPaymentMethod}
                  onChange={setSelectedPaymentMethod}
                >
                  <Combobox.Input
                    className="w-full rounded-md border-0 bg-white py-2 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                    displayValue={(paymentMethod) => paymentMethod}
                    placeholder="Select Payment Method"
                  />
                  <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </Combobox.Button>
                  <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {paymentMethods.map((method) => (
                      <Combobox.Option
                        key={method}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-3 pr-9 ${
                            active
                              ? "bg-indigo-600 text-white"
                              : "text-gray-900"
                          }`
                        }
                        value={method}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-semibold" : "font-normal"
                              }`}
                            >
                              {method}
                            </span>
                            {selected && (
                              <span
                                className={`absolute inset-y-0 right-0 flex items-center pr-4 ${
                                  active ? "text-white" : "text-indigo-600"
                                }`}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            )}
                          </>
                        )}
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                </Combobox>
              </div>
            </div>

            <div className="w-full sm:w-64">
              <label
                htmlFor="PaymentStatus"
                className="block text-sm font-medium text-gray-700"
              >
                Payment Status
              </label>
              <div className="relative mt-1">
                <Combobox
                  value={formData.PaymentStatus}
                  onChange={(value) =>
                    setFormData({ ...formData, PaymentStatus: value })
                  }
                >
                  <Combobox.Input
                    className="w-full rounded-md border-0 bg-white py-2 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                    displayValue={(status) => status}
                    placeholder="Select Payment Status"
                  />
                  <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </Combobox.Button>
                  <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {["Processing", "Completed", "Failed"].map((status) => (
                      <Combobox.Option
                        key={status}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-3 pr-9 ${
                            active
                              ? "bg-indigo-600 text-white"
                              : "text-gray-900"
                          }`
                        }
                        value={status}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-semibold" : "font-normal"
                              }`}
                            >
                              {status}
                            </span>
                            {selected && (
                              <span
                                className={`absolute inset-y-0 right-0 flex items-center pr-4 ${
                                  active ? "text-white" : "text-indigo-600"
                                }`}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            )}
                          </>
                        )}
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                </Combobox>
              </div>
            </div>

    
            {/* <div className="w-full sm:w-70">
              <label
                htmlFor="PaymentDate"
                className="block text-sm font-medium text-gray-700"
              >
                Payment Date
              </label>
              <DatePicker
                selected={formData.PaymentDate} // Bind the date picker to formData.PaymentDate
                onChange={handleDateChange} // Handler for date changes
                dateFormat="dd/MM/yyyy" // Format the date as per your need
                className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholderText="DD/MM/YYYY" // Placeholder text for the input
                required
              />
            </div> */}
                  <div className="w-full sm:w-64">
              <label
                htmlFor="Paymentdate"
                className="block text-sm font-medium text-gray-700"
              >
                Payment Date
              </label>
                        <input
                          type="date"
                          name="OrderDate"
                          value={formData.PaymentDate}
                          onChange={handleDateChange}
                          className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      
                      </div>

            <div className="w-full sm:w-64">
              <label
                htmlFor="TotalAmount"
                className="block text-sm font-medium text-gray-700"
              >
                Total Amount
              </label>
              <input
                type="text"
                id="TotalAmount"
                name="TotalAmount"
                value={formData.TotalAmount || ""}
                onChange={handleFormChange}
                required
                  className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="w-full sm:w-64">
              <label
                htmlFor="AdvanceAmount"
                className="block text-sm font-medium text-gray-700"
              >
                Advance Amount
              </label>
              <input
                type="text"
                id="AdvanceAmount"
                name="AdvanceAmount"
                value={formData.AdvanceAmount || ""}
                onChange={handleFormChange}
                className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="w-full sm:w-64">
              <label
                htmlFor="BalanceAmount"
                className="block text-sm font-medium text-gray-700"
              >
                Balance Amount
              </label>
              <input
                type="text"
                id="BalanceAmount"
                name="BalanceAmount"
                value={formData.BalanceAmount || ""}
                onChange={handleFormChange}
                className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="w-full sm:w-64">
              <label
                htmlFor="PaymentComments"
                className="block text-sm font-medium text-gray-700"
              >
                Payment Comments
              </label>
              <input
                type="text"
                id="PaymentComments"
                name="PaymentComments"
                value={formData.PaymentComments || ""}
                onChange={handleFormChange}
                className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
<div></div>
            <div className="mt-6 flex justify-end gap-4">
              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-custom-darkblue py-2 px-4 text-sm font-medium text-white hover:text-black shadow-sm hover:bg-custom-lightblue focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                {isEditMode ? "Update Payment" : "Create Payment"}
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
        </form> 
    
      </div>
    </div>
  );
}

export default Paymentform;


// import React, { useState, useEffect, useContext } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import { PaymentContext } from "../../Context/paymentContext";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css"; // Import the CSS for the datepicker
// import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
// import { Combobox } from "@headlessui/react";
// import {
//     GET_ALL_PAYMENTS_API,
//     CREATEORUPDATE_PAYMENT_API,
//     GET_ALL_ORDERS,
// } from "../../../src/Constants/apiRoutes";
// import { IoIosSearch } from "react-icons/io";

// function Paymentform() {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const { paymentDetails } = useContext(PaymentContext);
//     const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
//     const isEditMode = Boolean(
//         location.state?.paymentDetails?.payment || paymentDetails?.payment
//     );
//     const [payments, setPayments] = useState([]);
//     // Define the available payment methods here
//     const paymentMethods = [
//         "UPI",
//         "AmazonPay",
//         "PayPal",
//         "Credit Card",
//         "Debit Card",
//         "Cash",
//     ];
//     const paymentStatuses = ["Processing", "Completed", "Failed"]; // Add Payment Statuses if needed

//     // Define state for loading and error
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [searchName, setSearchName] = useState("");
//     const [formData, setFormData] = useState({
//         TenantID: 1,
//         PaymentMethod: "",
//         PaymentDate: new Date(),
//         OrderNumber: "",
//         CustomerName: "",
//         TotalAmount: "",
//         AdvanceAmount: "",
//         BalanceAmount: "",
//         PaymentComments: "",
//         PaymentStatus: "Processing",
//         CustomerID: "",
//         OrderID: "",
//     });
//     useEffect(() => {
//         if (isEditMode) {
//             const orderId =
//                 location.state?.paymentDetails?.payment?.OrderID ||
//                 paymentDetails?.payment?.OrderID;
//             if (orderId) {
//                 setLoading(true);
//                 axios
//                     .get(`${GET_ALL_ORDERS}${orderId}`)
//                     .then((response) => {
//                         const payment = response.data;
//                         setFormData({
//                             TenantID: payment.TenantID || "",
//                             PaymentMethod: payment.PaymentMethod || "",
//                             PaymentDate: new Date(payment.PaymentDate) || new Date(), // Format date as a Date object
//                             OrderNumber: payment.OrderID || "",
//                             CustomerName: payment.CustomerID || "",
//                             TotalAmount: payment.TotalAmount || "",
//                             AdvanceAmount: payment.AdvanceAmount || "",
//                             BalanceAmount: payment.BalenceAmount || "",
//                             PaymentComments: payment.PaymentComments || "",
//                             PaymentStatus: payment.PaymentStatus || "Processing",
//                             CustomerID: payment.CustomerID || "",
//                             OrderID: payment.OrderID || "",
//                         });
//                         setError(null); 
//                     })
//                     .catch((err) => {
//                         setError("Failed to fetch payment details.");
//                         console.error("Error fetching payment details:", err);
//                     })
//                     .finally(() => {
//                         setLoading(false);
//                     });
//             }
//         }
//     }, [
//         isEditMode,
//         location.state?.paymentDetails?.payment,
//         paymentDetails?.payment,
//     ]);

//     const handleFormChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//     };

//     const handleDateChange = (date) => {
//         setFormData({
//             ...formData,
//             PaymentDate: date, // Set the date when the user selects a new date
//         });
//     };

//     const handleFormSubmit = async (event) => {
//         event.preventDefault();
//         // Prepare the payment data for submission
//         const paymentData = {
//             TenantID: formData.TenantID,
//             PaymentMethod: selectedPaymentMethod || formData.PaymentMethod, // Use the selected payment method or default form data
//             PaymentDate: formData.PaymentDate,
//             OrderID: formData.OrderID,
//             OrderNumber: formData.OrderNumber,
//             CustomerID: formData.CustomerName,
//             TotalAmount: formData.TotalAmount,
//             AdvanceAmount: formData.AdvanceAmount || "0.00", // Default to 0 if not provided
//             BalanceAmount: formData.BalanceAmount || "0.00", // Default to 0 if not provided
//             PaymentComments: formData.PaymentComments || "",
//             PaymentStatus: formData.PaymentStatus,
//             CustomerID: formData.CustomerID,
//             OrderID: formData.OrderID,
//         };

//         console.log("Submitting payment data:", paymentData); // Log the data for debugging

//         setLoading(true); // Set loading to true while submitting

//         try {
//             const response = await axios.post(
//                 CREATEORUPDATE_PAYMENT_API,
//                 paymentData
//             );
//             console.log("Payment API response:", response.data); // Log the response

//             if (response.data?.StatusCode === "SUCCESS") {
//                 console.log("Payment successfully created or updated.");
//                 // Redirect the user to the payments list or success page
//                 navigate("/Payments");
//             } else {
//                 throw new Error(response.data?.message || "Payment submission failed.");
//             }
//         } catch (err) {
//             setError(`Failed to submit the payment: ${err.message}`);
//             console.error("Error submitting payment:", err); // Log the error
//         } finally {
//             setLoading(false); // Stop the loading state
//         }
//     };
//     const handleCancel = () => {
//         navigate("/Payments");
//     };
//     const getAllPayments = async (search = "") => {
//         try {
//             const response = await axios.get(
//                 GET_ALL_PAYMENTS_API,
//                 // GET_ALL_ORDERS,
//                 {
//                     params: {
//                         searchText: search
//                     }
//                 }
//             );
//             return {
//                 payments: response.data.data || [],
//                 totalCount: response.data.totalRecords || 0
//             };
//         } catch (error) {
//             console.error("Error fetching payments:", error);
//             throw error;
//         }
//     };
//     // const handleSearchChange = async (e) => {
//     //   const value = e.target.value;
//     //   setSearchName(value);

//     //   // Call the API with the new search value
//     //   try {
//     //     const paymentsData = await getAllPayments(value);
//     //     setPayments(paymentsData.payments); // Assuming you have setPayments state to store fetched payments
//     //   } catch (error) {
//     //     console.error("Error fetching payments:", error);
//     //   }
//     // };
//     const handleSearchChange = async (e) => {
//         const value = e.target.value;
//         setSearchName(value);
//         // Call the API with the new search value
//         try {
//             const paymentsData = await getAllPayments(value);
//             // Filter payments for exact matches only
//             const exactPayments = paymentsData.payments.filter(payment => payment.OrderID === value);
//             setPayments(exactPayments); // Store only exact matched payments
//             // If you want to set the first payment into the form (or handle selection differently)
//             if (exactPayments.length > 0) {
//                 const firstPayment = exactPayments[0]; // Get the first payment entry
//                 console.log(firstPayment);
//                 setFormData({
//                     TenantID: firstPayment.TenantID,
//                     PaymentMethod: firstPayment.PaymentMethod,
//                     PaymentDate: firstPayment.PaymentDate,
//                     OrderID: firstPayment.OrderID, // Assuming OrderID is extracted this way
//                     OrderNumber: firstPayment.Order.OrderNumber,
//                     CustomerID: firstPayment.CustomerID,
//                     TotalAmount: firstPayment.TotalAmount,
//                     AdvanceAmount: firstPayment.AdvanceAmount || '0.00', // Default to 0 if not provided
//                     BalanceAmount: firstPayment.BalanceAmount || '0.00', // Default to 0 if not provided
//                     PaymentComments: firstPayment.PaymentComments || '',
//                     PaymentStatus: firstPayment.PaymentStatus,
//                 });
//             }
//         } catch (error) {
//             console.error("Error fetching payments:", error);
//         }
//     };
//     // Function to fetch order data based on OrderNumber
//     const searchItems = async (orderNumber) => {
//         try {
//             const response = await fetch(`GET_ALL_ORDERS/${orderNumber}`);
//             const data = await response.json();
//             if (data && data.success) {
//                 const order = data.order;
// console.log(data.order)
//                 // Populate form data with the order information
//                 setFormData({
//                     PaymentMethod: order.PaymentMethod,
//                     PaymentStatus: order.PaymentStatus,
//                     PaymentDate: new Date(order.PaymentDate), 
//                     TotalAmount: order.TotalAmount,
//                     AdvanceAmount: order.AdvanceAmount,
//                     BalanceAmount: order.BalanceAmount,
//                     PaymentComments: order.PaymentComments,
//                 });
//             } else {
//                 console.error('Order not found');
//             }
//         } catch (error) {
//             console.error('Error fetching order data:', error);
//         }
//     };

 
//     const [isFocused, setIsFocused] = useState(false);
//     const [isHovered, setIsHovered] = useState(false);
//     const [results, setResults] = useState([]); // Placeholder for search results
  
//     // // Mock function to simulate search
//     // const handleSearchChange = (e) => {
//     //   const value = e.target.value;
//     //   setSearchName(value);
//     //   // TODO: Implement API call or filter logic to update `results`
//     //   setResults(mockResults(value)); // Mock function for example purposes
//     // };
  
//     // Handle item selection from dropdown
//     const handleOrderSelect = (result) => {
//       // TODO: Handle the selected result (e.g., set form data, make an API call, etc.)
//       console.log('Selected Order:', result);
//       setIsFocused(false); // Close dropdown after selection
//     };
  
//     // Handle mouse events for dropdown visibility
//     const handleMouseEnter = () => setIsHovered(true);
//     const handleMouseLeave = () => setIsHovered(false);
  
//     // Mock data for results
//     const mockResults = (query) => {
//       if (!query) return [];
//       // Example result array, replace with real data or API results
//       return [
//         { OrderID: '123', OrderNumber: 'ORD-12345', CustomerName: 'John Doe' },
//         { OrderID: '124', OrderNumber: 'ORD-12346', CustomerName: 'Jane Smith' },
//       ];
//     };
  
//     return (
//         <div className="px-4 sm:px-6 lg:px-8 pt-4 sm:ml-10 lg:ml-72 w-auto">
//             <div className="mt-6  p-6 ">
//                 {loading && <p>Loading...</p>}
//                 {error && <p className="text-red-500">{error}</p>}
//                 <form onSubmit={isEditMode ? handleFormSubmit : handleFormSubmit}>
//                     <div className="flex justify-between items-center mb-6">
//                         <h2 className="text-xl font-semibold mb-4 px-24">Payments</h2>
//                     </div>

//                     <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8 px-16 md:px-24">


//                     <div className="relative w-full sm:w-64">
//   <label
//     htmlFor="searchName"
//     className="block text-sm font-medium text-gray-700"
//   >
//     Search by Order Reference Number
//   </label>

//   {/* Input for searching */}
//   <input
//     id="searchName"
//     type="text"
//     placeholder="Search by OrderNumber"
//     value={searchName}
//     onChange={handleSearchChange} // Update searchName on change
//     onFocus={() => setIsFocused(true)} // Show dropdown on focus
//     onBlur={() => {
//       if (!isHovered) setIsFocused(false); // Hide dropdown if not hovered
//     }}
//     className="w-full p-2 pr-10 border border-gray-300 rounded-md"
//   />

//   {/* Search Icon */}
//   <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
//     <IoIosSearch />
//   </div>

//   {/* Dropdown with search results */}
//   <div
//     className={`absolute top-full mt-1 border rounded-lg p-2 w-full bg-white z-10 ${
//       searchName && isFocused ? "block" : "hidden"
//     }`}
//     style={{
//       maxHeight: "200px",
//       overflowY: "auto",
//     }}
//     onMouseEnter={handleMouseEnter}
//     onMouseLeave={handleMouseLeave}
//   >
//     {results.length > 0 ? (
//       <>
//         <div className="mb-2 text-sm text-gray-600">
//           {results.length} Result{results.length > 1 ? "s" : ""}
//         </div>

//         {/* Map over search results */}
//         {results.map((result) => (
//           <div
//             className="relative cursor-pointer flex flex-col p-2 hover:bg-gray-100"
//             key={result.OrderID} // Use unique identifier like OrderID
//             onClick={() => handleOrderSelect(result)}
//           >
//             <span className="font-medium">{result.OrderNumber}</span>
//             <div className="flex items-center text-xs text-gray-500">
//               <span>{result.CustomerName}</span> {/* Example, you can add more fields */}
//             </div>
//           </div>
//         ))}
//       </>
//     ) : (
//       <div className="p-2 text-gray-500">No results found.</div>
//     )}
//   </div>
// </div>



//                         <div className="w-full sm:w-64">
//                             <label
//                                 htmlFor="PaymentMethod"
//                                 className="block text-sm font-medium text-gray-700"
//                             >
//                                 Payment Method
//                             </label>
//                             <div className="relative mt-1">
//                                 <Combobox
//                                     value={selectedPaymentMethod}
//                                     onChange={setSelectedPaymentMethod}
//                                 >
//                                     <Combobox.Input
//                                         className="w-full rounded-md border-0 bg-white py-2 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
//                                         displayValue={(paymentMethod) => paymentMethod}
//                                         placeholder="Select Payment Method"
//                                     />
//                                     <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
//                                         <ChevronUpDownIcon
//                                             className="h-5 w-5 text-gray-400"
//                                             aria-hidden="true"
//                                         />
//                                     </Combobox.Button>
//                                     <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
//                                         {paymentMethods.map((method) => (
//                                             <Combobox.Option
//                                                 key={method}
//                                                 className={({ active }) =>
//                                                     `relative cursor-default select-none py-2 pl-3 pr-9 ${active
//                                                         ? "bg-indigo-600 text-white"
//                                                         : "text-gray-900"
//                                                     }`
//                                                 }
//                                                 value={method}
//                                             >
//                                                 {({ selected, active }) => (
//                                                     <>
//                                                         <span
//                                                             className={`block truncate ${selected ? "font-semibold" : "font-normal"
//                                                                 }`}
//                                                         >
//                                                             {method}
//                                                         </span>
//                                                         {selected && (
//                                                             <span
//                                                                 className={`absolute inset-y-0 right-0 flex items-center pr-4 ${active ? "text-white" : "text-indigo-600"
//                                                                     }`}
//                                                             >
//                                                                 <CheckIcon
//                                                                     className="h-5 w-5"
//                                                                     aria-hidden="true"
//                                                                 />
//                                                             </span>
//                                                         )}
//                                                     </>
//                                                 )}
//                                             </Combobox.Option>
//                                         ))}
//                                     </Combobox.Options>
//                                 </Combobox>
//                             </div>
//                         </div>

//                         <div className="w-full sm:w-64">
//                             <label
//                                 htmlFor="PaymentStatus"
//                                 className="block text-sm font-medium text-gray-700"
//                             >
//                                 Payment Status
//                             </label>
//                             <div className="relative mt-1">
//                                 <Combobox
//                                     value={formData.PaymentStatus}
//                                     onChange={(value) =>
//                                         setFormData({ ...formData, PaymentStatus: value })
//                                     }
//                                 >
//                                     <Combobox.Input
//                                         className="w-full rounded-md border-0 bg-white py-2 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
//                                         displayValue={(status) => status}
//                                         placeholder="Select Payment Status"
//                                     />
//                                     <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
//                                         <ChevronUpDownIcon
//                                             className="h-5 w-5 text-gray-400"
//                                             aria-hidden="true"
//                                         />
//                                     </Combobox.Button>
//                                     <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
//                                         {["Processing", "Completed", "Failed"].map((status) => (
//                                             <Combobox.Option
//                                                 key={status}
//                                                 className={({ active }) =>
//                                                     `relative cursor-default select-none py-2 pl-3 pr-9 ${active
//                                                         ? "bg-indigo-600 text-white"
//                                                         : "text-gray-900"
//                                                     }`
//                                                 }
//                                                 value={status}
//                                             >
//                                                 {({ selected, active }) => (
//                                                     <>
//                                                         <span
//                                                             className={`block truncate ${selected ? "font-semibold" : "font-normal"
//                                                                 }`}
//                                                         >
//                                                             {status}
//                                                         </span>
//                                                         {selected && (
//                                                             <span
//                                                                 className={`absolute inset-y-0 right-0 flex items-center pr-4 ${active ? "text-white" : "text-indigo-600"
//                                                                     }`}
//                                                             >
//                                                                 <CheckIcon
//                                                                     className="h-5 w-5"
//                                                                     aria-hidden="true"
//                                                                 />
//                                                             </span>
//                                                         )}
//                                                     </>
//                                                 )}
//                                             </Combobox.Option>
//                                         ))}
//                                     </Combobox.Options>
//                                 </Combobox>
//                             </div>
//                         </div>


//                         <div className="w-full sm:w-70">
//                             <label
//                                 htmlFor="PaymentDate"
//                                 className="block text-sm font-medium text-gray-700"
//                             >
//                                 Payment Date
//                             </label>
//                             <DatePicker
//                                 selected={formData.PaymentDate} // Bind the date picker to formData.PaymentDate
//                                 onChange={handleDateChange} // Handler for date changes
//                                 dateFormat="dd/MM/yyyy" // Format the date as per your need
//                                 className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                                 placeholderText="DD/MM/YYYY" // Placeholder text for the input
//                                 required
//                             />
//                         </div>

//                         <div className="w-full sm:w-64">
//                             <label
//                                 htmlFor="TotalAmount"
//                                 className="block text-sm font-medium text-gray-700"
//                             >
//                                 Total Amount
//                             </label>
//                             <input
//                                 type="text"
//                                 id="TotalAmount"
//                                 name="TotalAmount"
//                                 value={formData.TotalAmount || ""}
//                                 onChange={handleFormChange}
//                                 required
//                                 className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                             />
//                         </div>

//                         <div className="w-full sm:w-64">
//                             <label
//                                 htmlFor="AdvanceAmount"
//                                 className="block text-sm font-medium text-gray-700"
//                             >
//                                 Advance Amount
//                             </label>
//                             <input
//                                 type="text"
//                                 id="AdvanceAmount"
//                                 name="AdvanceAmount"
//                                 value={formData.AdvanceAmount || ""}
//                                 onChange={handleFormChange}
//                                 className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                             />
//                         </div>

//                         <div className="w-full sm:w-64">
//                             <label
//                                 htmlFor="BalanceAmount"
//                                 className="block text-sm font-medium text-gray-700"
//                             >
//                                 Balance Amount
//                             </label>
//                             <input
//                                 type="text"
//                                 id="BalanceAmount"
//                                 name="BalanceAmount"
//                                 value={formData.BalanceAmount || ""}
//                                 onChange={handleFormChange}
//                                 className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                             />
//                         </div>

//                         <div className="w-full sm:w-64">
//                             <label
//                                 htmlFor="PaymentComments"
//                                 className="block text-sm font-medium text-gray-700"
//                             >
//                                 Payment Comments
//                             </label>
//                             <input
//                                 type="text"
//                                 id="PaymentComments"
//                                 name="PaymentComments"
//                                 value={formData.PaymentComments || ""}
//                                 onChange={handleFormChange}
//                                 className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                             />
//                         </div>
//                         <div></div>
//                         <div className="mt-6 flex justify-end gap-4">
//                             <button
//                                 type="submit"
//                                 className="inline-flex justify-center rounded-md border border-transparent bg-custom-darkblue py-2 px-4 text-sm font-medium text-white hover:text-black shadow-sm hover:bg-custom-lightblue focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//                             >
//                                 {isEditMode ? "Update Payment" : "Create Payment"}
//                             </button>
//                             <button
//                                 type="button"
//                                 onClick={handleCancel}
//                                 className="inline-flex justify-center rounded-md border border-transparent bg-red-500 py-2 px-4 text-sm font-medium text-white hover:text-black shadow-sm hover:bg-red-200"
//                             >
//                                 Cancel
//                             </button>
//                         </div>
//                     </div>
//                 </form>

//             </div>
//         </div>
//     );
// }

// export default Paymentform;