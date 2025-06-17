import React from "react";
import styled from "styled-components";
import { MdVisibility } from "react-icons/md";

const Container = styled.div`
  background-color: #FFFFFF;
  font-family: 'Mulish', sans-serif;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 20px;
  padding: 30px;

  @media (max-width: 550px) {
    padding: 20px;
  }
`;

const Header = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: #2D3748;
`;

const Card = styled.div`
  background-color: #F8F9FA;
  border-radius: 8px;
  padding: 1.5rem 2rem;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  
  @media (max-width: 550px) {
    padding: 20px;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #718096;
`;

const Detail = styled.div`
  color: #A0AEC0;
  font-size: 12px;
  font-weight: 400;

  span {
    color: #718096;
    font-size: 12px;
    font-weight: 700;
  }
`;

const ViewButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: #2D3748;
  font-size: 10px;
  font-weight: 700;
  cursor: pointer;
  gap: 0.4rem;

  &:hover {
    color: #A0AEC0;
  }
  
  @media (max-width: 420px) {
    position: absolute;
    right: 55px;
  }
`;

const invoices = [
  {
    name: "Oliver Liam",
    company: "Viking Burrito",
    email: "oliver@burrito.com",
    vat: "FRB1235476"
  },
  // repeat objects for demo
  {
    name: "Oliver Liam",
    company: "Viking Burrito",
    email: "oliver@burrito.com",
    vat: "FRB1235476"
  },
  {
    name: "Oliver Liam",
    company: "Viking Burrito",
    email: "oliver@burrito.com",
    vat: "FRB1235476"
  },
  {
    name: "Oliver Liam",
    company: "Viking Burrito",
    email: "oliver@burrito.com",
    vat: "FRB1235476"
  }
];

const BillingandInvoice = () => {
  return (
    <Container>
      <Header>Invoice Information</Header>
      {invoices.map((invoice, index) => (
        <Card key={index}>
          <Info>
            <Label>{invoice.name}</Label>
            <Detail>Name: <span>{invoice.company}</span></Detail>
            <Detail>Email Address: <span>{invoice.email}</span></Detail>
            <Detail>Invoice Number: <span>{invoice.vat}</span></Detail>
          </Info>
          <ViewButton>
            <MdVisibility fontSize={14}/>
            View Invoice
          </ViewButton>
        </Card>
      ))}
    </Container>
  );
};

export default BillingandInvoice;
