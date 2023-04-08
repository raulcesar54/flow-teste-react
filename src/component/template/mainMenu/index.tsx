import { useBoard } from "@/hooks/useBoard";
import { useState } from "react";
import { FiHome } from "react-icons/fi";
import { Connection, Position, addEdge, useReactFlow } from "reactflow";
import { HandleStyled } from "../../uiKit/handleStyle";
import { Button } from "@/component/uiKit/button";
export const MainMenu = ({ data, id, ...props }: any) => {
  const [inputValue, setInputValue] = useState("");
  const { updateNode } = useBoard();
  const reactflow = useReactFlow();
  const { connectNode, updateNodeData, removeEdge } = useBoard();
  const [inputs, setInputs] = useState<
    { targetId: string | null; value: string }[]
  >([
    {
      targetId: null,
      value: "",
    },
  ]);
  return (
    <div
      className={`p-4 border-2 ${
        props.selected ? "border-blue-400" : "border-[#eee] "
      }  flex flex-col rounded-lg w-[300px] bg-white`}
    >
      <label
        htmlFor="text"
        className="flex items-center flex-row text-lg font-bold gap-2 "
      >
        <div className="p-3 border-2 border-slate-200 rounded-lg">
          <FiHome size={16} />
        </div>
        <div className="flex flex-col ">
          Menu
          <small className="mt-[-4px] text-sm font-light">menu de ação</small>
        </div>
      </label>
      <div className="mt-4 flex flex-col">
        {inputs.map((item, index) => {
          return (
            <>
              <label
                className="mt-3 font-bold text-sm mb-1"
                htmlFor={`input_${index}`}
              >
                Opção {index + 1}
              </label>
              <input
                id={`input_${index}`}
                className="bg-slate-100 text-sm p-2 placeholder:text-sm placeholder:px-2 disabled:bg-slate-200"
                placeholder="opção do menu principal..."
                name="text"
                onChange={(event) => {
                  setInputs((prevValue) => {
                    return prevValue.map((item, internalIndex) => {
                      if (index === internalIndex) {
                        item.value = event.target.value;
                      }
                      return item;
                    });
                  });
                  if (inputs[index].targetId !== null) {
                    updateNodeData<{ title: string; index: number }>({
                      targetId: String(inputs[index].targetId),
                      value: { title: inputs[index].value, index },
                    });
                  }
                }}
              />
              <div className="relative">
                <HandleStyled
                  isVectorItems
                  type="source"
                  position={Position.Right}
                  id={`source_${index}`}
                  onConnect={(params) => {
                    if (params.target === null) return;
                    if (inputs[index].targetId) {
                      removeEdge(`source_${index}`);
                    }

                    setInputs((prevValue) => {
                      return prevValue.map((item, internalIndex) => {
                        if (index === internalIndex) {
                          item.targetId = params.target;
                        }
                        return item;
                      });
                    });
                    if (inputs[index].value) {
                      updateNodeData<{ title: string; index: number }>({
                        targetId: String(inputs[index].targetId),
                        value: { title: inputs[index].value, index },
                      });
                    }
                    return connectNode(params);
                  }}
                />
              </div>
            </>
          );
        })}
      </div>
      <div className="flex flex-row gap-2 mt-4">
        <Button
          label="adicionar"
          onClick={() =>
            setInputs((value) => [
              ...value,
              {
                value: "",
                targetId: null,
              },
            ])
          }
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
        id={`target_${id}`}
        onConnect={(event) => {
          updateNode(event.target, id, inputValue);
        }}
      />
    </div>
  );
};
