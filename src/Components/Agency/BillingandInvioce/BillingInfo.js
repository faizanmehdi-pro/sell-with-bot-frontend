// BillingInfo.js
import React from 'react';
import styled from 'styled-components';
import { MdEdit, MdDelete  } from "react-icons/md";


const BillingSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  background: #FFFFFF;
  box-shadow: 0px 5px 14px 0px #0000000D;
  border-radius: 20px;
  padding: 30px;
  width: 50%;
  
  @media (max-width: 1290px) {
    width: 100%;
    padding: 20px;
  }
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: #2D3748;
`;

const Card = styled.div`
  background-color: #F8F9FA;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  height: 33%;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const InfoTH = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #718096;
`;

const InfoH = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: #718096;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  button {
    background: none;
    border: none;
    font-size: 10px;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .delete {
    color: #E53E3E;
  }

  .edit {
    color: #2D3748;
  }

  
  @media (max-width: 420px) {
    position: absolute;
    right: 55px;
  }
`;

const BillingInfo = () => {
  const data = [
    { name: 'Oliver Liam', address: 'ABC Town City,Country' },
    { name: 'Oliver Liam', address: 'ABC Town City,Country' },
    { name: 'Oliver Liam', address: 'ABC Town City,Country' },
  ];

  return (
    <BillingSection>
      <Title>Billing Information</Title>
      {data.map((item, index) => (
        <Card key={index}>
          <Info>
            <InfoTH>{item.name}</InfoTH>
            <InfoH>{item.address}</InfoH>
          </Info>
          <Actions>
            <button className="delete">
              <MdDelete  size={12} />
              DELETE
            </button>
            <button className="edit">
              <MdEdit size={11} />
              EDIT
            </button>
          </Actions>
        </Card>
      ))}
    </BillingSection>
  );
};

export default BillingInfo;
