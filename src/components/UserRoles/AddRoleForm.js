// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import LoadingAnimation from "../../components/Loading/LoadingAnimation";
// import SuccessPopup from '../SuccessPopup';
// import Select from "react-select";
// const AddRoleForm = () => {
//   const [roleName, setRoleName] = useState("");
//   const [storeId, setStoreId] = useState("0");

//   const [permissionsByModule, setPermissionsByModule] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalMessage, setModalMessage] = useState("");

//   const fetchPermissionsUrl =
//     "https://imly-b2y.onrender.com/api/permissions/getAllPermissions";
//   const createOrUpdateRoleUrl =
//     "https://imly-b2y.onrender.com/api/permissions/createOrUpdateRolePermissions";

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchPermissions = async () => {
//       try {
//         const response = await axios.get(fetchPermissionsUrl);
//         const data = response.data;

//         const categorizedPermissions = {};

//         if (data.Permissions && Array.isArray(data.Permissions)) {
//           data.Permissions.forEach((permission) => {
//             if (!categorizedPermissions[permission.Module]) {
//               categorizedPermissions[permission.Module] = [];
//             }
//             categorizedPermissions[permission.Module].push(permission);
//           });
//         }

//         setPermissionsByModule(categorizedPermissions);
//       } catch (err) {
//         setError("Failed to fetch permissions");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPermissions();
//   }, []);

//   const handleCheckboxChange = (moduleName, permissionId) => {
//     setPermissionsByModule((prevState) => {
//       const updatedPermissions = { ...prevState };
//       updatedPermissions[moduleName] = updatedPermissions[moduleName].map(
//         (permission) =>
//           permission.ID === permissionId
//             ? { ...permission, IsChecked: !permission.IsChecked }
//             : permission
//       );

//       return updatedPermissions;
//     });
//   };

//   const handleSelectAllChange = (moduleName, isChecked) => {
//     setPermissionsByModule((prevState) => {
//       const updatedPermissions = { ...prevState };
//       updatedPermissions[moduleName] = updatedPermissions[moduleName].map(
//         (permission) => ({
//           ...permission,
//           IsChecked: isChecked,
//         })
//       );
//       return updatedPermissions;
//     });
//   };

//   const handleSaveRole = async () => {
//     setIsLoading(true);
//     const permissions = [];

//     Object.keys(permissionsByModule).forEach((module) => {
//       permissionsByModule[module].forEach((permission) => {
//         permissions.push({
//           permissionId: permission.ID,
//           isChecked: permission.IsChecked,
//         });
//       });
//     });

//     const roleData = {
//       roleId: 0,
//       roleName: roleName,
//       storeId: storeId,
//       permissions: permissions,
//     };

//     try {
//       const response = await axios.post(createOrUpdateRoleUrl, roleData);
//       setModalMessage("Role saved successfully!"); // Set modal message
//     } catch (error) {
//       setModalMessage("Error saving role. Please try again."); // Set modal message
//     } finally {
//       setIsLoading(false);
//       setIsModalOpen(true); // Show the modal after save operation
//     }
//   };
//   const handleCloseModal = () => {
//     setIsModalOpen(false); // Close the modal
//     navigate("/RoleUser"); // Redirect after closing the modal
//   };

//   const handleClose = () => {
//     navigate("/RoleUser");
//   };

//   if (loading) return <div>Loading...</div>;

//   if (error) return <div>{error}</div>;

//   {
//     /* ComboBox */
//   }

//   const storeOptions = [
//     { value: "1", label: "Store 1" },
//     { value: "2", label: "Store 2" },
//     { value: "3", label: "Store 3" },
//   ];

//   const handleStoreChange = (selectedOption) => {
//     setStoreId(selectedOption.value);
//   };

//   return (
//     <div className="px-4 sm:px-6 lg:px-8 pt-4 ml-10 lg:ml-72 w-auto">
//       <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
//         <h2 className="text-xl font-semibold mb-6">Add Role</h2>
//         <hr className="border-gray-300 my-4 mb-4" />

//         {/* Form Section */}

//         <div className="mb-4 flex justify-start items-center">
//           <label className="block font-semibold mr-2">Role Name</label>
//           <input
//             type="text"
//             value={roleName}
//             onChange={(e) => setRoleName(e.target.value)}
//             className="border border-gray-300 p-2 w-1/2 rounded-md"
//           />
//         </div>
//         <div className="mb-4 flex justify-start items-center ">
//           <label className="block font-semibold mr-2">Store Name</label>
//           <Select
//             value={storeOptions.find((option) => option.value === storeId)}
//             onChange={handleStoreChange}
//             options={storeOptions}
//             className="w-1/4"
//           />
//         </div>
//         {/* <div className="mb-4 flex justify-around items-center">
//           <div className="w-[70%] flex justify-start items-center">
//             <label className="block font-semibold mr-4 ">Role Name</label>
//             <input
//               type="text"
//               value={roleName}
//               onChange={(e) => setRoleName(e.target.value)}
//               className="border border-gray-300 p-2 w-3/4 rounded-md"
//             />
//           </div>
//           <div className="w-[30%] flex justify-end items-center">
//             <label className="block font-semibold mr-4">Store ID</label>
//             {/* <Select
//               value={storeOptions.find((option) => option.value === storeId)}
//               onChange={handleStoreChange}
//               options={storeOptions}
//               className="w-3/4"
//             />
//           </div>
//         </div> */}
//         <hr className="border-gray-300 my-4 mb-6" />

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {Object.keys(permissionsByModule).map((moduleName) => {
//             const isAllSelected = permissionsByModule[moduleName].every(
//               (permission) => permission.IsChecked
//             );

//             return (
//               <div
//                 key={moduleName}
//                 className="border p-4 rounded-lg shadow bg-[#e5efff]"
//               >
//                 <div className="flex justify-between items-center">
//                   <h2 className="text-lg font-bold">{moduleName}</h2>

//                   <label className="text-sm">
//                     <input
//                       type="checkbox"
//                       checked={isAllSelected}
//                       onChange={(e) =>
//                         handleSelectAllChange(moduleName, e.target.checked)
//                       }
//                       className="mr-2 form-checkbox h-[12px] w-[12px] text-blue-600"
//                     />
//                     Select All
//                   </label>
//                 </div>
//                 <hr className="border-gray-300 my-4 mt-2 mb-4" />

//                 {permissionsByModule[moduleName].map((permission) => (
//                   <div key={permission.ID} className="flex items-center mb-2">
//                     <label>
//                       <input
//                         type="checkbox"
//                         checked={permission.IsChecked}
//                         onChange={() =>
//                           handleCheckboxChange(moduleName, permission.ID)
//                         }
//                         className="mr-2 form-checkbox h-[12px] w-[12px] text-blue-600"
//                       />
//                       {permission.Name}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             );
//           })}
//         </div>

//         <div className="mt-10 flex justify-end space-x-4">
//           <button
//             className="bg-gray-200 px-4 py-2 rounded shadow"
//             onClick={handleClose}
//           >
//             Close
//           </button>
//           <button
//             className="bg-[#003375] text-white px-4 py-2 rounded shadow"
//             onClick={handleSaveRole}
//           >
//             Save Role
//           </button>
//           {isLoading && <LoadingAnimation />}
//         </div>
//       </div>

//       {/* Modal Component */}
//       {isModalOpen && (
//         <SuccessPopup message={modalMessage} onClose={handleCloseModal} />
//       )}
//     </div>
//   );
// };

// export default AddRoleForm;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingAnimation from "../../components/Loading/LoadingAnimation";
// import Popup from "../../components/Popup/Popup";
import Select from "react-select";
import { FETCH_PERMISSION_URL } from "../../Constants/apiRoutes";
import { CREATE_OR_UPDATE_ROLE_URL } from "../../Constants/apiRoutes";

const AddRoleForm = () => {
  const [roleName, setRoleName] = useState("");
  const [storeId, setStoreId] = useState("0");
  const [permissionsByModule, setPermissionsByModule] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const location = useLocation();
  const { storeMap } = location.state || {};

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const response = await axios.get(FETCH_PERMISSION_URL);
        const data = response.data;
        const categorizedPermissions = {};

        if (data.Permissions && Array.isArray(data.Permissions)) {
          data.Permissions.forEach((permission) => {
            if (!categorizedPermissions[permission.Module]) {
              categorizedPermissions[permission.Module] = [];
            }
            categorizedPermissions[permission.Module].push(permission);
          });
        }

        setPermissionsByModule(categorizedPermissions);
      } catch (err) {
        setError("Failed to fetch permissions");
      } finally {
        setLoading(false);
      }
    };

    fetchPermissions();
  }, []);

  const handleCheckboxChange = (moduleName, permissionId) => {
    setPermissionsByModule((prevState) => {
      const updatedPermissions = { ...prevState };
      updatedPermissions[moduleName] = updatedPermissions[moduleName].map(
        (permission) =>
          permission.ID === permissionId
            ? { ...permission, IsChecked: !permission.IsChecked }
            : permission
      );
      return updatedPermissions;
    });
  };

  const handleSelectAllChange = (moduleName, isChecked) => {
    setPermissionsByModule((prevState) => {
      const updatedPermissions = { ...prevState };
      updatedPermissions[moduleName] = updatedPermissions[moduleName].map(
        (permission) => ({
          ...permission,
          IsChecked: isChecked,
        })
      );
      return updatedPermissions;
    });
  };

  const handleSaveRole = async () => {
    setIsLoading(true);
    const permissions = [];

    Object.keys(permissionsByModule).forEach((module) => {
      permissionsByModule[module].forEach((permission) => {
        permissions.push({
          permissionId: permission.ID,
          isChecked: permission.IsChecked,
        });
      });
    });

    const roleData = {
      roleId: 0,
      roleName: roleName,
      storeId: storeId,
      permissions: permissions,
    };

    try {
      const response = await axios.post(CREATE_OR_UPDATE_ROLE_URL, roleData);
      setModalMessage("Role saved successfully!");
    } catch (error) {
      setModalMessage("Error saving role. Please try again.");
    } finally {
      setIsLoading(false);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate("/roleuser");
  };

  const handleClose = () => {
    navigate("/roleuser");
  };

  if (loading || isLoading) return <LoadingAnimation />;

  if (error) return <div>{error}</div>;

  const storeOptions = Array.from(storeMap, ([key, value]) => ({
    value: key,
    label: value,
  }));

  const handleStoreChange = (selectedOption) => {
    setStoreId(selectedOption.value);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-4 ml-10 lg:ml-72 w-auto">
      <div className="mt-6  p-6 rounded-lg ">
        {/* <div className="mt-6 bg-white p-6 rounded-lg shadow-md"> */}
        <h2 className="heading">Add Role</h2>
        <hr className="border-gray-300 my-4 mb-4" />

        {/* <div className="mb-4 flex justify-around items-center">
          <div className="w-[70%] flex justify-start items-center">
            <label className="block font-semibold mr-4 ">Role Name</label>

            <input
              type="text"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              className="border border-gray-300 p-2 w-3/4 rounded-md"
            />
          </div>

          <div className="w-[30%] flex justify-end items-center">
            <label className="block font-semibold mr-4">Store ID</label>

            <Select
              value={storeOptions.find((option) => option.value === storeId)}
              onChange={handleStoreChange}
              options={storeOptions}
              className="w-3/4"
            />
          </div>
        </div> */}

        <div className="mb-4 flex flex-col sm:flex-row justify-center items-center ">
          <label className="block font-semibold mr-2">Store Name</label>
          <Select
            value={storeOptions.find((option) => option.value === storeId)}
            onChange={handleStoreChange}
            options={storeOptions}
            className="w-full sm:w-1/2"
          />
        </div>
        <div className="mb-4 flex flex-col sm:flex-row justify-center items-center">
          <label className="block font-semibold mr-[14px]">Role Name</label>
          <input
            type="text"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            className="border border-gray-300 p-2 w-full sm:w-1/2 rounded-md"
            placeholder="Enter Role Name"
          />
        </div>

        <hr className="border-gray-300 my-4 mb-6" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.keys(permissionsByModule).map((moduleName) => {
            const isAllSelected = permissionsByModule[moduleName].every(
              (permission) => permission.IsChecked
            );

            return (
              <div
                key={moduleName}
                className="border p-4 rounded-lg shadow bg-[#e5efff]"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-bold">{moduleName}</h2>
                  <label className="text-sm">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      onChange={(e) =>
                        handleSelectAllChange(moduleName, e.target.checked)
                      }
                      className="mr-2 form-checkbox h-[12px] w-[12px] text-blue-600"
                    />
                    Select All
                  </label>
                </div>
                <hr className="border-gray-300 my-4 mt-2 mb-4" />

                {permissionsByModule[moduleName].map((permission) => (
                  <div key={permission.ID} className="flex items-center mb-2">
                    <label>
                      <input
                        type="checkbox"
                        checked={permission.IsChecked}
                        onChange={() =>
                          handleCheckboxChange(moduleName, permission.ID)
                        }
                        className="mr-2 form-checkbox h-[12px] w-[12px] text-blue-600"
                      />
                      {permission.Name}
                    </label>
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            className="bg-gray-200 px-4 py-2 rounded shadow w-full sm:w-auto"
            onClick={handleClose}
          >
            Close
          </button>
          <button
            className="bg-[#003375] text-white px-4 py-2 rounded shadow w-full sm:w-auto"
            onClick={handleSaveRole}
          >
            Save Role
          </button>
          {isLoading && <LoadingAnimation />}
        </div>
      </div>

      {/* {isModalOpen && (
        // <Popup message={modalMessage} onClose={handleCloseModal} />
      )} */}
    </div>
  );
};

export default AddRoleForm;
