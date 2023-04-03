import { useBoard } from "@/hooks/useBoard";
import { useState } from "react";
import { Position } from "reactflow";
import { HandleStyled } from "../handleStyle";

export const Welcome = ({ data, id }: any) => {
  const [inputValue, setInputValue] = useState("");
  const { updateNode } = useBoard();
  const onChange = (evt: any) => {
    updateNode(data.targetId, id, String(evt?.target.value));
  };
  return (
    <div
      className={`p-4 border-2 ${
        data.selected ? "border-blue-400" : "border-[#eee] "
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
        index={id}

        type="source"
        position={Position.Right}
        onConnect={(event) => {
          updateNode(event.target, id, inputValue);
        }}
      />
    </div>
  );
};
