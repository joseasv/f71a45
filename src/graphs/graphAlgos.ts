import { type Node } from "@xyflow/react";
import Graph from "./graph";

const breadthFirstSearch = (graph: Graph, startNode: Node) => {
  const visited = new Set<Node>();
  const queue: Node[] = [startNode];

  while (queue.length > 0) {
    const currentNode: Node | undefined = queue.shift();

    if (currentNode) {
      visited.add(currentNode);

      const neighbors = graph.adyacents(currentNode?.id);
      if (neighbors) {
        for (const neighbor of neighbors) {
          if (!visited.has(neighbor)) {
            queue.push(neighbor);
          }
        }
      }
    }
  }

  return visited;
};

export default breadthFirstSearch;
