// import React, { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import { useNavigate, useLocation } from "react-router-dom";
// import { UserContext } from "../../Context/userContext";
// import { Combobox } from "@headlessui/react";
// import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
// import {CREATEORUPDATE_USERS_API,COUNTRIES_API,STATES_API,CITIES_API,GETALLSTORES_API} from "../../Constants/apiRoutes";
// import LoadingAnimation from '../../components/Loading/LoadingAnimation';

// const genderOptions = [
//   { id: "M", name: "Male" },
//   { id: "F", name: "Female" },
// ];
// const roleOptions = [
//   { id: "1", name: "Admin" },
//   { id: "2", name: "Store User" },
//   { id: "3", name: " Finance" },
//   { id: "4", name: "Production" },
//   { id: "5", name: "Techinical" },
// ];

// function Userform() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { userDetails } = useContext(UserContext);

//   const isEditMode = Boolean(
//     location.state?.userDetails?.user || userDetails?.user
//   );

//   const [formData, setFormData] = useState(
//     location.state?.userDetails || {
//       TenantID: 1,
//       FirstName: "",
//       LastName: "",
//       Email: "",
//       Password: "",
//       PhoneNumber: "",
//       Gender: "",
//       RoleID: "",
//       AddressLine1: "",
//       AddressLine2: "",
//       CityID: "",
//       StateID: "",
//       CountryID: "",
//       ZipCode: "",
//       ProfileImage: null,
//       Comments: "",
//       StoreID:"",
//     }
//   );

//   const [countries, setCountries] = useState([]);
//   const [countryMap, setCountryMap] = useState({});
//   const [StoreMap, setStoreMap] = useState({});
//   const [states, setStates] = useState([]);
//   const [stateMap, setStateMap] = useState({});
//   const [cities, setCities] = useState([]);
//   const [cityMap, setCityMap] = useState({});

//   const [selectedCountry, setSelectedCountry] = useState(null);
//   const [selectedState, setSelectedState] = useState(null);
//   const [selectedCity, setSelectedCity] = useState(null);
//   const [query, setQuery] = useState("");
//   const [storeNames, setStoreNames] = useState([ ]);
//   const [storeOptions, setStoreOptions] = useState([]);

//   useEffect(() => {
//     if (isEditMode) {
//       const user = location.state?.userDetails?.user || userDetails?.user;

//       // Set the form data with the user information
//       setFormData({
//         TenantID: 1,
//         FirstName: user.FirstName || "",
//         LastName: user.LastName || "",
//         Email: user.Email || "",
//         PhoneNumber: user.PhoneNumber || "",
//         Gender: user.Gender || "",
//         RoleID: user.RoleID || "",
//         AddressLine1: user.Address?.AddressLine1 || "",
//         AddressLine2: user.Address?.AddressLine2 || "",
//         CityID: user.Address?.CityID || "",
//         StateID: user.Address?.StateID || "",
//         CountryID: user.Address?.CountryID || "",
//         ZipCode: user.Address?.ZipCode || "",
//         StoreID: user.StoreID || "",
//         Comments: user.Comments || "",
//       });

// // const selectedStore = storeNames.find(store => store.StoreID === user.StoreID);

// // if (selectedStore) {
// //   setSelectedStore(selectedStore);
// //   console.log("Selected Store:", selectedStore.StoreName);
// // } else {
// //   console.log("No store found for StoreID:", user.StoreID);
// // }

//       // Set Role
//       const userRole = roleOptions.find(role => role.id === String(user.RoleID));
//       setSelectedRole(userRole);
// // Set the selected store based on the StoreID
// const selectedStore = storeOptions.find(
//   (store) => store.StoreID ===user?.StoreID
// );
// setSelectedStore(selectedStore || null);

//       // Set Gender
//       const selectedGender = genderOptions.find(g => g.id === user.Gender);
//       setSelectedGender(selectedGender);

//       // Set Country
//       const selectedCountry = countries.find(country => country.CountryID === user.Address.CountryID);
//       if (selectedCountry) {
//         setSelectedCountry(selectedCountry);
//         fetchStatesByCountry(selectedCountry.CountryID);  // Fetch states based on selected country
//       }

//       // Fetch states and then set state and city
//       if (user.Address?.StateID) {
//         fetchStatesByCountry(user.Address.CountryID).then(() => {
//           const selectedState = states.find(state => state.StateID === user.Address.StateID);
//           setSelectedState(selectedState);
//           console.log(selectedState);
//           fetchCitiesByState(user.Address.StateID);  // Fetch cities based on selected state
//         });
//       }

//       // Fetch cities and set the selected city
//       if (user.Address?.CityID) {
//         fetchCitiesByState(user.Address.StateID).then(() => {
//           const selectedCity = cities.find(city => city.CityID === user.Address.CityID);
//           setSelectedCity(selectedCity);
//         });
//       }
//     }
//   }, [
//     isEditMode,
//     location.state?.userDetails?.user,
//     userDetails?.user,
//     genderOptions,
//     roleOptions,
//     countries,
//     storeNames,
//     storeOptions,
//   ]);

//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData({
//         ...formData,
//         ProfileImage: file,
//       });
//     }
//   };

//   const [selectedGender, setSelectedGender] = useState(formData.Gender || "");
//   const [selectedStore, setSelectedStore] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleGenderChange = (gender) => {
//     setSelectedGender(gender);
//     setFormData({
//       ...formData,
//       Gender: gender.id,
//     });
//   };

//   const [selectedRole, setSelectedRole] = useState(formData.RoleID || "");

//   const handleRoleChange = (role) => {
//     setSelectedRole(role);
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       RoleID: role.id,
//     }));
//   };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();
//     setIsLoading(true); // Show loading animation

//     try {
//       const formDataToSend = new FormData();

//       // Append all formData fields to the FormData object, including all user details
//       Object.keys(formData).forEach((key) => {
//         formDataToSend.append(key, formData[key]);
//       });

//       // Log each key-value pair for debugging
//       for (let pair of formDataToSend.entries()) {
//         console.log(`${pair[0]}: ${pair[1]}`);
//       }

//       // API URL to create or update the user
//       const apiUrl = CREATEORUPDATE_USERS_API;

//       // Check if we are in 'edit mode' (UserID exists) or 'create mode'
//       const isEditMode = Boolean(formData.UserID); // true if updating, false if creating

//       // Set the method: 'PUT' for updating, 'POST' for creating
//       const method = isEditMode ? "put" : "post";

//       // Perform the API request with all form data fields
//       const response = await axios({
//         method, // PUT or POST
//         url: apiUrl, // Same API URL for both create and update
//         data: formDataToSend,
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       // Log the successful response
//       console.log("Submission successful:", response.data);

//       // Optionally handle any response data (e.g., filename, message)
//       const { filename } = response.data;
//       console.log(`${isEditMode ? "Updated" : "Created"} successfully: ${filename || "No filename"}`);

//       // Navigate back to the user list or another page after successful submission
//       navigate("/user");

//     } catch (error) {
//       // Error handling
//       if (error.response) {
//         // The server responded with an error status code
//         console.error("Submission failed with response error:", error.response.data);
//       } else if (error.request) {
//         // The request was made but no response was received
//         console.error("Submission failed with no response received:", error.request);
//       } else {
//         // Something else went wrong in setting up the request
//         console.error("Submission failed with error:", error.message);
//       }
//     } finally {
//       setIsLoading(false); // Hide loading animation
//     }
//   };

//   const handleCancel = () => {
//     navigate("/user");
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

//   // const handleStoreChange = (selectedStore) => {
//   //   if (!selectedStore) return;

//   //   const StoreID = selectedStore.id; // Use the id directly
//   //   setSelectedStore(selectedStore);
//   //   setFormData({
//   //     ...formData,
//   //     StoreID: StoreID,
//   //     StoreName: selectedStore.StoreName,
//   //   });
//   // };

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

//   useEffect(() => {
//     const fetchStores = async () => {
//       try {
//         const response = await axios.get(GETALLSTORES_API);
//         console.log("API Response:", response.data);

