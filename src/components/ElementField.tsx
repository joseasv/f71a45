import { InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";

const ElementField = ({ selectedElement, deleteElement, openSelector, index }) => {
  return (
    <>
      <TextField
        id="outlined-basic"
        label="dynamic_checkbox_group"
        variant="outlined"
        value={selectedElement}
        onClick={() =>{
          openSelector(index)
        }}
        slotProps={{
          input: {
            endAdornment: selectedElement.length > 0 && (
              <div
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  console.log("delete element");
                  deleteElement();
                }}
              >
                <InputAdornment position="end">
                  <ClearIcon />
                </InputAdornment>
              </div>
            ),
            readOnly: true,
          },
        }}
      />
    </>
  );
};

export default ElementField;
