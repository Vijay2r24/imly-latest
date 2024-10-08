
// import React, { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import { useNavigate, useLocation } from "react-router-dom";
// import { StoreContext } from "../../Context/storeContext";
// import Box from "@mui/material/Box";
// import Stepper from "@mui/material/Stepper";
// import Step from "@mui/material/Step";
// import StepLabel from "@mui/material/StepLabel";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import Paper from "@mui/material/Paper";
// import { styled } from "@mui/material/styles";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import TableRow from "@mui/material/TableRow";
// import { Combobox } from '@headlessui/react';
// import { ChevronUpDownIcon } from '@heroicons/react/24/solid';
// import { CheckIcon } from '@heroicons/react/24/solid';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
// import {CREATEORUPDATE_STORES_API,STOREUSERSBYSTORE_ID_API,GETALLSTOREUSERSBYSTORE_ID_API,COUNTRIES_API,STATES_API,CITIES_API,
//     GETALLUSERS_API
// } from "../../Constants/apiRoutes";
// import "../../style.css";
// import LoadingAnimation from '../../components/Loading/LoadingAnimation';
// import {
//   StyledTableCell,
//   StyledTableRow,
//   TablePaginationActions,
// } from "../CustomTablePagination";
// import { IoIosSearch, IoIosCall, IoMdMail } from "react-icons/io";
// const steps = ["Store Details", "Store Users"];

// function StoreForm() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { storeDetails } = useContext(StoreContext);
//   const [storeUsers, setStoreUsers] = useState([]);
//   const [orders, setOrders] = useState([]);
//   const [countries, setCountries] = useState([]);
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);

//   const [countryMap, setCountryMap] = useState({});
//   const [stateMap, setStateMap] = useState({});
//   const [cityMap, setCityMap] = useState({});
//   const [formData, setFormData] = useState(
//     location.state?.storeDetails || {
//       TenantID: 1,
//       StoreID: null,
//       StoreName: "",
//       Email: "",
//       // Password: "",
//       Phone: "",
//       AddressLine1: "",
//       AddressLine2: "",
//       CityID: "",
//       StateID: "",
//       CountryID: "",
//       ZipCode: "",
//     }
//   );

//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [activeStep, setActiveStep] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);

//   const isEditMode = Boolean(
//     location.state?.storeDetails?.store || storeDetails?.store
//   );
  
//   useEffect(() => {
//     const setInitialData = async () => {
//       if (isEditMode) {
//         const store = location.state?.storeDetails?.store || storeDetails?.store;
    
//         if (!store) {
//           console.warn("No store data found");
//           return;
//         }
    
//         console.log("Store data in edit mode:", store);
    
//         // Set the form data with the store information
//         setFormData({
//           TenantID: store.TenantID || 1,
//           StoreID: store.StoreID || "",
//           StoreName: store.StoreName || "",
//           StoreCode: store.StoreCode || "",
//           Email: store.Email || "",
//           Phone: store.Phone || "",
//           AddressLine1: store.AddressLine1 || "",
//           AddressLine2: store.AddressLine2 || "",
//           CountryID: store.CountryID || "",
//           StateID: store.StateID || "",
//           CityID: store.CityID || "",
//           ZipCode: store.ZipCode || "",
//         });
    
//         // Set Country
//         const selectedCountry = countries.find(
//           (country) => country.CountryID === store.CountryID
//         );
//         if (selectedCountry) {
//           setSelectedCountry(selectedCountry);
//            fetchStatesByCountry(selectedCountry.CountryID); 
//         }
//         console.log(store.StateID);
//         // Fetch states and then set state and city
//         if (store.StateID) {
//          fetchStatesByCountry(store.CountryID).then(() => {
//             const selectedState = states.find(
//               (state) => state.StateID === store.StateID
//             );
//             setSelectedState(selectedState);
//             console.log("Selected State:", selectedState);
//             fetchCitiesByState(store.StateID); // Fetch cities based on selected state
//           });
//         }
    
//         // Fetch cities and set the selected city
//         if (store.CityID) {
//           fetchCitiesByState(store.StateID).then(() => {
//             const selectedCity = cities.find(
//               (city) => city.CityID === store.CityID
//             );
//             setSelectedCity(selectedCity);
//             console.log("Selected City:", selectedCity);
//           });
//         }
//       }
//     };
    
//     setInitialData();
//   }, [
//     isEditMode,
//     location.state?.storeDetails?.store,
//     storeDetails?.store,
//     countries,
//   ]);
  
  
  
//   // useEffect(() => {
//   //   const fetchStoreUsers = async (storeId) => {
//   //     if (!storeId) return; // Exit if no storeId

//   //     try {
//   //       const response = await axios.get(
//   //         // `https://imlystudios-backend-mqg4.onrender.com/api/mapstoreusers/mapstoreuser/${storeId}`
//   //         `${STOREUSERSBYSTORE_ID_API}/${storeId}`
//   //       );
//   //       setStoreUsers(response.data.users || []); // Set the users in state
//   //     } catch (err) {
//   //       console.error("Error fetching store users:", err);
//   //       setError("Failed to fetch store users.");
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   // Only call fetchStoreUsers if StoreID exists
//   //   if (formData.StoreID) {
//   //     fetchStoreUsers(formData.StoreID);
//   //   }
//   // }, [formData.StoreID]);

//   // Handle search input changes


//   const fetchStoreUsers = async (search = "",storeId) => {
//     try {
//       const response = await axios.get(
//         // "https://imlystudios-backend-mqg4.onrender.com/api/stores/getAllStores",
//           `${STOREUSERSBYSTORE_ID_API}/${storeId}`,
//         {
//           params: {
//             search: search
//           }
//         }
//       );

//       // Log the entire API response to understand its structure
//       console.log("API Response:", response.data);

//       return {
//         stores: response.data.Stores || [], // Correctly access the 'Stores' field
//         totalCount: response.data.totalItems || 0 // Use 'totalItems' for total count
//       };
//     } catch (error) {
//       console.error("Error fetching stores:", error);
//       throw error;
//     }
//     finally {
//             setLoading(false);
//           }
//   };
//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // const handleFormSubmit = async (event) => {
//   //   event.preventDefault();
//   //   setIsLoading(true); // Show loading animation
//   //   const isUpdate = formData.StoreID ? true : false;
//   //   const apiUrl =
//   //     // "https://imlystudios-backend-mqg4.onrender.com/api/stores/createOrUpdateStore";
//   //     CREATEORUPDATE_STORES_API

//   //   try {
//   //     const response = await axios.post(apiUrl, formData);
//   //     navigate("/Stores");
//   //   } catch (error) {
//   //     console.error("Submission failed:", error);
//   //     if (error.response) {
//   //       setError(
//   //         `Failed to ${isUpdate ? "update" : "create"} store: ` +
//   //         error.response.data.message
//   //       );
//   //     } else if (error.request) {
//   //       setError("No response received from server.");
//   //     } else {
//   //       setError("Error: " + error.message);
//   //     }
//   //   }finally {
//   //     setIsLoading(false); // Hide loading animation
//   //   }
//   // };


//   const handleFormSubmit = async (event) => {
//     event.preventDefault();
//     setIsLoading(true); // Show loading animation
//     const isUpdate = formData.StoreID ? true : false;
//     const apiUrl = CREATEORUPDATE_STORES_API;
  
//     try {
//       const response = await axios.post(apiUrl, formData);
//        if (response.status===200) {

//         // toast.success('Store updated successfully!', {
//           toast.success(isUpdate ?'Store updated successfully!':'Store created successfully!', {
//           position: 'top-right',
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//         });
//         console.log( toast.success);
//       } 
//       navigate("/Stores"); // Redirect to the Stores page
//     } catch (error) {
//       console.error("Submission failed:", error);
//       if (error.response) {
//         setError(
//           `Failed to ${isUpdate ? "update" : "create"} store: ` +
//           error.response.data.message
//         );
//       } else if (error.request) {
//         setError("No response received from server.");
//       } else {
//         setError("Error: " + error.message);
//       }
//     } finally {
//       setIsLoading(false); // Hide loading animation
//     }
//   };
  
