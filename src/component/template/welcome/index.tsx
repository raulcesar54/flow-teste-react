import { Position, addEdge, useReactFlow } from "reactflow";
import { HandleStyled } from "../../uiKit/handleStyle";

export const Welcome = ({ data, id, ...props }: any) => {
  const reactflow = useReactFlow();
  return (
    <div
      className={`p-4 border-2 ${
        data.selected || props.selected ? "border-blue-400" : "border-[#eee] "
      }  flex flex-col rounded-lg bg-white`}
    >
      <label htmlFor="text" className="text-lg font-bold max-w-[150px]  ">
        Bem vindo a Hyper Reports
      </label>
      <h1 className="max-w-[200px] text-sm mt-2">
        Aqui iniciamos o fluxo, fique a vontade para desenhar como funcionaria
        seu fluxo inicial
      </h1>

      <HandleStyled
        id={`source_${id}`}
        type="source"
        position={Position.Right}
        onConnect={(params) => {
          if (params.target === null) return;
          if (reactflow !== null) {
            const instanceReactFlow = reactflow;
            const isValidTarget = instanceReactFlow
              .getNode(params.target)
              ?.type?.includes("MenuPrincipal");
            if (!isValidTarget) {
              alert("Atenção, o documento pode ligar apenas ao Menu");
              return;
            }
          }
          alert("nó não valido");
        }}
      />
    </div>
  );
};
