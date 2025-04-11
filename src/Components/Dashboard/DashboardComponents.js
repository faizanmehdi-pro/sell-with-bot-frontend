import React from "react";
import { FaRegCreditCard, FaCheckCircle, FaReply, FaCalendarCheck } from "react-icons/fa";
import { MdOutlineMonetizationOn } from "react-icons/md";
import StatCard from "./StatsCards";
import ChartSection from "./ChartSection";

import styled from "styled-components";
import MessageTable from "./MessageTable";

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 30px;
`;

// Dummy Data
const stats = [
  { title: "Credits Left", value: "$0.360", icon: <MdOutlineMonetizationOn size={30} /> },
  { title: "Credits Used", value: "$0.040", icon: <FaRegCreditCard size={30} /> },
  { title: "Responses", value: "1", icon: <FaCheckCircle size={30} /> },
  { title: "Follow-Ups", value: "0", icon: <FaReply size={30} /> },
  { title: "Responded", value: "1", icon: <FaCheckCircle size={30} /> },
  { title: "Appointments", value: "0", icon: <FaCalendarCheck size={30} /> },
];

const chartData = {
  labels: ["02:24", "03:30", "04:45", "04:59", "05:30", "06:00", "06:24", "06:30", "07:45", "08:24", "09:00"],
  datasets: [
    {
      label: "AI Automation HQ",
      data: [1.0, 0.1, 0.2, 0, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.3],
      backgroundColor: (ctx) => {
        const maxIndex = ctx.dataset.data.indexOf(Math.max(...ctx.dataset.data));
        return ctx.dataIndex === maxIndex ? "#e63946" : "#333";
      },
    },
  ],
};


const DashboardComponents = () => {
  return (
    <DashboardContainer>
    {/* Chart Section */}
    <ChartSection data={chartData} />

      {/* Stats Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", margin: "20px 0" }}>
        {stats.map((stat, index) => (
          <StatCard key={index} title={stat.title} value={stat.value} icon={stat.icon} />
        ))}
      </div>

      <MessageTable />

    </DashboardContainer>
  );
};

export default DashboardComponents;