//   const handleNext = () => {
//     setActiveStep((prevStep) => prevStep + 1);
//   };

//   const handleBack = () => {
//     setActiveStep((prevStep) => prevStep - 1);
//   };


//   const handleReset = () => {
//     setActiveStep(0);
//     setFormData({
//       TenantID: 1,
//       StoreID: null,
//       StoreName: "",
//       Email: "",
//       // Password: "",
//       Phone: "",
//       AddressLine1: "",
//       AddressLine2: "",
//       CityID: "",
//       StateID: "",
//       CountryID: "",
//       ZipCode: "",
//     });
//   };



//   const isStepSkipped = (step) => false;
//   const [searchQuery, setSearchQuery] = useState(""); // Search query state
//   const [users, setUsers] = useState([]); // All users from the API
//   const [filteredUsers, setFilteredUsers] = useState([]); // Users after filtering
//   const [selectedCountry, setSelectedCountry] = useState(null);
//   const [selectedState, setSelectedState] = useState(null);
//   const [selectedCity, setSelectedCity] = useState(null);
//   const [query, setQuery] = useState('');
//   const [tableUsers, setTableUsers] = useState([]); // Users added to the table
//   const [selectedUsers, setSelectedUsers] = useState([]); // Users selected in the popup
//   const [isModalOpen, setIsModalOpen] = useState(false); // Control the modal state
//   const [isHovered, setIsHovered] = useState(false);
//   const [isFocused, setIsFocused] = useState(false);

//   // Fetch users from API
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await fetch(
//           // "https://imlystudios-backend-mqg4.onrender.com/api/mapstoreusers/getallmapstoreuser"
//           GETALLSTOREUSERSBYSTORE_ID_API 
//         );
//         const data = await response.json();
//         const usersData = data.data.map((item) => ({
//           ...item.User,
//           StoreID: item.StoreID,
//         }));
//         setUsers(usersData); // Store all users data
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       }
//     };
//     fetchUsers();
//   }, []);


//   // useEffect(() => {
//   //   const fetchUsers = async (search = "") => {
//   //     try {
//   //       const response = await fetch(
//   //         // `${GETALLSTOREUSERSBYSTORE_ID_API}?SearchText=${search}` 
//   //         `${GETALLUSERS_API}?SearchText=${search}` 
        
//   //       );
//   //       const data = await response.json();
//   //       const usersData = data.data.map((item) => ({
//   //         ...item.User,
//   //         StoreID: item.StoreID,
//   //       }));
//   //       setUsers(usersData); // Store all users data
//   //     } catch (error) {
//   //       console.error("Error fetching users:", error);
//   //     }
//   //   };
  
//   //   fetchUsers(searchQuery); // Call the function with search query when searchQuery changes
//   // }, [searchQuery]); // Depend on searchQuery to refetch users when it changes
  
//   // useEffect(() => {
//   //   const fetchUsers = async (search = "") => {
//   //     try {
//   //       // Retrieve the token from localStorage
//   //       const token = localStorage.getItem("token");
//   //       if (!token) {
//   //         throw new Error("No authentication token found");
//   //       }
  
//   //       const response = await fetch(
//   //         `${GETALLUSERS_API}?SearchText=${search}`, // Your API URL
//   //         {
//   //           method: "GET", // Define HTTP method
//   //           headers: {
//   //             Authorization: `Bearer ${token}`, // Add token to Authorization header
//   //             "Content-Type": "application/json", // Set content type to JSON
//   //           },
//   //         }
//   //       );
  
//   //       const data = await response.json();
//   //       const usersData = data.data.map((item) => ({
//   //         ...item.User,
//   //         StoreID: item.StoreID,
//   //       }));
  
//   //       setUsers(usersData); // Store all users data in state
//   //     } catch (error) {
//   //       console.error("Error fetching users:", error);
//   //     }
//   //   };
  
//   //   fetchUsers(searchQuery); // Call the function with search query when searchQuery changes
//   // }, [searchQuery]); // Depend on searchQuery to refetch users when it changes
  
//   const handleSearchChange = (e) => {
//     const query = e.target.value.trim().toLowerCase(); // Trim and convert to lowercase
//     setSearchQuery(query);

//     if (query.length >= 3) {
//       // Filter users based on FirstName, LastName, or Email
//       const filtered = users.filter((user) => {
//         const firstName = user.FirstName?.toLowerCase() || "";
//         const lastName = user.LastName?.toLowerCase() || "";
//         const email = user.Email?.toLowerCase() || "";

//         return (
//           firstName.includes(query) ||
//           lastName.includes(query) ||
//           email.includes(query)
//         );
//       });
//       setFilteredUsers(filtered);
//     } else {
//       setFilteredUsers([]); // Clear filtered users if the query is less than 3 characters
//     }
//   };

//   // Handle mouse hover for dropdown to prevent it from closing
//   const handleMouseEnter = () => setIsHovered(true);
//   const handleMouseLeave = () => setIsHovered(false);

//   const handleCustomerSelect = (customer) => {
//     console.log("Selected customer:", customer);
  
//     // Check if the user is already in the table
//     const isUserInTable = tableUsers.some(
//       (user) => user.CustomerID === customer.CustomerID
//     );
  
//     // If the user is not in the table, add them
//     if (!isUserInTable) {
//       setTableUsers((prevUsers) => [...prevUsers, customer]);
//     }
  
//     // Clear the search query without updating it to the selected customer's name
//     setSearchQuery(""); 
//     setFilteredUsers([]); // Clear the dropdown after selection
//   };
  

//   // Close the modal
//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   // Handle the addition of filtered users to the table
//   const handleAddUsers = () => {
//     setTableUsers((prevUsers) => [...prevUsers, ...selectedUsers]); // Add selected users to the table
//     setSelectedUsers([]); // Clear selected users
//     setIsModalOpen(false); // Close the modal after adding users
//   };

//   // Handle user selection in the popup (you can make this more complex to allow selecting multiple users)
//   const handleSelectUser = (user) => {
//     setSelectedUsers([user]); // Select the user to be added
//   };
//   useEffect(() => {
//     const fetchCountries = async () => {
//       try {
//         const response = await axios.get(
//           // "https://imlystudios-backend-mqg4.onrender.com/api/cities/getCountries"
//           COUNTRIES_API 
//         );
//         const countryData = response.data.data;
//         setCountries(countryData);

//         // Create countryMap
//         const countryMapData = countryData.reduce((map, country) => {
//           map[country.CountryName] = country.CountryID;
//           return map;
//         }, {});
//         setCountryMap(countryMapData);

//         console.log("Fetched countries:", countryData);
//       } catch (error) {
//         console.error("Error fetching countries:", error);
//       }
//     };

//     fetchCountries();
//   }, []);

//   const fetchStatesByCountry = async (countryId) => {
//     if (!countryId) return;

//     try {
//       const response = await axios.get(
//         // `https://imlystudios-backend-mqg4.onrender.com/api/cities/getStatesByCountry?$filter=CountryID eq ${countryId}`
        
//  `${STATES_API}/${countryId}`
//       );
//       if (response.data.status === "SUCCESS") {
//         const stateData = response.data.data;
//         setStates(stateData);

//         // Create stateMap
//         const stateMapData = stateData.reduce((map, state) => {
//           map[state.StateName] = state.StateID;
//           return map;
//         }, {});
//         setStateMap(stateMapData);

//         console.log("Fetched states:", stateData);
//       }
//     } catch (error) {
//       console.error("Error fetching states:", error);
//     }
//   };

//   const fetchCitiesByState = async (stateId) => {
//     if (!stateId) return;

//     try {
//       const response = await axios.get(
//         // `https://imlystudios-backend-mqg4.onrender.com/api/cities/getCitiesByState?$filter=StateID eq ${stateId}`
//          `${CITIES_API}/${stateId}`
//       );
//       if (response.data.status === "SUCCESS") {
//         const cityData = response.data.data;
//         setCities(cityData);