//         // Extract the Stores array from the API response
//         const storesData = response.data.Stores || [];

//         // Set the store options in state
//         setStoreOptions(Array.isArray(storesData) ? storesData : []);
//       } catch (error) {
//         console.error("Error fetching stores:", error);
//       }
//     };

//     fetchStores();
//   }, []);
//   const handleStoreChange = (store) => {
//     if (!store || !store.StoreID) {
//       console.error("Invalid store selected:", store);
//       return;
//     }

//     setSelectedStore(store);
//     console.log("Selected Store ID:", store.StoreID);

//     // Update formData with selected store ID and name
//     setFormData({
//       ...formData,
//       StoreID: store.StoreID, // Store ID to send to the backend
//     });
//   };

//   return (
//     <div className="px-4 sm:px-6 lg:px-8 pt-4 sm:ml-10 lg:ml-72 w-auto">
//       <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
//         <form onSubmit={handleFormSubmit}>
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-xl font-semibold mb-4 px-24">Users</h2>
//           </div>
//           <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8 px-16 md:px-24">

// <div className="w-full">
//   <label htmlFor="storeName" className="block text-sm font-medium text-gray-700">
//     Store Name
//   </label>
//   <Combobox value={selectedStore} onChange={handleStoreChange}>
//     <div className="relative mt-1">
//       <Combobox.Input
//         id="storeName"
//         className="block w-full rounded-md border border-gray-400 py-2 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//         displayValue={(store) => store?.StoreName || ""}
//         placeholder="Select Store"
//       />
//       <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
//         <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
//       </Combobox.Button>
//       <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
//         {storeNames.map((store) => (
//           <Combobox.Option
//             key={store.StoreID} // Use StoreID as the key
//             className={({ active }) =>
//               `relative cursor-default select-none py-2 pl-3 pr-9 ${active ? "bg-indigo-600 text-white" : "text-gray-900"}`
//             }
//             value={store}
//           >
//             {({ selected, active }) => (
//               <>
//                 <span className={`block truncate ${selected ? "font-semibold" : "font-normal"}`}>
//                   {store.StoreName} {/* Display the StoreName */}
//                 </span>
//                 {selected && (
//                   <span className={`absolute inset-y-0 right-0 flex items-center pr-4 ${active ? "text-white" : "text-indigo-600"}`}>
//                     <CheckIcon className="h-5 w-5" aria-hidden="true" />
//                   </span>
//                 )}
//               </>
//             )}
//           </Combobox.Option>
//         ))}
//       </Combobox.Options>
//     </div>
//   </Combobox>
// </div>

//             <div>
//               <label
//                 htmlFor="RoleID"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Role
//               </label>
//               <Combobox
//                 value={selectedRole}
//                 onChange={handleRoleChange}
//                 as="div"
//               >
//                 <div className="relative mt-1">
//                   <Combobox.Input
//                     className="block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                     displayValue={(role) => role?.name || ""}
//                   />
//                   <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
//                     <ChevronUpDownIcon
//                       className="h-5 w-5 text-gray-400"
//                       aria-hidden="true"
//                     />
//                   </Combobox.Button>
//                   <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
//                     {roleOptions.map((role) => (
//                       <Combobox.Option
//                         key={role.id}
//                         value={role}
//                         className={({ active }) =>
//                           `relative cursor-default select-none py-2 pl-3 pr-9 ${
//                             active
//                               ? "bg-indigo-600 text-white"
//                               : "text-gray-900"
//                           }`
//                         }
//                       >
//                         {({ selected, active }) => (
//                           <>
//                             <span
//                               className={`block truncate ${
//                                 selected ? "font-semibold" : "font-normal"
//                               }`}
//                             >
//                               {role.name}
//                             </span>
//                             {selected ? (
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
//                             ) : null}
//                           </>
//                         )}
//                       </Combobox.Option>
//                     ))}
//                   </Combobox.Options>
//                 </div>
//               </Combobox>
//             </div>

//             {/* First Name */}
//             <div className="flex items-center">
//               <div className="w-full">
//                 <label
//                   htmlFor="FirstName"
//                   className="block text-sm font-medium text-gray-700"
//                 >
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
//             {/* Address Line 1 */}
//             <div className="flex items-center">
//               <div className="w-full">
//                 <label
//                   htmlFor="AddressLine1"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Address Line 1
//                 </label>
//                 <input
//                   type="text"
//                   id="AddressLine1"
//                   name="AddressLine1"
//                   value={formData.AddressLine1 || ""}
//                   onChange={handleFormChange}
//                   required
//                   className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                 />
//               </div>
//             </div>

//             {/* Last Name */}
//             <div>
//               <label
//                 htmlFor="LastName"
//                 className="block text-sm font-medium text-gray-700"
//               >
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

//             {/* Address Line 2 */}
//             <div>
//               <label
//                 htmlFor="AddressLine2"
//                 className="block text-sm font-medium text-gray-700"
//               >
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

//             {/* Email */}
//             <div>
//               <label
//                 htmlFor="Email"
//                 className="block text-sm font-medium text-gray-700"
//               >
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

//             <div className="flex items-center gap-4">
//               <div className="w-full">
//                 <label
//                   htmlFor="Country"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Country
//                 </label>
//                 <Combobox
//                   as="div"
//                   value={selectedCountry}
//                   onChange={handleCountryChange}
//                 >
//                   <div className="relative">
//                     <Combobox.Input
//                       id="Country"
//                       name="Country"
//                       className="w-full rounded-md border border-gray-400 bg-white py-2 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                       onChange={(event) => setQuery(event.target.value)} // Set the query for filtering
//                       displayValue={(country) => country?.CountryName || ""} // Display selected country name
//                     />
//                     <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
//                       <ChevronUpDownIcon
//                         className="h-5 w-5 text-gray-400"
//                         aria-hidden="true"
//                       />
//                     </Combobox.Button>

//                     <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
//                       {countries
//                         .filter((country) =>
//                           country.CountryName.toLowerCase().includes(
//                             query.toLowerCase()
//                           )
//                         )
//                         .map((country) => (
//                           <Combobox.Option
//                             key={country.CountryID}
//                             value={country} // Pass the full country object to onChange
//                             className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-indigo-600 hover:text-white"
//                           >
//                             <span className="block truncate font-normal group-data-[selected]:font-semibold">
//                               {country.CountryName}
//                             </span>
//                             <span className="absolute inset-y-0 right-0 hidden items-center pr-4 text-indigo-600 group-data-[selected]:flex group-data-[focus]:text-white">
//                               <CheckIcon
//                                 className="h-5 w-5"
//                                 aria-hidden="true"
//                               />
//                             </span>
//                           </Combobox.Option>
//                         ))}
//                     </Combobox.Options>
//                   </div>
//                 </Combobox>
//               </div>
//             </div>

//             {/* Password */}
//             <div>
//               <label
//                 htmlFor="Password"
//                 className="block text-sm font-medium text-gray-700"
//               >
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

//             <div className="flex items-center gap-4">
//               <div className="w-full">
//                 <label
//                   htmlFor="State"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   State
//                 </label>
//                 <Combobox
//                   as="div"
//                   value={selectedState}
//                   onChange={handleStateChange}
//                 >
//                   <div className="relative">
//                     <Combobox.Input
//                       id="State"
//                       name="State"
//                       className="w-full rounded-md border border-gray-400 bg-white py-2 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                       onChange={(event) => setQuery(event.target.value)} // Handle the search query
//                       displayValue={(state) => state?.StateName || ""} // Show the selected state name
//                     />
//                     <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
//                       <ChevronUpDownIcon
//                         className="h-5 w-5 text-gray-400"
//                         aria-hidden="true"
//                       />
//                     </Combobox.Button>

