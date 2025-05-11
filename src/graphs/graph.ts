import { type Node, type Edge } from "@xyflow/react";

class RFGraph {
  #ady: Map<string, Node[]>;
  #numV: number;
  constructor(nodes: Node[], edges: Edge[]) {
    this.#ady = new Map();
    this.#numV = nodes.length;
    console.log("graph with ", nodes, edges);
    edges.forEach((edge) => {
      console.log("processing edge ", edge);
      console.log(this.#ady.get(edge.target));
      if (this.#ady.get(edge.target) === undefined) {
        this.#ady.set(edge.target, []);
      }
      const list = this.#ady.get(edge.target);
      if (list !== undefined) {
        const newNode = nodes.find((node: Node) => node.id === edge.source);
        console.log("pushing to map ", newNode);
        if (newNode !== undefined) {
          list.push(newNode);
        }
      }
    });
    console.log("ady map");
    for (const [key, value] of this.#ady) {
      console.log(key, value);
    }
  }
  adyacents(nodeId: string) {
    return this.#ady.get(nodeId);
  }
  getNumV() {
    return this.#numV;
  }
}

export default RFGraph;
