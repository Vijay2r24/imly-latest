// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useLocation, useNavigate } from "react-router-dom";
// import LoadingAnimation from "../../components/Loading/LoadingAnimation";

// const EditRoleForm = () => {
//   const location = useLocation();
//   const navigate = useNavigate(); // For navigation on success or close
//   const { roleId, roleName } = location.state || {};
//   const [updatedRoleName, setUpdatedRoleName] = useState(roleName);
//   const [permissionsByModule, setPermissionsByModule] = useState({});
//   const [loading, setLoading] = useState(true); // Initial loading state
//   const [error, setError] = useState(null);
//   const [successMessage, setSuccessMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false); // For form submission loading animation

//   const storeId = 1; // Constant store ID

//   // URLs with dynamic roleId and constant storeId
//   const fetchPermissionsUrl = `https://imly-b2y.onrender.com/api/permissions/getAllPermissionsByRoleId/${roleId}?storeId=${storeId}`;
//   const updateRoleUrl = `https://imly-b2y.onrender.com/api/permissions/createOrUpdateRolePermissions?storeId=${storeId}`;

//   useEffect(() => {
//     const fetchRolePermissions = async () => {
//       try {
//         const response = await axios.get(fetchPermissionsUrl);
//         const data = response.data;

//         const categorizedPermissions = {};
//         if (data && Array.isArray(data)) {
//           data.forEach((permission) => {
//             const module = permission.PermissionName.split(" ")[1];
//             if (!categorizedPermissions[module]) {
//               categorizedPermissions[module] = [];
//             }
//             categorizedPermissions[module].push({
//               ID: permission.PermissionId,
//               Name: permission.PermissionName,
//               IsChecked: permission.IsChecked,
//             });
//           });
//         }
//         setPermissionsByModule(categorizedPermissions);
//       } catch (err) {
//         setError("Failed to fetch role permissions");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRolePermissions();
//   }, [roleId, storeId]);

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

//   const handleSubmit = async () => {
//     const updatedPermissions = [];

//     // Prepare the permissions array in the expected format
//     Object.keys(permissionsByModule).forEach((moduleName) => {
//       permissionsByModule[moduleName].forEach((permission) => {
//         updatedPermissions.push({
//           permissionId: permission.ID, // Update to match expected "permissionId"
//           isChecked: permission.IsChecked, // Update to match expected "isChecked"
//         });
//       });
//     });

//     // Prepare the payload with roleId, roleName, storeId, and permissions
//     const payload = {
//       roleId, // This should be the user's ID whose role is being modified
//       roleName: updatedRoleName,
//       storeId, // Static storeId as per your requirement
//       permissions: updatedPermissions,
//     };

//     try {
//       setIsLoading(true); // Start loading animation
//       const response = await axios.post(updateRoleUrl, payload);

//       setSuccessMessage("Role updated successfully");
//       setTimeout(() => {
//         navigate("/RoleUser"); // Redirect after success
//       }, 1500);
//     } catch (error) {
//       console.error("Failed to update role permissions:", error);
//       alert("Error updating role");
//     } finally {
//       setIsLoading(false); // Stop loading animation after request completes
//     }
//   };

//   const handleClose = () => {
//     navigate("/RoleUser"); // Navigate to UserRole page on close
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div className="px-4 sm:px-6 lg:px-8 pt-4 ml-10 lg:ml-72 w-auto">
//       <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
//         <h2 className="text-xl font-semibold mb-6">Edit Role</h2>

//         {/* Role Name Section */}
//         <hr className="border-gray-300 my-4 mt-6" />
//         <div className="mb-4 flex justify-center items-center">
//           <label className="block font-semibold mr-2">Role Name</label>
//           <input
//             type="text"
//             value={updatedRoleName}
//             onChange={(e) => setUpdatedRoleName(e.target.value)}
//             className="border border-gray-300 p-2 w-1/2 rounded-md"
//           />
//         </div>
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

//         {successMessage && (
//           <div className="mt-4 text-green-600 text-center">
//             {successMessage}
//           </div>
//         )}

//         <div className="mt-10 flex justify-end space-x-4">
//           <button
//             className="bg-gray-200 px-4 py-2 rounded shadow"
//             onClick={handleClose}
//           >
//             Close
//           </button>
//           <button
//             className="bg-[#003375] text-white px-4 py-2 rounded shadow"
//             onClick={handleSubmit}
//           >
//             Update Role
//           </button>
//           {isLoading && (
//       <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-gray-700">
//         <LoadingAnimation />
//       </div>
//     )}
//         </div>
//       </div>
//     </div>
   
//   );
// };

// export default EditRoleForm;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingAnimation from "../../components/Loading/LoadingAnimation";
// import Modal from "../../components/Popup/Popup";
import Select from "react-select";
import { FETCH_PERMISSION_URL } from "../../Constants/apiRoutes";

const EditRoleForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { roleId, roleName, storeId, storeMap } = location.state || {};
  const [updatedStoreId, setUpdatedStoreId] = useState(storeId);
  const [updatedRoleName, setUpdatedRoleName] = useState(roleName);
  const [permissionsByModule, setPermissionsByModule] = useState({});
  const [loading, setLoading] = useState(true); // Indicates initial loading state
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Indicates loading during form submission
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchPermissionsUrl = `https://imly-b2y.onrender.com/api/permissions/getAllPermissionsByRoleId/${roleId}?storeId=${storeId}`;
  const updateRoleUrl = `https://imly-b2y.onrender.com/api/permissions/createOrUpdateRolePermissions?storeId=${storeId}`;

  // Fetch role permissions and categorize them by PermissionModule
  useEffect(() => {
    const fetchRolePermissions = async () => {
      setLoading(true); // Start loading animation when API call starts
      try {
        const response = await axios.get(fetchPermissionsUrl);
        const data = response.data;
        const categorizedPermissions = {};

        if (data && Array.isArray(data)) {
          data.forEach((permission) => {
            const module = permission.PermissionModule; // Use PermissionModule from the response
            if (!categorizedPermissions[module]) {
              categorizedPermissions[module] = [];
            }
            categorizedPermissions[module].push({
              ID: permission.PermissionId,
              Name: permission.PermissionName,
              IsChecked: permission.IsChecked,
            });
          });
        }
        setPermissionsByModule(categorizedPermissions);
      } catch (err) {
        setError("Failed to fetch role permissions");
      } finally {
        setLoading(false); // Stop loading animation when API call is finished
      }
    };

    fetchRolePermissions();
  }, [roleId, storeId]);

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

  const handleSubmit = async () => {
    const updatedPermissions = [];

    Object.keys(permissionsByModule).forEach((moduleName) => {
      permissionsByModule[moduleName].forEach((permission) => {
        updatedPermissions.push({
          permissionId: permission.ID,
          isChecked: permission.IsChecked,
        });
      });
    });

    const payload = {
      roleId,
      roleName: updatedRoleName,
      storeId: updatedStoreId,
      permissions: updatedPermissions,
    };

    try {
      setIsLoading(true); // Start loading animation during form submission
      const response = await axios.post(updateRoleUrl, payload);

      setSuccessMessage("Role updated successfully");
      setTimeout(() => {
        navigate("/roleuser"); // Redirect after success
      }, 1500);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Failed to update role permissions:", error);
      alert("Error updating role");
    } finally {
      setIsLoading(false); // Stop loading animation after form submission
    }
  };

  const handleClose = () => {
    setIsModalOpen(false); // Close modal
    navigate("/roleuser"); // Navigate to UserRole page on close
  };

  // Show loading animation when page is loading or form is submitting
  if (loading || isLoading) return <LoadingAnimation />;
  if (error) return <div>{error}</div>;

  const storeOptions = Array.from(storeMap, ([key, value]) => ({
    value: key,
    label: value,
  }));

  const handleStoreChange = (selectedOption) => {
    setUpdatedStoreId(selectedOption.value);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-4 ml-10 lg:ml-72 w-auto">
      <div className="mt-6 p-6 rounded-lg ">
        <h2 className="text-xl font-semibold mb-6">Edit Role</h2>

        <hr className="border-gray-300 my-4 mt-6" />

        {/* Store Name Select */}
        <div className="mb-4 flex flex-col sm:flex-row justify-center items-center">
          <label className="block font-semibold mr-2">Store Name</label>
          <Select
            value={storeOptions.find((option) => option.value === storeId)}
            onChange={handleStoreChange}
            options={storeOptions}
            className="w-full sm:w-1/2"
          />
        </div>

        {/* Role Name Input */}
        <div className="mb-4 flex flex-col sm:flex-row justify-center items-center">
          <label className="block font-semibold mr-[14px]">Role Name</label>
          <input
            type="text"
            value={updatedRoleName}
            onChange={(e) => setUpdatedRoleName(e.target.value)}
            className="border border-gray-300 p-2 w-full sm:w-1/2 rounded-md"
          />
        </div>

        <hr className="border-gray-300 my-4 mb-6" />

        {/* Permissions by Module */}
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

        <div className="mt-10 flex flex-col sm:flex-row justify-end space-x-0 sm:space-x-4">
          <button
            className="bg-gray-200 px-4 py-2 rounded shadow mb-2 sm:mb-0"
            onClick={handleClose}
          >
            Close
          </button>
          <button
            className="bg-[#003375] text-white px-4 py-2 rounded shadow"
            onClick={handleSubmit}
          >
            Update Role
          </button>
          {isLoading && <LoadingAnimation />}
        </div>

        {/* Modal for success message */}
        {/* {isModalOpen && <Modal message={successMessage} onClose={handleClose} />} */}
      </div>
    </div>
  );
};

export default EditRoleForm;
