import React from "react";
import styled from "styled-components";
import TR from "../../../assets/SuperAdmin/billing/tr.png";
import TPA from "../../../assets/SuperAdmin/billing/tpa.png";
import OI from "../../../assets/SuperAdmin/billing/oi.png";
import UP from "../../../assets/SuperAdmin/billing/up.png";
import UpIcon from "../../../assets/SuperAdmin/dashboardStats/up.png";
import DownIcon from "../../../assets/SuperAdmin/dashboardStats/down.png";
import { getAdminBillingSummary } from "../../../apis/SuperAdmin/getAdminBillingSummary";
import { useQuery } from "@tanstack/react-query";

const StatsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  column-gap: 20px;
  row-gap: 40px;
  padding: 30px;
  background: #ffffff;
  border-radius: 30px;
  box-shadow: 0px 10px 60px 0px #e2ecf980;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const StatCard = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
  border-right: 1.5px solid #f0f0f0;

  &:last-child {
    border-right: none;
  }

  @media (max-width: 768px) {
    border-right: none;
  }
`;

const IconWrapper = styled.div`
  background: #cce6ff;
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
  font-family: "Poppins", sans-serif;
`;

const StatLabel = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: #acacac;
  font-family: "Poppins", sans-serif;
  white-space: nowrap;
`;

const Trend = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  font-weight: 400;
  color: #292d32;
  font-family: "Poppins", sans-serif;
  white-space: nowrap;

  span {
    color: ${(props) => (props.trend === "up" ? "#3182CE" : "#D0004B")};
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
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const ErrorMessage = styled.div`
  color: #d0004b;
  font-weight: bold;
  font-size: 16px;
  text-align: left;
`;

const BillingStats = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["billingSummary"],
    queryFn: getAdminBillingSummary,
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
        <ErrorMessage>Failed to Load Billing Summary</ErrorMessage>
      </StatsWrapper>
    );
  }

  const {
    total_revenue = 0,
    top_paying_agencies = 0,
    overdue_invoices = 0,
    upcoming_payments = 0,
  } = data || {};

  return (
    <StatsWrapper>
      <StatCard>
        <IconWrapper>
          <img src={TR} alt="Total Revenue" />
        </IconWrapper>
        <StatInfo>
          <StatLabel>Total revenue</StatLabel>
          <StatValue>{total_revenue}</StatValue>
          <Trend trend="up">
            <img src={UpIcon} alt="up" /> <span>+16%</span> this month
          </Trend>
        </StatInfo>
      </StatCard>

      <StatCard>
        <IconWrapper>
          <img src={TPA} alt="Top Paying Agencies" />
        </IconWrapper>
        <StatInfo>
          <StatLabel>Top paying agencies</StatLabel>
          <StatValue>{top_paying_agencies}</StatValue>
          <Trend trend="down">
            <img src={DownIcon} alt="down" /> <span>-1%</span> this month
          </Trend>
        </StatInfo>
      </StatCard>

      <StatCard>
        <IconWrapper>
          <img src={OI} alt="Overdue Invoices" />
        </IconWrapper>
        <StatInfo>
          <StatLabel>Overdue invoices</StatLabel>
          <StatValue>{overdue_invoices}</StatValue>
        </StatInfo>
      </StatCard>

      <StatCard>
        <IconWrapper>
          <img src={UP} alt="Upcoming Payments" />
        </IconWrapper>
        <StatInfo>
          <StatLabel>Upcoming payments</StatLabel>
          <StatValue>{upcoming_payments}</StatValue>
        </StatInfo>
      </StatCard>
    </StatsWrapper>
  );
};

export default BillingStats;
