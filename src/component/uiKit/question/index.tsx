import { useBoard } from "@/hooks/useBoard";
import { useState } from "react";
import { FiShuffle } from "react-icons/fi";
import { Position } from "reactflow";
import { Button } from "../button";
import { HandleStyled } from "../handleStyle";

export const Question = ({ data, id }: any) => {
  const [inputs, setInputs] = useState(['']);
  const [inputValue, setInputValue] = useState("");
  const { updateNode } = useBoard();
  const onChange = (evt: any) => {
    updateNode(data.targetId, id, String(evt?.target.value));
  };
  return (
    <div
      className={`p-4 min-w-[300px] border-2 ${
        data.selected ? "border-blue-400" : "border-[#eee] "
      }  flex flex-col rounded-lg bg-white`}
    >
      <label
        htmlFor="text"
        className="flex items-center flex-row text-lg font-bold gap-2 "
      >
        <div className="p-3 border-2 border-slate-200 rounded-lg">
          <FiShuffle size={16} />
        </div>
        <div className="flex flex-col ">
          Pergunta
          <small className="mt-[-4px] text-sm font-light">tomada decisão</small>
        </div>
      </label>
      {inputs.map((item, index) => (
        <>
          <label className="mt-3 font-bold text-sm mb-1" htmlFor="text">
            {index + 1} Pergunta
          </label>
          <input
            id="text"
            className="bg-slate-100 text-sm p-2 placeholder:text-sm placeholder:px-2 disabled:bg-slate-200"
            placeholder="digite o valor..."
            name="text"
            onChange={(event) => {
              // setInputValue(event?.target.value);
              // onChange(event);
            }}
            // disabled={!data.selected}
          />
          <HandleStyled
            index={index + 1}
            type="source"
            position={Position.Right}
            id={`source_${index}`}
            onConnect={(event) => {
              updateNode(event.target, id, inputValue);
            }}
          >
          </HandleStyled>
        </>
      ))}
      <div className="flex flex-row gap-2">
        <Button
          label="adicionar"
          onClick={() => setInputs((value) => [...value, ""])}
        />
        <div className="basis-1">
          <Button
            remove
            label="remover"
            onClick={() => setInputs((value) => value.slice(1))}
          />
        </div>
      </div>
      <HandleStyled
        type="target"
        position={Position.Left}
        id="target"
        onConnect={(event) => {
          updateNode(event.target, id, inputValue);
        }}
      />
      {/* 
      <HandleStyled
        type="source"
        position={Position.Right}
        id="source"
        onConnect={(event) => {
          updateNode(event.target, id, inputValue);
        }}
      /> */}
    </div>
  );
};
