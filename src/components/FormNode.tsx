import { Handle, Position } from "@xyflow/react";

const nodeStyle = {
  background: "#ffffff",
  border: "1px solid #222",
  borderRadius: "8px",
  padding: "12px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
};

const FormNode = ({ data }) => {
  console.log("formNode with data ", data);

  return (
    <div style={nodeStyle}>
      <Handle type="target" position={Position.Left} />
      <div>
        <div>Form</div>
        <label>{data.name}</label>
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default FormNode;
