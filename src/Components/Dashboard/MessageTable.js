import React, { useState } from "react";
import styled from "styled-components";
import { ImArrowDownLeft, ImArrowUpRight } from "react-icons/im";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { chatTableHistory } from "../../apis/chatTableHistory";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import { LuSearch } from "react-icons/lu";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  padding: 30px;
`;

const SearchWrapper = styled.div`
  height: 63px;
  display: flex;
  align-items: center;
  gap: 20px;
  background: #ffffff;
  border: 1px solid #d6d6d6;
  border-radius: 5px;
  padding: 0 20px;
  gap: 8px;
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 5px;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  font-weight: 500;
  font-family: "Poppins";
  outline: none;

  ::placeholder {
    color: #969ba0;
  }
`;

const TableContainer = styled.div`
  overflow-x: auto;
  box-shadow: 0px 10px 60px 0px #E2ECF980;
  background: #FFFFFF;
  padding: 30px;
  border-radius: 30px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background-color: #3182ce;
  color: #ffffff;
  font-size: 20px;
  font-weight: 500;
  font-family: "Poppins", sans-serif;
  margin-bottom: 30px;

  th:first-child {
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
  }

  th:last-child {
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
  }
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableHeader = styled.th`
  padding: 12px;
  text-align: left;
  border: 1px solid #FFFFFF;
  font-size: 20px;
  font-weight: 500;
  font-family: "Poppins", sans-serif;
  margin-bottom: 30px;
`;

const TableCell = styled.td`
  padding: 12px;
  border: 1px solid #ddd;
  min-width: 120px;
  word-wrap: break-word;
`;

const ToggleWrapper = styled.div`
  position: relative;
  width: 60px;
  height: 30px;
  border-radius: 34px;
  background-color: ${(props) => (props.active ? "#3182CE" : "#dc3545")};
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 5px;
  box-sizing: border-box;
`;

const ToggleTextON = styled.span`
  color: white;
  font-size: 11px;
  font-weight: bold;
  display: ${(props) => (props.active ? "block" : "none")};
  position: absolute;
  left: 6px;
`;

const ToggleTextOFF = styled.span`
  color: white;
  font-size: 11px;
  font-weight: bold;
  display: ${(props) => (props.active ? "none" : "block")};
  position: absolute;
  right: 6px;
`;

const ToggleThumb = styled.div`
  position: absolute;
  top: 2px;
  left: ${(props) => (props.active ? "32px" : "2px")};
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: white;
  transition: left 0.3s;
  z-index: 1;
`;

const Spinner = styled(FaSpinner)`
  color: white;
  font-size: 14px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const ListLoader = styled.div`
  border: 4px solid #3182CE;
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

const MessageTable = () => {
  const userToken = localStorage.getItem("authToken");
  const API_KEY = `token ${userToken}`;
  const [search, setSearch] = useState("");
  const [loadingIndex, setLoadingIndex] = useState(null);
  const queryClient = useQueryClient();

  const toggleBotStatusMutation = useMutation({
    mutationFn: async ({ contact_id, bot_id, status }) => {
      const response = await fetch("http://54.197.41.35/api/off-chat/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: API_KEY,
        },
        body: JSON.stringify({ contact_id, bot_id, status }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update status");
      }

      return response.json();
    },

    onMutate: (variables) => {
      setLoadingIndex(variables.index);
    },

    onSuccess: (response) => {
      toast.success(response.message || "Bot status updated successfully");
    },

    onError: (error) => {
      toast.error(`Failed to update bot status: ${error.message}`);
    },

    onSettled: () => {
      setLoadingIndex(null);
      queryClient.invalidateQueries(["chatResults"]);
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ["chatResults"],
    queryFn: chatTableHistory,
  });

  // if (isLoading) return <Container><ListLoader /></Container>;

  const filteredData = Array.isArray(data)
    ? data.filter((item) =>
        item.contact_id?.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  const toggleStatus = (index) => {
    const selected = filteredData[index];
    const newStatus = selected.status === "True" ? false : true;

    toggleBotStatusMutation.mutate({
      contact_id: selected.contact_id,
      bot_id: selected.bot_id,
      status: newStatus,
      index,
    });
  };

  return (
    <Container>
      <SearchWrapper>
        <LuSearch size={24} color="#969BA0" />
        <SearchBar
          type="text"
          placeholder="Search Message by Contact ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </SearchWrapper>
      <TableContainer>
        <StyledTable>
          <TableHead>
            <tr>
              <TableHeader>Contact ID</TableHeader>
              <TableHeader>Name</TableHeader>
              <TableHeader>Time</TableHeader>
              <TableHeader>Direction</TableHeader>
              <TableHeader>Message</TableHeader>
              <TableHeader>Bot Status</TableHeader>
            </tr>
          </TableHead>
          <tbody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan="6">
                  <ListLoader />
                </TableCell>
              </TableRow>
            ) : filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan="6">No Results Found</TableCell>
              </TableRow>
            ) : (
              filteredData.map((msg, index) => (
                <TableRow key={index}>
                  <TableCell>{msg.contact_id}</TableCell>
                  <TableCell>{msg.contact_name || "N/A"}</TableCell>
                  <TableCell>{msg.time}</TableCell>
                  <TableCell>
                    {msg.direction === "incoming" ? (
                      <ImArrowDownLeft />
                    ) : (
                      <ImArrowUpRight />
                    )}
                  </TableCell>
                  <TableCell>{msg.message}</TableCell>
                  <TableCell align="center">
                    <ToggleWrapper
                      active={msg.status === "True" || msg.status === true}
                      onClick={() => toggleStatus(index)}
                      style={{ opacity: loadingIndex === index ? 0.6 : 1 }}
                    >
                      {loadingIndex === index ? (
                        <Spinner />
                      ) : (
                        <>
                          <ToggleTextON
                            active={
                              msg.status === "True" || msg.status === true
                            }
                          >
                            ON
                          </ToggleTextON>
                          <ToggleTextOFF
                            active={
                              msg.status === "True" || msg.status === true
                            }
                          >
                            OFF
                          </ToggleTextOFF>
                          <ToggleThumb
                            active={
                              msg.status === "True" || msg.status === true
                            }
                          />
                        </>
                      )}
                    </ToggleWrapper>
                  </TableCell>
                </TableRow>
              ))
            )}
          </tbody>
        </StyledTable>
      </TableContainer>
    </Container>
  );
};

export default MessageTable;