//                     <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
//                       {states
//                         .filter((state) =>
//                           state.StateName.toLowerCase().includes(
//                             query.toLowerCase()
//                           )
//                         ) // Filter based on query
//                         .map((state) => (
//                           <Combobox.Option
//                             key={state.StateID}
//                             value={state}
//                             className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-indigo-600 hover:text-white"
//                           >
//                             <span className="block truncate font-normal group-data-[selected]:font-semibold">
//                               {state.StateName}
//                             </span>
//                             <span className="absolute inset-y-0 right-0 hidden items-center pr-4 text-indigo-600 group-data-[selected]:flex group-data-[focus]:text-white">
//                               <CheckIcon
//                                 className="h-5 w-5"
//                                 aria-hidden="true"
//                               />
//                             </span>
//                           </Combobox.Option>
//                         ))}
//                     </Combobox.Options>
//                   </div>
//                 </Combobox>
//               </div>
//             </div>

//             {/* Phone Number */}
//             <div>
//               <label
//                 htmlFor="PhoneNumber"
//                 className="block text-sm font-medium text-gray-700"
//               >
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

//             <div className="flex items-center gap-4">
//               <div className="w-full">
//                 <label
//                   htmlFor="City"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   City
//                 </label>
//                 <Combobox
//                   as="div"
//                   value={selectedCity}
//                   onChange={handleCityChange}
//                 >
//                   <div className="relative">
//                     <Combobox.Input
//                       id="City"
//                       name="City"
//                       className="w-full rounded-md border border-gray-400 bg-white py-2 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                       onChange={(event) => setQuery(event.target.value)} // Handle the search query
//                       displayValue={(city) => city?.CityName || ""} // Show the selected city name
//                     />
//                     <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
//                       <ChevronUpDownIcon
//                         className="h-5 w-5 text-gray-400"
//                         aria-hidden="true"
//                       />
//                     </Combobox.Button>

//                     <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
//                       {cities
//                         .filter((city) =>
//                           city.CityName.toLowerCase().includes(
//                             query.toLowerCase()
//                           )
//                         ) // Filter based on query
//                         .map((city) => (
//                           <Combobox.Option
//                             key={city.CityID}
//                             value={city}
//                             className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-indigo-600 hover:text-white"
//                           >
//                             <span className="block truncate font-normal group-data-[selected]:font-semibold">
//                               {city.CityName}
//                             </span>
//                             <span className="absolute inset-y-0 right-0 hidden items-center pr-4 text-indigo-600 group-data-[selected]:flex group-data-[focus]:text-white">
//                               <CheckIcon
//                                 className="h-5 w-5"
//                                 aria-hidden="true"
//                               />
//                             </span>
//                           </Combobox.Option>
//                         ))}
//                     </Combobox.Options>
//                   </div>
//                 </Combobox>
//               </div>
//             </div>

//             {/* Gender */}
//             <div>
//               <label
//                 htmlFor="Gender"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Gender
//               </label>
//               <Combobox
//                 value={selectedGender}
//                 onChange={handleGenderChange}
//                 as="div"
//               >
//                 <div className="relative mt-1">
//                   <Combobox.Input
//                     className="block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                     displayValue={(gender) => gender?.name || ""}
//                   />
//                   <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
//                     <ChevronUpDownIcon
//                       className="h-5 w-5 text-gray-400"
//                       aria-hidden="true"
//                     />
//                   </Combobox.Button>
//                   <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
//                     {genderOptions.map((gender) => (
//                       <Combobox.Option
//                         key={gender.id}
//                         value={gender}
//                         className={({ active }) =>
//                           `relative cursor-default select-none py-2 pl-3 pr-9 ${
//                             active
//                               ? "bg-indigo-600 text-white"
//                               : "text-gray-900"
//                           }`
//                         }
//                       >
//                         {({ selected, active }) => (
//                           <>
//                             <span
//                               className={`block truncate ${
//                                 selected ? "font-semibold" : "font-normal"
//                               }`}
//                             >
//                               {gender.name}
//                             </span>
//                             {selected ? (
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
//                             ) : null}
//                           </>
//                         )}
//                       </Combobox.Option>
//                     ))}
//                   </Combobox.Options>
//                 </div>
//               </Combobox>
//             </div>

//             <div>
//               <label
//                 htmlFor="ZipCode"
//                 className="block text-sm font-medium text-gray-700"
//               >
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

//             {/* Profile Image */}
//             <div>
//               <label
//                 htmlFor="ProfileImage"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Profile Image
//               </label>
//               <input
//                 type="file"
//                 id="ProfileImage"
//                 name="ProfileImage"
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//               />
//             </div>
//             {/* Comments */}
//             <div className="sm:col-span-1">
//               <label
//                 htmlFor="Comments"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Comments
//               </label>
//               <textarea
//                 id="Comments"
//                 name="Comments"
//                 value={formData.Comments || ""}
//                 onChange={handleFormChange}
//                 rows={1}
//                 className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//               ></textarea>
//             </div>
//           </div>

//           <div className="mt-6 flex justify-end gap-4">
// <button
//         type="submit"
//         className="button-base save-btn"
//         onClick={handleFormSubmit}
//       >
//        {isEditMode ? "Update User" : "Create User"}
//       </button>
//       <button
//         type="button"
//         onClick={handleCancel}
//         className="button-base cancel-btn"
//       >
//         Cancel
//       </button>
//       </div>
//         </form>

//    {isLoading && (
//       <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-gray-700">
//         <LoadingAnimation />
//       </div>
//     )}

//       </div>
//     </div>
//   );
// }
// export default Userform;

// import React, { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import { useNavigate, useLocation } from "react-router-dom";
// import { UserContext } from "../../Context/userContext";
// import { Combobox } from "@headlessui/react";
// import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
// import {CREATEORUPDATE_USERS_API,COUNTRIES_API,STATES_API,CITIES_API,GETALLSTORES_API} from "../../Constants/apiRoutes";
// import LoadingAnimation from '../../components/Loading/LoadingAnimation';

// const genderOptions = [
//   { id: "M", name: "Male" },
//   { id: "F", name: "Female" },
// ];
// const roleOptions = [
//   { id: "1", name: "Admin" },
//   { id: "2", name: "Store User" },
//   { id: "3", name: " Finance" },
//   { id: "4", name: "Production" },
//   { id: "5", name: "Techinical" },
// ];

// function Userform() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { userDetails } = useContext(UserContext);

//   const isEditMode = Boolean(
//     location.state?.userDetails?.user || userDetails?.user
//   );

//   const [userFormData, setUserFormData] = useState(
//     location.state?.userDetails || {
//       TenantID: 1,
//       FirstName: "",
//       LastName: "",
//       Email: "",
//       Password: "",
//       PhoneNumber: "",
//       Gender: "",
//       RoleID: "",
//       AddressLine1: "",
//       AddressLine2: "",
//       CityID: "",
//       StateID: "",
//       CountryID: "",
//       ZipCode: "",
//       ProfileImage: null,
//       Comments: "",
//       StoreID:"",
//     }
//   );

//   const [countries, setCountries] = useState([]);
//   const [countryMap, setCountryMap] = useState({});
//   const [StoreMap, setStoreMap] = useState({});
//   const [states, setStates] = useState([]);
//   const [stateMap, setStateMap] = useState({});
//   const [cities, setCities] = useState([]);
//   const [cityMap, setCityMap] = useState({});

//   const [selectedCountry, setSelectedCountry] = useState(null);
//   const [selectedState, setSelectedState] = useState(null);
//   const [selectedCity, setSelectedCity] = useState(null);
//   const [query, setQuery] = useState("");
//   const [storeNames, setStoreNames] = useState([ ]);
//   const [storeOptions, setStoreOptions] = useState([]);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (isEditMode) {
//       const user = location.state?.userDetails?.user || userDetails?.user;

//       // Set the form data with the user information
//      setUserFormData({
//         TenantID: 1,
//         FirstName: user.FirstName || "",
//         LastName: user.LastName || "",
//         Email: user.Email || "",
//         PhoneNumber: user.PhoneNumber || "",
//         Gender: user.Gender || "",
//         RoleID: user.RoleID || "",
//         AddressLine1: user.Address?.AddressLine1 || "",
//         AddressLine2: user.Address?.AddressLine2 || "",
//         CityID: user.Address?.CityID || "",
//         StateID: user.Address?.StateID || "",
//         CountryID: user.Address?.CountryID || "",
//         ZipCode: user.Address?.ZipCode || "",
//         StoreID: user.StoreID || "",
//         Comments: user.Comments || "",
//       });

