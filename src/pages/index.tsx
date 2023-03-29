import { Toolbox } from "@/component/template/toolbox";
import { Form } from "@/component/uiKit/form";
import TextUpdaterNode from "@/component/uiKit/textInput";
import { useBoard } from "@/hooks/useBoard";
import { useCallback } from "react";
import ReactFlow, { addEdge, useEdgesState } from "reactflow";

import "reactflow/dist/style.css";

const nodeTypes = { text: TextUpdaterNode, form: Form };

export default function Home() {
  const { data, onNodesChange, connectedNode, removeEdges } = useBoard();

  const panOnDrag = [1, 2];

  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const onConnect = useCallback(
    (params: any) => {
      connectedNode(params);
      setEdges((eds) => {
        const prepareEdg = eds.filter((item) => item.source !== params.source);
        return addEdge(params, prepareEdg);
      });
    },
    [setEdges]
  );
  function onRemoveEdge(data: any) {
    data.map((item) => {
      removeEdges(item.source, item.target);
    });
  }
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Toolbox />
      <ReactFlow
        nodes={data}
        edges={edges}
        preventScrolling
        maxZoom={1}
        minZoom={1}
        panOnDrag={panOnDrag}
        onEdgesDelete={onRemoveEdge}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        onConnect={onConnect}
      />
    </div>
  );
}
