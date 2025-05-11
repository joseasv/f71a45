import {
  Box,
  Button,
  Collapse,
  Container,
  FormGroup,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';


import React, { useState } from "react";
import NestedElementList from "./NestedElementList";


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

const ElementSelectorModal = ({
  open,
  handleClose,
  selectedElementIndex,
  updateElement,
  data,
}) => {
    const [toggles, setToggles] = useState<boolean[]>(Array(data.length).fill(false))

    const handleToggle=(index) => {
        setToggles(toggles.map((elem, curIndex) => {
            if (index === curIndex) {
                return !elem
            }
            return elem
        }))
    }

  if (!open) return null;
  console.log("data", data);

  return (
    <React.Fragment>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <List style={{maxHeight: 400, overflow: 'auto'}}>
            {data.map((nodeData, index) => (
            <ListItem key={index}>
              <ListItemButton onClick={()=>{handleToggle(index)}} >{nodeData.formName}


              </ListItemButton>
               <NestedElementList data={nodeData.formData} onClick={updateElement} selectedElementIndex={selectedElementIndex} />
            </ListItem>

            ))}
          </List>

          <Button onClick={handleClose}>Close Child Modal</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default ElementSelectorModal;
