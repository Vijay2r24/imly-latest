

// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { Stepper, Step, StepLabel, TextField, Button, InputAdornment } from '@mui/material';

// const UpdateOrder = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { orderId } = location.state || {}; // Get orderId from location state
//   const [order, setOrder] = useState(null);
//   const [alertMessage, setAlertMessage] = useState('');
//   const [alertType, setAlertType] = useState('success');
//   const [activeStep, setActiveStep] = useState(0); // Stepper state
//   const [customerID, setCustomerID] = useState(null); // Track CustomerID
//   const [addressID, setAddressID] = useState(null);  // Track AddressID

//   const steps = ['Personal Details', 'Order Details'];

//   // Fetch order details on component load
//   useEffect(() => {
//     if (orderId) {
//       fetch(`https://imlystudios-backend-mqg4.onrender.com/api/orders/getOrderById/${orderId}`)
//         .then(response => response.json())
//         .then(data => {
//           console.log('Fetched Data:', data);
//           setOrder(data.order); // Set order data
//           setCustomerID(data.order.CustomerID); // Store CustomerID
//           setAddressID(data.order.Customer.Address[0]?.AddressID); // Store AddressID
//         })
//         .catch(error => {
//           console.error('Error fetching order:', error);
//           setAlertMessage('Failed to load order details');
//           setAlertType('error');
//         });
//     }
//   }, [orderId]);

//   // Handle form submission and send PUT request to update the order
//   const handleSubmit = (event) => {
//     event.preventDefault();

//     // First, validate that the CustomerID and AddressID are related
//     const customerID = order.Customer.CustomerID;
//     const addressID = order.Customer.Address[0]?.AddressID;
//     const tenantID = order.TenantID;


//     if (!customerID || !addressID) {
//         setAlertMessage('CustomerID or AddressID not found.');
//         setAlertType('error');
//         return;
//     }

//     // Perform validation to ensure CustomerID matches its corresponding AddressID
//     const customerAddressMatch = order.Customer.Address.some(address => address.AddressID === addressID);

//     if (!customerAddressMatch) {
//         setAlertMessage('CustomerID and AddressID do not match.');
//         setAlertType('error');
//         return;
//     }

//     // If validation passes, prepare the form data
//     const formData = new FormData(event.target);
//     formData.append('CustomerID', customerID);   // Append CustomerID
//     formData.append('AddressID', addressID);     // Append AddressID
//     formData.append('OrderID', orderId);         // Append OrderID
//     formData.append('TenantID', tenantID); // Append TenantID

//     // Submit the PUT request to update the order
//     fetch(`https://imlystudios-backend-mqg4.onrender.com/api/orders/updateOrder/${orderId}`, {
//       method: 'PUT',
//       body: formData,
//     })
//       .then(response => response.json())
//       .then(result => {
//         setAlertMessage('Order updated successfully');
//         setAlertType('success');
//         setTimeout(() => navigate('/orders'), 2000); // Navigate to orders page after success
//       })
//       .catch(error => {
//         console.error('Error updating order:', error);
//         setAlertMessage('Failed to update order');
//         setAlertType('error');
//       });
// };