//         // Create cityMap
//         const cityMapData = cityData.reduce((map, city) => {
//           map[city.CityName] = city.CityID;
//           return map;
//         }, {});
//         setCityMap(cityMapData);

//         console.log("Fetched cities:", cityData);
//       }
//     } catch (error) {
//       console.error("Error fetching cities:", error);
//     }
//   };
  
  
//   const handleCountryChange = (selectedCountry) => {
//     if (!selectedCountry) return;

//     const countryID =
//       countryMap[selectedCountry.CountryName] || selectedCountry.CountryID;

//     setSelectedCountry(selectedCountry);
//     setFormData({
//       ...formData,
//       CountryID: countryID,
//       CountryName: selectedCountry.CountryName,
//     });
//     fetchStatesByCountry(countryID);
//   };

//   const handleStateChange = (state) => {
//     if (!state) return;

//     const stateID = stateMap[state.StateName] || state.StateID;

//     setSelectedState(state);
//     setFormData({
//       ...formData,
//       StateID: stateID,
//       StateName: state.StateName,
//     });

//     fetchCitiesByState(stateID);
//   };

//   const handleCityChange = (city) => {
//     if (!city) return;

//     const cityID = cityMap[city.CityName] || city.CityID;

//     setSelectedCity(city);
//     setFormData({
//       ...formData,
//       CityID: cityID,
//       CityName: city.CityName,
//     });
//   };
 
//   const handleCancel = () => {
//     setIsLoading(true);
  
//     setTimeout(() => {
//       navigate("/Stores");
//     }, 1500); // Delay by 500ms
//   };

//   const handleRemoveUser = (index) => {
//     const updatedUsers = [...tableUsers];
//     updatedUsers.splice(index, 1);  // Remove the user at the specific index
//     setTableUsers(updatedUsers);  // Update the state with the new array
//   };

 
//   const handleStepClick = (index) => {
//     setActiveStep(index); 
//   };
// const isStepOptional = (step) => step === 1;
 
//   return (
//     // <div className="p-6 mr-10 sm:px-6 lg:px-8 pt-4 ml-10 lg:ml-80 w-1/8 rounded-lg">
//     <div className="main-container">
   
//       {/* <div className="p-6 mb-7 sm:px-6 lg:px-8 pt-4 bg-white shadow-lg rounded-lg"> */}
//       {/* <div className="p-6 mb-7 sm:px-6 lg:px-8 pt-4 rounded-lg"> */}
//       <div className="body-container">
//       <ToastContainer />
//         <Box sx={{ width: "100%" }}>
//           <Stepper activeStep={activeStep} alternativeLabel>
          
//              {steps.map((label, index) => {
//               const stepProps = {};
//               const labelProps = {
//                 onClick: () => handleStepClick(index), // Add onClick handler
//                 style: { cursor: "pointer" }, // Add cursor style for pointer
//               };

//               if (isStepOptional(index)) {
//                 // Optional step logic
//               }

//               if (isStepSkipped(index)) {
//                 stepProps.completed = false;
//               }

//               return (
//                 <Step key={label} {...stepProps}>
//                   <StepLabel {...labelProps}>{label}</StepLabel>
//                 </Step>
//               );
//             })}
//           </Stepper>

//           {activeStep === steps.length ? (
//             <React.Fragment>
//               <Typography className="text-center text-xl mb-4">
//                 All steps completed - you're finished
//               </Typography>
//               <Box className="justify-center">
//                 <Button
//                   onClick={handleReset}
//                   className="bg-blue-500 text-white px-4 py-2 rounded"
//                 >
//                   Reset
//                 </Button>
//               </Box>
//             </React.Fragment>
//           ) : (
//             <React.Fragment>
//               {activeStep === 0 && (
//                 <><div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
//                   {/* Store Details Form */}
//                   <div className="flex items-center gap-4">
//                     <label className="w-1/3 text-xs font-medium text-gray-700">Store Name</label>
//                     <input
//                       type="text"
//                       name="StoreName"
//                       value={formData.StoreName}
//                       onChange={handleFormChange}
//                       className={`p-1 mt-2 mb-1 w-full border rounded-md ${error ? 'border-red-500' : 'border-gray-400'}`} />
//                   </div>

//                   <div className="flex items-center gap-4">
//                     <label className="w-1/3 text-xs font-medium text-gray-700">Address Line 1</label>
//                     <input
//                       type="text"
//                       name="AddressLine1"
//                       value={formData.AddressLine1}
//                       onChange={handleFormChange}
//                       className={`p-1 w-full border rounded-md ${error ? 'border-red-500' : 'border-gray-400'}`} />
//                   </div>

//                   <div className="flex items-center gap-4">
//                     <label className="w-1/3 text-xs font-medium text-gray-700">Store Code</label>
//                     <input
//                       type="text"
//                       name="StoreCode"
//                       value={formData.StoreCode}
//                       onChange={handleFormChange}
//                       className={`p-1 w-full border rounded-md ${error ? 'border-red-500' : 'border-gray-400'}`} />
//                   </div>

//                   <div className="flex items-center gap-4">
//                     <label className="w-1/3 text-xs font-medium text-gray-700">Address Line 2</label>
//                     <input
//                       type="text"
//                       name="AddressLine2"
//                       value={formData.AddressLine2}
//                       onChange={handleFormChange}
//                       className={`p-1 mt-2 mb-1 w-full border rounded-md ${error ? 'border-red-500' : 'border-gray-400'}`} />
//                   </div>

//                   <div className="flex items-center gap-4">
//                     <label className="w-1/3 text-xs font-medium text-gray-700">Email</label>
//                     <input
//                       type="text"
//                       name="Email"
//                       value={formData.Email}
//                       onChange={handleFormChange}
//                       className={`p-1 w-full border rounded-md ${error ? 'border-red-500' : 'border-gray-400'}`} />
//                   </div>
//                   <div className="flex items-center gap-4">
//                     <label className="w-1/3 text-xs font-medium text-gray-700">Country</label>
//                     <div className="w-full">
//                       <Combobox as="div" value={selectedCountry} onChange={handleCountryChange}>
//                         <div className="relative">
//                           <Combobox.Input
//                             className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
//                             onChange={(event) => setQuery(event.target.value)} // Set the query for filtering
//                             displayValue={(country) => country?.CountryName || ''} // Display selected country name
//                           />
//                           <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
//                             <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
//                           </Combobox.Button>

//                           <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
//                             {countries
//                               .filter((country) => country.CountryName.toLowerCase().includes(query.toLowerCase())
//                               )
//                               .map((country) => (
//                                 <Combobox.Option
//                                   key={country.CountryID}
//                                   value={country} // Pass the full country object to onChange
//                                   className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-indigo-600 hover:text-white"
//                                 >
//                                   <span className="block truncate font-normal group-data-[selected]:font-semibold">
//                                     {country.CountryName}
//                                   </span>
//                                   <span className="absolute inset-y-0 right-0 hidden items-center pr-4 text-indigo-600 group-data-[selected]:flex group-data-[focus]:text-white">
//                                     <CheckIcon className="h-5 w-5" aria-hidden="true" />
//                                   </span>
//                                 </Combobox.Option>
//                               ))}
//                           </Combobox.Options>
//                         </div>
//                       </Combobox>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-4">
//                     <label className="w-1/3 text-xs font-medium text-gray-700">Contact</label>
//                     <input
//                       type="text"
//                       name="Phone"
//                       value={formData.Phone|| ""}
//                       onChange={handleFormChange}
//                       className={`p-1 w-full border rounded-md ${error ? 'border-red-500' : 'border-gray-400'}`} />
//                   </div>
                  
//                   <div className="flex items-center gap-4">
//                     <label className="w-1/3 text-xs font-medium text-gray-700">State</label>
//                     <div className="w-full">
//                       <Combobox as="div" value={selectedState} onChange={handleStateChange}>
//                         <div className="relative">
//                           <Combobox.Input
//                             className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
//                             onChange={(event) => setQuery(event.target.value)} // Handle the search query
//                             displayValue={(state) => state?.StateName || ''} // Show the selected state name
                            
