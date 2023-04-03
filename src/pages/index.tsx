import { Toolbox } from "@/component/template/toolbox";
import { BackMenu } from "@/component/uiKit/backMenu";
import { ComercialIndicator } from "@/component/uiKit/comercialIndicator";
import { Detail } from "@/component/uiKit/detail";
import { Expense } from "@/component/uiKit/expense";
import { MainMenu } from "@/component/uiKit/mainMenu";
import { Question } from "@/component/uiKit/question";
import { Welcome } from "@/component/uiKit/welcome";
import { useBoard } from "@/hooks/useBoard";
import { useCallback, useRef, useState } from "react";
import ReactFlow, { addEdge, Background, Controls } from "reactflow";
import "reactflow/dist/style.css";
import { v4 as uuid } from "uuid";

const nodeTypes = {
  BoasVindas: Welcome,
  MenuPrincipal: MainMenu,
  IndComercial: ComercialIndicator,
  Despesa: Expense,
  Pergunta: Question,
  MenuAnterior: BackMenu,
  Detalhar: Detail,
};

export default function Home() {
  const reactFlowWrapper: any = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

  const {
    data,
    onNodesChange,
    connectedNode,
    removeEdges,
    onEdgesChange,
    setNodes,
    setEdges,
    edges,
  } = useBoard();
  const panOnDrag = [1, 2];

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: uuid(),
        type,
        position,
        data: { label: `${type} node` },
      };
      console.log(newNode);

      setNodes((nds: any) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  const onConnect = useCallback(
    (params: any) => {
      connectedNode(params);
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges]
  );
  function onRemoveEdge(data: any) {
    data.map((item: any) => {
      removeEdges(item.source, item.target);
    });
  }
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Toolbox />
      {/* <ReactFlowProvider>
       */}
      <ReactFlow
        nodes={data}
        edges={edges}
        preventScrolling
        onInit={setReactFlowInstance}
        ref={reactFlowWrapper}
        // maxZoom={1}
        // minZoom={1}
        panOnDrag={panOnDrag}
        onEdgesDelete={onRemoveEdge}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        onConnect={onConnect}
        onDragOver={onDragOver}
        onDrop={onDrop}
        // connectionLineComponent={ConenctionLine}
      >
        <Background variant="dots" />
      </ReactFlow>
      {/* </div>
      </ReactFlowProvider> */}
    </div>
  );
}
