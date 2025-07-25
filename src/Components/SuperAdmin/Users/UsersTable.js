import React, { useState } from "react";
import styled from "styled-components";
import { LuSearch } from "react-icons/lu";
import { BsChevronCompactDown } from "react-icons/bs";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { LuPencil } from "react-icons/lu";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { useQuery } from "@tanstack/react-query";
import { getAdminUsers } from "../../../apis/SuperAdmin/getAdminUsers";
import UpdateUser from "./UpdateUser";
import DeleteUser from "./DeleteUser";

// Reuse your styled components for container, card, header, etc.

const Container = styled.div`
  min-height: 100vh;
`;

const Card = styled.div`
  background: #ffffff;
  border-radius: 30px;
  padding: 2rem;
  box-shadow: 0px 10px 60px 0px #e2ecf980;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;

  @media (max-width: 500px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
`;

const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const MainTitle = styled.h2`
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 22px;
  color: #000000;
`;

const SearchSort = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 1100px) {
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
  }

  @media (max-width: 500px) {
    justify-content: flex-end;
    align-items: flex-end;
    width: 100%;
  }
`;

const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.5rem;
  font-size: 14px;

  @media (max-width: 768px) {
    justify-content: center;
    flex-direction: column;
    gap: 10px;
  }
`;

const PaginationHeading = styled.p`
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #b5b7c0;
`;

const PageNumbers = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 15px;

  button {
    width: 26px;
    height: 26px;
    border: 1px solid #eeeeee;
    border-radius: 4px;
    background: #f5f5f5;
    cursor: pointer;
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    font-size: 12px;
    color: #404b52;

    &.active {
      background: #3182ce;
      border: 1px solid #dadada;
      color: #ffffff;
    }
  }

  @media (max-width: 500px) {
    gap: 10px;
  }
`;

// Search input & dropdown styles reused (not shown here for brevity)

const SearchWrapper = styled.div`
  width: 240px;
  height: 40px;
  display: flex;
  align-items: center;
  gap: 20px;
  background: #f9fbff;
  border-radius: 10px;
  padding: 0 20px;
  gap: 8px;

  @media (max-width: 500px) {
    width: 100%;
  }
`;

const StyledSearchInput = styled.input`
  border: none;
  outline: none;
  background: none;
  color: #3d3c42;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 12px;
  width: 160px;

  &::placeholder {
    font-family: "Poppins", sans-serif;
    font-weight: 400;
    font-size: 12px;
    color: #b5b7c0;
  }

  @media (max-width: 500px) {
    width: 90%;
  }
`;

const DropDownContainer = styled.div`
  position: relative;

  @media (max-width: 500px) {
    width: 100%;
  }
`;

const DropdownButton = styled.button`
  background: #f9fbff;
  border: none;
  padding: 0 20px;
  border-radius: 10px;
  font-size: 14px;
  color: #555;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  width: 240px;
  height: 40px;

  @media (max-width: 500px) {
    width: 100%;
  }
`;

const Label = styled.span`
  color: #7e7e7e;
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  font-size: 12px;
`;

const SelectField = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 125px;

  @media (max-width: 500px) {
    width: 70%;
  }
`;

const Bold = styled.span`
  color: #3d3c42;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 12px;
`;

const Menu = styled.ul`
  position: absolute;
  top: 110%;
  right: 0;
  background: white;
  border: 1px solid #eee;
  border-radius: 8px;
  list-style: none;
  padding: 8px 0;
  margin: 0;
  width: 160px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
`;

const MenuItem = styled.li`
  padding: 10px 16px;
  cursor: pointer;
  font-size: 14px;
  color: #333;

  &:hover {
    background-color: #f1f5f9;
  }
`;

