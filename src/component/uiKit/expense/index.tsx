import { useBoard } from "@/hooks/useBoard";
import { useState } from "react";
import { Handle, Position } from "reactflow";
import { HandleStyled } from "../handleStyle";
import { FiHome, FiShoppingBag, FiShoppingCart } from "react-icons/fi";

export const Expense = ({ data, id }: any) => {
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
      <label
        htmlFor="text"
        className="flex items-center flex-row text-lg font-bold gap-2 "
      >
        <div className="p-3 border-2 border-slate-200 rounded-lg">
          <FiShoppingCart size={16} />
        </div>
        <div className="flex flex-col ">
          Despesas
          <small className="mt-[-4px] text-sm font-light">menu de ação</small>
        </div>
      </label>
      <h1 className="max-w-[300px] text-sm mt-2">indicador de despesas</h1>
      <HandleStyled
        type="target"
        position={Position.Left}
        id="target"
        onConnect={(event) => {
          updateNode(event.target, id, inputValue);
        }}
      />

      <HandleStyled
        type="source"
        position={Position.Right}
        id="source"
        onConnect={(event) => {
          updateNode(event.target, id, inputValue);
        }}
      />
    </div>
  );
};