//                           />
//                           <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
//                             <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
//                           </Combobox.Button>

//                           <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
//                             {states
//                               .filter((state) => state.StateName.toLowerCase().includes(query.toLowerCase())) // Filter based on query
//                               .map((state) => (
//                                 <Combobox.Option
//                                   key={state.StateID}
//                                   value={state}
//                                   className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-indigo-600 hover:text-white"
//                                 >
//                                   <span className="block truncate font-normal group-data-[selected]:font-semibold">
//                                     {state.StateName}
//                                   </span>
//                                   <span className="absolute inset-y-0 right-0 hidden items-center pr-4 text-indigo-600 group-data-[selected]:flex group-data-[focus]:text-white">
//                                     <CheckIcon className="h-5 w-5" aria-hidden="true" />
//                                   </span>
//                                 </Combobox.Option>
//                               ))}
//                           </Combobox.Options>
//                         </div>
//                       </Combobox>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-4">
//                     <label className="w-1/3 text-xs font-medium text-gray-700">Zip Code</label>
//                     <input
//                       type="text"
//                       name="ZipCode"
//                       value={formData.ZipCode|| ""}
//                       onChange={handleFormChange}
//                       className={`p-1 w-full border rounded-md ${error ? 'border-red-500' : 'border-gray-400'}`} />
//                   </div>
//                   <div className="flex items-center gap-4">
//                     <label className="w-1/3 text-xs font-medium text-gray-700">City</label>
//                     <div className="w-full">
//                       <Combobox as="div" value={selectedCity} onChange={handleCityChange}>
//                         <div className="relative">
//                           <Combobox.Input
//                             className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
//                             onChange={(event) => setQuery(event.target.value)} // Handle the search query
//                             displayValue={(city) => city?.CityName || ''} // Show the selected city name
//                           />
//                           <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
//                             <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
//                           </Combobox.Button>

//                           <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
//                             {cities
//                               .filter((city) => city.CityName.toLowerCase().includes(query.toLowerCase())) // Filter based on query
//                               .map((city) => (
//                                 <Combobox.Option
//                                   key={city.CityID}
//                                   value={city}
//                                   className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-indigo-600 hover:text-white"
//                                 >
//                                   <span className="block truncate font-normal group-data-[selected]:font-semibold">
//                                     {city.CityName}
//                                   </span>
//                                   <span className="absolute inset-y-0 right-0 hidden items-center pr-4 text-indigo-600 group-data-[selected]:flex group-data-[focus]:text-white">
//                                     <CheckIcon className="h-5 w-5" aria-hidden="true" />
//                                   </span>
//                                 </Combobox.Option>
//                               ))}
//                           </Combobox.Options>
//                         </div>
//                       </Combobox>
//                     </div>
//                   </div>
//                 </div><div className="mt-6 flex justify-end gap-4">
                  
//   <button
//         type="submit"
//         className="button-base save-btn"
//         onClick={handleFormSubmit}
//       >
//         Save
//       </button>
//       <button
//         type="button"
//         onClick={handleCancel}
//         className="button-base cancel-btn"
//       >
//         Cancel
//       </button>

//                   </div>
//       {/* {isLoading && <LoadingAnimation />} */}
//       {isLoading && (
//       // <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-gray-700">
//         <LoadingAnimation />
//       // </div>
//     )}
//                   </>
//               )}


//               {activeStep === 1 && (
//                 <div>
//                   <div>
    
//  <div className="relative flex flex-col w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg pb-2 mx-auto">
//       <div className="flex items-center justify-center">
//         <input
//   id="searchName"
//   type="text"
//   placeholder="Search by Name..."
//   value={searchQuery}
//   onChange={handleSearchChange}
//   onFocus={() => setIsFocused(true)}
//   onBlur={() => {
//     if (!isHovered) setIsFocused(false); // Close dropdown if not hovered
//   }}
//   className="mt-1 p-2 pr-10 border border-gray-300 rounded-md text-sm md:text-base w-full"
// />

//         <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//           <IoIosSearch aria-label="Search Icon" />
//         </div>
//       </div>

//       {/* Only show the dropdown when searchQuery is not empty and input is focused */}
//       <div
//         className={`absolute top-full mt-1 border rounded-lg p-2 w-full bg-white z-10 ${
//           searchQuery && isFocused ? "block" : "hidden"
//         }`}
//         style={{
//           maxHeight: "200px",
//           overflowY: "auto",
//         }}
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}
//       >
//         {filteredUsers.length > 0 ? (
//           <>
//             <div className="mb-2 text-sm text-gray-600">
//               {filteredUsers.length} Result{filteredUsers.length > 1 ? "s" : ""}
//             </div>

          
//             {filteredUsers.map((user) => (
//               <div
//                 className="relative cursor-pointer flex flex-col p-2 hover:bg-gray-100"
//                 key={user.CustomerID}
//                 onClick={() => handleCustomerSelect(user)}
//               >
//                 <span className="font-medium">
//                   {user.FirstName} {user.LastName}
//                 </span>
//                 <div className="flex items-center text-xs md:text-sm text-gray-500">
//                   <IoIosCall className="w-4 h-4 mr-1" aria-label="Phone Icon" />
//                   <span>{user.PhoneNumber}</span>
//                 </div>
//                 <div className="flex items-center text-xs md:text-sm text-gray-500">
//                   <IoMdMail className="w-4 h-4 mr-1" aria-label="Email Icon" />
//                   <span>{user.Email}</span>
//                 </div>
//               </div>
//             ))}
//           </>
//         ) : (
//           <div className="p-2 text-gray-500">No results found.</div>
//         )}
//       </div>
//     </div>


//                     {/* Table displaying stored users */}
//                     {/* <TableContainer component={Paper}>
//                       <Table aria-label="store users table">
//                         <TableHead>
//                           <TableRow>
//                             <StyledTableCell>Username</StyledTableCell>
//                             <StyledTableCell>Email</StyledTableCell>
//                             <StyledTableCell>Phone</StyledTableCell>
//                             <StyledTableCell>Action</StyledTableCell> 
//                           </TableRow>
//                         </TableHead>
//                         <TableBody>
//                           {tableUsers.map((user, index) => (
//                             <StyledTableRow key={index}>
//                               <StyledTableCell>
//                                 {user.FirstName} {user.LastName}
//                               </StyledTableCell>
//                               <StyledTableCell>{user.Email}</StyledTableCell>
//                               <StyledTableCell>{user.PhoneNumber}</StyledTableCell>
//                               <StyledTableCell>
//                                 <Button
//                                   onClick={() => handleRemoveUser(index)}  
//                                   variant="contained"
//                                   color="secondary"
//                                 >
//                                   Remove
//                                 </Button>
//                               </StyledTableCell>
//                             </StyledTableRow>
//                           ))}
//                         </TableBody>
//                       </Table>
//                     </TableContainer> */}
//                     {/* Table displaying selected users */}
// <TableContainer component={Paper}>
//   <Table aria-label="store users table">
//     <TableHead>
//       <TableRow>
//         <StyledTableCell>Username</StyledTableCell>
//         <StyledTableCell>Email</StyledTableCell>
//         <StyledTableCell>Phone</StyledTableCell>
//         <StyledTableCell>Action</StyledTableCell>
//       </TableRow>
//     </TableHead>
//     <TableBody>
//       {tableUsers.map((user, index) => (
//         <StyledTableRow key={index}>
//           <StyledTableCell>
//             {user.FirstName} {user.LastName}
//           </StyledTableCell>
//           <StyledTableCell>{user.Email}</StyledTableCell>
//           <StyledTableCell>{user.PhoneNumber}</StyledTableCell>
//           <StyledTableCell>
//             <Button
//               onClick={() => handleRemoveUser(index)}
//               variant="contained"
//               color="secondary"
//             >
//               Remove
//             </Button>
//           </StyledTableCell>
//         </StyledTableRow>
//       ))}
//     </TableBody>
//   </Table>
// </TableContainer>

               
                 
