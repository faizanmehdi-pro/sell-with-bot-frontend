import React from 'react';
import styled from 'styled-components';
import { AiOutlineExclamation } from 'react-icons/ai';
import calandar from '../../../assets/SuperAdmin/billing/calandar.png'
import { IoMdArrowDown, IoMdArrowUp  } from "react-icons/io";

const Container = styled.div`
  background: #FFFFFF;
  border-radius: 20px;
  padding: 30px;
  width: 50%;
  box-shadow: 0px 5px 14px 0px #0000000D;
  display: flex;
  flex-direction: column;
  gap: 20px;
  
  @media (max-width: 1290px) {
    width: 100%;
    padding: 20px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
  
  @media (max-width: 420px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: #2D3748;
`;

const DateRange = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: #A0AEC0;
  font-size: 14px;
  font-weight: 700;
`;

const SectionTitle = styled.p`
  font-size: 10px;
  font-weight: 700;
  color: #A0AEC0;
`;

const TransactionItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 5px;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.div`
  width: 35px;
  height: 35px;
  border: ${({ type }) =>
    type === 'in'
      ? '1px solid #E53E3E'
      : type === 'out'
      ? '1px solid #48BB78'
      : '1px solid #A0AEC0'};
  color: ${({ type }) =>
    type === 'in'
      ? '#E53E3E'
      : type === 'out'
      ? '#48BB78'
      : '#A0AEC0'};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Name = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: #2D3748;
`;

const Date = styled.span`
  font-size: 12px;
  font-weight: 700;
  color: #A0AEC0;
`;

const Right = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: ${({ amount, status }) =>
    status === 'Pending'
      ? '#2D3748'
      : amount > 0
      ? '#48BB78'
      : '#E53E3E'};
`;

const transactions = [
  {
    name: 'Netflix',
    date: '27 March 2020, at 12:30 PM',
    amount: -2500,
    type: 'in',
  },
  {
    name: 'Apple',
    date: '27 March 2020, at 12:30 PM',
    amount: 2500,
    type: 'out',
  },
  {
    name: 'Stripe',
    date: '26 March 2020, at 13:45 PM',
    amount: 800,
    type: 'out',
  },
  {
    name: 'HubSpot',
    date: '26 March 2020, at 12:30 PM',
    amount: 1700,
    type: 'out',
  },
  {
    name: 'Webflow',
    date: '26 March 2020, at 05:00 AM',
    status: 'Pending',
    type: 'pending',
  },
  {
    name: 'Microsoft',
    date: '25 March 2020, at 16:30 PM',
    amount: -987,
    type: 'in',
  },
];

const TransactionList = () => {
  return (
    <Container>
      <Header>
        <Title>Your Transactions</Title>
        <DateRange>
          <img src={calandar} alt='icon' /> 
          23 - 30 March 2020
        </DateRange>
      </Header>

      <SectionTitle>Newest</SectionTitle>
      {transactions.slice(0, 2).map((t, i) => (
        <TransactionItem key={i}>
          <Left>
            <IconWrapper type={t.type}>
              {t.type === 'in' && <IoMdArrowDown />}
              {t.type === 'out' && <IoMdArrowUp  />}
              {t.type === 'pending' && <AiOutlineExclamation />}
            </IconWrapper>
            <Info>
              <Name>{t.name}</Name>
              <Date>{t.date}</Date>
            </Info>
          </Left>
          <Right amount={t.amount} status={t.status}>
            {t.status === 'Pending'
              ? 'Pending'
              : `${t.amount > 0 ? '+' : '-'}$${Math.abs(t.amount)}`}
          </Right>
        </TransactionItem>
      ))}

      <SectionTitle>Yesterday</SectionTitle>
      {transactions.slice(2).map((t, i) => (
        <TransactionItem key={i}>
          <Left>
            <IconWrapper type={t.type}>
              {t.type === 'in' && <IoMdArrowDown />}
              {t.type === 'out' && <IoMdArrowUp  />}
              {t.type === 'pending' && <AiOutlineExclamation />}
            </IconWrapper>
            <Info>
              <Name>{t.name}</Name>
              <Date>{t.date}</Date>
            </Info>
          </Left>
          <Right amount={t.amount} status={t.status}>
            {t.status === 'Pending'
              ? 'Pending'
              : `${t.amount > 0 ? '+' : ''}$${Math.abs(t.amount)}`}
          </Right>
        </TransactionItem>
      ))}
    </Container>
  );
};

export default TransactionList;
