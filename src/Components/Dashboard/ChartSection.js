import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useQuery } from "@tanstack/react-query";
import {
  format,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
} from "date-fns";
import { fetchChatActivity } from "../../apis/WebHook/fetchChatActivity";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  box-shadow: 0px 10px 60px 0px #e2ecf980;
  background: #ffffff;
  padding: 30px 20px;
  border-radius: 30px;

  @media (max-width: 500px) {
    padding: 30px 10px;
  }
`;

const FilterButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 10px;

  button {
    padding: 8px 16px;
    border: none;
    border-radius: 8px;
    background: #f0f0f0;
    cursor: pointer;
    transition: all 0.3s ease;

    &.active,
    &:hover {
      background: #3182ce;
      color: #ffffff;
    }
  }
`;

const DateRangeWrapperContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const DateRangeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 8px;

  .react-datepicker-wrapper {
    width: 120px;
  }

  .react-datepicker__input-container input {
    width: 100%;
    padding: 8px 10px;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    outline: none;
  }

  @media (max-width: 500px) {
    gap: 5px;
    padding: 4px;

    .react-datepicker-wrapper {
      width: 90px;
    }

    .react-datepicker__input-container input {
      width: 100%;
      padding: 8px 10px;
      border: none;
      border-radius: 6px;
      font-size: 12px;
      outline: none;
    }
  }
`;

const ChartWrapper = styled.div`
  padding: 1rem;
  width: 800px;
  margin: auto;
  height: 400px;

  @media (max-width: 1250px) {
    width: 100%;
  }

  @media (max-width: 500px) {
    padding: 10px 0;
    margin: 0;
    margin-left: 0;
  }
`;

const ListLoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px;
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

const EngagementChart = () => {
  const [view, setView] = useState("Daily");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // Auto-adjust dates when view changes
  useEffect(() => {
    const now = new Date();
    if (view === "Daily") {
      setStartDate(startOfWeek(now, { weekStartsOn: 1 }));
      setEndDate(endOfWeek(now, { weekStartsOn: 1 }));
    } else if (view === "Weekly") {
      setStartDate(startOfMonth(now));
      setEndDate(endOfMonth(now));
    } else {
      setStartDate(startOfYear(now));
      setEndDate(endOfYear(now));
    }
  }, [view]);

  const handleStartDateChange = (date) => {
    if (view === "Daily") {
      setStartDate(startOfWeek(date, { weekStartsOn: 1 }));
      setEndDate(endOfWeek(date, { weekStartsOn: 1 }));
    } else if (view === "Weekly") {
      setStartDate(startOfMonth(date));
      setEndDate(endOfMonth(date));
    } else {
      setStartDate(startOfYear(date));
      setEndDate(endOfYear(date));
    }
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["chat-activity", view, startDate, endDate],
    queryFn: () =>
      fetchChatActivity({
        view,
        start_date: format(startDate, "yyyy-MM-dd"),
        end_date: format(endDate, "yyyy-MM-dd"),
      }),
    keepPreviousData: true,
  });

  const chartData =
    data?.labels?.map((label, i) => ({
      name: label,
      value: data.data[i],
    })) || [];

  return (
    <Container>
      <FilterButtons>
        {["Daily", "Weekly", "Monthly"].map((option) => (
          <button
            key={option}
            className={view === option ? "active" : ""}
            onClick={() => setView(option)}
          >
            {option}
          </button>
        ))}
      </FilterButtons>

      <DateRangeWrapperContainer>
        <span>Filter by date:</span>
        <DateRangeWrapper>
          <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            dateFormat="MMM d, yyyy"
          />
          {" — "}
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            dateFormat="MMM d, yyyy"
          />
        </DateRangeWrapper>
      </DateRangeWrapperContainer>

      <ChartWrapper>
        <h3 style={{ textAlign: "center", marginBottom: "10px" }}>
          {data?.title || `Chat Activity Overview (${view})`}
        </h3>

        {isLoading ? (
          <ListLoaderContainer>
            <ListLoader />
          </ListLoaderContainer>
        ) : error ? (
          <p style={{ textAlign: "center", color: "red" }}>
            Failed to load data
          </p>
        ) : (
          <>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData} margin={{ left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar
                  dataKey="value"
                  fill="#f7941d"
                  barSize={40}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
            <p style={{ textAlign: "center", marginTop: "1rem" }}>
              <span style={{ color: "#f7941d", marginRight: 8 }}>●</span>
              Chat Activity Overview
            </p>
          </>
        )}
      </ChartWrapper>
    </Container>
  );
};

export default EngagementChart;