// <div className="mt-6 flex justify-end gap-4">
// <button
//         type="submit"
//         className="button-base save-btn"
//         onClick={handleFormSubmit}
//       >
//         Save
//       </button>
//       <button
//         type="button"
//         onClick={handleCancel}
//         className="button-base cancel-btn"
//       >
//         Cancel
//       </button>
//       </div>
//       {isLoading && (
//       // <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-gray-700">
//         <LoadingAnimation />
//       // </div>
//     )}

//                     {/* Modal to show filtered users */}
//                     <Dialog open={isModalOpen} onClose={handleCloseModal}>
//                       <DialogTitle>Filtered Users</DialogTitle>
//                       <DialogContent>
//                         <TableContainer component={Paper}>
//                           <Table aria-label="filtered users table">
//                             <TableHead>
//                               <TableRow>
//                                 <StyledTableCell>Username</StyledTableCell>
//                                 <StyledTableCell>Email</StyledTableCell>
//                                 <StyledTableCell>Phone</StyledTableCell>
//                                 <StyledTableCell>Action</StyledTableCell>
//                               </TableRow>
//                             </TableHead>
//                             <TableBody>
//                               {filteredUsers.map((user) => (
//                                 <StyledTableRow key={user.UserID}>
//                                   <StyledTableCell>
//                                     {user.FirstName} {user.LastName}
//                                   </StyledTableCell>
//                                   <StyledTableCell>{user.Email}</StyledTableCell>
//                                   <StyledTableCell>{user.PhoneNumber}</StyledTableCell>
//                                   <StyledTableCell>
//                                     <Button
//                                       onClick={() => handleSelectUser(user)}
//                                       variant="contained"
//                                     >
//                                       Select
//                                     </Button>
//                                   </StyledTableCell>
//                                 </StyledTableRow>
//                               ))}
//                             </TableBody>
//                           </Table>
//                         </TableContainer>
//                       </DialogContent>
//                       <DialogActions>
                     
//                         <div className="mt-6 flex justify-end gap-4">
  
//     <button
//         type="submit"
//         className="button-base save-btn"
//         onClick={handleAddUsers}
//       >
//         Save
//       </button>
//       <button
//         type="button"
//         onClick={handleCloseModal}
//         className="button-base cancel-btn"
//       >
//         Cancel
//       </button>
// </div>

//                       </DialogActions>
//                     </Dialog>
//                   </div>
//                 </div>
//               )}

//               <Box className="flex justify-between mt-4">
//                 <Button
//                   disabled={activeStep === 0}
//                   onClick={handleBack}
//                   className="bg-gray-300 px-4 py-2 rounded"
//                 >
//                   Back
//                 </Button>
//                 <Button
//                   onClick={handleNext}
//                   className="bg-blue-500 text-white px-4 py-2 rounded"
//                 >
//                   {activeStep === steps.length - 1 ? "Finish" : "Next"}
//                 </Button>
//               </Box>
//             </React.Fragment>
//           )}
//         </Box>
//       </div>
//     </div>
//   );
// }

// export default StoreForm;




import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { StoreContext } from "../../Context/storeContext";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Combobox } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/24/solid';
import { CheckIcon } from '@heroicons/react/24/solid';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import {CREATEORUPDATE_STORES_API,STOREUSERSBYSTORE_ID_API,GETALLSTOREUSERSBYSTORE_ID_API,COUNTRIES_API,STATES_API,CITIES_API,
    GETALLUSERS_API,CREATEORUPDATE_MAPSTOREUSER,GET_MAPSTOREUSERBY_USERID,GET_MAPSTORE_USERBYSTOREID,DELETEMAPSTOREUSER
} from "../../Constants/apiRoutes";
import "../../style.css";
import LoadingAnimation from '../../components/Loading/LoadingAnimation';
import 'react-toastify/dist/ReactToastify.css';
import { TableContainer } from '@mui/material';

import {
  StyledTableCell,
  StyledTableRow,
  TablePaginationActions,
} from "../CustomTablePagination";
import { IoIosSearch, IoIosCall, IoMdMail } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
const steps = ["Store Details", "Store Users"];

function StoreForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { storeDetails } = useContext(StoreContext);
  const [storeUsers, setStoreUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [countryMap, setCountryMap] = useState({});
  const [stateMap, setStateMap] = useState({});
  const [cityMap, setCityMap] = useState({});
  const [formData, setFormData] = useState(
    location.state?.storeDetails || {
      TenantID: 1,
      StoreID: null,
      StoreName: "",
      Email: "",
      // Password: "",
      Phone: "",
      AddressLine1: "",
      AddressLine2: "",
      CityID: "",
      StateID: "",
      CountryID: "",
      ZipCode: "",
    }
  );

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const isEditMode = Boolean(
    location.state?.storeDetails?.store || storeDetails?.store
  );

  useEffect(() => {
    const setInitialData = async () => {
      if (isEditMode) {
        const store = location.state?.storeDetails?.store || storeDetails?.store;
  
        if (!store) {
          console.warn("No store data found");
          return;
        }
  
        console.log("Store data in edit mode:", store);
  
        // Set form data based on store details
        setFormData({
          TenantID: store.TenantID || 1,
          StoreID: store.StoreID || "",
          StoreName: store.StoreName || "",
          StoreCode: store.StoreCode || "",
          Email: store.Email || "",
          Phone: store.Phone || "",
          AddressLine1: store.AddressLine1 || "",
          AddressLine2: store.AddressLine2 || "",
          CountryID: store.CountryID || "",
          StateID: store.StateID || "",
          CityID: store.CityID || "",
          ZipCode: store.ZipCode || "",
        });
  
        // Fetch users by StoreID
        if (store.StoreID) {
          fetchUsersByStoreId(store.StoreID); // Pass StoreID to fetch users
        }
  
        // Fetch country, state, city as per your existing logic
        const selectedCountry = countries.find(
          (country) => country.CountryID === store.CountryID
        );
        if (selectedCountry) {
          setSelectedCountry(selectedCountry);
          fetchStatesByCountry(selectedCountry.CountryID);
        }
  
        if (store.StateID) {
          fetchStatesByCountry(store.CountryID).then(() => {
            const selectedState = states.find(
              (state) => state.StateID === store.StateID
            );
            setSelectedState(selectedState);
            fetchCitiesByState(store.StateID);
          });
        }
  
        if (store.CityID) {
          fetchCitiesByState(store.StateID).then(() => {
            const selectedCity = cities.find(
              (city) => city.CityID === store.CityID
            );
            setSelectedCity(selectedCity);
          });
        }
      }
    };
  
    setInitialData();
  }, [isEditMode, location.state?.storeDetails?.store, storeDetails?.store, countries]); // Add required dependencies
 // Function to fetch users by StoreID
// const fetchUsersByStoreId = async (storeId) => {
//   try {
//     const token = localStorage.getItem("token"); // Retrieve the token from localStorage
//     const response = await axios.get(`${GET_MAPSTORE_USERBYSTOREID}/${storeId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`, // Add token to Authorization header
//       },
//     });
    
//     // Extracting user data from response and storing in tableUsers
//     const users = response.data.rows.map((row) => ({
//       MapStoreUserID:row.user.MapStoreUserID,
//       FirstName: row.User.FirstName,
//       LastName: row.User.LastName,
//       Email: row.User.Email,
//       PhoneNumber: row.User.PhoneNumber,
//     }));

//     setTableUsers(users); // Assuming data is in response.data.rows
//   } catch (error) {
//     console.error("Error fetching users by StoreID:", error);
//   }
// };

const fetchUsersByStoreId = async (storeId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${GET_MAPSTORE_USERBYSTOREID}/${storeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Extracting user data from response and storing it in tableUsers
    const users = response.data.rows.map((row) => ({
      MapStoreUserID: row.MapStoreUserID, // Correct reference
      FirstName: row.User.FirstName,
      LastName: row.User.LastName,
      Email: row.User.Email,
      PhoneNumber: row.User.PhoneNumber,
    }));

    setTableUsers(users); // Set updated user data
  } catch (error) {
    console.error("Error fetching users by StoreID:", error);
  }
};

  const fetchStoreUsers = async (search = "",storeId) => {
    try {
      const response = await axios.get(
        // "https://imlystudios-backend-mqg4.onrender.com/api/stores/getAllStores",
          `${STOREUSERSBYSTORE_ID_API}/${storeId}`,
        {
          params: {
            search: search
          }
        }
      );

      // Log the entire API response to understand its structure
      console.log("API Response:", response.data);

      return {
        stores: response.data.Stores || [], // Correctly access the 'Stores' field
        totalCount: response.data.totalItems || 0 // Use 'totalItems' for total count
      };
    } catch (error) {
      console.error("Error fetching stores:", error);
      throw error;
    }
    finally {
            setLoading(false);
          }
  };
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  // const handleFormSubmit = async (event) => {
  //   event.preventDefault();
  //   setIsLoading(true); // Show loading animation
  //   const isUpdate = formData.StoreID ? true : false;
  //   const apiUrl = CREATEORUPDATE_STORES_API;
  
  //   try {
  //     const response = await axios.post(apiUrl, formData);
  //      if (response.status===200) {

  //         toast.success(isUpdate ?'Store updated successfully!':'Store created successfully!', {
  //         position: 'top-right',
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //       });
  //       console.log( toast.success);
  //     } 
  //     navigate("/Stores"); // Redirect to the Stores page
  //   } catch (error) {
  //     console.error("Submission failed:", error);
  //     if (error.response) {
  //       setError(
  //         `Failed to ${isUpdate ? "update" : "create"} store: ` +
  //         error.response.data.message
  //       );
  //     } else if (error.request) {
  //       setError("No response received from server.");
  //     } else {
  //       setError("Error: " + error.message);
  //     }
  //   } finally {
  //     setIsLoading(false); // Hide loading animation
  //   }
  // };
  

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Show loading animation
    const isUpdate = formData.StoreID ? true : false;
    const apiUrl = CREATEORUPDATE_STORES_API;
  
    try {
      // Log form data
      console.log('Store Form Data:', formData);
  
      // Create or update the store
      const response = await axios.post(apiUrl, formData);
  
      // Log the response
      console.log('Store Response:', response);
  
      // Check if the response is successful
      if (response.StatusCode === "SUCCESS") {
        toast.success(isUpdate ? 'Store updated successfully!' : 'Store created successfully!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
  console.log(toast.success);
      // Redirect to the Stores page
      navigate("/Stores");
  
    } catch (error) {
      console.error('Store submission failed:', error);
  
      // Error handling with toast notifications
      if (error.response) {
        console.error('Response data:', error.response.data);
        toast.error(
          `Failed to ${isUpdate ? 'update' : 'create'} store: ` + error.response.data.message,
          {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      } else if (error.request) {
        console.error('No response received:', error.request);
        toast.error('No response received from server.', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        console.error('Error in setting up request:', error.message);
        toast.error('Error: ' + error.message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } finally {
      setIsLoading(false); // Hide loading animation
    }
  };
  
  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setFormData({
      TenantID: 1,
      StoreID: null,
      StoreName: "",
      Email: "",
      // Password: "",
      Phone: "",
      AddressLine1: "",
      AddressLine2: "",
      CityID: "",
      StateID: "",
      CountryID: "",
      ZipCode: "",
    });
  };
  const isStepSkipped = (step) => false;
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [users, setUsers] = useState([]); // All users from the API
  const [filteredUsers, setFilteredUsers] = useState([]); // Users after filtering
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [query, setQuery] = useState('');
  const [tableUsers, setTableUsers] = useState([]); // Users added to the table
  const [selectedUsers, setSelectedUsers] = useState([]); // Users selected in the popup
  const [isModalOpen, setIsModalOpen] = useState(false); // Control the modal state
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  useEffect(() => {
    const fetchUsers = async (search = "") => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authentication token found");
        }
  
        const response = await axios.get(`${GETALLUSERS_API}?SearchText=${search}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
  
        console.log("API Response Data:", response.data);
  
        const data = response.data;
        const userArray = data.users || []; // Correctly access the 'users' array
  
        // Check if 'userArray' is an array before mapping
        if (Array.isArray(userArray)) {
          const usersData = userArray.map((item) => ({
            ...item, // Spread the user object to include all user details
          }));
          setUsers(usersData);
          console.log("Users Data:", usersData);
        } else {
          console.error("API response does not contain user data in an array:", userArray);
        }
  
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
  
    // Only fetch when the search query has 3 or more characters
    if (searchQuery.length >= 3) {
      fetchUsers(searchQuery);
    }
  }, [searchQuery]);
 

// const mapStoreUser = async (selectedUser) => {
//   try {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       throw new Error("No authentication token found");
//     }

//     // Get the StoreID based on whether it's edit mode or not
//     const store = location.state?.storeDetails?.store || storeDetails?.store;
//     const storeID = store?.StoreID || 9; // Fallback to 9 if no storeID is found

//     // Construct the payload
//     const payload = {
//       MapStoreUserID: 0,
//       StoreID: storeID, // Dynamically set the StoreID from edit mode
//       UserID: selectedUser.UserID,
//       CreatedBy: "Danny",
//       FirstName: selectedUser.FirstName,
//       LastName: selectedUser.LastName,
//       Email: selectedUser.Email,
//       PhoneNumber: selectedUser.PhoneNumber,
//     };

//     const response = await axios.post(CREATEORUPDATE_MAPSTOREUSER, payload, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });

//     // Check if the response is successful
//     if (response.status === 200) {
//       console.log("User mapped successfully:", response.data);
//       // Optionally, display success notification or update UI here
//     } else {
//       console.error("Failed to map user:", response.data);
//     }
//   } catch (error) {
//     console.error("Error mapping user:", error);
//   }
// };


const mapStoreUser = async (selectedUser) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found");
    }

    // Get the StoreID based on whether it's edit mode or not
    const store = location.state?.storeDetails?.store || storeDetails?.store;
    const storeID = store?.StoreID || ""; // Fallback to 9 if no storeID is found

    // Construct the payload
    const payload = {
      MapStoreUserID: 0,
      StoreID: storeID, // Dynamically set the StoreID from edit mode
      UserID: selectedUser.UserID,
      CreatedBy: "Danny",
      FirstName: selectedUser.FirstName,
      LastName: selectedUser.LastName,
      Email: selectedUser.Email,
      PhoneNumber: selectedUser.PhoneNumber,
    };

    const response = await axios.post(CREATEORUPDATE_MAPSTOREUSER, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    // Check if the response is successful
    if (response.status === 200) {
      console.log("User mapped successfully:", response.data);

      // Fetch the updated users by StoreID
      await fetchUsersByStoreId(storeID);

      // Optionally, display success notification or update UI here
    } else {
      console.error("Failed to map user:", response.data);
    }
  } catch (error) {
    console.error("Error mapping user:", error);
  }
};

  const handleSearchChange = (e) => {
    const query = e.target.value.trim().toLowerCase();
    setSearchQuery(query);

    // Filter users client-side only if query length is 3 or more characters
    if (query.length >= 3) {
      const filtered = users.filter((user) => {
        const firstName = user.FirstName?.toLowerCase() || "";
        const lastName = user.LastName?.toLowerCase() || "";
        const email = user.Email?.toLowerCase() || "";

        return (
          firstName.includes(query) ||
          lastName.includes(query) ||
          email.includes(query)
        );
      });
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers([]); // Clear results if the search query is less than 3 characters
    }
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const handleCustomerSelect = (customer) => {
    console.log("Selected customer:", customer);
  
    // Check if the user is already in the table
    const isUserInTable = tableUsers.some(
      (user) => user.CustomerID === customer.CustomerID
    );
  
    // If the user is not in the table, add them
    if (!isUserInTable) {
      setTableUsers((prevUsers) => [...prevUsers, customer]);
    }
  
    // Clear the search query without updating it to the selected customer's name
    setSearchQuery(""); 
    setFilteredUsers([]); // Clear the dropdown after selection
  };
  // Close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  // Handle the addition of filtered users to the table
  const handleAddUsers = () => {
    setTableUsers((prevUsers) => [...prevUsers, ...selectedUsers]); // Add selected users to the table
    setSelectedUsers([]); // Clear selected users
    setIsModalOpen(false); // Close the modal after adding users
  };

  // Handle user selection in the popup (you can make this more complex to allow selecting multiple users)
  const handleSelectUser = (user) => {
    setSelectedUsers([user]); // Select the user to be added
  };
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          // "https://imlystudios-backend-mqg4.onrender.com/api/cities/getCountries"
          COUNTRIES_API 
        );
        const countryData = response.data.data;
        setCountries(countryData);

        // Create countryMap
        const countryMapData = countryData.reduce((map, country) => {
          map[country.CountryName] = country.CountryID;
          return map;
        }, {});
        setCountryMap(countryMapData);

        console.log("Fetched countries:", countryData);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const fetchStatesByCountry = async (countryId) => {
    if (!countryId) return;

    try {
      const response = await axios.get(
        // `https://imlystudios-backend-mqg4.onrender.com/api/cities/getStatesByCountry?$filter=CountryID eq ${countryId}`
        
 `${STATES_API}/${countryId}`
      );
      if (response.data.status === "SUCCESS") {
        const stateData = response.data.data;
        setStates(stateData);

        // Create stateMap
        const stateMapData = stateData.reduce((map, state) => {
          map[state.StateName] = state.StateID;
          return map;
        }, {});
        setStateMap(stateMapData);

        console.log("Fetched states:", stateData);
      }
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const fetchCitiesByState = async (stateId) => {
    if (!stateId) return;

    try {
      const response = await axios.get(
        // `https://imlystudios-backend-mqg4.onrender.com/api/cities/getCitiesByState?$filter=StateID eq ${stateId}`
         `${CITIES_API}/${stateId}`
      );
      if (response.data.status === "SUCCESS") {
        const cityData = response.data.data;
        setCities(cityData);

        // Create cityMap
        const cityMapData = cityData.reduce((map, city) => {
          map[city.CityName] = city.CityID;
          return map;
        }, {});
        setCityMap(cityMapData);

        console.log("Fetched cities:", cityData);
      }
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };  
  const handleCountryChange = (selectedCountry) => {
    if (!selectedCountry) return;

    const countryID =
      countryMap[selectedCountry.CountryName] || selectedCountry.CountryID;

    setSelectedCountry(selectedCountry);
    setFormData({
      ...formData,
      CountryID: countryID,
      CountryName: selectedCountry.CountryName,
    });
    fetchStatesByCountry(countryID);
  };

  const handleStateChange = (state) => {
    if (!state) return;

    const stateID = stateMap[state.StateName] || state.StateID;

    setSelectedState(state);
    setFormData({
      ...formData,
      StateID: stateID,
      StateName: state.StateName,
    });

    fetchCitiesByState(stateID);
  };

  const handleCityChange = (city) => {
    if (!city) return;

    const cityID = cityMap[city.CityName] || city.CityID;

    setSelectedCity(city);
    setFormData({
      ...formData,
      CityID: cityID,
      CityName: city.CityName,
    });
  };
 
  const handleCancel = () => {
    setIsLoading(true);
  
    setTimeout(() => {
      navigate("/Stores");
    }, 1500); // Delay by 500ms
  };

  const handleStepClick = (index) => {
    setActiveStep(index); 
  };
const isStepOptional = (step) => step === 1;

// Function to handle user deletion
// const handleRemoveUser = async (MapStoreUserID) => {
//   try {
//     const token = localStorage.getItem("token"); // Retrieve the token from localStorage
//     await axios.delete(
//       `${DELETEMAPSTOREUSER }/${MapStoreUserID}`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`, // Add token to Authorization header
//         },
//       }
//     );
    
//     // Remove user from tableUsers after successful deletion
//     const updatedUsers = tableUsers.filter((_, i) => i !== MapStoreUserID);
//     setTableUsers(updatedUsers);
    
//     console.log(`User with MapStoreUserID ${MapStoreUserID} removed successfully.`);
//   } catch (error) {
//     console.error("Error removing user:", error);
//   }
// };

const handleRemoveUser = async (MapStoreUserID) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found");
    }

    // Make DELETE request to remove the user
    await axios.delete(`${DELETEMAPSTOREUSER}/${MapStoreUserID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Update tableUsers by filtering out the deleted user
    const updatedUsers = tableUsers.filter(user => user.MapStoreUserID !== MapStoreUserID);
    setTableUsers(updatedUsers);

    console.log(`User with MapStoreUserID ${MapStoreUserID} removed successfully.`);
  } catch (error) {
    console.error("Error removing user:", error);
  }
};

// Handle click event on user selection
const handleUserClick = (user) => {
  console.log(`Selected user: ${user.FirstName} ${user.LastName}`);
  
  // Call the mapStoreUser function with the selected user's data
  mapStoreUser(user);
};
return (
    // <div className="p-6 mr-10 sm:px-6 lg:px-8 pt-4 ml-10 lg:ml-80 w-1/8 rounded-lg">
    <div className="main-container">
   
      {/* <div className="p-6 mb-7 sm:px-6 lg:px-8 pt-4 bg-white shadow-lg rounded-lg"> */}
      {/* <div className="p-6 mb-7 sm:px-6 lg:px-8 pt-4 rounded-lg"> */}
      <div className="body-container">
      <ToastContainer />
        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={activeStep} alternativeLabel>
          
             {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {
                onClick: () => handleStepClick(index), // Add onClick handler
                style: { cursor: "pointer" }, // Add cursor style for pointer
              };

              if (isStepOptional(index)) {
                // Optional step logic
              }

              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }

              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>

          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography className="text-center text-xl mb-4">
                All steps completed - you're finished
              </Typography>
              <Box className="justify-center">
                <Button
                  onClick={handleReset}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Reset
                </Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {activeStep === 0 && (
                <><div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                  {/* Store Details Form */}
                  <div className="flex items-center gap-4">
                    <label className="w-1/3 text-xs font-medium text-gray-700">Store Name</label>
                    <input
                      type="text"
                      name="StoreName"
                      value={formData.StoreName}
                      onChange={handleFormChange}
                      className={`p-1 mt-2 mb-1 w-full border rounded-md ${error ? 'border-red-500' : 'border-gray-400'}`} />
                  </div>

                  <div className="flex items-center gap-4">
                    <label className="w-1/3 text-xs font-medium text-gray-700">Address Line 1</label>
                    <input
                      type="text"
                      name="AddressLine1"
                      value={formData.AddressLine1}
                      onChange={handleFormChange}
                      className={`p-1 w-full border rounded-md ${error ? 'border-red-500' : 'border-gray-400'}`} />
                  </div>

                  <div className="flex items-center gap-4">
                    <label className="w-1/3 text-xs font-medium text-gray-700">Store Code</label>
                    <input
                      type="text"
                      name="StoreCode"
                      value={formData.StoreCode}
                      onChange={handleFormChange}
                      className={`p-1 w-full border rounded-md ${error ? 'border-red-500' : 'border-gray-400'}`} />
                  </div>

                  <div className="flex items-center gap-4">
                    <label className="w-1/3 text-xs font-medium text-gray-700">Address Line 2</label>
                    <input
                      type="text"
                      name="AddressLine2"
                      value={formData.AddressLine2}
                      onChange={handleFormChange}
                      className={`p-1 mt-2 mb-1 w-full border rounded-md ${error ? 'border-red-500' : 'border-gray-400'}`} />
                  </div>

                  <div className="flex items-center gap-4">
                    <label className="w-1/3 text-xs font-medium text-gray-700">Email</label>
                    <input
                      type="text"
                      name="Email"
                      value={formData.Email}
                      onChange={handleFormChange}
                      className={`p-1 w-full border rounded-md ${error ? 'border-red-500' : 'border-gray-400'}`} />
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
                              .filter((country) => country.CountryName.toLowerCase().includes(query.toLowerCase())
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
                    <label className="w-1/3 text-xs font-medium text-gray-700">Contact</label>
                    <input
                      type="text"
                      name="Phone"
                      value={formData.Phone|| ""}
                      onChange={handleFormChange}
                      className={`p-1 w-full border rounded-md ${error ? 'border-red-500' : 'border-gray-400'}`} />
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
                    <label className="w-1/3 text-xs font-medium text-gray-700">Zip Code</label>
                    <input
                      type="text"
                      name="ZipCode"
                      value={formData.ZipCode|| ""}
                      onChange={handleFormChange}
                      className={`p-1 w-full border rounded-md ${error ? 'border-red-500' : 'border-gray-400'}`} />
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
                </div><div className="mt-6 flex justify-end gap-4">
                  
  <button
        type="submit"
        className="button-base save-btn"
        onClick={handleFormSubmit}
      >
        Save
      </button>
      <button
        type="button"
        onClick={handleCancel}
        className="button-base cancel-btn"
      >
        Cancel
      </button>

                  </div>
      {/* {isLoading && <LoadingAnimation />} */}
      {isLoading && (
      // <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-gray-700">
        <LoadingAnimation />
      // </div>
    )}
                  </>
              )}


              {activeStep === 1 && (
                <div>
                  <div>
    
 <div className="relative flex flex-col w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg pb-2 mx-auto">

    <div className="relative w-80 max-w-md mx-auto">
  {/* Search Input */}
  <div className="flex items-center justify-center relative">
    <input
      id="searchName"
      type="text"
      placeholder="Search by Name..."
      value={searchQuery}
      onChange={handleSearchChange}
      onFocus={() => setIsFocused(true)}
      onBlur={() => {
        if (!isHovered) setIsFocused(false);
      }}
      className="mt-1 p-2 pr-10 border border-gray-300 rounded-md text-sm md:text-base w-full"
    />
    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
      <IoIosSearch aria-label="Search Icon" />
    </div>
  </div>

  {/* Dropdown for filtered users */}
  {searchQuery.length >= 3 && isFocused && (
    <div
      className="absolute top-full mt-1 w-full bg-white shadow-lg border border-gray-300 rounded-lg z-10"
      style={{ maxHeight: "200px", overflowY: "auto" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {filteredUsers.length > 0 ? (
        <>
          <div className="mb-2 text-sm text-gray-600 px-2">
            {filteredUsers.length} Result
            {filteredUsers.length > 1 ? "s" : ""}
          </div>

          {filteredUsers.map((user) => (
            <div
              className="relative cursor-pointer flex flex-col p-2 hover:bg-gray-100 group"
              key={user.UserID}
              onClick={() => handleUserClick(user)} // Trigger the API call on user selection
            >
              <span className="font-medium">
                {user.FirstName} {user.LastName}
              </span>
              <div className="flex items-center text-xs md:text-sm text-gray-500">
                <IoIosCall className="w-4 h-4 mr-1" aria-label="Phone Icon" />
                <span>{user.PhoneNumber}</span>
              </div>
              <div className="flex items-center text-xs md:text-sm text-gray-500">
                <IoMdMail className="w-4 h-4 mr-1" aria-label="Email Icon" />
                <span>{user.Email}</span>
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
    </div>

<TableContainer component={Paper}>
  <Table aria-label="store users table">
    <TableHead>
      <TableRow>
        <StyledTableCell>Username</StyledTableCell>
        <StyledTableCell>Email</StyledTableCell>
        <StyledTableCell>Phone</StyledTableCell>
        <StyledTableCell>Action</StyledTableCell>
      </TableRow>
    </TableHead>
    {/* <TableBody>
      {tableUsers && tableUsers.length > 0 ? (
        tableUsers.map((user,MapStoreUserID) => (
          <TableRow key={MapStoreUserID}>
            <StyledTableCell>
              {user.FirstName} {user.LastName}
            </StyledTableCell>
            <StyledTableCell>{user.Email}</StyledTableCell>
            <StyledTableCell>{user.PhoneNumber}</StyledTableCell>
            <StyledTableCell>
              <Button
                onClick={() => handleRemoveUser(MapStoreUserID)}
                variant="contained"
                color="secondary"
              >
                Remove
              </Button>
            </StyledTableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <StyledTableCell colSpan={4}>No users found</StyledTableCell>
        </TableRow>
      )}
    </TableBody> */}

<TableBody>
  {tableUsers && tableUsers.length > 0 ? (
    tableUsers.map((user) => (
      <TableRow key={user.MapStoreUserID}> {/* Use user.MapStoreUserID as key */}
        <StyledTableCell>
          {user.FirstName} {user.LastName}
        </StyledTableCell>
        <StyledTableCell>{user.Email}</StyledTableCell>
        <StyledTableCell>{user.PhoneNumber}</StyledTableCell>
        <StyledTableCell>
          {/* <Button
            onClick={() => handleRemoveUser(user.MapStoreUserID)} 
            variant="contained"
            color="secondary"
          >
            Remove
          </Button> */}
           <button
    type="button"
    onClick={() => handleRemoveUser(user.MapStoreUserID)} 
    className="button delete-button"
  >
    <MdOutlineCancel aria-hidden="true" className="h-4 w-4" />
    Delete
  </button>
        </StyledTableCell>
      </TableRow>
    ))
  ) : (
    <TableRow>
    <StyledTableCell colSpan={4} style={{ textAlign: 'center' }}>No users found</StyledTableCell>
  </TableRow>
  )}
</TableBody>

  </Table>
</TableContainer>

                 
<div className="mt-6 flex justify-end gap-4">
<button
        type="submit"
        className="button-base save-btn"
        onClick={handleFormSubmit}
      >
        Save
      </button>
      <button
        type="button"
        onClick={handleCancel}
        className="button-base cancel-btn"
      >
        Cancel
      </button>
      </div>
      {isLoading && (
      // <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-gray-700">
        <LoadingAnimation />
      // </div>
    )}

                    {/* Modal to show filtered users
                    <Dialog open={isModalOpen} onClose={handleCloseModal}>
                      <DialogTitle>Filtered Users</DialogTitle>
                      <DialogContent>
                        <TableContainer component={Paper}>
                          <Table aria-label="filtered users table">
                            <TableHead>
                              <TableRow>
                                <StyledTableCell>Username</StyledTableCell>
                                <StyledTableCell>Email</StyledTableCell>
                                <StyledTableCell>Phone</StyledTableCell>
                                <StyledTableCell>Action</StyledTableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {filteredUsers.map((user) => (
                                <StyledTableRow key={user.UserID}>
                                  <StyledTableCell>
                                    {user.FirstName} {user.LastName}
                                  </StyledTableCell>
                                  <StyledTableCell>{user.Email}</StyledTableCell>
                                  <StyledTableCell>{user.PhoneNumber}</StyledTableCell>
                                  <StyledTableCell>
                                    <Button
                                      onClick={() => handleSelectUser(user)}
                                      variant="contained"
                                    >
                                      Select
                                    </Button>
                                  </StyledTableCell>
                                </StyledTableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </DialogContent>
                      <DialogActions>
                     
                        <div className="mt-6 flex justify-end gap-4">
  
    <button
        type="submit"
        className="button-base save-btn"
        onClick={handleAddUsers}
      >
        Save
      </button>
      <button
        type="button"
        onClick={handleCloseModal}
        className="button-base cancel-btn"
      >
        Cancel
      </button>
</div>

                      </DialogActions>
                    </Dialog> */}
                  </div>
                </div>
              )}

              <Box className="flex justify-between mt-4">
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Box>
      </div>
    </div>
  );
}

export default StoreForm;