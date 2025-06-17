import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import styled from "styled-components";
import UpdateClientForm from "./UpdateClient";

const StyledTableContainer = styled(TableContainer)`
  max-width: 100%;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.15);
`;

const StyledTableRow = styled(TableRow)`
  &:nth-of-type(even) {
    background-color: #f9f9f9;
  }

  &:hover {
    background-color: #e3f2fd;
    cursor: pointer;
    transition: all 0.3s ease;
  }
`;

const StyledTableCell = styled(TableCell)`
  font-size: 15px;
  padding: 14px;
  color: #333;
`;

const StyledTableHeadCell = styled(TableCell)`
  background-color: #1976d2 !important;
  color: white !important;
  font-weight: bold !important;
  font-size: 16px !important;
`;

const clients = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: 923004567890,
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: 923005678901,
    status: "Pending",
  },
  {
    id: 3,
    name: "David Williams",
    email: "david.williams@example.com",
    phone: 923006789012,
    status: "Active",
  },
  {
    id: 4,
    name: "Sophia Johnson",
    email: "sophia.johnson@example.com",
    phone: 923007890123,
    status: "Pending",
  },
  {
    id: 5,
    name: "Michael Brown",
    email: "michael.brown@example.com",
    phone: 923008901234,
    status: "Active",
  },
  {
    id: 6,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: 923009012345,
    status: "Pending",
  },
  {
    id: 7,
    name: "Daniel Garcia",
    email: "daniel.garcia@example.com",
    phone: 923010123456,
    status: "Active",
  },
  {
    id: 8,
    name: "Olivia Martinez",
    email: "olivia.martinez@example.com",
    phone: 923011234567,
    status: "Pending",
  },
  {
    id: 9,
    name: "Liam Wilson",
    email: "liam.wilson@example.com",
    phone: 923012345678,
    status: "Active",
  },
  {
    id: 10,
    name: "Ava Moore",
    email: "ava.moore@example.com",
    phone: 923013456789,
    status: "Pending",
  },
];

const ClientsTable = () => {
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [selectedClient, setSelectedClient] = React.useState(null);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [clientToDelete, setClientToDelete] = React.useState(null);

  const handleEdit = (client) => {
    setSelectedClient(client);
    setOpenEditModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const numericValue = value.replace(/[^0-9]/g, "");
      setSelectedClient((prev) => ({ ...prev, [name]: numericValue }));
    } else {
      setSelectedClient((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleEditSubmit = () => {
    console.log("Updated client:", selectedClient);
    setOpenEditModal(false);
  };

  const handleCloseModal = () => {
    setOpenEditModal(false);
  };

  const handleDelete = (client) => {
    setClientToDelete(client);
    setOpenDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    console.log("Deleted client:", clientToDelete);
    setOpenDeleteModal(false);
  };

  const handleDeleteCancel = () => {
    setOpenDeleteModal(false);
  };

  return (
    <StyledTableContainer component={Paper}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <StyledTableHeadCell>ID</StyledTableHeadCell>
            <StyledTableHeadCell>Name</StyledTableHeadCell>
            <StyledTableHeadCell>Email</StyledTableHeadCell>
            <StyledTableHeadCell>Phone Number</StyledTableHeadCell>
            <StyledTableHeadCell>Status</StyledTableHeadCell>
            <StyledTableHeadCell align="center">Actions</StyledTableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map((client) => (
            <StyledTableRow key={client.id}>
              <StyledTableCell>{client.id}</StyledTableCell>
              <StyledTableCell>{client.name}</StyledTableCell>
              <StyledTableCell>{client.email}</StyledTableCell>
              <StyledTableCell>{client.phone}</StyledTableCell>
              <StyledTableCell>{client.status}</StyledTableCell>
              <StyledTableCell align="center">
                <IconButton onClick={() => handleEdit(client)} color="primary">
                  <Edit fontSize="small" />
                </IconButton>
                <IconButton onClick={() => handleDelete(client)} color="error">
                  <Delete fontSize="small" />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>

      <UpdateClientForm
        open={openEditModal}
        client={selectedClient}
        onClose={handleCloseModal}
        onChange={handleEditChange}
        onSubmit={handleEditSubmit}
      />

      {/* Delete Confirmation Modal */}
      <Dialog open={openDeleteModal} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete the client:{" "}
          <strong>{clientToDelete?.name}</strong>?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </StyledTableContainer>
  );
};

export default ClientsTable;