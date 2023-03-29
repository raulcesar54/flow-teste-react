import { useBoard } from "@/hooks/useBoard";
import { useEffect, useState } from "react";
import { Handle, Position } from "reactflow";

export const Form = ({ data, isConnectable, ...an }: any) => {
  const { data: nodes } = useBoard();
  const [getValues, setGetValues] = useState([]);
  useEffect(() => {
    const getValues: any = Object.values(data.values);

    setGetValues(getValues);
  }, [nodes, data]);

  return (
    <>
      <div className="p-8 border-2 border-indigo-[#eee]  flex flex-col rounded-lg bg-white " >
        <div>
          <input placeholder="digite o titulo" className="focus:outline-0" />
        </div>
        <Handle
          type="target"
          position={Position.Left}
          id="b"
          isConnectable={isConnectable}
        />

        {getValues?.map((item, index) => (
          <h1 key={item} className="mt-2 text-sm text-slate-400">
            {item}
          </h1>
        ))}
        <button className="w-full p-2 bg-blue-400 rounded-sm text-sm text-white mt-4">
          Salvar fluxo
        </button>
      </div>
    </>
  );
};
