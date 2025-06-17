import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box
} from "@mui/material";

const AddClientForm = ({ open, onClose, onChange, onSubmit, client }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add New Client</DialogTitle>
      <DialogContent>
        <Box display="flex" flexWrap="wrap" gap={2}>
          <Box width={{ xs: "100%", sm: "48%" }}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={client?.name || ""}
              onChange={onChange}
              margin="dense"
            />
          </Box>
          <Box width={{ xs: "100%", sm: "48%" }}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={client?.email || ""}
              onChange={onChange}
              margin="dense"
            />
          </Box>
          <Box width={{ xs: "100%", sm: "48%" }}>
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              type="tel"
              value={client?.phone || ""} 
              onChange={onChange}
              margin="dense"
              inputProps={{
                inputMode: "numeric", // For mobile numeric keyboard
              }}
            />
          </Box>
          <Box width={{ xs: "100%", sm: "48%" }}>
            <TextField
              fullWidth
              label="Status"
              name="status"
              value={client?.status || ""}
              onChange={onChange}
              margin="dense"
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSubmit} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddClientForm;
