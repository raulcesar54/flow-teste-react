import { createContext, useCallback, useContext, useId } from "react";
import {
  Connection,
  Edge,
  addEdge,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "reactflow";
import { v4 } from "uuid";
import mock from "../pages/mock.json";

interface nodeType {
  nodeType: string;
  label: string;
}
interface updateNodeData<T> {
  targetId: string;
  value: T;
}
interface contextBoardProps {
  data: any;
  addNode: (nodeProps: nodeType) => void;
  removeEdges: (nodeProps: any, teest: any) => void;
  updateNode: (nodeProps: any, teest: any, value: any) => void;
  connectNode: (data: Edge | Connection) => void;
  removeEdge: (sourceHandle: string) => void;
  setNodes: (data: any) => void;
  updateNodeData: <T>(params: updateNodeData<T>) => void;
  onEdgesChange: any;
  edges: any;
  onNodesChange: any;
}
const ContextBoard = createContext({ data: [] } as contextBoardProps);

export const ProviderBoard = ({ children }: { children: JSX.Element }) => {
  const [edges, setEdges, onEdgesChange] = useEdgesState([
    {
      id: "e646957b-8b37-495b-b9d5-38363d603d3c",
      target: "e646957b-8b37-495b-b9d5-38363d603d3c",
      sourceHandle: "source_e646957b-8b37-495b-b9d5-38363d603d3c",
      targetHandle: "target_e646957b-8b37-495b-b9d5-38363d603d3c",
      source: "cf7c682f-8c16-4f89-ba2f-95ff758cd453",
    },
    {
      id: "fab11397-a396-405e-a385-a5ee96fcd3e3",
      target: "fab11397-a396-405e-a385-a5ee96fcd3e3",
      sourceHandle: "source_fab11397-a396-405e-a385-a5ee96fcd3e3",
      targetHandle: "target_fab11397-a396-405e-a385-a5ee96fcd3e3",
      source: "e646957b-8b37-495b-b9d5-38363d603d3c",
    },
  ]);
  const [nodes, setNodes, onNodesChange] = useNodesState(
    [
      {
        id: "cf7c682f-8c16-4f89-ba2f-95ff758cd453",
        type: "BoasVindas",
        position: {
          x: -86,
          y: 60,
        },
        data: {
          description: "Olá {{username}} seja bem vindo ao chatbot da HLABS",
          published: false,
          selected: false,
          values: [],
        },
        width: 236,
        height: 160,
      },
      {
        id: "e646957b-8b37-495b-b9d5-38363d603d3c",
        type: "MenuPrincipal",
        position: {
          x: 240.8928195193322,
          y: 20.291951638725408,
        },
        data: {
          description: "Selecione uma das opções para analisar.",
          published: false,
          selected: false,
          values: [],
        },
        width: 215,
        height: 152,
      },
    ]
    // mock.map((item, index) => {
    //   const data = {
    //     id: item.id,
    //     type: item.name.replace(" ", ""),
    //     position: item.position
    //       ? item.position
    //       : {
    //           x: 140 * index,
    //           y: 100 * index,
    //         },
    //     data: {
    //       description: item.description,
    //       published: item.published,
    //       selected: false,
    //       values: [],
    //     },
    //     width: 243,
    //     height: 144,
    //   };
    //   return data;
    // })
  );
  const removeEdge = useCallback(
    (sourceHandleName: string) => {
      console.log(edges);
      return setEdges((edegs) =>
        edegs.filter((item) => item.sourceHandle !== sourceHandleName)
      );
    },
    [setEdges]
  );
  const connectNode = useCallback(
    (params: Edge | Connection) => {
      return setEdges((actualNode) => addEdge(params, actualNode));
    },
    [setEdges]
  );
  function updateNodeData<T>({ targetId, value }: updateNodeData<T>) {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === targetId) {
          return {
            ...node,
            data: {
              ...node.data,
              ...value,
            },
          };
        }
        return node;
      })
    );
  }

  function updateNode(targetId: string, id: string, value: string) {
    // setNodes((nodes) =>
    //   nodes.map((item) => {
    //     if (item.id === targetId) {
    //       item.data = {
    //         ...item.data,
    //         selected: true,
    //         values: { ...item.data.values, [id]: value },
    //       };
    //     }
    //     return item;
    //   })
    // );
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
          // item.data.values[sourceId] = "";
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
        removeEdge,
        connectNode,
        updateNode,
        removeEdges,
        setNodes,
        edges,
        updateNodeData,
        onEdgesChange,
      }}
    >
      {children}
    </ContextBoard.Provider>
  );
};

export const useBoard = () => useContext(ContextBoard);
