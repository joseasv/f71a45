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

import Graph from "../graphs/graph";
import type { Form, Node as NodeAvantos, Edge as EdgeAvantos } from "../types";

import { getActionBlueprint } from "../services/avantos";
import FormNode from "../components/FormNode";
import PrefillUI from "../components/PrefillUI";
import breadthFirstSearch from "../graphs/graphAlgos";
import type { ActionBlueprintGraphGetParams } from "../types";

const nodeTypes = {
  formNode: FormNode,
};

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

const JourneyBuilder = ({
  tenant_id,
  action_blueprint_id,
  blueprint_version_id,
}: ActionBlueprintGraphGetParams) => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [allFormsData, setAllFormsData] = useState<Form[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [nodeFormData, setNodeFormData] = useState<Form>();
  const [graph, setGraph] = useState<Graph>();
  const [nodePath, setNodePath] = useState<Set<NodeAvantos>>(
    new Set<NodeAvantos>(),
  );

  useEffect(() => {
    console.log("use effect ", nodes);

    const getBlueprint = async () => {
      const response = await getActionBlueprint({
        tenant_id,
        action_blueprint_id,
        blueprint_version_id,
      });

      console.log(response);

      if (
        response.nodes !== null &&
        response.edges !== null &&
        response.forms !== null
      ) {
        const nodes: Node[] = response.nodes.map((bNode: NodeAvantos) => {
          console.log("creating node ", bNode.data.name);
          const node: Node = {
            id: bNode.id,
            position: bNode.position,
            data: { ...bNode.data },
            type: "formNode",
          };
          return node;
        });

        const edges: Edge[] = response.edges.map(
          (bEdge: EdgeAvantos, index) => {
            const edge: Edge = {
              id: index.toString(),
              source: bEdge.source,
              target: bEdge.target,
            };

            return edge;
          },
        );

        console.log("react flow nodes ", nodes);
        console.log("react flow edges ", edges);

        setNodes(nodes);
        setEdges(edges);
        setAllFormsData(response.forms);
        setGraph(new Graph(response.nodes, response.edges));
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

  const onNodeClick = (event, node: Node) => {
    if (node !== null) {
      console.log("clicked node ", node);
      setModalOpen(true);
      setNodeFormData(
        allFormsData.find((elem) => elem.id === node.data.component_id),
      );
      const selectedNode: NodeAvantos | undefined = nodes.find(
        (nodeElem) => nodeElem.id === node.id,
      );
      setNodePath(breadthFirstSearch(graph, selectedNode));
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
      />
      <PrefillUI
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        nodePath={nodePath}
        forms={allFormsData}
      />
    </div>
  );
};

export default JourneyBuilder;
