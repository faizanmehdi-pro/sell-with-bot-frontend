import React from 'react'
import styled from "styled-components";
import BillingStats from './BillingStats';
import BillingandInvoice from './Billing&Invoice';

const BillingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 20px 10px 20px 40px;

  @media (max-width: 990px) {
    padding: 0;
  }
`;

const AdminBillingComponents = () => {
  return (
    <BillingContainer>
      <BillingStats />
      <BillingandInvoice />
    </BillingContainer>
  )
}

export default AdminBillingComponents
