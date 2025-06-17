import React, { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  format, parseISO, isWithinInterval,
  getWeekOfMonth, startOfWeek, endOfWeek,
  startOfMonth, endOfMonth, startOfYear, endOfYear,
} from 'date-fns';

// --- Styled Components ---
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  box-shadow: 0px 10px 60px 0px #E2ECF980;
  background: #FFFFFF;
  padding: 30px 20px;
  border-radius: 30px;
`;

const FilterButtons = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
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
      background: #3182CE;
      color: #FFFFFF;
    }
  }
`;

const DateRangeWrapperContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
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

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    .react-datepicker-wrapper {
      width: 100%;
    }
  }
`;

const ChartWrapper = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  width: 800px;
  margin: auto;

  @media (max-width: 990px) {
    width: 100%;
  }
`;

// --- Constants ---
const allData = [
  { date: '2025-01-08', value: 6 },
  { date: '2025-02-10', value: 4 },
  { date: '2025-03-01', value: 8 },
  { date: '2025-01-02', value: 6 },
  { date: '2025-02-03', value: 7 },
  { date: '2025-03-08', value: 6 },
  { date: '2025-04-10', value: 4 },
  { date: '2025-05-01', value: 8 },
  { date: '2025-05-02', value: 6 },
  { date: '2025-05-03', value: 7 },
  { date: '2025-05-10', value: 15 },
  { date: '2025-05-11', value: 11 },
  { date: '2025-05-18', value: 13 },
  { date: '2025-05-19', value: 10 },
  { date: '2025-05-20', value: 7 },
  { date: '2025-05-21', value: 4 },
  { date: '2025-05-22', value: 10 },
  { date: '2025-05-23', value: 5 },
  { date: '2025-05-24', value: 8 },
  { date: '2025-05-25', value: 6 },
  { date: '2025-05-26', value: 9 },
  { date: '2025-05-27', value: 10 },
  { date: '2025-05-28', value: 5 },
  { date: '2025-05-29', value: 8 },
  { date: '2025-05-30', value: 6 },
  { date: '2025-05-31', value: 9 },
  { date: '2025-06-01', value: 10 },
  { date: '2025-07-01', value: 12 },
  { date: '2025-08-20', value: 5 },
  { date: '2025-09-01', value: 10 },
  { date: '2025-10-01', value: 12 },
  { date: '2025-11-15', value: 7 },
  { date: '2025-12-20', value: 5 },
];

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// --- Component ---
const EngagementChart = () => {
  const [view, setView] = useState('Daily');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    const now = new Date();
    if (view === 'Daily') {
      setStartDate(startOfWeek(now, { weekStartsOn: 1 }));
      setEndDate(endOfWeek(now, { weekStartsOn: 1 }));
    } else if (view === 'Weekly') {
      setStartDate(startOfMonth(now));
      setEndDate(endOfMonth(now));
    } else {
      setStartDate(startOfYear(now));
      setEndDate(endOfYear(now));
    }
  }, [view]);

  const handleStartDateChange = (date) => {
    if (view === 'Daily') {
      setStartDate(startOfWeek(date, { weekStartsOn: 1 }));
      setEndDate(endOfWeek(date, { weekStartsOn: 1 }));
    } else if (view === 'Weekly') {
      setStartDate(startOfMonth(date));
      setEndDate(endOfMonth(date));
    } else {
      setStartDate(startOfYear(date));
      setEndDate(endOfYear(date));
    }
  };

  const filteredData = useMemo(() => {
    const inRange = allData.filter((item) =>
      isWithinInterval(parseISO(item.date), { start: startDate, end: endDate })
    );

    if (view === 'Daily') {
      const dayMap = Object.fromEntries(days.map((day) => [day, 0]));

      inRange.forEach((item) => {
        const label = format(parseISO(item.date), 'EEE');
        if (dayMap[label] !== undefined) {
          dayMap[label] += item.value;
        }
      });

      return days.map((day) => ({
        name: day,
        value: dayMap[day] || 0,
      }));
    }

    if (view === 'Weekly') {
      const weekMap = {};
      inRange.forEach((item) => {
        const week = `Week ${getWeekOfMonth(parseISO(item.date))}`;
        weekMap[week] = (weekMap[week] || 0) + item.value;
      });

      return Object.entries(weekMap).map(([name, value]) => ({ name, value }));
    }

    if (view === 'Monthly') {
      const monthMap = {};
      inRange.forEach((item) => {
        const month = format(parseISO(item.date), 'MMM');
        monthMap[month] = (monthMap[month] || 0) + item.value;
      });

      return months.map((month) => ({
        name: month,
        value: monthMap[month] || 0,
      }));
    }

    return [];
  }, [view, startDate, endDate]);

  return (
    <Container>
      <FilterButtons>
        {['Daily', 'Weekly', 'Monthly'].map((option) => (
          <button
            key={option}
            className={view === option ? 'active' : ''}
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
          {' — '}
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
        <h3 style={{ textAlign: 'center' }}>Chat Activity Overview ({view})</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value" fill="#f7941d" barSize={40} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <p style={{ textAlign: 'center', marginTop: '1rem' }}>
          <span style={{ color: '#f7941d', marginRight: 8 }}>●</span>
          Chat Activity Overview
        </p>
      </ChartWrapper>
    </Container>
  );
};

export default EngagementChart;
