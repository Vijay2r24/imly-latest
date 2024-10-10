import React, { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Combobox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { GETALLSTORES_API } from "../../Constants/apiRoutes";
import Datepicker from "react-tailwindcss-datepicker";
import axios from "axios";
import {
  faChartLine,
  faUsers,
  faIndianRupeeSign,
  faTasks,
} from "@fortawesome/free-solid-svg-icons";

import "chart.js/auto";

import {
  CITIES_API,
  COUNTRIES_API,
  STATES_API,
} from "../../Constants/apiRoutes";

// Register the required components globally

Chart.register(...registerables);

const Dashboard = () => {
  const lineChartRef = useRef(null);
  const doughnutChartRef = useRef(null);
  const bigChartRef = useRef(null);
  // State to hold the API data

  const [citiesData, setCitiesData] = useState([]);
  const [statesData, setStatesData] = useState([]);
  const [countriesData, setCountriesData] = useState([]);
  const [selectedStore, setSelectedStore] = useState("");
  const [storeNames, setStoreNames] = useState([]);
  const [value, setValue] = useState({
    startDate: "",
    endDate: "",
  });


  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axios.get(GETALLSTORES_API);
        console.log("API Response:", response.data);

        // Extract the Stores array from the API response
        const storesData = response.data.Stores || [];

        // Check if it's an array and set store names
        setStoreNames(Array.isArray(storesData) ? storesData : []);
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };

    fetchStores();
  }, []);

  // Example data for the charts (you can replace this with actual API data)

  const lineData = {
    labels: ["January", "February", "March", "April", "May", "June"],

    datasets: [
      {
        label: "Sales Per Month",

        data: citiesData.length ? citiesData : [65, 59, 80, 81, 56, 55], // Use API data or fallback data

        fill: false,

        backgroundColor: "rgba(75,192,192,1)",

        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  const doughnutData = {
    labels: ["Orders Pending", "Dispatched", "Production Design"],

    datasets: [
      {
        label: "Order Status",

        data: statesData.length ? statesData : [120, 80, 50], // Use API data or fallback data

        backgroundColor: [
          "rgba(255, 99, 132, 0.6)", // Orders Pending

          "rgba(54, 162, 235, 0.6)", // Dispatched

          "rgba(255, 206, 86, 0.6)", // Production Design
        ],

        borderColor: [
          "rgba(255, 99, 132, 1)",

          "rgba(54, 162, 235, 1)",

          "rgba(255, 206, 86, 1)",
        ],

        borderWidth: 1,
      },
    ],
  };

  const bigChartData = {
    labels: ["January", "February", "March", "April", "May", "June"],

    datasets: [
      {
        label: "Revenue Generated",
        data: countriesData.length ? countriesData : [85, 69, 90, 101, 76, 65], // Use API data or fallback data
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Cleanup chart instances on component unmount

  useEffect(() => {
    const lineChartInstance = lineChartRef.current;
    const doughnutChartInstance = doughnutChartRef.current;
    const bigChartInstance = bigChartRef.current;
    return () => {
      if (lineChartInstance) {
        lineChartInstance.destroy();
      }

      if (doughnutChartInstance) {
        doughnutChartInstance.destroy();
      }

      if (bigChartInstance) {
        bigChartInstance.destroy();
      }
    };
  }, []);

  return (
    <div className="main-container">
      {/* Dashboard Header */}
      <div className="flex justify-end items-center space-x-4">
        <div className="flex flex-col items-end">
          <div className="combobox-container flex-1">
            <Combobox value={selectedStore} onChange={setSelectedStore}>
              <div className="combobox-wrapper">
                <Combobox.Input
                  className="combobox-input w-full h-10 px-3"
                  displayValue={(store) => store?.StoreName || "Select Store ID"}
                  placeholder="Select Store Name"
                />
                <Combobox.Button className="combobox-button">
                  <ChevronUpDownIcon className="combobox-icon" aria-hidden="true" />
                </Combobox.Button>
                <Combobox.Options className="combobox-options">
                  <Combobox.Option
                    key="select-store-id"
                    className={({ active }) =>
                      active ? "combobox-option-active" : "combobox-option"
                    }
                    value={{ StoreID: null, StoreName: "Select Store ID" }}
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
                          Select Store ID
                        </span>
                        {selected && (
                          <span
                            className={
                              active
                                ? "combobox-option-selected-icon active-selected-icon"
                                : "combobox-option-selected-icon"
                            }
                          >
                            <CheckIcon className="combobox-check-icon" aria-hidden="true" />
                          </span>
                        )}
                      </>
                    )}
                  </Combobox.Option>

                  {storeNames.map((store) => (
                    <Combobox.Option
                      key={store.StoreID}
                      className={({ active }) =>
                        active ? "combobox-option-active" : "combobox-option"
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
                              <CheckIcon className="combobox-check-icon" aria-hidden="true" />
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
        </div>

        <div className="w-1/4">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-500 text-white shadow rounded-lg p-4 relative">
          <div className="flex flex-col justify-between h-full">
            <div>
              <h3 className="text-lg font-semibold">Orders</h3>

              <p className="text-2xl">1346</p>
            </div>

            <FontAwesomeIcon
              icon={faChartLine}
              className="text-4xl absolute bottom-4 right-4"
            />
          </div>
        </div>

        <div className="bg-green-500 text-white shadow rounded-lg p-4 relative">
          <div className="flex flex-col justify-between h-full">
            <div>
              <h3 className="text-lg font-semibold">Users Registered</h3>

              <p className="text-2xl">357</p>
            </div>

            <FontAwesomeIcon
              icon={faUsers}
              className="text-4xl absolute bottom-4 right-4"
            />
          </div>
        </div>

        <div className="bg-red-500 text-white shadow rounded-lg p-4 relative">
          <div className="flex flex-col justify-between h-full">
            <div>
              <h3 className="text-lg font-semibold">Revenue Generated</h3>

              <p className="text-2xl">36056</p>
            </div>

            <FontAwesomeIcon
              icon={faIndianRupeeSign}
              className="text-4xl absolute bottom-4 right-4"
            />
          </div>
        </div>

        <div className="bg-yellow-500 text-white shadow rounded-lg p-4 relative">
          <div className="flex flex-col justify-between h-full">
            <div>
              <h3 className="text-lg font-semibold">Products Added</h3>

              <p className="text-2xl">865</p>
            </div>

            <FontAwesomeIcon
              icon={faTasks}
              className="text-4xl absolute bottom-4 right-4"
            />
          </div>
        </div>
      </div>

      {/* Graph Section */}

      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Sales</h2>

            <Line data={lineData} ref={lineChartRef} />
          </div>

          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Order Status</h2>

            <div className="w-64 h-64 mx-auto">
              <Doughnut data={doughnutData} ref={doughnutChartRef} />
            </div>
          </div>
        </div>

        {/* Full-width Big Chart */}

        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Revenue Generated</h2>

          <Bar data={bigChartData} ref={bigChartRef} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
