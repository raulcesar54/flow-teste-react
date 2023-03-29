import { useBoard } from "@/hooks/useBoard";
import { useState } from "react";
import { Handle, Position } from "reactflow";

function TextUpdaterNode({ data, isConnectable, id, ...t }: any) {
  const [inputValue, setInputValue] = useState("");
  const { updateNode } = useBoard();
  const onChange = (evt: any) => {
    updateNode(data.targetId, id, event?.target.value);
  };
  return (
    <div
      className={`p-4 border-2 ${
        data.selected ? "border-blue-400" : "border-[#eee] "
      }  flex flex-col rounded-lg bg-white`}
    >
      <label htmlFor="text" className="text-sm ">
        Adicionar novo valor:
      </label>
      <input
        id="text"
        className="bg-slate-100 mt-2 text-sm p-2 placeholder:text-sm placeholder:px-2 disabled:bg-slate-200"
        placeholder="digite o valor..."
        name="text"
        onChange={(event) => {
          setInputValue(event?.target.value);
          onChange(event);
        }}
        disabled={!data.selected}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="b"
        onConnect={(event) => {
          console.log(event);
          console.log(data.targetId, id, inputValue);
          updateNode(event.target, id, inputValue);
        }}
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default TextUpdaterNode;