// // const selectedStore = storeNames.find(store => store.StoreID === user.StoreID);

// // if (selectedStore) {
// //   setSelectedStore(selectedStore);
// //   console.log("Selected Store:", selectedStore.StoreName);
// // } else {
// //   console.log("No store found for StoreID:", user.StoreID);
// // }

//       // Set Role
//       const userRole = roleOptions.find(role => role.id === String(user.RoleID));
//       setSelectedRole(userRole);
// // Set the selected store based on the StoreID
// const selectedStore = storeOptions.find(
//   (store) => store.StoreID ===user?.StoreID
// );
// setSelectedStore(selectedStore || null);

//       // Set Gender
//       const selectedGender = genderOptions.find(g => g.id === user.Gender);
//       setSelectedGender(selectedGender);

//       // Set Country
//       const selectedCountry = countries.find(country => country.CountryID === user.Address.CountryID);
//       if (selectedCountry) {
//         setSelectedCountry(selectedCountry);
//         fetchStatesByCountry(selectedCountry.CountryID);  // Fetch states based on selected country
//       }

//       // Fetch states and then set state and city
//       if (user.Address?.StateID) {
//         fetchStatesByCountry(user.Address.CountryID).then(() => {
//           const selectedState = states.find(state => state.StateID === user.Address.StateID);
//           setSelectedState(selectedState);
//           console.log(selectedState);
//           fetchCitiesByState(user.Address.StateID);  // Fetch cities based on selected state
//         });
//       }

//       // Fetch cities and set the selected city
//       if (user.Address?.CityID) {
//         fetchCitiesByState(user.Address.StateID).then(() => {
//           const selectedCity = cities.find(city => city.CityID === user.Address.CityID);
//           setSelectedCity(selectedCity);
//         });
//       }
//     }
//   }, [
//     isEditMode,
//     location.state?.userDetails?.user,
//     userDetails?.user,
//     genderOptions,
//     roleOptions,
//     countries,
//     storeNames,
//     storeOptions,
//   ]);

//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setUserFormData({
//       ...userFormData,
//       [name]: value,
//     });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setUserFormData({
//         ...userFormData,
//         ProfileImage: file,
//       });
//     }
//   };

//   const [selectedGender, setSelectedGender] = useState(userFormData.Gender || "");
//   const [selectedStore, setSelectedStore] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleGenderChange = (gender) => {
//     setSelectedGender(gender);
//     setUserFormData({
//       ...userFormData,
//       Gender: gender.id,
//     });
//   };

//   const [selectedRole, setSelectedRole] = useState(userFormData.RoleID || "");

//   const handleRoleChange = (role) => {
//     setSelectedRole(role);
//     setUserFormData((prevFormData) => ({
//       ...prevFormData,
//       RoleID: role.id,
//     }));
//   };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();
//     setIsLoading(true); // Show loading animation

//     try {
//       const formDataToSend = new FormData();

//       // Append all UserFormData fields to the FormData object, including all user details
//       Object.keys(userFormData).forEach((key) => {
//         formDataToSend.append(key, userFormData[key]);
//       });

//       // Log each key-value pair for debugging
//       for (let pair of formDataToSend.entries()) {
//         console.log(`${pair[0]}: ${pair[1]}`);
//       }

//       // API URL to create or update the user
//       const apiUrl = CREATEORUPDATE_USERS_API;

//       // Check if we are in 'edit mode' (UserID exists) or 'create mode'
//       const isEditMode = Boolean(userFormData.UserID); // true if updating, false if creating

//       // Set the method: 'PUT' for updating, 'POST' for creating
//       const method = isEditMode ? "put" : "post";

//       // Perform the API request with all form data fields
//       const response = await axios({
//         method, // PUT or POST
//         url: apiUrl, // Same API URL for both create and update
//         data: formDataToSend,
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       // Log the successful response
//       console.log("Submission successful:", response.data);

//       // Optionally handle any response data (e.g., filename, message)
//       const { filename } = response.data;
//       console.log(`${isEditMode ? "Updated" : "Created"} successfully: ${filename || "No filename"}`);

//       // Navigate back to the user list or another page after successful submission
//       navigate("/user");

//     } catch (error) {
//       // Error handling
//       if (error.response) {
//         // The server responded with an error status code
//         console.error("Submission failed with response error:", error.response.data);
//       } else if (error.request) {
//         // The request was made but no response was received
//         console.error("Submission failed with no response received:", error.request);
//       } else {
//         // Something else went wrong in setting up the request
//         console.error("Submission failed with error:", error.message);
//       }
//     } finally {
//       setIsLoading(false); // Hide loading animation
//     }
//   };

//   const handleCancel = () => {
//     navigate("/user");
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

//   // const handleStoreChange = (selectedStore) => {
//   //   if (!selectedStore) return;

//   //   const StoreID = selectedStore.id; // Use the id directly
//   //   setSelectedStore(selectedStore);
//   //   setUserFormData({
//   //     ...UserFormData,
//   //     StoreID: StoreID,
//   //     StoreName: selectedStore.StoreName,
//   //   });
//   // };

//   const handleCountryChange = (selectedCountry) => {
//     if (!selectedCountry) return;

//     const countryID =
//       countryMap[selectedCountry.CountryName] || selectedCountry.CountryID;

//     setSelectedCountry(selectedCountry);
//     setUserFormData({
//       ...userFormData,
//       CountryID: countryID,
//       CountryName: selectedCountry.CountryName,
//     });
//     fetchStatesByCountry(countryID);
//   };

//   const handleStateChange = (state) => {
//     if (!state) return;

//     const stateID = stateMap[state.StateName] || state.StateID;

//     setSelectedState(state);
//     setUserFormData({
//       ...userFormData,
//       StateID: stateID,
//       StateName: state.StateName,
//     });

//     fetchCitiesByState(stateID);
//   };

//   const handleCityChange = (city) => {
//     if (!city) return;

//     const cityID = cityMap[city.CityName] || city.CityID;

//     setSelectedCity(city);
//     setUserFormData({
//       ...userFormData,
//       CityID: cityID,
//       CityName: city.CityName,
//     });
//   };

//   useEffect(() => {
//     const fetchStores = async () => {
//       try {
//         const response = await axios.get(GETALLSTORES_API);
//         console.log("API Response:", response.data);

//         // Extract the Stores array from the API response
//         const storesData = response.data.Stores || [];

//         // Set the store options in state
//         setStoreOptions(Array.isArray(storesData) ? storesData : []);
//       } catch (error) {
//         console.error("Error fetching stores:", error);
//       }
//     };

//     fetchStores();
//   }, []);
//   const handleStoreChange = (store) => {
//     if (!store || !store.StoreID) {
//       console.error("Invalid store selected:", store);
//       return;
//     }

//     setSelectedStore(store);
//     console.log("Selected Store ID:", store.StoreID);

//     // Update FormData with selected store ID and name
//     setUserFormData({
//       ...setUserFormData,
//       StoreID: store.StoreID, // Store ID to send to the backend
//     });
//   };

//   return (
//     <div className="px-4 sm:px-6 lg:px-8 pt-4 sm:ml-10 lg:ml-72 w-auto">
//       <div className="mt-6  p-6">
//         <form onSubmit={handleFormSubmit}>
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-xl font-semibold mb-4 px-24">Users</h2>
//           </div>
//           <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8 px-16 md:px-24">

