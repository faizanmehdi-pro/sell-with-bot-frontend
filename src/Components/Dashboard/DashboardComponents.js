import React from "react";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import StatCard from "./StatsCards";
import EngagementChart from "./ChartSection";
import { getDashboaedData } from "../../apis/getDashboaedData";
import TCL from '../../assets/Dashboard/TotalCreditLeft.png'
import CU from '../../assets/Dashboard/CreditUsed.png'
import Responses from '../../assets/Dashboard/Responses.png'
import Respond from '../../assets/Dashboard/Respond.png'
import Appointments from '../../assets/Dashboard/Appointment.png'
// import FollowUps from '../../assets/Dashboard/followUps.png'
import Chat from '../../assets/Dashboard/Chat.png'

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 30px;
  
  @media (max-width: 990px) {
    padding: 0;
  }
`;
const ListLoader = styled.div`
  border: 4px solid #3182CE;
  border-radius: 50%;
  border-top: 4px solid #fff;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
  display: inline-block;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const StatsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  grid-gap: 30px;

  
  @media (max-width: 1700px) {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    grid-gap: 20px;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(100%, 1fr));
  }
`;

const StatCardContainer = styled.div`
  background: #ffffff;
  padding: 20px 30px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  box-shadow: 0px 10px 60px 0px #e2ecf980;
`;

const DashboardComponents = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["cardData"],
    queryFn: getDashboaedData,
    retry: false,
  }); 

  const stats = data
    ? [
        {
          title: "Credits Left",
          value: `$${data.credit_left.toFixed(3)}`,
          icon: TCL
        },
        {
          title: "Credits Used",
          value: `$${data.credits_used.toFixed(3)}`,
          icon: CU
        },
        {
          title: "Responses",
          value: data.total_sms_responses,
          icon: Responses
        },
        // {
        //   title: "Follow-Ups",
        //   value: data.total_followups,
        //   icon: FollowUps
        // },
        {
          title: "Responded",
          value: data.total_ai_responded,
          icon: Respond
        },
        {
          title: "Appointments",
          value: data.total_appointments,
          icon: Appointments
        },
        {
          title: "Total Chats",
          value: data.total_chats,
          icon: Chat
        },
      ]
    : [];

  return (
    <DashboardContainer>
      {/* Stats Cards */}
      {isLoading && <StatCardContainer><ListLoader /></StatCardContainer>} 
      {isError && <StatCardContainer>{error?.message || "Error Loading Stats."}</StatCardContainer>}
      {!isLoading && !isError && (
        <StatsWrapper>
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
            />
          ))}
        </StatsWrapper>
      )}

      {/* Chart Section */}
      <EngagementChart />
    </DashboardContainer>
  );
};

export default DashboardComponents;
