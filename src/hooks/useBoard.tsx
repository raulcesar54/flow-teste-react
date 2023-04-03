import { createContext, useContext, useId } from "react";
import { useEdgesState, useNodesState } from "reactflow";
import { v4 } from "uuid";
import mock from "../pages/mock.json";

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
  setNodes: (data: any) => void;
  setEdges: any
  onEdgesChange: any
  edges: any;
  onNodesChange: any;
}
const ContextBoard = createContext({ data: [] } as contextBoardProps);

export const ProviderBoard = ({ children }: { children: JSX.Element }) => {
  const data: any = mock;
  const id = useId();
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    data.map((item: any) =>
      item.parent
        ? {
            id: item.id,
            target: item.id,
            sourceHandle: `source_${item.id}`,
            targetHandle: `target_${item.id}`,
            source: item.parent.id,
          }
        : {}
    )
  );
  const [nodes, setNodes, onNodesChange] = useNodesState(
    mock.map((item, index) => {
      // item?.parent?.id &&
      //   setEdges((e) =>
      //     addEdge({ source: item.id, target: item.parent.id } as any, e)
      //   );
      const data = {
        id: item.id,
        type: item.name.replace(" ", ""),
        position: item.position
          ? item.position
          : {
              x: 140 * index,
              y: 100 * index,
            },
        data: {
          description: item.description,
          published: item.published,
          selected: false,
          values: [],
        },
        width: 243,
        height: 144,
      };
      // if (item?.parent?.id) {
      //   setEdges((eds) => {
      //     return addEdge(data, item.parent.id);
      //   });
      // }
      return data;
    })
  );
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
    setNodes((nodes: any) =>
      nodes.map((item: any) => {
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
    setNodes((e: any) => [
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
      nodes.map((item: any) => {
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
        setNodes,
        edges,
        setEdges,
        onEdgesChange,
      }}
    >
      {children}
    </ContextBoard.Provider>
  );
};

export const useBoard = () => useContext(ContextBoard);
