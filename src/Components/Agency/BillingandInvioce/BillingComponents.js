import React from 'react'
import styled from "styled-components";
import BillingCards from './BillingCards';
import BillingInfo from './BillingInfo';
import TransactionList from './TransactionList';

const BillingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 20px 10px 20px 40px;

  @media (max-width: 990px) {
    padding: 0;
  }
`;

const BillingMain = styled.div`
  display: flex;
  gap: 20px;

  
  @media (max-width: 1290px) {
    flex-direction: column;
  }
`;

const AgencyBillingComponents = () => {
  return (
    <BillingContainer>
      <BillingCards />
      <BillingMain>
      <BillingInfo />
      <TransactionList />
      </BillingMain>
    </BillingContainer>
  )
}

export default AgencyBillingComponents
