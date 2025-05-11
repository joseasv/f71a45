import {
  Box,
  Container,
  Drawer,
  FormGroup,
  InputAdornment,
  Modal,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

import type { Form } from "../types";
import type { Node } from "@xyflow/react";
import { useState } from "react";

import ClearIcon from "@mui/icons-material/Clear";
import ElementField from "./ElementField";
import ElementSelectorModal from "./ElementSelectorModal";

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

const PrefillUI = ({ isOpen, onClose, nodePath, forms }) => {
  const [elements, setElements] = useState<string[]>(["", "", ""]);
  const [selectedElementIndex, setSelectedElementIndex] = useState<number>(0);
  const [isElementSelectorOpen, setElementSelectorOpen] = useState(false);

  if (isOpen === false) return null;
  console.log("nodePath ", nodePath);
  const nodePathArray = Array.from(nodePath);
  const formsData = nodePathArray.map((currentNode, index) => {
    const componentId = currentNode.data.component_id
    const nodeForm = forms.find(formData => formData.id === componentId)
    if (nodeForm){
      return {formName: currentNode.data.name, formData: nodeForm}
    }
  })
  console.log("formsData", formsData)
  const currentNode: Node = nodePathArray[0];
  const lastNode: Node = nodePathArray[nodePathArray[nodePathArray.length - 1]];

  const openSelector = (index) => {
    setElementSelectorOpen(true);
    setSelectedElementIndex(index)
  };

  const updateElement = (indexToMod: number, newElement: string) => {
    setElements(
      elements.map((element, index) => {
        if (indexToMod === index) {
          return newElement;
        }
        return element;
      }),
    );
  };


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
            Prefill for {currentNode.data.name}
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
          <ElementField
            selectedElement={elements[0]}
            deleteElement={() => {
              setElements(["", elements[1], elements[2]]);
            }}
            openSelector={openSelector}
            index ={0}
          />
          <ElementField
            selectedElement={elements[1]}
            deleteElement={() => {
              setElements([elements[0], "", elements[2]]);
            }}
            openSelector={openSelector}
            index ={1}
          />
          <ElementField
            selectedElement={elements[2]}
            deleteElement={() => {
              setElements([elements[0], elements[1], ""]);
            }}
            openSelector={openSelector}
            index ={2}
          />
          <ElementSelectorModal
            open={isElementSelectorOpen}
            handleClose={() => {
              setElementSelectorOpen(false);
            }}
            selectedElementIndex={selectedElementIndex}
            updateElement={updateElement}
            data={formsData}
          />
        </FormGroup>
      </Box>
    </Modal>
  );
};

export default PrefillUI;