//           <div>
//               <label
//                 htmlFor="StoreName"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Store Name
//               </label>
//                       <Combobox
//                         value={selectedStore}
//                         onChange={handleStoreChange}
//                         className="w-full"
//                       >
//                         <div className="relative mt-1">
//                           <Combobox.Input
//                             id="storeName"
//                             className={`p-1 w-full border rounded-md ${
//                               error ? "border-red-500" : "border-gray-400"
//                             }`}
//                             displayValue={(store) => store?.StoreName || ""}
//                             placeholder="Select Store"
//                           />
//                           <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
//                             <ChevronUpDownIcon
//                               className="h-5 w-5 text-gray-400"
//                               aria-hidden="true"
//                             />
//                           </Combobox.Button>
//                           <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
//                             {storeOptions.map((store) => (
//                               <Combobox.Option
//                                 key={store.StoreID} // Use StoreID as the key
//                                 className={({ active }) =>
//                                   `relative cursor-default select-none py-2 pl-3 pr-9 ${
//                                     active
//                                       ? "bg-indigo-600 text-white"
//                                       : "text-gray-900"
//                                   }`
//                                 }
//                                 value={store}
//                               >
//                                 {({ selected, active }) => (
//                                   <>
//                                     <span
//                                       className={`block truncate ${
//                                         selected
//                                           ? "font-semibold"
//                                           : "font-normal"
//                                       }`}
//                                     >
//                                       {store.StoreName}{" "}

//                                     </span>
//                                     {selected && (
//                                       <span
//                                         className={`absolute inset-y-0 right-0 flex items-center pr-4 ${
//                                           active
//                                             ? "text-white"
//                                             : "text-indigo-600"
//                                         }`}
//                                       >
//                                         <CheckIcon
//                                           className="h-5 w-5"
//                                           aria-hidden="true"
//                                         />
//                                       </span>
//                                     )}
//                                   </>
//                                 )}
//                               </Combobox.Option>
//                             ))}
//                           </Combobox.Options>
//                         </div>
//                       </Combobox>
//                     </div>

//             <div>
//               <label
//                 htmlFor="RoleID"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Role
//               </label>
//               <Combobox
//                 value={selectedRole}
//                 onChange={handleRoleChange}
//                 as="div"
//               >
//                 <div className="relative mt-1">
//                   <Combobox.Input
//                     className="block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                     displayValue={(role) => role?.name || ""}
//                   />
//                   <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
//                     <ChevronUpDownIcon
//                       className="h-5 w-5 text-gray-400"
//                       aria-hidden="true"
//                     />
//                   </Combobox.Button>
//                   <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
//                     {roleOptions.map((role) => (
//                       <Combobox.Option
//                         key={role.id}
//                         value={role}
//                         className={({ active }) =>
//                           `relative cursor-default select-none py-2 pl-3 pr-9 ${
//                             active
//                               ? "bg-indigo-600 text-white"
//                               : "text-gray-900"
//                           }`
//                         }
//                       >
//                         {({ selected, active }) => (
//                           <>
//                             <span
//                               className={`block truncate ${
//                                 selected ? "font-semibold" : "font-normal"
//                               }`}
//                             >
//                               {role.name}
//                             </span>
//                             {selected ? (
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
//                             ) : null}
//                           </>
//                         )}
//                       </Combobox.Option>
//                     ))}
//                   </Combobox.Options>
//                 </div>
//               </Combobox>
//             </div>

//             {/* First Name */}
//             <div className="flex items-center">
//               <div className="w-full">
//                 <label
//                   htmlFor="FirstName"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   First Name
//                 </label>
//                 <input
//                   type="text"
//                   id="FirstName"
//                   name="FirstName"
//                   value={userFormData.FirstName || ""}
//                   onChange={handleFormChange}
//                   required
//                   className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                 />
//               </div>
//             </div>
//             {/* Address Line 1 */}
//             <div className="flex items-center">
//               <div className="w-full">
//                 <label
//                   htmlFor="AddressLine1"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Address Line 1
//                 </label>
//                 <input
//                   type="text"
//                   id="AddressLine1"
//                   name="AddressLine1"
//                   value={userFormData.AddressLine1 || ""}
//                   onChange={handleFormChange}
//                   required
//                   className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                 />
//               </div>
//             </div>

//             {/* Last Name */}
//             <div>
//               <label
//                 htmlFor="LastName"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Last Name
//               </label>
//               <input
//                 type="text"
//                 id="LastName"
//                 name="LastName"
//                 value={userFormData.LastName || ""}
//                 onChange={handleFormChange}
//                 required
//                 className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//               />
//             </div>

//             {/* Address Line 2 */}
//             <div>
//               <label
//                 htmlFor="AddressLine2"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Address Line 2
//               </label>
//               <input
//                 type="text"
//                 id="AddressLine2"
//                 name="AddressLine2"
//                 value={userFormData.AddressLine2 || ""}
//                 onChange={handleFormChange}
//                 className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//               />
//             </div>

//             {/* Email */}
//             <div>
//               <label
//                 htmlFor="Email"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Email
//               </label>
//               <input
//                 type="email"
//                 id="Email"
//                 name="Email"
//                 value={userFormData.Email || ""}
//                 onChange={handleFormChange}
//                 required
//                 className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//               />
//             </div>

//             <div className="flex items-center gap-4">
//               <div className="w-full">
//                 <label
//                   htmlFor="Country"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Country
//                 </label>
//                 <Combobox
//                   as="div"
//                   value={selectedCountry}
//                   onChange={handleCountryChange}
//                 >
//                   <div className="relative">
//                     <Combobox.Input
//                       id="Country"
//                       name="Country"
//                       className="w-full rounded-md border border-gray-400 bg-white py-2 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                       onChange={(event) => setQuery(event.target.value)} // Set the query for filtering
//                       displayValue={(country) => country?.CountryName || ""} // Display selected country name
//                     />
//                     <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
//                       <ChevronUpDownIcon
//                         className="h-5 w-5 text-gray-400"
//                         aria-hidden="true"
//                       />
//                     </Combobox.Button>

//                     <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
//                       {countries
//                         .filter((country) =>
//                           country.CountryName.toLowerCase().includes(
//                             query.toLowerCase()
//                           )
//                         )
//                         .map((country) => (
//                           <Combobox.Option
//                             key={country.CountryID}
//                             value={country} // Pass the full country object to onChange
//                             className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-indigo-600 hover:text-white"
//                           >
//                             <span className="block truncate font-normal group-data-[selected]:font-semibold">
//                               {country.CountryName}
//                             </span>
//                             <span className="absolute inset-y-0 right-0 hidden items-center pr-4 text-indigo-600 group-data-[selected]:flex group-data-[focus]:text-white">
//                               <CheckIcon
//                                 className="h-5 w-5"
//                                 aria-hidden="true"
//                               />
//                             </span>
//                           </Combobox.Option>
//                         ))}
//                     </Combobox.Options>
//                   </div>
//                 </Combobox>
//               </div>
//             </div>

//             {/* Password */}
//             <div>
//               <label
//                 htmlFor="Password"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Password
//               </label>
//               <input
//                 id="Password"
//                 name="Password"
//                 type="password"
//                 value={userFormData.Password || ""}
//                 onChange={handleFormChange}
//                 className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//               />
//             </div>

//             <div className="flex items-center gap-4">
//               <div className="w-full">
//                 <label
//                   htmlFor="State"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   State
//                 </label>
//                 <Combobox
//                   as="div"
//                   value={selectedState}
//                   onChange={handleStateChange}
//                 >
//                   <div className="relative">
//                     <Combobox.Input
//                       id="State"
//                       name="State"
//                       className="w-full rounded-md border border-gray-400 bg-white py-2 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                       onChange={(event) => setQuery(event.target.value)} // Handle the search query
//                       displayValue={(state) => state?.StateName || ""} // Show the selected state name
//                     />
//                     <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
//                       <ChevronUpDownIcon
//                         className="h-5 w-5 text-gray-400"
//                         aria-hidden="true"
//                       />
//                     </Combobox.Button>

//                     <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
//                       {states
//                         .filter((state) =>
//                           state.StateName.toLowerCase().includes(
//                             query.toLowerCase()
//                           )
//                         ) // Filter based on query
//                         .map((state) => (
//                           <Combobox.Option
//                             key={state.StateID}
//                             value={state}
//                             className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-indigo-600 hover:text-white"
//                           >
//                             <span className="block truncate font-normal group-data-[selected]:font-semibold">
//                               {state.StateName}
//                             </span>
//                             <span className="absolute inset-y-0 right-0 hidden items-center pr-4 text-indigo-600 group-data-[selected]:flex group-data-[focus]:text-white">
//                               <CheckIcon
//                                 className="h-5 w-5"
//                                 aria-hidden="true"
//                               />
//                             </span>
//                           </Combobox.Option>
//                         ))}
//                     </Combobox.Options>
//                   </div>
//                 </Combobox>
//               </div>
//             </div>

