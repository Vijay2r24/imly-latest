import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { UserRoleContext } from "../../Context/roleContext";
import { CREATEORUPDATE_ROLES_API } from "../../Constants/apiRoutes";
import { useLoading } from "../../Context/LoadingContext";
import LoadingAnimation from "../../components/Loading/LoadingAnimation";

function UserRoleform() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userRoleDetails } = useContext(UserRoleContext);
  // const { isLoading, showLoading, hideLoading } = useLoading();
  const [isLoading, setIsLoading] = useState(false);

  const isEditMode = Boolean(
    location.state?.userRoleDetails?.role || userRoleDetails?.role
  );

  const [formData, setFormData] = useState(
    () =>
      location.state?.userRoleDetails || {
        RoleID: "",
        RoleName: "",
        Status: "",
        TenantID: 1, // TenantID is passed by default
      }
  );

  const [error, setError] = useState("");

  useEffect(() => {
    if (isEditMode) {
      const role =
        location.state?.userRoleDetails?.role || userRoleDetails?.role;
      if (role) {
        setFormData({
          RoleID: role.RoleID || "",
          RoleName: role.RoleName || "",
          Status: role.Status || "",
          TenantID: 1, // Ensure TenantID is still included
        });
      }
    }
  }, [
    isEditMode,
    location.state?.userRoleDetails?.role,
    userRoleDetails?.role,
  ]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleStatusChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      Status: e.target.value,
    }));
  };

  // const handleFormSubmit = async (event) => {
  //     event.preventDefault();
  //     try {
  //         const apiUrl =
  //         // "https://imlystudios-backend-mqg4.onrender.com/api/userrole/createOrUpdateRole";
  //         CREATEORUPDATE_ROLES_API;
  //         const payload = {
  //             ...formData,
  //             RoleID: formData.RoleID || 0,
  //             TenantID: 1,
  //         };

  //         const response = await axios.post(apiUrl, payload);

  //         console.log("Full Response:", response);
  //         console.log("Response data:", response.data);

  //         navigate("/UserRole");
  //     } catch (error) {
  //         console.error("Submission failed:", error);
  //         if (error.response) {
  //             console.error("Response data:", error.response.data);
  //             console.error("Response status:", error.response.status);
  //             console.error("Response headers:", error.response.headers);
  //             setError("Failed to save role: " + (error.response.data.message || "Unknown error"));
  //         } else if (error.request) {
  //             console.error("No response received:", error.request);
  //             setError("No response received from server.");
  //         } else {
  //             console.error("Error in setting up request:", error.message);
  //             setError("Error: " + error.message);
  //         }
  //     }
  // };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Show loading animation

    try {
      const apiUrl = CREATEORUPDATE_ROLES_API; // Define your API URL
      const payload = {
        ...formData,
        RoleID: formData.RoleID || 0,
        TenantID: 1,
      };

      const response = await axios.post(apiUrl, payload);

      console.log("Full Response:", response);
      console.log("Response data:", response.data);

      navigate("/UserRole");
    } catch (error) {
      console.error("Submission failed:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
        setError(
          "Failed to save role: " +
            (error.response.data.message || "Unknown error")
        );
      } else if (error.request) {
        console.error("No response received:", error.request);
        setError("No response received from server.");
      } else {
        console.error("Error in setting up request:", error.message);
        setError("Error: " + error.message);
      }
    } finally {
      setIsLoading(false); // Hide loading animation
    }
  };
  const handleCancel = () => {
    navigate("/UserRole");
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-4 ml-10 lg:ml-72 w-auto">
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md max-w-[60%] sm:ml-16 lg:ml-72">
        <h2 className="text-xl font-semibold">
          {isEditMode ? "Edit Role" : "Add New Role"}
        </h2>
        <form className="mt-4" onSubmit={handleFormSubmit}>
          {/* <div>
                    <label
                        htmlFor="RoleID"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Role ID
                    </label>
                    <input
                        type="text"
                        id="RoleID"
                        name="RoleID"
                        value={formData.RoleID || ""}
                        onChange={handleFormChange}
                        className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div> */}

          <div className="mb-4">
            <label
              htmlFor="RoleName"
              className="block text-sm font-medium text-gray-700"
            >
              Role Name
            </label>
            <input
              id="RoleName"
              name="RoleName"
              type="text"
              value={formData.RoleName || ""}
              onChange={handleFormChange}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <div className="mt-1 flex gap-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="Status"
                  value="Active"
                  checked={formData.Status === "Active"}
                  onChange={handleStatusChange}
                  className="form-radio"
                />
                <span className="ml-2">Active</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="Status"
                  value="Inactive"
                  checked={formData.Status === "Inactive"}
                  onChange={handleStatusChange}
                  className="form-radio"
                />
                <span className="ml-2">Inactive</span>
              </label>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

          {/* <div className="mt-6 flex justify-end gap-4">
                    <button
                        type="submit"
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
                </div>  */}

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
        </form>
      </div>
      {/* {isLoading && <LoadingAnimation />} */}
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50">
          <LoadingAnimation />
        </div>
      )}
    </div>
  );
}

export default UserRoleform;
