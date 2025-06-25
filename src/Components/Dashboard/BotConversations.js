import React, { useState } from "react";
import styled from "styled-components";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { chatTableHistory } from "../../apis/chatTableHistory";
import { ImArrowDownLeft, ImArrowUpRight } from "react-icons/im";
import { FaSpinner } from "react-icons/fa";
import { LuSearch } from "react-icons/lu";

// Reuse your styled components for container, card, header, etc.

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  padding: 30px;
  width: 100%;
  max-width: 100%;
  overflow: hidden;

  @media (max-width: 990px) {
    padding: 0;
    gap: 0;
  }
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
  border-radius: 30px;

  @media (max-width: 768px) {
    height: 48px;
  }
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

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

// Responsive styles for react-super-responsive-table override + mobile stacked cards
const StyledTable = styled(Table)`
  width: 100%;
  max-width: 100%;
  border-collapse: separate;
  box-shadow: 0px 10px 60px 0px #e2ecf980;
  background: #ffffff;
  padding: 20px;
  border-radius: 30px;

  tr {
    &:nth-child(even) {
      background-color: #f2f2f2;
    }
  }

  th {
    color: #b5b7c0;
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    font-size: 14px;
    border-bottom: 1px solid #eeeeee;
    text-align: left;
    padding: 12px 10px;
  }

  th:last-child {
    text-align: center;
  }

  td {
    color: #292d32;
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    font-size: 14px;
    padding: 12px 10px;
    border-bottom: 1px solid #eeeeee;
    max-width: 200px;
    /* vertical-align: top; */
  }

  td:nth-child(5) {
    max-width: 300px;
    text-align: justify;
  }

  td:last-child {
    min-width: 100px;
    max-width: 100px;
  }

  td.status-cell {
    text-align: center;
  }

  @media (max-width: 1350px) {
    thead {
      display: none;
    }
    margin-top: 30px;
    tr {
      display: block;
      margin-bottom: 1.5rem;
      border-radius: 10px;
      padding: 1rem;
      border: 1px solid #e6e7e9;
    }
    td {
      display: flex;
      justify-content: space-between;
      padding: 0.5rem;
      border-bottom: none;
      font-size: 14px;
      font-weight: 500;
      max-width: 100%;
    }

    td:nth-child(5) {
      max-width: 100%;
    }

    td:last-child {
      max-width: 100%;
    }

    td::before {
      content: attr(data-label);
      font-weight: 500;
      color: #b5b7c0;
      width: 100px;
      flex-shrink: 0;
      text-align: left;
      font-family: "Poppins", sans-serif;
    }
  }

  @media (max-width: 640px) {
    tbody tr {
      border: 1px solid #e6e7e9;
    }

    .tdBefore {
      color: #b5b7c0;
      font-family: "Poppins", sans-serif;
      font-weight: 500;
      font-size: 12px;
    }

    td.pivoted {
      padding-left: 100px !important;
      justify-content: flex-end;
    }

    td::before {
      content: attr(data-label);
      display: none;
    }

    td {
      word-break: break-all;
      font-size: 12px;
    }
  }

  @media (max-width: 370px) {
    .tdBefore {
      font-size: 10px;
    }

    td {
      font-size: 10px;
      text-align: right;
    }
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

const ToggleWrapperContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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

const BotConversation = () => {
  const userToken = sessionStorage.getItem("authToken");
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

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["chatResults"],
    queryFn: chatTableHistory,
    retry: false,
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

      <StyledTable>
        <Thead>
          <Tr>
            <Th>Contact ID</Th>
            <Th>Name</Th>
            <Th>Time</Th>
            <Th>Direction</Th>
            <Th>Message</Th>
            <Th>Bot Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {isLoading ? (
            <Tr>
              <Td colSpan="5">
                <ListLoader />
              </Td>
            </Tr>
          ) : isError ? (
            <Tr>
              <Td colSpan="5">{error?.message || "Error fetching users"}</Td>
            </Tr>
          ) : data?.length === 0 ? (
            <Tr>
              <Td colSpan="5" style={{ textAlign: "left", padding: "1rem" }}>
                No Data Found.
              </Td>
            </Tr>
          ) : (
            filteredData?.map((cust, index) => (
              <Tr key={index}>
                <Td data-label="Contact ID">{cust.contact_id}</Td>
                <Td data-label="Name">{cust.contact_name}</Td>
                <Td data-label="Time">{cust.time}</Td>
                <Td data-label="Direction">
                  {cust.direction === "incoming" ? (
                    <ImArrowDownLeft />
                  ) : (
                    <ImArrowUpRight />
                  )}
                </Td>
                <Td data-label="Message">{cust.message}</Td>
                <Td data-label="Bot Status">
                  <ToggleWrapperContainer>
                    <ToggleWrapper
                      active={cust.status === "True" || cust.status === true}
                      onClick={() => toggleStatus(index)}
                      style={{ opacity: loadingIndex === index ? 0.6 : 1 }}
                    >
                      {loadingIndex === index ? (
                        <Spinner />
                      ) : (
                        <>
                          <ToggleTextON
                            active={
                              cust.status === "True" || cust.status === true
                            }
                          >
                            ON
                          </ToggleTextON>
                          <ToggleTextOFF
                            active={
                              cust.status === "True" || cust.status === true
                            }
                          >
                            OFF
                          </ToggleTextOFF>
                          <ToggleThumb
                            active={
                              cust.status === "True" || cust.status === true
                            }
                          />
                        </>
                      )}
                    </ToggleWrapper>
                  </ToggleWrapperContainer>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </StyledTable>
    </Container>
  );
};

export default BotConversation;
