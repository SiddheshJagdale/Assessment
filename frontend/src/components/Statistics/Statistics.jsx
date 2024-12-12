import React from 'react';
import "./Statistics.css"

const StatisticsBox = ({ statistics }) => {
  return (
    <div className='statistics'>
      <h2>Statistics</h2>
      <p>Total Sale Amount: ${statistics.totalSales}</p>
      <p>Total Sold Items: {statistics.soldCount}</p>
      <p>Total Not Sold Items: {statistics.notSoldCount}</p>
    </div>
  );
};

export default StatisticsBox;
