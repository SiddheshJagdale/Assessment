import React, { useState } from "react";
import Axios from "axios";
import { useEffect } from "react";
import Header from "./components/Header/Header.jsx";
import TransactionsTable from "./components/TransactionTable/TransactionsTable.jsx";
import { searchRoute } from "./utils/APIRoutes.js";
import Parent from "./components/Parent.jsx";
import {
  initializeRoute,
  getPieChartData,
  getStatistics,
  getBarChartData,
  getCombinedData
} from "./utils/APIRoutes.js";
import PieChartComponent from "./components/PieChart.jsx";
import StatisticsBox from "./components/Statistics/Statistics.jsx";
import BarChartComponent from "./components/BarChart.jsx";
import Button from "./components/Button/Button.jsx";
import Select from "./components/Select/Select.jsx";

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [statistics, setStatistics] = useState([]);
  const [month, setMonth] = useState("March");

 
  useEffect(() => {
    fetchTransactions();
    getSearchedTransactions();
    fetchPieChartData();
    fetchStatistics();
    fetchBarChartData();
  }, []);

  const handleChange = (e) => {
    const month = e.target.value;
    setMonth(month);
  };

  const handleSubmit = () => {
    getSearchedTransactions();
    fetchPieChartData();
    fetchStatistics();
    fetchBarChartData();
  };

  const fetchTransactions = async () => {
    await Axios.get(initializeRoute);
  };

  const getSearchedTransactions = async () => {
    const response = await Axios.get(searchRoute, { params: { month } });
  
    setTransactions(response.data);
    console.log(response.data);
  };

  const fetchPieChartData = async () => {
    try {
      const response = await Axios.get(getPieChartData, { params: { month } });
      setPieChartData(response.data);
    } catch (error) {
      console.error("Error fetching pie chart data:", error);
    }
  };

  const fetchStatistics = async () => {
    try {
      const response = await Axios.get(getStatistics, { params: { month } });
      setStatistics(response.data);
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  const fetchBarChartData = async () => {
    try {
      const response = await Axios.get(getBarChartData, { params: { month } });
      setBarChartData(response.data);
    } catch (error) {
      console.error("Error fetching bar chart data:", error);
    }
  };


  return (
    <>
      <Header />
      <Select month={month} handleChange={handleChange}/>
      <TransactionsTable transactions={transactions} />
      <Button onClick = {handleSubmit} />
      <StatisticsBox statistics={statistics} />
      <PieChartComponent data={pieChartData} month={month} />
      <BarChartComponent data={barChartData} month={month} />
      <Parent/>
    </>
  );
};

export default App;
