import React, {useState} from "react";
import styled from "styled-components";
import { ImArrowDownLeft, ImArrowUpRight  } from "react-icons/im";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  outline: none;
`;

const TableContainer = styled.div`
  overflow-x: auto;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ddd;
`;

const TableHead = styled.thead`
  background-color: #007bff;
  color: white;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableHeader = styled.th`
  padding: 12px;
  text-align: left;
  border: 1px solid #ddd;
`;

const TableCell = styled.td`
  padding: 12px;
  border: 1px solid #ddd;
  word-wrap: break-word;
`;

const MessageTable = () => {
    const [search, setSearch] = useState("");
    const data = [
        { id: "M31gY12as...", time: "02/24 18:43:1", direction: "incoming", message: "Great, this will only take 2-3 minutes. Do you already have freelancing experience, or are you just getting started?", attempt: "name", cost: "$0.04" },
        { id: "M31gY25as...", time: "02/24 18:43:1", direction: "outgoing", message: "hello", attempt: "", cost: "$0.04" },
        { id: "03jYW55as...", time: "02/01 23:28:5", direction: "incoming", message: "Thank you for the link! Before I proceed, could you please share your email address so I can keep you updated?", attempt: "email", cost: "$0.04" },
      ];

      const filteredData = data.filter((item) =>
        item.id.toLowerCase().includes(search.toLowerCase())
      );
  return (
    <Container>
      <SearchBar
        type="text"
        placeholder="Search Message by Contact ID..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <TableContainer>
        <StyledTable>
          <TableHead>
            <tr>
            <TableHeader>Contact ID</TableHeader>
            <TableHeader>Time</TableHeader>
            <TableHeader>Direction</TableHeader>
            <TableHeader>Message</TableHeader>
            <TableHeader>Attempt</TableHeader>
            <TableHeader>Cost</TableHeader>
          </tr>
          </TableHead>
        <tbody>
          {filteredData.map((msg, index) => (
            <TableRow key={index}>
              <TableCell>{msg.id}</TableCell>
              <TableCell>{msg.time}</TableCell>
              <TableCell>
  {msg.direction === "incoming" ? <ImArrowDownLeft /> : <ImArrowUpRight />}
</TableCell>
              <TableCell>{msg.message}</TableCell>
              <TableCell>{msg.attempt}</TableCell>
              <TableCell>{msg.cost}</TableCell>
            </TableRow>
          ))}
        </tbody>
        </StyledTable>
      </TableContainer>
    </Container>
  );
};

export default MessageTable;
