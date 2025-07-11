import React from 'react'
import styled from "styled-components";
import DashboardStats from './DashboardStats';
import AgencyCustomers from './Customers';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 20px 10px 20px 40px;

  @media (max-width: 990px) {
    padding: 0;
  }
`;

const AgencyDashboardComponents = () => {
  return (
    <DashboardContainer>
      <DashboardStats />
      <AgencyCustomers />
    </DashboardContainer>
  )
}

export default AgencyDashboardComponents
