import React from "react";
import styled from "styled-components";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Edit, Trash2 } from "lucide-react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Modal } from "@mui/material";
import UpdateBot from "./UpdateBot";
import { toast } from "react-toastify";

// Styled Components
const TableContainer = styled.div`
  width: 90%;
  margin: 20px auto;
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

const ActionIcons = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const IconButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 5px;

  &:hover {
    color: #007bff;
  }
`;

export const fetchBots = async () => {
  try {
    const response = await axios.get("http://api.sellwithbot.com/api/bots/");
    return response.data;
  } catch (error) {
    console.error("Error fetching bots:", error);
    throw new Error("Failed to fetch bots.");
  }
};

const deleteBot = async (id) => {
  try {
    await axios.delete(`http://api.sellwithbot.com/api/bots/${id}/`);
  } catch (error) {
    console.error("Error deleting bot:", error);
    throw new Error("Failed to delete bot.");
  }
};

const BotsList = ({setActiveTab}) => {
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [selectedBotId, setSelectedBotId] = React.useState(null);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["bots"],
    queryFn: fetchBots,
  });

  const mutation = useMutation({
    mutationFn: deleteBot,
    onSuccess: () => {
      queryClient.invalidateQueries(["bots"]);
      setOpenDeleteModal(false);
      toast.success("Bot Deleted Successfully!");
    },
  });
  if (isLoading) return <p>Loading bots...</p>;
  const bots = Array.isArray(data) ? data : [];

  const handleEdit = (id) => {
    setOpenEditModal(true);
    setSelectedBotId(id);
  };

  const handleDelete = (id) => {
    setSelectedBotId(id);
    setOpenDeleteModal(true);
  };

  const confirmDelete = () => {
    if (selectedBotId) {
      mutation.mutate(selectedBotId);
    }
  };

  return (
    <>
      <TableContainer>
        <StyledTable>
          <TableHead>
            <tr>
              <TableHeader>ID</TableHeader>
              <TableHeader>Name</TableHeader>
              <TableHeader>Unique Number</TableHeader>
              <TableHeader>Role</TableHeader>
              <TableHeader>Prompt</TableHeader>
              <TableHeader>Negative Prompt</TableHeader>
              <TableHeader>Actions</TableHeader>
            </tr>
          </TableHead>
          <tbody>
            {bots.length > 0 ? (
              bots.map((bot) => (
                <TableRow key={bot.id}>
                  <TableCell>{bot.id}</TableCell>
                  <TableCell>{bot.name}</TableCell>
                  <TableCell>{bot.unique_number}</TableCell>
                  <TableCell>{bot.role}</TableCell>
                  <TableCell>{bot.prompt}</TableCell>
                  <TableCell>{bot.negative_prompt}</TableCell>
                  <TableCell>
                    <ActionIcons>
                      <IconButton onClick={() => handleEdit(bot.id)}>
                        <Edit size={18} />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(bot.id)}>
                        <Trash2 size={18} color="red" />
                      </IconButton>
                    </ActionIcons>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="7" style={{ textAlign: "center" }}>
                  No bots found.
                </TableCell>
              </TableRow>
            )}
          </tbody>
        </StyledTable>
      </TableContainer>

      {/* Delete Confirmation Modal */}
      <Dialog open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete this bot?</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteModal(false)}>Cancel</Button>
          <Button color="error" onClick={confirmDelete} disabled={mutation.isLoading}>
            {mutation.isLoading ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>

      <Modal open={openEditModal}>
        <UpdateBot setOpenEditModal={setOpenEditModal} botId={selectedBotId} setActiveTab={setActiveTab}/>
      </Modal>
    </>
  );
};

export default BotsList;