//   // Handle change for form fields
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setOrder((prevOrder) => ({
//       ...prevOrder,
//       [name]: value,
//     }));
//   };

//   // Stepper change handler
//   const handleNext = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   return (
//     <div className="px-4 sm:px-6 lg:px-8 pt-4 ml-10 lg:ml-72 w-auto">
//       <div className="p-4 sm:p-6 lg:p-8">
//         <h2 className="text-xl font-semibold mb-4">Update Order</h2>
//         {alertMessage && (
//           <div className={`mb-4 p-4 text-white ${alertType === 'success' ? 'bg-green-500' : 'bg-red-500'} rounded`}>
//             {alertMessage}
//           </div>
//         )}
//         <Stepper activeStep={activeStep} alternativeLabel>
//           {steps.map((label) => (
//             <Step key={label}>
//               <StepLabel>{label}</StepLabel>
//             </Step>
//           ))}
//         </Stepper>
//         {activeStep === 0 && order && (
//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* Personal Details */}
//             <div>
//               <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">First Name</label>
//               <TextField
//                 id="FirstName"
//                 name="FirstName"
//                 value={order.Customer.FirstName || ''}
//                 onChange={handleChange}
//                 type="text"
//                 fullWidth
//                 variant="outlined"
//                 margin="normal"
//               />
//             </div>
//             <div>
//               <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">Last Name</label>
//               <TextField
//                 id="LastName"
//                 name="LastName"
//                 value={order.Customer.LastName || ''}
//                 onChange={handleChange}
//                 type="text"
//                 fullWidth
//                 variant="outlined"
//                 margin="normal"
//               />
//             </div>
//             <div>
//               <label htmlFor="PhoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
//               <TextField
//                 id="PhoneNumber"
//                 name="PhoneNumber"
//                 value={order.Customer.PhoneNumber || ''}
//                 onChange={handleChange}
//                 type="text"
//                 fullWidth
//                 variant="outlined"
//                 margin="normal"
//               />
//             </div>
//             <div>
//               <label htmlFor="Email" className="block text-sm font-medium text-gray-700">Email</label>
//               <TextField
//                 id="Email"
//                 name="Email"
//                 value={order.Customer.Email || ''}
//                 onChange={handleChange}
//                 type="email"
//                 fullWidth
//                 variant="outlined"
//                 margin="normal"
//               />
//             </div>
//             <div>
//               <label htmlFor="AddressLine1" className="block text-sm font-medium text-gray-700">Address Line 1</label>
//               <TextField
//                 id="AddressLine1"
//                 name="AddressLine1"
//                 value={order.Customer.Address[0]?.AddressLine1 || ''}
//                 onChange={handleChange}
//                 type="text"
//                 fullWidth
//                 variant="outlined"
//                 margin="normal"
//               />
//             </div>
//             <div>
//               <label htmlFor="AddressLine2" className="block text-sm font-medium text-gray-700">Address Line 2</label>
//               <TextField
//                 id="AddressLine2"
//                 name="AddressLine2"
//                 value={order.Customer.Address[0]?.AddressLine2 || ''}
//                 onChange={handleChange}
//                 type="text"
//                 fullWidth
//                 variant="outlined"
//                 margin="normal"
//               />
//             </div>
//             <div>
//               <label htmlFor="CityID" className="block text-sm font-medium text-gray-700">City ID</label>
//               <TextField
//                 id="CityID"
//                 name="CityID"
//                 value={order.Customer.Address[0]?.CityID || ''}
//                 onChange={handleChange}
//                 type="text"
//                 fullWidth
//                 variant="outlined"
//                 margin="normal"
//               />
//             </div>
//             <div>
//               <label htmlFor="StateID" className="block text-sm font-medium text-gray-700">State ID</label>
//               <TextField
//                 id="StateID"
//                 name="StateID"
//                 value={order.Customer.Address[0]?.StateID || ''}
//                 onChange={handleChange}
//                 type="text"
//                 fullWidth
//                 variant="outlined"
//                 margin="normal"
//               />
//             </div>
//             <div>
//               <label htmlFor="CountryID" className="block text-sm font-medium text-gray-700">Country ID</label>
//               <TextField
//                 id="CountryID"
//                 name="CountryID"
//                 value={order.Customer.Address[0]?.CountryID || ''}
//                 onChange={handleChange}
//                 type="text"
//                 fullWidth
//                 variant="outlined"
//                 margin="normal"
//               />
//             </div>
//             <div>
//               <label htmlFor="ZipCode" className="block text-sm font-medium text-gray-700">Zip Code</label>
//               <TextField
//                 id="ZipCode"
//                 name="ZipCode"
//                 value={order.Customer.Address[0]?.ZipCode || ''}
//                 onChange={handleChange}
//                 type="text"
//                 fullWidth
//                 variant="outlined"
//                 margin="normal"
//               />
//             </div>
//             <div>
//               <Button onClick={handleNext} variant="contained" color="primary">Next</Button>
//             </div>
//           </form>
//         )}
//         {activeStep === 1 && order && (
//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* Order Details */}
//             <div>
//               <label htmlFor="OrderDate" className="block text-sm font-medium text-gray-700">Order Date</label>
//               <input
//                 id="OrderDate"
//                 name="OrderDate"
//                 value={order.OrderDate || ''}
//                 onChange={handleChange}
//                 type="date"
//                 fullWidth
//                 variant="outlined"
//                 margin="normal"
//               />
//             </div>
//             <div>
//               <label htmlFor="TotalAmount" className="block text-sm font-medium text-gray-700">Total Amount</label>
//               <TextField
//                 id="TotalAmount"
//                 name="TotalAmount"
//                 value={order.TotalAmount || ''}
//                 onChange={handleChange}
//                 type="number"
//                 fullWidth
//                 variant="outlined"
//                 margin="normal"
//                 InputProps={{
//                   startAdornment: <InputAdornment position="start">₹</InputAdornment>,
//                 }}
//               />
//             </div>
//             <div>
//               <label htmlFor="TotalQuantity" className="block text-sm font-medium text-gray-700">Total Quantity</label>
//               <TextField
//                 id="TotalQuantity"
//                 name="TotalQuantity"
//                 value={order.TotalQuantity || ''}
//                 onChange={handleChange}
//                 type="number"
//                 fullWidth
//                 variant="outlined"
//                 margin="normal"
//               />
//             </div>
//             <div>
//               <label htmlFor="OrderStatus" className="block text-sm font-medium text-gray-700">Order Status</label>
//               <TextField
//                 id="OrderStatus"
//                 name="OrderStatus"
//                 value={order.OrderStatus || ''}
//                 onChange={handleChange}
//                 type="text"
//                 fullWidth
//                 variant="outlined"
//                 margin="normal"
//               />
//             </div>
//             <div>
//               <label htmlFor="Comments" className="block text-sm font-medium text-gray-700">Comments</label>
//               <TextField
//                 id="Comments"
//                 name="Comments"
//                 value={order.Comments || ''}
//                 onChange={handleChange}
//                 type="text"
//                 fullWidth
//                 variant="outlined"
//                 margin="normal"
//               />
//             </div>
//             <div>
//               <Button onClick={handleBack} variant="contained" color="secondary">Back</Button>
//               <Button type="submit" variant="contained" color="primary" className="ml-4">Update Order</Button>
//             </div>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UpdateOrder;

// import React, { useState } from 'react';
// import { Combobox } from '@headlessui/react';
// import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/solid';

// const UpdateOrder = ({ orderDetails, handleChange, handleUpdateOrder }) => {
//   const [selectedOrderStatus, setSelectedOrderStatus] = useState(orderDetails.OrderStatus || 'Pending');

//   const orderStatuses = ['Pending', 'Processed', 'Completed'];

//   const handleOrderStatusChange = (status) => {
//     setSelectedOrderStatus(status);
//     handleChange({ target: { name: 'OrderStatus', value: status } });
//   };

//   return (
//     <div className="p-6 mr-10 mb-7 sm:px-6 lg:px-8 pt-4 ml-10 lg:ml-80 w-full mt-8 bg-white shadow-lg rounded-lg">
//       <h1 className="text-2xl font-bold mb-4">Update Order</h1>

//       {/* Customer Information */}
//       <div className="mb-4">
//         <label className="block text-xs font-medium text-gray-700">First Name</label>
//         <input
//           type="text"
//           name="customerFirstName"
//           value={orderDetails.customerFirstName}
//           onChange={handleChange}
//           className="p-2 mt-1 w-full border rounded-md border-gray-300"
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block text-xs font-medium text-gray-700">Last Name</label>
//         <input
//           type="text"
//           name="customerLastName"
//           value={orderDetails.customerLastName}
//           onChange={handleChange}
//           className="p-2 mt-1 w-full border rounded-md border-gray-300"
//         />
//       </div>

//       {/* Order Status Combobox */}
//       <div className="mb-4">
//         <label className="block text-xs font-medium text-gray-700">Order Status</label>
//         <Combobox as="div" value={selectedOrderStatus} onChange={handleOrderStatusChange}>
//           <div className="relative">
//             <Combobox.Input
//               className="w-full mt-2 mb-1 rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
//               displayValue={(status) => status}
//             />
//             <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
//               <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
//             </Combobox.Button>

//             <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
//               {orderStatuses.map((status, index) => (
//                 <Combobox.Option
//                   key={index}
//                   value={status}
//                   className="cursor-pointer select-none py-2 pl-3 pr-9"
//                 >
//                   {({ active, selected }) => (
//                     <>
//                       <span className={`block truncate ${selected ? 'font-semibold' : ''}`}>{status}</span>
//                       {selected && (
//                         <span className="absolute inset-y-0 right-0 flex items-center pr-4">
//                           <CheckIcon className="h-5 w-5" aria-hidden="true" />
//                         </span>
//                       )}
//                     </>
//                   )}
//                 </Combobox.Option>
//               ))}
//             </Combobox.Options>
//           </div>
//         </Combobox>
//       </div>

//       {/* Order Date */}
//       <div className="mb-4">
//         <label className="block text-xs font-medium text-gray-700">Order Date</label>
//         <input
//           type="date"
//           name="OrderDate"
//           value={orderDetails.OrderDate}
//           onChange={handleChange}
//           className="p-2 mt-1 w-full border rounded-md border-gray-300"
//         />
//       </div>

//       {/* Expected Delivery Date */}
//       <div className="mb-4">
//         <label className="block text-xs font-medium text-gray-700">Expected Delivery Date</label>
//         <input
//           type="date"
//           name="ExpectedCompleteDate"
//           value={orderDetails.ExpectedCompleteDate}
//           onChange={handleChange}
//           className="p-2 mt-1 w-full border rounded-md border-gray-300"
//         />
//       </div>

//       <div className="flex justify-end">
//         <button
//           onClick={handleUpdateOrder}
//           className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//         >
//           Update Order
//         </button>
//       </div>
//     </div>
//   );
// };

// export default UpdateOrder;



// import React, { useState, useEffect } from 'react';
// import { Combobox } from '@headlessui/react';
// import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/24/outline';

// const UpdateOrder = ({ orderDetails = {}, handleChange, handleUpdateOrder }) => {
//   // Setting default values if orderDetails is not available
//   const [selectedOrderStatus, setSelectedOrderStatus] = useState(orderDetails.OrderStatus || 'Pending');
  
//   useEffect(() => {
//     // Update state if orderDetails is updated from the parent
//     if (orderDetails?.OrderStatus) {
//       setSelectedOrderStatus(orderDetails.OrderStatus);
//     }
//   }, [orderDetails]);

//   const orderStatuses = ['Pending', 'Processed', 'Completed'];

//   const handleOrderStatusChange = (status) => {
//     setSelectedOrderStatus(status);
//     handleChange({ target: { name: 'OrderStatus', value: status } });
//   };

//   return (
//     <div className="p-6 mr-10 mb-7 sm:px-6 lg:px-8 pt-4 ml-10 lg:ml-80 w-1/8 mt-8 bg-white shadow-lg rounded-lg">
// <h1 className="text-2xl font-bold mb-4">Update Order</h1>

//       {/* Customer Information */}
//       <div className="mb-4">
//         <label className="block text-xs font-medium text-gray-700">First Name</label>
//         <input
//           type="text"
//           name="customerFirstName"
//           value={orderDetails.customerFirstName || ''} // Default empty string
//           onChange={handleChange}
//           className="p-2 mt-1 w-full border rounded-md border-gray-300"
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block text-xs font-medium text-gray-700">Last Name</label>
//         <input
//           type="text"
//           name="customerLastName"
//           value={orderDetails.customerLastName || ''} // Default empty string
//           onChange={handleChange}
//           className="p-2 mt-1 w-full border rounded-md border-gray-300"
//         />
//       </div>

//       {/* Order Status Combobox */}
//       <div className="mb-4">
//         <label className="block text-xs font-medium text-gray-700">Order Status</label>
//         <Combobox as="div" value={selectedOrderStatus} onChange={handleOrderStatusChange}>
//           <div className="relative">
//             <Combobox.Input
//               className="w-full mt-2 mb-1 rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
//               displayValue={(status) => status}
//             />
//             <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
//               <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
//             </Combobox.Button>

//             <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
//               {orderStatuses.map((status, index) => (
//                 <Combobox.Option
//                   key={index}
//                   value={status}
//                   className="cursor-pointer select-none py-2 pl-3 pr-9"
//                 >
//                   {({ active, selected }) => (
//                     <>
//                       <span className={`block truncate ${selected ? 'font-semibold' : ''}`}>{status}</span>
//                       {selected && (
//                         <span className="absolute inset-y-0 right-0 flex items-center pr-4">
//                           <CheckIcon className="h-5 w-5" aria-hidden="true" />
//                         </span>
//                       )}
//                     </>
//                   )}
//                 </Combobox.Option>
//               ))}
//             </Combobox.Options>
//           </div>
//         </Combobox>
//       </div>

//       {/* Order Date */}
//       <div className="mb-4">
//         <label className="block text-xs font-medium text-gray-700">Order Date</label>
//         <input
//           type="date"
//           name="OrderDate"
//           value={orderDetails.OrderDate || ''} // Default empty string
//           onChange={handleChange}
//           className="p-2 mt-1 w-full border rounded-md border-gray-300"
//         />
//       </div>

//       {/* Expected Delivery Date */}
//       <div className="mb-4">
//         <label className="block text-xs font-medium text-gray-700">Expected Delivery Date</label>
//         <input
//           type="date"
//           name="ExpectedCompleteDate"
//           value={orderDetails.ExpectedCompleteDate || ''} // Default empty string
//           onChange={handleChange}
//           className="p-2 mt-1 w-full border rounded-md border-gray-300"
//         />
//       </div>

//       {/* Payment Information */}
//       <div className="mb-4">
//         <label className="block text-xs font-medium text-gray-700">Total Amount</label>
//         <input
//           type="number"
//           name="TotalAmount"
//           value={orderDetails.TotalAmount || ''} // Default empty string
//           onChange={handleChange}
//           className="p-2 mt-1 w-full border rounded-md border-gray-300"
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block text-xs font-medium text-gray-700">Advance</label>
//         <input
//           type="number"
//           name="Advance"
//           value={orderDetails.Advance || ''} // Default empty string
//           onChange={handleChange}
//           className="p-2 mt-1 w-full border rounded-md border-gray-300"
//         />
//       </div>

//       {/* Submit Button */}
//       <div className="flex justify-end">
//         <button
//           onClick={handleUpdateOrder}
//           className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//         >
//           Update Order
//         </button>
//       </div>
//     </div>
//   );
// };

// export default UpdateOrder;



import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const UpdateOrder = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderId } = location.state || {}; // Get orderId from location state
  const [order, setOrder] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');
  const [activeStep, setActiveStep] = useState(0); // Stepper state

  const steps = ['Personal Details', 'Order Details'];

  // Fetch order details on component load
  useEffect(() => {
    if (orderId) {
      fetch(`https://imlystudios-backend-mqg4.onrender.com/api/orders/getOrderById/${orderId}`)
        .then((response) => response.json())
        .then((data) => {
          setOrder(data.order); // Set order data
        })
        .catch((error) => {
          console.error('Error fetching order:', error);
          setAlertMessage('Failed to load order details');
          setAlertType('error');
        });
    }
  }, [orderId]);

  // Handle form submission and send PUT request to update the order
  const handleSubmit = (event) => {
    event.preventDefault();

// First, validate that the CustomerID and AddressID are related
const customerID = order.Customer.CustomerID;
const addressID = order.Customer.Address[0]?.AddressID;
const tenantID = order.TenantID;


if (!customerID || !addressID) {
    setAlertMessage('CustomerID or AddressID not found.');
    setAlertType('error');
    return;
 }

//     // Perform validation to ensure CustomerID matches its corresponding AddressID
const customerAddressMatch = order.Customer.Address.some(address => address.AddressID === addressID);

if (!customerAddressMatch) {
     setAlertMessage('CustomerID and AddressID do not match.');
     setAlertType('error');
     return;
}

// If validation passes, prepare the form data
 const formData = new FormData(event.target);
 formData.append('CustomerID', customerID);   // Append CustomerID
formData.append('AddressID', addressID);     // Append AddressID
 formData.append('OrderID', orderId);         // Append OrderID
formData.append('TenantID', tenantID); // Append TenantID


    fetch(`https://imlystudios-backend-mqg4.onrender.com/api/orders/updateOrder/${orderId}`, {
      method: 'PUT',
      body: formData,
    })
      .then((response) => response.json())
      .then(() => {
        setAlertMessage('Order updated successfully');
        setAlertType('success');
        setTimeout(() => navigate('/orders'), 2000); // Navigate to orders page after success
      })
      .catch((error) => {
        console.error('Error updating order:', error);
        setAlertMessage('Failed to update order');
        setAlertType('error');
      });
  };

  // Handle change for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  // Stepper change handler
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className="p-6 mr-10 mb-7 sm:px-6 lg:px-8 pt-4 ml-10 lg:ml-80 w-1/8 mt-8 bg-white shadow-lg rounded-lg">
      <div className="p-4 sm:p-6 lg:p-8">
        <h2 className="text-xl font-semibold mb-4">Update Order</h2>

        {alertMessage && (
          <div
            className={`mb-4 p-4 text-white ${
              alertType === 'success' ? 'bg-green-500' : 'bg-red-500'
            } rounded`}
          >
            {alertMessage}
          </div>
        )}

        <div className="flex justify-between mb-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex-1 text-center border-b-2 pb-2 ${
                activeStep === index ? 'border-blue-500' : 'border-gray-300'
              }`}
            >
              <span className={`${activeStep === index ? 'text-blue-500' : 'text-gray-500'}`}>
                {step}
              </span>
            </div>
          ))}
        </div>

        {activeStep === 0 && order && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                id="FirstName"
                name="FirstName"
                value={order.Customer.FirstName || ''}
                onChange={handleChange}
                type="text"
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>

            <div>
              <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                id="LastName"
                name="LastName"
                value={order.Customer.LastName || ''}
                onChange={handleChange}
                type="text"
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>

            <div>
              <label htmlFor="PhoneNumber" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                id="PhoneNumber"
                name="PhoneNumber"
                value={order.Customer.PhoneNumber || ''}
                onChange={handleChange}
                type="text"
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>

            <div>
              <label htmlFor="Email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="Email"
                name="Email"
                value={order.Customer.Email || ''}
                onChange={handleChange}
                type="email"
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>

            <div>
              <label htmlFor="AddressLine1" className="block text-sm font-medium text-gray-700">
                Address Line 1
              </label>
              <input
                id="AddressLine1"
                name="AddressLine1"
                value={order.Customer.Address[0]?.AddressLine1 || ''}
                onChange={handleChange}
                type="text"
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>

            <div>
              <label htmlFor="AddressLine2" className="block text-sm font-medium text-gray-700">
                Address Line 2
              </label>
              <input
                id="AddressLine2"
                name="AddressLine2"
                value={order.Customer.Address[0]?.AddressLine2 || ''}
                onChange={handleChange}
                type="text"
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>

            <div>
              <button
                type="button"
                onClick={handleNext}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Next
              </button>
            </div>
          </form>
        )}

        {activeStep === 1 && order && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="OrderDate" className="block text-sm font-medium text-gray-700">
                Order Date
              </label>
              <input
                id="OrderDate"
                name="OrderDate"
                value={order.OrderDate || ''}
                onChange={handleChange}
                type="date"
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>

            <div>
              <label htmlFor="TotalAmount" className="block text-sm font-medium text-gray-700">
                Total Amount
              </label>
              <input
                id="TotalAmount"
                name="TotalAmount"
                value={order.TotalAmount || ''}
                onChange={handleChange}
                type="number"
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>

            <div>
              <label htmlFor="TotalQuantity" className="block text-sm font-medium text-gray-700">
                Total Quantity
              </label>
              <input
                id="TotalQuantity"
                name="TotalQuantity"
                value={order.TotalQuantity || ''}
                onChange={handleChange}
                type="number"
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>

            <div>
              <label htmlFor="OrderStatus" className="block text-sm font-medium text-gray-700">
                Order Status
              </label>
              <input
                id="OrderStatus"
                name="OrderStatus"
                value={order.OrderStatus || ''}
                onChange={handleChange}
                type=""
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>

            <div>
              <button
                type="button"
                onClick={handleBack}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Back
              </button>
              <button type="submit" className="ml-4 bg-blue-500 text-white px-4 py-2 rounded">
                Update Order
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateOrder;
