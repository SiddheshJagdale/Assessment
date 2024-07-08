import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const PieChartComponent = ({ data,month }) => {
  return (
<>
    <h2 style={{margin:'20px 20px',color:"#ffff"}}>PIE CHART - <span style={{textTransform:'uppercase',color:"#000"}}>{ month}</span></h2>
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="count"
          nameKey="_id"
          cx="50%"
          cy="50%"
          outerRadius={150}
          fill="#8884d8"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
    </>
  );
};

export default PieChartComponent;
