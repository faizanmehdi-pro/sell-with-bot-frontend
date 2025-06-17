import React from 'react'
import styled from "styled-components";
import DashboardStats from './DashboardStats';
import Customers from './Customers';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 20px 10px 20px 40px;

  @media (max-width: 990px) {
    padding: 0;
  }
`;

const SuperAdminDashboardComponents = () => {
  return (
    <DashboardContainer>
      <DashboardStats />
      <Customers />
    </DashboardContainer>
  )
}

export default SuperAdminDashboardComponents
