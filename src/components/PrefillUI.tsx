import {
  Box,
  Container,
  FormGroup,
  Modal,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

import type { Form } from "../types";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const label = { inputProps: { "aria-label": "Switch demo" } };

const PrefillUI = ({ isOpen, onClose, nodePath }) => {
  console.log("nodePath ", nodePath);
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <FormGroup>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Prefill
          </Typography>
          <Container>
            <Typography
              variant="caption"
              gutterBottom
              sx={{ display: "inline" }}
            >
              Prefill fields for this form
            </Typography>
            <Switch {...label} defaultChecked />
          </Container>
          <TextField
            id="outlined-basic"
            label="dynamic_checkbox_group"
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            label="dynamic_object"
            variant="outlined"
          />
          <TextField id="outlined-basic" label="Email" variant="outlined" />
        </FormGroup>
      </Box>
    </Modal>
  );
};

export default PrefillUI;