// Responsive styles for react-super-responsive-table override + mobile stacked cards
const StyledTable = styled(Table)`
  width: 100%;
  margin-top: 1rem;
  border-collapse: separate;

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
  }

  td.status-cell {
    text-align: center;
  }

  /* For screen widths <= 1300px show stacked cards */
  @media (max-width: 1300px) {
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
    }
    td::before {
      content: attr(data-label);
      font-weight: 500;
      color: #b5b7c0;
      width: 50%;
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
      font-size: 14px;
    }

    td.pivoted {
      padding-left: 0 !important;
      justify-content: flex-end;
    }

    td::before {
      content: attr(data-label);
      display: none;
    }
  }

  @media (max-width: 500px) {
    .tdBefore {
      font-size: 11px;
    }

    td {
      font-size: 11px;
      text-align: right;
    }
  }

  @media (max-width: 370px) {
    .tdBefore {
      font-size: 10px;
    }

    td {
      font-size: 10px;
    }
  }
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  align-items: center;
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

const options = ["Newest", "Oldest", "A-Z", "Z-A"];

const UsersTable = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Newest");
  const [page, setPage] = useState(1);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
const [showDeleteModal, setShowDeleteModal] = useState(false);
const [selectedUser, setSelectedUser] = useState(null);


  const { data, isLoading, isError } = useQuery({
    queryKey: ["users", page],
    queryFn: () => getAdminUsers(page),
    keepPreviousData: true,
  }); 

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
  };


  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowUpdateModal(true);
  };
  
  const handleDelete = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  return (
    <Container>
      <Card>
        <Header>
          <TitleGroup>
            <MainTitle>All Users</MainTitle>
          </TitleGroup>
          <SearchSort>
            <SearchWrapper>
              <LuSearch size={24} color="#7E7E7E" />
              <StyledSearchInput placeholder="Search" />
            </SearchWrapper>

            <DropDownContainer>
              <DropdownButton onClick={() => setIsOpen(!isOpen)}>
                <Label>Short by :</Label>
                <SelectField>
                  <Bold>{selected}</Bold>
                  <BsChevronCompactDown size={24} color="#3D3C42" />
                </SelectField>
              </DropdownButton>
              {isOpen && (
                <Menu>
                  {options.map((option) => (
                    <MenuItem key={option} onClick={() => handleSelect(option)}>
                      {option}
                    </MenuItem>
                  ))}
                </Menu>
              )}
            </DropDownContainer>
          </SearchSort>
        </Header>

        <StyledTable>
          <Thead>
            <Tr>
              <Th>Full Name</Th>
              <Th>Phone Number</Th>
              <Th>Email</Th>
              <Th>User Type</Th>
              <Th>Action</Th>
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
                <Td colSpan="5">Error fetching users</Td>
              </Tr>
            ) : (
              data?.results?.map((cust, index) => (
                <Tr key={index}>
                  <Td data-label="Full Name">{cust.full_name || "N/A"}</Td>
                  <Td data-label="Phone Number">
                    {cust.phone_number || "N/A"}
                  </Td>
                  <Td data-label="Email">{cust.email || "N/A"}</Td>
                  <Td data-label="User Type">{cust.user_type || "N/A"}</Td>
                  <Td data-label="Action" className="status-cell">
                    <ActionButtons>
                      <button
                        onClick={() => handleEdit(cust)}
                        style={{ background: "none", border: "none", cursor: "pointer" }}
                      >
                        <LuPencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(cust)}
                        style={{ background: "none", border: "none", cursor: "pointer" }}
                      >
                        <MdOutlineDeleteOutline size={20} />
                      </button>
                    </ActionButtons>
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </StyledTable>

        <Pagination>
          <PaginationHeading>
            Showing data {(page - 1) * 8 + 1} to{" "}
            {Math.min(page * 8, data?.count || 0)} of {data?.count || 0} entries
          </PaginationHeading>
          <PageNumbers>
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
            >
              <FaAngleLeft />
            </button>
            {[...Array(Math.ceil((data?.count || 1) / 8)).keys()]
              .slice(0, 5)
              .map((p) => (
                <button
                  key={p + 1}
                  onClick={() => setPage(p + 1)}
                  className={page === p + 1 ? "active" : ""}
                >
                  {p + 1}
                </button>
              ))}
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page >= Math.ceil((data?.count || 1) / 8)}
            >
              <FaAngleRight />
            </button>
          </PageNumbers>
        </Pagination>
      </Card>
      <UpdateUser
  isOpen={showUpdateModal}
  onClose={() => setShowUpdateModal(false)}
  user={selectedUser}
/>

<DeleteUser
  isOpen={showDeleteModal}
  onClose={() => setShowDeleteModal(false)}
  user={selectedUser}
/>
    </Container>
  );
};

export default UsersTable;