//             {/* Phone Number */}
//             <div>
//               <label
//                 htmlFor="PhoneNumber"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Phone Number
//               </label>
//               <input
//                 type="text"
//                 id="PhoneNumber"
//                 name="PhoneNumber"
//                 value={userFormData.PhoneNumber || ""}
//                 onChange={handleFormChange}
//                 required
//                 className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//               />
//             </div>

//             <div className="flex items-center gap-4">
//               <div className="w-full">
//                 <label
//                   htmlFor="City"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   City
//                 </label>
//                 <Combobox
//                   as="div"
//                   value={selectedCity}
//                   onChange={handleCityChange}
//                 >
//                   <div className="relative">
//                     <Combobox.Input
//                       id="City"
//                       name="City"
//                       className="w-full rounded-md border border-gray-400 bg-white py-2 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                       onChange={(event) => setQuery(event.target.value)} // Handle the search query
//                       displayValue={(city) => city?.CityName || ""} // Show the selected city name
//                     />
//                     <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
//                       <ChevronUpDownIcon
//                         className="h-5 w-5 text-gray-400"
//                         aria-hidden="true"
//                       />
//                     </Combobox.Button>

//                     <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
//                       {cities
//                         .filter((city) =>
//                           city.CityName.toLowerCase().includes(
//                             query.toLowerCase()
//                           )
//                         ) // Filter based on query
//                         .map((city) => (
//                           <Combobox.Option
//                             key={city.CityID}
//                             value={city}
//                             className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-indigo-600 hover:text-white"
//                           >
//                             <span className="block truncate font-normal group-data-[selected]:font-semibold">
//                               {city.CityName}
//                             </span>
//                             <span className="absolute inset-y-0 right-0 hidden items-center pr-4 text-indigo-600 group-data-[selected]:flex group-data-[focus]:text-white">
//                               <CheckIcon
//                                 className="h-5 w-5"
//                                 aria-hidden="true"
//                               />
//                             </span>
//                           </Combobox.Option>
//                         ))}
//                     </Combobox.Options>
//                   </div>
//                 </Combobox>
//               </div>
//             </div>

//             {/* Gender */}
//             <div>
//               <label
//                 htmlFor="Gender"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Gender
//               </label>
//               <Combobox
//                 value={selectedGender}
//                 onChange={handleGenderChange}
//                 as="div"
//               >
//                 <div className="relative mt-1">
//                   <Combobox.Input
//                     className="block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                     displayValue={(gender) => gender?.name || ""}
//                   />
//                   <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
//                     <ChevronUpDownIcon
//                       className="h-5 w-5 text-gray-400"
//                       aria-hidden="true"
//                     />
//                   </Combobox.Button>
//                   <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
//                     {genderOptions.map((gender) => (
//                       <Combobox.Option
//                         key={gender.id}
//                         value={gender}
//                         className={({ active }) =>
//                           `relative cursor-default select-none py-2 pl-3 pr-9 ${
//                             active
//                               ? "bg-indigo-600 text-white"
//                               : "text-gray-900"
//                           }`
//                         }
//                       >
//                         {({ selected, active }) => (
//                           <>
//                             <span
//                               className={`block truncate ${
//                                 selected ? "font-semibold" : "font-normal"
//                               }`}
//                             >
//                               {gender.name}
//                             </span>
//                             {selected ? (
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
//                             ) : null}
//                           </>
//                         )}
//                       </Combobox.Option>
//                     ))}
//                   </Combobox.Options>
//                 </div>
//               </Combobox>
//             </div>

//             <div>
//               <label
//                 htmlFor="ZipCode"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Zip Code
//               </label>
//               <input
//                 type="text"
//                 id="ZipCode"
//                 name="ZipCode"
//                 value={userFormData.ZipCode || ""}
//                 onChange={handleFormChange}
//                 required
//                 className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//               />
//             </div>

//             {/* Profile Image */}
//             <div>
//               <label
//                 htmlFor="ProfileImage"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Profile Image
//               </label>
//               <input
//                 type="file"
//                 id="ProfileImage"
//                 name="ProfileImage"
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//               />
//             </div>
//             {/* Comments */}
//             <div className="sm:col-span-1">
//               <label
//                 htmlFor="Comments"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Comments
//               </label>
//               <textarea
//                 id="Comments"
//                 name="Comments"
//                 value={userFormData.Comments || ""}
//                 onChange={handleFormChange}
//                 rows={1}
//                 className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//               ></textarea>
//             </div>
//           </div>

//           <div className="mt-6 flex justify-end gap-4">
// <button
//         type="submit"
//         className="button-base save-btn"
//         onClick={handleFormSubmit}
//       >
//        {isEditMode ? "Update User" : "Create User"}
//       </button>
//       <button
//         type="button"
//         onClick={handleCancel}
//         className="button-base cancel-btn"
//       >
//         Cancel
//       </button>
//       </div>
//         </form>

//    {isLoading && (
//       <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-gray-700">
//         <LoadingAnimation />
//       </div>
//     )}

