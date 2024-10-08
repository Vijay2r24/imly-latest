
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import StatusBadge from "./Statuses";
import FilterBar from "./FilterBar";
import * as XLSX from "xlsx";
import { AiOutlineEdit } from "react-icons/ai";
import { TableFooter } from "@mui/material";
import { MdOutlineCancel } from "react-icons/md";
import axios from "axios";
import PropTypes from "prop-types";
import {
  GET_ALL_ORDERS,
  GETALLSTORES_API,
  GETORDERBYID_API,
  GET_ORDER_REPORT,
} from "../../Constants/apiRoutes";
import {
  StyledTableCell,
  StyledTableRow,
  TablePaginationActions,
} from "../CustomTablePagination";
import LoadingAnimation from "../Loading/LoadingAnimation";
import { Combobox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

import { FaPlus, FaTable } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import Datepicker from "react-tailwindcss-datepicker";
import { OrderContext } from "../../Context/orderContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const Orders = () => {
  const [products, setProducts] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();
  const [searchName, setSearchName] = useState("");
  const [totalOrders, setTotalOrders] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStore, setSelectedStore] = useState({
    StoreID: "",
    StoreName: "Select Store",
  });

  const searchItems = (value) => {
    setSearchName(value);
  };

  const { setOrderIdDetails } = useContext(OrderContext);
  const [stores, setStores] = useState([]);

  // const [startDate, setStartDate] = useState("");
  // const [endDate, setEndDate] = useState("");

  const [value, setValue] = useState({
    startDate: "",
    endDate: "",
  });

  const getAllOrders = async (
    pageNum,
    pageSize,
    search = "",
    storeID = "",
    startDate = "",
    endDate = ""
  ) => {
    try {
      const response = await axios.get(`${GET_ALL_ORDERS}`, {
        params: {
          page: pageNum + 1,
          limit: pageSize,
          SearchText: search,
          StoreID: storeID,
          StartDate: startDate,
          EndDate: endDate,
        },
      });
      return {
        orders: response.data.data,
        totalCount: response.data.totalRecords,
      };
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { orders, totalCount } = await getAllOrders(
        page,
        rowsPerPage,
        searchName,
        selectedStore.StoreID,
        value.startDate,
        value.endDate
      );

      setProducts(orders);
      setTotalOrders(totalCount);
    } catch (error) {
      console.error("Failed to fetch orders", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, [
    page,
    rowsPerPage,
    searchName,
    selectedStore,
    value.startDate,
    value.endDate,
  ]);

  // const handleOrderUpdate = (orderId) => {
  //   navigate("/OrdersAdd", { state: { orderId } });
  // };

  const getOrderById = async (orderId) => {
    try {
      const response = await axios.get(
        // `https://imlystudios-backend-mqg4.onrender.com/api/userrole/getRoleById/${roleId}`
        `${GETORDERBYID_API}/${orderId}`
      );
      console.log("UserRole retrieved successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching UserRole:", error);
      throw error;
    }
  };
  const handleOrderUpdate = async (orderId) => {
    try {
      const orderIdDetails = await getOrderById(orderId);
      setOrderIdDetails(orderIdDetails);
      navigate("/OrdersAdd");
    } catch (error) {
      console.error("Error fetching UserRole details:", error);
    }
  };
  const handleCancel = (id) => {
    const newStatus = "Cancelled";
    setProducts((prevItems) =>
      prevItems.map((item) =>
        item.OrderID === id ? { ...item, OrderStatus: newStatus } : item
      )
    );
  };

  const filteredOrders = products.filter(
    (product) =>
      selectedFilter === "All" ||
      product.OrderStatus === selectedFilter ||
      product.OntimeorDelay == selectedFilter
  );

  const paginatedData = filteredOrders.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const exportToExcel = (data, fileName) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };
  const handleCreateOrder = () => {
    navigate("/OrdersAdd");
  };
  const handleExportOrder = async () => {
    // try {
    //   // Assuming you have a function to fetch all orders
    //   const { orders } = await getAllOrders(0, totalOrders); // Adjust parameters as needed
    //   exportToExcel(orders, "orders"); // Export to Excel
    // } catch (error) {
    //   console.error("Error exporting order data:", error);
    // }
    setIsLoading(true);
    const url = GET_ORDER_REPORT; // New API endpoint
  
    // Define the request body (JSON format)
    const data = {
      StartDate:  value.startDate,
      EndDate:value.endDate,
      StoreID:  null, // Use selected store for ID
      StatusID:  null, // Ensure status is not undefined
    };
  
    try {
      // Make the POST request
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      // Log the content type
      const contentType = response.headers.get('Content-Type');
      console.log('Content-Type:', contentType);
  
      // Check if the response is okay
      if (response.ok && contentType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        // Process response as a blob for the Excel file
        const blob = await response.blob();
        console.log(blob); // Log the blob to check its content
  
        // Create a link element
        const link = document.createElement('a');
        // Set the blob URL as the href
        link.href = window.URL.createObjectURL(blob);
        // Set the download attribute with a filename
        link.download = 'order_report.xlsx';
        // Append the link to the body
        document.body.appendChild(link);
        // Programmatically click the link to trigger the download
        link.click();
        // Remove the link from the document
        link.remove();
  
        // Show success toast
        toast.success('Excel file downloaded successfully!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        const errorText = await response.text(); // Get the error message from the response
        console.error('Failed to download the file:', response.status, response.statusText, errorText);
        
        // Parse the error text as JSON and extract the error message
        let errorMessage = '';
        try {
          const parsedError = JSON.parse(errorText);
          errorMessage = parsedError.error; // Access the error message
        } catch (e) {
          errorMessage = 'An unexpected error occurred'; // Fallback error message
        }
  
        // Show error toast with backend message
        toast.error(`Failed to download the file: ${errorMessage}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error('Error while fetching the report:', error);
      // Show error toast with error message
      toast.error(`Error while fetching the report: ${error.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    setIsLoading(false);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getAllStores = async (pageNum, pageSize, search = "") => {
    try {
      const response = await axios.get(GETALLSTORES_API, {
        params: {
          pageNumber: pageNum + 1,
          pageSize: pageSize,
          search: search,
        },
      });

      const stores = response.data?.Stores || [];
      const totalCount = response.data?.totalItems || 0;

      return {
        stores: stores,
        totalCount: totalCount,
      };
    } catch (error) {
      console.error(
        "Error fetching stores:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  };

  const fetchStores = async () => {
    setLoading(true);
    try {
      const { stores: fetchedStores, totalCount } = await getAllStores(0, 1000);

      setStores([{ StoreID: "", StoreName: "Select Store" }, ...fetchedStores]);
    } catch (error) {
      console.error("Failed to fetch stores", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchStores();
  }, []);

  return (
    <div className="main-container">
      <ToastContainer/>
      <div className="body-container">
        <h2 className="heading">Orders</h2>

        <div className="search-button-group">
          <ul className="button-list">
            <li>
              <button
                type="button"
                className="action-button"
                onClick={handleCreateOrder}
              >
                <FaPlus aria-hidden="true" className="icon" />
                Create Order
              </button>
            </li>
            <li>
              <button
                type="button"
                className="action-button"
                onClick={handleExportOrder}
              >
                <FaTable aria-hidden="true" className="icon" />
                Export Order
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-wrap justify-between gap-2 mt-2">
        {/* Container for centering search box */}
        <div className="search-container-c-u">
          <label htmlFor="searchName" className="sr-only">
            Search
          </label>
          <input
            id="searchName"
            type="text"
            placeholder=" Search by Order Number / Customer Name "
            value={searchName}
            onChange={(e) => searchItems(e.target.value)}
            className="mt-1 p-1 pr-10 border border-gray-400 rounded-md w-full sm:w-64 text-sm leading-6 h-[40px]"
          />
          <div className="search-icon-container-c-u">
            <IoIosSearch />
          </div>
        </div>

        {/* Container for Combo box */}
        <div className="combobox-container flex items-center">
          <Combobox
            value={selectedStore}
            onChange={setSelectedStore}
            className="w-full"
          >
            <div className="combobox-wrapper w-full h-[40px]">
              <Combobox.Input
                className="combobox-input w-full h-full "
                displayValue={(store) => store?.StoreName || ""}
                placeholder="Select Store Name"
              />
              <Combobox.Button className="combobox-button">
                <ChevronUpDownIcon
                  className="combobox-icon"
                  aria-hidden="true"
                />
              </Combobox.Button>
              <Combobox.Options className="combobox-options w-full">
                {stores.map((store) => (
                  <Combobox.Option
                    key={store.StoreID}
                    className={({ active }) =>
                      active
                        ? "combobox-option-active w-full"
                        : "combobox-option w-full"
                    }
                    value={store}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={
                            selected
                              ? "combobox-option-text font-semibold"
                              : "combobox-option-text font-normal"
                          }
                        >
                          {store.StoreName}
                        </span>
                        {selected && (
                          <span
                            className={
                              active
                                ? "combobox-option-selected-icon active-selected-icon"
                                : "combobox-option-selected-icon"
                            }
                          >
                            <CheckIcon
                              className="combobox-check-icon"
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
        {/* Container for Date Pickers */}
        <div className="flex justify-center items-center gap-4 w-full p-2 sm:w-auto md:w-80 text-sm leading-6 ">

        {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-gray-700">
          <LoadingAnimation />
        </div>
      )}
          <div className="border-solid border-gray-400 w-full border-[1px] rounded-lg">
            <Datepicker
              popoverDirection="down"
              showShortcuts={true}
              showFooter={true}
              placeholder="Start Date and End Date"
              primaryColor={"purple"}
              value={value}
              onChange={(newValue) => setValue(newValue)}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center md:justify-center mb-4 px-4 md:px-0 mt-4">
        <div className="flex flex-wrap justify-center space-x-2 md:space-x-2 md:justify-center lg:justify-end">
          <FilterBar
            selectedFilter={selectedFilter}
            onFilterChange={setSelectedFilter}
          />
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Order Number</StyledTableCell>
              <StyledTableCell>Order Date</StyledTableCell>
              <StyledTableCell>Customer Info</StyledTableCell>
              <StyledTableCell>Delivery Info</StyledTableCell>
              <StyledTableCell align="center">Order Status</StyledTableCell>
              <StyledTableCell align="center">Updates</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              // Show loading animation while fetching
              <StyledTableRow>
                <StyledTableCell colSpan={6} align="center">
                  <LoadingAnimation /> {/* Display the loading animation */}
                </StyledTableCell>
              </StyledTableRow>
            ) : (
              paginatedData.map((product) => (
                <StyledTableRow key={product.OrderID}>
                  <StyledTableCell>{product.OrderNumber}</StyledTableCell>
                  <StyledTableCell>
                    {product.OrderDate
                      ? (() => {
                          const date = new Date(product.OrderDate);
                          const month = date.toLocaleString("en-US", {
                            month: "short",
                          });
                          const day = String(date.getDate()).padStart(2, "0"); // Pad single-digit day
                          const year = date.getFullYear();

                          return `${month} ${day}, ${year}`;
                        })()
                      : "N/A"}{" "}
                    {/* Adding a space here */}
                    {new Date(product.OrderDate)
                      .toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })
                      .toUpperCase()}
                    <br />
                    {/* <br /> */}
                    <div className="mt-2">
                      <span className="text-gray-400">Project:</span>{" "}
                      <strong>{product.Type ? product.Type : "N/A"}</strong>
                    </div>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <span>
                      <span className="text-gray-400">Name:</span>{" "}
                      <strong>
                        {product.CustomerName ? product.CustomerName : "N/A"}
                      </strong>
                    </span>
                    <br />
                    {/* <br /> */}
                    <div className="mt-2">
                      <span className="text-gray-400">Phone:</span>{" "}
                      {product.Phone ? product.Phone : "N/A"}
                    </div>
                  </StyledTableCell>
                  <StyledTableCell>
                    {product.DeliveryDate
                      ? (() => {
                          const date = new Date(product.DeliveryDate);

                          // Get month name
                          const month = date.toLocaleString("en-US", {
                            month: "short",
                          }); // Use "short" to get abbreviated month
                          let day = date.getDate(); // Get the day
                          const year = date.getFullYear(); // Get the full year (yyyy)

                          // Add leading zero for single-digit day
                          day = String(day).padStart(2, "0");

                          return `${month} ${day}, ${year}`;
                        })()
                      : "N/A"}

                    <br />

                    {/* <br /> */}

                    <div className="mt-2">
                      <span className="text-gray-400 ">Amount:</span> &#8377;
                      {product.TotalAmount ? product.TotalAmount : "N/A"}
                    </div>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <StatusBadge status={product.OrderStatus} />
                    <br />
                    {/* <br /> */}

                    <div className="inline-flex items-center mt-2">
                      {/* Using ternary operator to determine the status display */}
                      {product.OntimeorDelay == "1" ? (
                        <>
                          <span className="inline-flex items-center bg-green-100 px-2 py-2 rounded mr-2">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                          </span>
                          <span className="text-green-600">
                            <strong>On time</strong>
                          </span>
                        </>
                      ) : product.OntimeorDelay == "2" ? (
                        <>
                          <span className="inline-flex items-center bg-orange-100 px-2 py-2 rounded mr-2">
                            <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                          </span>
                          <span className="text-orange-600">
                            <strong>&nbsp;Delay&nbsp;&nbsp;</strong>
                          </span>
                        </>
                      ) : null}{" "}
                      {/* Render nothing if neither condition is met */}
                    </div>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <div className="flex justify-center space-x-2">
                      <button
                        type="button"
                        onClick={() => handleOrderUpdate(product.OrderID)}
                        className="button edit-button flex items-center"
                      >
                        <AiOutlineEdit aria-hidden="true" className="h-4 w-4" />
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCancel(product.OrderID)}
                        className=" button delete-button flex items-center"
                      >
                        <MdOutlineCancel
                          aria-hidden="true"
                          className="h-4 w-4 font-small"
                        />
                        Cancel
                      </button>
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            )}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[10, 20, 25]}
                colSpan={6}
                count={totalOrders}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Orders;
