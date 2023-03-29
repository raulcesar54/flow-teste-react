import { createContext, useContext } from "react";
import { v4 } from "uuid";
import { useNodesState } from "reactflow";
interface nodeType {
  nodeType: string;
  label: string;
}
interface contextBoardProps {
  data: any;
  addNode: (nodeProps: nodeType) => void;
  removeEdges: (nodeProps: any, teest: any) => void;
  updateNode: (nodeProps: any, teest: any, value: any) => void;
  connectedNode: (data: any) => void;
  onNodesChange: any;
}
const ContextBoard = createContext({ data: [] } as contextBoardProps);

export const ProviderBoard = ({ children }: { children: JSX.Element }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  function updateNode(targetId: string, id: string, value: string) {
    setNodes((nodes) =>
      nodes.map((item) => {
        if (item.id === targetId) {
          item.data = {
            ...item.data,
            selected: true,
            values: { ...item.data.values, [id]: value },
          };
        }
        return item;
      })
    );
  }
  function connectedNode(data: any) {
    setNodes((nodes) =>
      nodes.map((item) => {
        if (item.id === data.source) {
          item.data = {
            ...item.data,
            selected: true,
            targetId: data.target,
          };
        }
        return item;
      })
    );
  }
  function addNode({ nodeType, label }: nodeType) {
    setNodes((e) => [
      ...e,
      {
        id: v4(),
        type: nodeType,
        position: { x: 140, y: 100 },
        data: { label, selected: false, values: [] },
      },
    ]);
  }
  function removeEdges(sourceId: string, targetId: string) {
    setNodes((nodes) =>
      nodes.map((item) => {
        if (item.id === sourceId) {
          item.data = {
            selected: false,
          };
          delete item.data.targetId;
        }
        if (item.id === targetId) {
          item.data.values[sourceId] = "";
        }
        return item;
      })
    );
  }
  return (
    <ContextBoard.Provider
      value={{
        data: nodes,
        addNode,
        onNodesChange,
        connectedNode,
        updateNode,
        removeEdges,
      }}
    >
      {children}
    </ContextBoard.Provider>
  );
};

export const useBoard = () => useContext(ContextBoard);
