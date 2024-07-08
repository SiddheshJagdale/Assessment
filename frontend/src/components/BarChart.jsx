import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const BarChartComponent = ({ data,month }) => {
  return (
    <>
   <h2 style={{margin:'20px 20px',color:"#ffff"}}>BAR CHART - <span style={{textTransform:'uppercase',color:"#000"}}>{ month}</span></h2>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="range" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
    </>
  );
};

export default BarChartComponent;
