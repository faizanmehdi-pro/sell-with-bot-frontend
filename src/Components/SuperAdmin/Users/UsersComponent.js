import React from 'react'
import styled from "styled-components";
import UsersTable from './UsersTable';

const UsersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 20px 10px 20px 40px;

  @media (max-width: 990px) {
    padding: 0;
  }
`;

const AdminUsersComponents = () => {
  return (
    <UsersContainer>
      <UsersTable />
    </UsersContainer>
  )
}

export default AdminUsersComponents
