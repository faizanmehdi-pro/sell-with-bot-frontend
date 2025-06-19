import React from 'react';
import styled from 'styled-components';
import AgenciesIcon from '../../../assets/SuperAdmin/dashboardStats/agencies.png';
import CustomerIcon from '../../../assets/SuperAdmin/dashboardStats/customer.png';
import BotIcon from '../../../assets/SuperAdmin/dashboardStats/bot.png';
import TokenIcon from '../../../assets/SuperAdmin/dashboardStats/token.png';
import ChatIcon from '../../../assets/SuperAdmin/dashboardStats/chat.png';
import UpIcon from '../../../assets/SuperAdmin/dashboardStats/up.png';
import DownIcon from '../../../assets/SuperAdmin/dashboardStats/down.png';
import { getAdminDashboardSummary } from '../../../apis/SuperAdmin/getAdminDashboardSummary';
import { useQuery } from '@tanstack/react-query';

const StatsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  column-gap: 20px;
  row-gap: 40px;
  padding: 30px;
  background: #FFFFFF;
  border-radius: 30px;
  box-shadow: 0px 10px 60px 0px #E2ECF980;
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const StatCard = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
  border-right: 1.5px solid #F0F0F0;
  &:last-child {
    border-right: none;
  }
  @media (max-width: 768px) {
    border-right: none;
  }
`;

const IconWrapper = styled.div`
  background: #CCE6FF;
  min-width: 84px;
  min-height: 84px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
`;

const StatInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const StatValue = styled.div`
  font-size: 32px;
  font-weight: 600;
  color: #333333;
  font-family: 'Poppins', sans-serif;
`;

const StatLabel = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: #ACACAC;
  font-family: 'Poppins', sans-serif;
  white-space: nowrap;
`;

const Trend = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  font-weight: 400;
  color: #292D32;
  font-family: 'Poppins', sans-serif;
  white-space: nowrap;
  span {
    color: ${props => (props.trend === 'up' ? '#3182CE' : '#D0004B')};
    font-weight: 700;
  }
`;

const ListLoader = styled.div`
  border: 4px solid #3182ce;
  border-radius: 50%;
  border-top: 4px solid #fff;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
  display: inline-block;
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  color: #d0004b;
  font-weight: bold;
  font-size: 16px;
  text-align: left;
`;

const DashboardStats = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["DashboardSummary"],
    queryFn: getAdminDashboardSummary,
  });

  if (isLoading) {
    return (
      <StatsWrapper style={{ justifyContent: "center", textAlign: "center" }}>
        <ListLoader />
      </StatsWrapper>
    );
  }

  if (isError) {
    return (
      <StatsWrapper style={{ justifyContent: "center", textAlign: "center" }}>
        <ErrorMessage>Failed to Load Dashboard Summary</ErrorMessage>
      </StatsWrapper>
    );
  }

  const {
    top_agencies_count,
    top_agencies_change,
    total_customers,
    total_customers_change,
    total_bots_created,
    total_tokens_used,
    tokens_usage_change,
    total_chats,
  } = data || {};

  const renderTrend = (change) => {
    const isUp = change.includes("↑");
    const isDown = change.includes("↓");
    const cleanValue = change.replace(/[↑↓]/g, "").trim(); // remove arrow symbol
  
    if (!cleanValue) return null;
  
    return (
      <Trend trend={isUp ? 'up' : 'down'}>
        <img src={isUp ? UpIcon : DownIcon} alt='trend icon' />
        <span>{cleanValue}</span> this month
      </Trend>
    );
  };  

  return (
    <StatsWrapper>
      <StatCard>
        <IconWrapper>
          <img src={AgenciesIcon} alt='Agencies' />
        </IconWrapper>
        <StatInfo>
          <StatLabel>Top performing agencies</StatLabel>
          <StatValue>{top_agencies_count}</StatValue>
          {renderTrend(top_agencies_change)}
        </StatInfo>
      </StatCard>

      <StatCard>
        <IconWrapper>
          <img src={CustomerIcon} alt='Customers' />
        </IconWrapper>
        <StatInfo>
          <StatLabel>Total Customers</StatLabel>
          <StatValue>{total_customers}</StatValue>
          {renderTrend(total_customers_change)}
        </StatInfo>
      </StatCard>

      <StatCard>
        <IconWrapper>
          <img src={BotIcon} alt='Bots' />
        </IconWrapper>
        <StatInfo>
          <StatLabel>Total bots created</StatLabel>
          <StatValue>{total_bots_created}</StatValue>
        </StatInfo>
      </StatCard>

      <StatCard>
        <IconWrapper>
          <img src={TokenIcon} alt='Tokens' />
        </IconWrapper>
        <StatInfo>
          <StatLabel>Total Token Usage</StatLabel>
          <StatValue>{total_tokens_used}</StatValue>
          {renderTrend(tokens_usage_change)}
        </StatInfo>
      </StatCard>

      <StatCard>
        <IconWrapper>
          <img src={ChatIcon} alt='Chats' />
        </IconWrapper>
        <StatInfo>
          <StatLabel>Total Chats</StatLabel>
          <StatValue>{total_chats}</StatValue>
        </StatInfo>
      </StatCard>
    </StatsWrapper>
  );
};

export default DashboardStats;
