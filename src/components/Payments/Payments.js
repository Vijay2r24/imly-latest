
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { useTheme } from "@mui/material/styles";
import { FaPlus, FaTable } from "react-icons/fa";
import * as XLSX from "xlsx";
import PropTypes from "prop-types";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { IoIosSearch } from "react-icons/io";
import axios from "axios";
import { PaymentContext } from "../../Context/paymentContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Datepicker from "react-tailwindcss-datepicker";
import LoadingAnimation from "../../components/Loading/LoadingAnimation";
import { PAYMENT_REPORT_API } from '../../Constants/apiRoutes'
import {
  StyledTableCell,
  StyledTableRow,
  TablePaginationActions,
} from "../CustomTablePagination";
import { GET_ALL_PAYMENTS_API, GET_PAYMENTSBY_ORDERID_API, GETPAYMENTSBY_PAYMETID_API, CREATEORUPDATE_PAYMENTS_API } from '../../../src/Constants/apiRoutes';
function Payment() {
  const [payments, setPayments] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPayments, setTotalPayments] = useState(0);
  const [searchName, setSearchName] = useState("");
  const navigate = useNavigate();
  const { setPaymentDetails } = useContext(PaymentContext);
  const [paginatedPeople, setPaginatedPeople] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState({
    startDate: "",
    endDate: "",
  });

  const fetchPayments = async () => {
    try {
      const { payments, totalCount } = await getAllPayments(page, rowsPerPage, searchName,
        value.startDate,
        value.endDate);
      setPayments(payments);
      setTotalPayments(totalCount);
    } catch (error) {
      console.error('Failed to fetch payments', error);
    }
  };

  const getAllPayments = async (pageNum, pageSize, search = "") => {
    try {
      const response = await axios.get(
        GET_ALL_PAYMENTS_API,

        {
          params: {
            page: pageNum + 1,
            limit: pageSize,
            search: search
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

  useEffect(() => {
    fetchPayments();
  }, [page, rowsPerPage, searchName,
    value.startDate,
    value.endDate]);



  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddPaymentClick = () => {
    setPaymentDetails(null);
    navigate("/Paymentsform"); // Make sure this matches the route path defined
  };

  const getPaymentsById = async (OrderId) => {
    try {
      const response = await axios.get(
        `${GETPAYMENTSBY_PAYMETID_API}${OrderId}`

        //  `${GET_PAYMENTSBY_ORDERID_API}/${OrderId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching Payment:", error);
      throw error;
    }
  };

  const exportToExcel = (data, fileName) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

  const handleExportPaymentsData = async () => {
    setIsLoading(true);
    const url = PAYMENT_REPORT_API  // API endpoint

    // Define the request body (JSON format)
    const data = {
      StartDate: value.startDate,
      EndDate: value.endDate,
      StoreID: null,
      OrderID: null,
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

      // Check if the response is okay
      if (response.ok) {
        // Process response as a blob for the Excel file
        const blob = await response.blob();

        // Create a link element
        const link = document.createElement('a');
        // Set the blob URL as the href
        link.href = window.URL.createObjectURL(blob);
        // Set the download attribute with a filename (e.g., "payment_report.xlsx")
        link.download = 'payment_report.xlsx';  // Adjust the filename as needed
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

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-4 sm:ml-10 lg:ml-72 w-auto">
      <ToastContainer />
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-gray-700">
          <LoadingAnimation />
        </div>
      )}
      <div className="mt-6 bg-white p-6 ">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
          <h2 className="text-xl font-semibold">Payments</h2>
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 ml-auto">
            <ul className="button-list flex">
              <li>
                <button
                  type="button"
                  className="action-button"
                  onClick={handleAddPaymentClick}
                >
                  <FaPlus aria-hidden="true" className="icon" />
                  Add Payments
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="action-button"
                  onClick={handleExportPaymentsData}
                >
                  <FaTable aria-hidden="true" className="icon" />
                  Export Payments
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row mt-3 sm:items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative justify-center flex w-full sm:w-[20rem]">
              <label htmlFor="searchName" className="sr-only">Search</label>
              <input
                id="searchName"
                type="text"
                placeholder="Search by CustomerName Or OrderNumber"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="w-full p-2 pr-10 border border-gray-300 rounded-md"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <IoIosSearch />
              </div>
            </div>

          </div>

          <div className="w-full sm:w-1/4">
            <div className="border-solid border-gray-400 border-[1px] rounded-lg w-full">
              <Datepicker
                popoverDirection="down"
                showShortcuts={true}
                showFooter={true}
                placeholder="Start Date and End Date"
                primaryColor={"purple"}
                value={value}
                onChange={(newValue) => setValue(newValue)}
                className="w-full"
              />
            </div>
          </div>
        </div>



        <TableContainer component={Paper} className="mt-4">
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>Payment Method</StyledTableCell>
                <StyledTableCell>Payment Date</StyledTableCell>
                <StyledTableCell>Order ID</StyledTableCell>
                <StyledTableCell>Customer ID</StyledTableCell>
                <StyledTableCell>Total Amount</StyledTableCell>
                <StyledTableCell>Payment Status</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payments.map((payment) => (
                <StyledTableRow key={payment.PaymentID}>
                  <StyledTableCell>{payment.PaymentMethod}</StyledTableCell>
                  <StyledTableCell>{new Date(payment.PaymentDate).toLocaleDateString()}</StyledTableCell>
                  <StyledTableCell>{payment.OrderID ?? 'Not available'}</StyledTableCell>
                  <StyledTableCell>{payment.CustomerID ?? 'Not available'}</StyledTableCell>
                  <StyledTableCell>
                    {payment.TotalAmount
                      ? `₹${new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(payment.TotalAmount)}`
                      : '₹0.00'}
                  </StyledTableCell>


                  {/* Payment Status with Conditional Styling */}
                  <StyledTableCell className="text-center">
                    <span className={`inline-flex items-center justify-center rounded-full 
              w-full max-w-[8rem] min-w-[5rem] h-8 text-xs font-semibold 
              ring-1 ring-inset
  ${payment.PaymentStatus === "Processing" ? 'bg-blue-200 text-blue-800 ring-blue-700/30' :
                        payment.PaymentStatus === "Completion" ? 'bg-green-200 text-green-800 ring-green-700/30' :
                          payment.PaymentStatus === "Completed" ? 'bg-green-200 text-green-800 ring-green-700/30' :
                            payment.PaymentStatus === "Dispatch" ? 'bg-pink-200 text-pink-800 ring-pink-700/30' :
                              payment.PaymentStatus === "Failed" ? 'bg-red-200 text-red-800 ring-red-700/30' :
                                'bg-red-200 text-red-800 ring-red-700/30'}`}>
                      {payment.PaymentStatus ?? 'Failed'}
                    </span>

                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>



            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[10, 20, 25]}
                  colSpan={6}
                  count={totalPayments}
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
    </div>
  );
}

export default Payment;