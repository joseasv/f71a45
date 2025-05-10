import { useCallback, useEffect, useState } from "react";
import {
  ReactFlow,
  addEdge,
  type Node,
  type OnConnect,
  type OnNodesChange,
  type OnEdgesChange,
  applyNodeChanges,
  type Edge,
  applyEdgeChanges,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { getActionBlueprint } from "./services/avantos";
import FormNode from "./components/FormNode";

// GET URL http://localhost:3000/api/v1/1/actions/blueprints/1/graph

const nodeTypes = {
  formNode: FormNode,
};

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

export default function App() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  useEffect(() => {
    console.log("use effect ", nodes);

    const getBlueprint = async () => {
      const response = await getActionBlueprint({
        tenant_id: "1",
        action_blueprint_id: "1",
        blueprint_version_id: "1",
      });

      console.log(response);

      if (response.nodes !== null && response.edges !== null) {
        const nodes: Node[] = response.nodes.map((bNode) => {
          console.log("creating node ", bNode.data.name);
          const node: Node = {
            id: bNode.id,
            position: bNode.position,
            data: {
              typeText: bNode.type,
              formText: bNode.data.name,
            },
            type: "formNode",
          };
          return node;
        });

        const edges: Edge[] = response.edges.map((bEdge, index) => {
          const edge: Edge = {
            id: index.toString(),
            source: bEdge.source,
            target: bEdge.target,
          };

          return edge;
        });

        console.log("react flow nodes ", nodes);
        console.log("react flow edges ", edges);

        setNodes(nodes);
        setEdges(edges);
      }
    };
    getBlueprint();
  }, []);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges],
  );

  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
  );

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
      />
    </div>
  );
}