//       </div>
//     </div>
//   );
// }
// export default Userform;

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../../Context/userContext";
import { Combobox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import {
  CREATEORUPDATE_USERS_API,
  COUNTRIES_API,
  STATES_API,
  CITIES_API,
  GETALLSTORES_API,
} from "../../Constants/apiRoutes";
import LoadingAnimation from "../../components/Loading/LoadingAnimation";

const genderOptions = [
  { id: "M", name: "Male" },
  { id: "F", name: "Female" },
];
const roleOptions = [
  { id: "1", name: "Admin" },
  { id: "2", name: "Store User" },
  { id: "3", name: " Finance" },
  { id: "4", name: "Production" },
  { id: "5", name: "Techinical" },
];

function Userform() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userDetails } = useContext(UserContext);

  const isEditMode = Boolean(
    location.state?.userDetails?.user || userDetails?.user
  );

  const [formData, setFormData] = useState(
    location.state?.userDetails || {
      TenantID: 1,
      FirstName: "",
      LastName: "",
      Email: "",
      Password: "",
      PhoneNumber: "",
      Gender: "",
      RoleID: "",
      AddressLine1: "",
      AddressLine2: "",
      CityID: "",
      StateID: "",
      CountryID: "",
      ZipCode: "",
      ProfileImage: null,
      Comments: "",
      StoreID: "",
    }
  );

  const [countries, setCountries] = useState([]);
  const [countryMap, setCountryMap] = useState({});
  const [StoreMap, setStoreMap] = useState({});
  const [states, setStates] = useState([]);
  const [stateMap, setStateMap] = useState({});
  const [cities, setCities] = useState([]);
  const [cityMap, setCityMap] = useState({});

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [query, setQuery] = useState("");
  const [storeNames, setStoreNames] = useState([
    { StoreID: 1, StoreName: "Interior1" },
    { StoreID: 2, StoreName: "Interior4" },
    { StoreID: 3, StoreName: "Interior3" },
    { StoreID: 4, StoreName: "Interior4" },
    { StoreID: 5, StoreName: "Interior5" },
  ]);

  useEffect(() => {
    if (isEditMode) {
      const user = location.state?.userDetails?.user || userDetails?.user;

      // Set the form data with the user information
      setFormData({
        FirstName: user.FirstName || "",
        LastName: user.LastName || "",
        Email: user.Email || "",
        PhoneNumber: user.PhoneNumber || "",
        Gender: user.Gender || "",
        RoleID: user.RoleID || "",
        AddressLine1: user.Address?.AddressLine1 || "",
        AddressLine2: user.Address?.AddressLine2 || "",
        CityID: user.Address?.CityID || "",
        StateID: user.Address?.StateID || "",
        CountryID: user.Address?.CountryID || "",
        ZipCode: user.Address?.ZipCode || "",
        StoreID: user.StoreID || "",
        Comments: user.Comments || "",
      });

      const selectedStore = storeNames.find(
        (store) => store.StoreID === user.StoreID
      );

      if (selectedStore) {
        setSelectedStore(selectedStore); // This sets the selected store
        console.log("Selected Store:", selectedStore.StoreName); // You can log the selected store name
      } else {
        console.log("No store found for StoreID:", user.StoreID);
      }

      // Set Role
      const userRole = roleOptions.find(
        (role) => role.id === String(user.RoleID)
      );
      setSelectedRole(userRole);

      // Set Gender
      const selectedGender = genderOptions.find((g) => g.id === user.Gender);
      setSelectedGender(selectedGender);

      // Set Country
      const selectedCountry = countries.find(
        (country) => country.CountryID === user.Address.CountryID
      );
      if (selectedCountry) {
        setSelectedCountry(selectedCountry);
        fetchStatesByCountry(selectedCountry.CountryID); // Fetch states based on selected country
      }

      // Fetch states and then set state and city
      if (user.Address?.StateID) {
        fetchStatesByCountry(user.Address.CountryID).then(() => {
          const selectedState = states.find(
            (state) => state.StateID === user.Address.StateID
          );
          setSelectedState(selectedState);
          fetchCitiesByState(user.Address.StateID); // Fetch cities based on selected state
        });
      }

      // Fetch cities and set the selected city
      if (user.Address?.CityID) {
        fetchCitiesByState(user.Address.StateID).then(() => {
          const selectedCity = cities.find(
            (city) => city.CityID === user.Address.CityID
          );
          setSelectedCity(selectedCity);
        });
      }
    }
  }, [
    isEditMode,
    location.state?.userDetails?.user,
    userDetails?.user,
    genderOptions,
    roleOptions,
    countries,
    storeNames,
  ]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        ProfileImage: file,
      });
    }
  };

  const [selectedGender, setSelectedGender] = useState(formData.Gender || "");
  const [selectedStore, setSelectedStore] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // const handleStoreChange = (store) => {
  //   setSelectedStore(store);
  // };

  const handleGenderChange = (gender) => {
    setSelectedGender(gender);
    setFormData({
      ...formData,
      Gender: gender.id,
    });
  };

  const [selectedRole, setSelectedRole] = useState(formData.RoleID || "");

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setFormData((prevFormData) => ({
      ...prevFormData,
      RoleID: role.id,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Show loading animation
    try {
      const formDataToSend = new FormData();

      // Append all formData fields to the new FormData object
      Object.keys(formData).forEach((key) => {
        if (key === "ProfileImage" && formData[key]) {
          formDataToSend.append(key, formData[key]);
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Log each key-value pair
      for (let pair of formDataToSend.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

      const apiUrl =
        // "https://imlystudios-backend-mqg4.onrender.com/api/users/createOrUpdateUser";
        CREATEORUPDATE_USERS_API;
      const isEditMode = Boolean(formData.UserID); // Check if UserID exists to determine if it's an update

      const method = isEditMode ? "put" : "post"; // Choose method based on whether it's an edit or create

      const response = await axios({
        method,
        url: apiUrl,
        data: formDataToSend,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Submission successful:", response.data);

      // Handle response to get the filename (if applicable)
      const { filename } = response.data;

      console.log(
        `${isEditMode ? "Updated" : "Created"} successfully: ${filename}`
      );

      navigate("/user");
    } catch (error) {
      if (error.response) {
        console.error(
          "Submission failed with response error:",
          error.response.data
        );
      } else if (error.request) {
        console.error(
          "Submission failed with no response received:",
          error.request
        );
      } else {
        console.error("Submission failed with error:", error.message);
      }
    } finally {
      setIsLoading(false); // Hide loading animation
    }
  };

  const handleCancel = () => {
    setIsLoading(true);

    // Add a small delay before navigating to show the loader
    setTimeout(() => {
      navigate("/user");
    }, 1500); // Delay by 500ms
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
  // const handleStoreChange = (selectedStore) => {
  //   if (!selectedStore) return;

  //   const StoreID =
  //     StoreMap[selectedStore.StoreName] || selectedStore.StoreID;

  //   setSelectedStore(selectedStore);
  //   setFormData({
  //     ...formData,
  //     StoreID: StoreID,
  //     StoreName: selectedStore.StoreName,
  //   });

  // };
  const handleStoreChange = (selectedStore) => {
    if (!selectedStore) return;

    const StoreID = selectedStore.id; // Use the id directly
    setSelectedStore(selectedStore);
    setFormData({
      ...formData,
      StoreID: StoreID,
      StoreName: selectedStore.StoreName,
    });
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

  // useEffect(() => {
  //   const fetchStores = async () => {
  //     try {
  //       const response = await axios.get(GETALLSTORES_API);
  //       console.log("API Response:", response.data);

  //       // Extract the Stores array from the API response
  //       const storesData = response.data.Stores || [];

  //       // Check if it's an array and set store names
  //       setStoreNames(Array.isArray(storesData) ? storesData : []);

  //     } catch (error) {
  //       console.error("Error fetching stores:", error);
  //     }
  //   };

  //   fetchStores();
  // }, []);

  // const handleStoreChange = (store) => {
  //   if (!store || !store.StoreID) {
  //     console.error("Invalid store selected:", store);
  //     return;
  //   }

  //   setSelectedStore(store);
  //   console.log("Selected Store ID:", store.StoreID);

  //   // Update formData with selected store ID and name
  //   setFormData({
  //     ...formData,
  //     StoreID: store.StoreID, // Store ID to send to the backend
  //     // StoreName: store.StoreName,
  //   });
  // };

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axios.get(GETALLSTORES_API);
        const storesData = response.data.Stores || [];
        const mappedStores = storesData.map((store) => ({
          id: store.StoreID,
          StoreName: store.StoreName,
        }));
        setStoreNames(mappedStores);
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };

    fetchStores();
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-4 sm:ml-10 lg:ml-72 w-auto">
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleFormSubmit}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold mb-4 px-24">Users</h2>
          </div>
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8 px-16 md:px-24">
            {/* <div className="w-full">
              <label
                htmlFor="storeName"
                className="block text-sm font-medium text-gray-700"
              >
                Store Name
              </label>
              <Combobox value={selectedStore} onChange={handleStoreChange}>
                <div className="relative mt-1">
                  <Combobox.Input
                    id="storeName"
                    className="block w-full rounded-md border border-gray-400 py-2 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    displayValue={(store) => store?.name || ""}
                    placeholder="Select Store"
                  />
                  <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </Combobox.Button>
                  <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {storeNames.map((store) => (
                      <Combobox.Option
                        key={store.id}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-3 pr-9 ${
                            active
                              ? "bg-indigo-600 text-white"
                              : "text-gray-900"
                          }`
                        }
                        value={store}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-semibold" : "font-normal"
                              }`}
                            >
                              {store.name}
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
                </div>
              </Combobox>
            </div> */}
            {/* <div className="w-full">
      <label htmlFor="storeName" className="block text-sm font-medium text-gray-700">
        Store Name
      </label>
      <Combobox value={selectedStore} onChange={handleStoreChange}>
        <div className="relative mt-1">
          <Combobox.Input
            id="storeName"
            className="block w-full rounded-md border border-gray-400 py-2 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            displayValue={(store) => store?.name || ""}
            placeholder="Select Store"
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </Combobox.Button>
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {storeNames.map((store) => (
              <Combobox.Option
                key={store.id}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-3 pr-9 ${active ? "bg-indigo-600 text-white" : "text-gray-900"}`
                }
                value={store}
              >
                {({ selected, active }) => (
                  <>
                    <span className={`block truncate ${selected ? "font-semibold" : "font-normal"}`}>
                      {store.name}
                    </span>
                    {selected && (
                      <span className={`absolute inset-y-0 right-0 flex items-center pr-4 ${active ? "text-white" : "text-indigo-600"}`}>
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
    </div> */}

            <div className="w-full">
              <label
                htmlFor="storeName"
                className="block text-sm font-medium text-gray-700"
              >
                Store Name
              </label>
              <Combobox value={selectedStore} onChange={handleStoreChange}>
                <div className="relative mt-1">
                  <Combobox.Input
                    id="storeName"
                    className="block w-full rounded-md border border-gray-400 py-2 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    displayValue={(store) => store?.StoreName || ""}
                    placeholder="Select Store"
                  />
                  <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </Combobox.Button>
                  <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {storeNames.map((store) => (
                      <Combobox.Option
                        key={store.StoreID} // Use StoreID as the key
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-3 pr-9 ${
                            active
                              ? "bg-indigo-600 text-white"
                              : "text-gray-900"
                          }`
                        }
                        value={store}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-semibold" : "font-normal"
                              }`}
                            >
                              {store.StoreName} {/* Display the StoreName */}
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
                </div>
              </Combobox>
            </div>

            <div>
              <label
                htmlFor="RoleID"
                className="block text-sm font-medium text-gray-700"
              >
                Role
              </label>
              <Combobox
                value={selectedRole}
                onChange={handleRoleChange}
                as="div"
              >
                <div className="relative mt-1">
                  <Combobox.Input
                    className="block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    displayValue={(role) => role?.name || ""}
                  />
                  <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </Combobox.Button>
                  <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {roleOptions.map((role) => (
                      <Combobox.Option
                        key={role.id}
                        value={role}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-3 pr-9 ${
                            active
                              ? "bg-indigo-600 text-white"
                              : "text-gray-900"
                          }`
                        }
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-semibold" : "font-normal"
                              }`}
                            >
                              {role.name}
                            </span>
                            {selected ? (
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
                            ) : null}
                          </>
                        )}
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                </div>
              </Combobox>
            </div>

            {/* First Name */}
            <div className="flex items-center">
              <div className="w-full">
                <label
                  htmlFor="FirstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="FirstName"
                  name="FirstName"
                  value={formData.FirstName || ""}
                  onChange={handleFormChange}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            {/* Address Line 1 */}
            <div className="flex items-center">
              <div className="w-full">
                <label
                  htmlFor="AddressLine1"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address Line 1
                </label>
                <input
                  type="text"
                  id="AddressLine1"
                  name="AddressLine1"
                  value={formData.AddressLine1 || ""}
                  onChange={handleFormChange}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Last Name */}
            <div>
              <label
                htmlFor="LastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                type="text"
                id="LastName"
                name="LastName"
                value={formData.LastName || ""}
                onChange={handleFormChange}
                required
                className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            {/* Address Line 2 */}
            <div>
              <label
                htmlFor="AddressLine2"
                className="block text-sm font-medium text-gray-700"
              >
                Address Line 2
              </label>
              <input
                type="text"
                id="AddressLine2"
                name="AddressLine2"
                value={formData.AddressLine2 || ""}
                onChange={handleFormChange}
                className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="Email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="Email"
                name="Email"
                value={formData.Email || ""}
                onChange={handleFormChange}
                required
                className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="flex items-center gap-4">
              <div className="w-full">
                <label
                  htmlFor="Country"
                  className="block text-sm font-medium text-gray-700"
                >
                  Country
                </label>
                <Combobox
                  as="div"
                  value={selectedCountry}
                  onChange={handleCountryChange}
                >
                  <div className="relative">
                    <Combobox.Input
                      id="Country"
                      name="Country"
                      className="w-full rounded-md border border-gray-400 bg-white py-2 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      onChange={(event) => setQuery(event.target.value)} // Set the query for filtering
                      displayValue={(country) => country?.CountryName || ""} // Display selected country name
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </Combobox.Button>

                    <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {countries
                        .filter((country) =>
                          country.CountryName.toLowerCase().includes(
                            query.toLowerCase()
                          )
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
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          </Combobox.Option>
                        ))}
                    </Combobox.Options>
                  </div>
                </Combobox>
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="Password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="Password"
                name="Password"
                type="password"
                value={formData.Password || ""}
                onChange={handleFormChange}
                className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="flex items-center gap-4">
              <div className="w-full">
                <label
                  htmlFor="State"
                  className="block text-sm font-medium text-gray-700"
                >
                  State
                </label>
                <Combobox
                  as="div"
                  value={selectedState}
                  onChange={handleStateChange}
                >
                  <div className="relative">
                    <Combobox.Input
                      id="State"
                      name="State"
                      className="w-full rounded-md border border-gray-400 bg-white py-2 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      onChange={(event) => setQuery(event.target.value)} // Handle the search query
                      displayValue={(state) => state?.StateName || ""} // Show the selected state name
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </Combobox.Button>

                    <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {states
                        .filter((state) =>
                          state.StateName.toLowerCase().includes(
                            query.toLowerCase()
                          )
                        ) // Filter based on query
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
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          </Combobox.Option>
                        ))}
                    </Combobox.Options>
                  </div>
                </Combobox>
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label
                htmlFor="PhoneNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="PhoneNumber"
                name="PhoneNumber"
                value={formData.PhoneNumber || ""}
                onChange={handleFormChange}
                required
                className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="flex items-center gap-4">
              <div className="w-full">
                <label
                  htmlFor="City"
                  className="block text-sm font-medium text-gray-700"
                >
                  City
                </label>
                <Combobox
                  as="div"
                  value={selectedCity}
                  onChange={handleCityChange}
                >
                  <div className="relative">
                    <Combobox.Input
                      id="City"
                      name="City"
                      className="w-full rounded-md border border-gray-400 bg-white py-2 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      onChange={(event) => setQuery(event.target.value)} // Handle the search query
                      displayValue={(city) => city?.CityName || ""} // Show the selected city name
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </Combobox.Button>

                    <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {cities
                        .filter((city) =>
                          city.CityName.toLowerCase().includes(
                            query.toLowerCase()
                          )
                        ) // Filter based on query
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
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          </Combobox.Option>
                        ))}
                    </Combobox.Options>
                  </div>
                </Combobox>
              </div>
            </div>

            {/* Gender */}
            <div>
              <label
                htmlFor="Gender"
                className="block text-sm font-medium text-gray-700"
              >
                Gender
              </label>
              <Combobox
                value={selectedGender}
                onChange={handleGenderChange}
                as="div"
              >
                <div className="relative mt-1">
                  <Combobox.Input
                    className="block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    displayValue={(gender) => gender?.name || ""}
                  />
                  <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </Combobox.Button>
                  <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {genderOptions.map((gender) => (
                      <Combobox.Option
                        key={gender.id}
                        value={gender}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-3 pr-9 ${
                            active
                              ? "bg-indigo-600 text-white"
                              : "text-gray-900"
                          }`
                        }
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-semibold" : "font-normal"
                              }`}
                            >
                              {gender.name}
                            </span>
                            {selected ? (
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
                            ) : null}
                          </>
                        )}
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                </div>
              </Combobox>
            </div>

            <div>
              <label
                htmlFor="ZipCode"
                className="block text-sm font-medium text-gray-700"
              >
                Zip Code
              </label>
              <input
                type="text"
                id="ZipCode"
                name="ZipCode"
                value={formData.ZipCode || ""}
                onChange={handleFormChange}
                required
                className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            {/* Profile Image */}
            <div>
              <label
                htmlFor="ProfileImage"
                className="block text-sm font-medium text-gray-700"
              >
                Profile Image
              </label>
              <input
                type="file"
                id="ProfileImage"
                name="ProfileImage"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            {/* Comments */}
            <div className="sm:col-span-1">
              <label
                htmlFor="Comments"
                className="block text-sm font-medium text-gray-700"
              >
                Comments
              </label>
              <textarea
                id="Comments"
                name="Comments"
                value={formData.Comments || ""}
                onChange={handleFormChange}
                rows={1}
                className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              ></textarea>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <button
              type="submit"
              className="button-base save-btn"
              onClick={handleFormSubmit}
            >
              {isEditMode ? "Update User" : "Create User"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="button-base cancel-btn"
            >
              Cancel
            </button>
          </div>
        </form>
        {/* {isLoading && <LoadingAnimation />} */}
        {isLoading && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50">
            <LoadingAnimation />
          </div>
        )}
      </div>
    </div>
  );
}
export default Userform;
