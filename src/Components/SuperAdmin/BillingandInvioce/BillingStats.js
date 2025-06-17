import React from 'react';
import styled from 'styled-components';
import TR from '../../../assets/SuperAdmin/billing/tr.png'
import TPA from '../../../assets/SuperAdmin/billing/tpa.png'
import OI from '../../../assets/SuperAdmin/billing/oi.png'
import UP from '../../../assets/SuperAdmin/billing/up.png'
import UpIcon from '../../../assets/SuperAdmin/dashboardStats/up.png'
import DownIcon from '../../../assets/SuperAdmin/dashboardStats/down.png'

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

  span{
  color: ${props => (props.trend === 'up' ? '#3182CE' : '#D0004B')};
  font-weight: 700;
  }
`;

const BillingStats = () => {
  return (
    <StatsWrapper>
      <StatCard>
        <IconWrapper>
            <img src={TR} alt='icon' />
        </IconWrapper>
        <StatInfo>
          <StatLabel>Total revenue </StatLabel>
          <StatValue>5,423</StatValue>
          <Trend trend="up">
          <img src={UpIcon} alt='icon' /> <span>16%</span> this month
          </Trend>
        </StatInfo>
      </StatCard>

      <StatCard>
        <IconWrapper>
            <img src={TPA} alt='icon' />
        </IconWrapper>
        <StatInfo>
          <StatLabel>Top paying agencies</StatLabel>
          <StatValue>1,893</StatValue>
          <Trend trend="down">
            <img src={DownIcon} alt='icon' /> <span>1%</span> this month
          </Trend>
        </StatInfo>
      </StatCard>

      <StatCard>
        <IconWrapper>
            <img src={OI} alt='icon' />
        </IconWrapper>
        <StatInfo>
          <StatLabel>Overdue invoices</StatLabel>
          <StatValue>189</StatValue>
        </StatInfo>
      </StatCard>

      <StatCard>
        <IconWrapper>
            <img src={UP} alt='icon' />
        </IconWrapper>
        <StatInfo>
          <StatLabel>Upcoming payments</StatLabel>
          <StatValue>189</StatValue>
        </StatInfo>
      </StatCard>

    </StatsWrapper>
  );
};

export default BillingStats;
