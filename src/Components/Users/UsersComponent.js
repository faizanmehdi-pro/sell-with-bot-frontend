import React, { useState } from 'react'
import styled from "styled-components";
import UsersTable from './UsersTable';
import CreateUser from './CreateUser';

const UsersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin: 40px 10px 20px 40px;
  background: #ffffff;
  border-radius: 30px;
  padding: 20px 30px;
  box-shadow: 0px 10px 60px 0px #e2ecf980;
  
  @media (max-width: 990px) {
    padding: 20px;
    margin: 0;
  }
`;

const Tabs = styled.div`
  display: flex;
  border-bottom: 1px solid #e6e7e9;
`;

const TabButton = styled.button`
  padding: 10px 20px;
  font-size: 13px;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  border: none;
  outline: none;
  background: none;
  border-bottom: ${({ active }) => (active ? "1px solid #3182ce" : "none")};
  color: ${({ active }) => (active ? "#3182ce" : "#212121")};
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    color: #3182ce;
  }
`;

const UsersComponents = () => {
  const [tab, setTab] = useState("list");
  return (
    <UsersContainer>
    <Tabs>
      <TabButton active={tab === "list"} onClick={() => setTab("list")}>
        Users
      </TabButton>
      <TabButton active={tab === "create"} onClick={() => setTab("create")}>
        Create User
      </TabButton>
    </Tabs>
    {tab === "list" ? (
      <UsersTable />
    ) : (
      <CreateUser setTab={setTab}/>
    )}
    </UsersContainer>
  )
}

export default UsersComponents
