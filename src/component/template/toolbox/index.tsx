import { useBoard } from "@/hooks/useBoard";
import { RxInput, RxButton, RxFileText } from "react-icons/rx";

export const Toolbox = () => {
  const { addNode } = useBoard();
  return (
    <div className="absolute z-50 bg-white left-0 h-full w-[100px] pl-[24px] pr-[24px] pt-[40px] gap-4 flex flex-col items-center border-r-2 border-blue-600">
      <button
        onClick={() => addNode({ nodeType: "form", label: "novo formulario" })}
        className="b-none p-4 hover:bg-blue-600 hover:text-white border-2 border-slate-100  rounded-lg"
      >
        <RxFileText />
      </button>
      <button
        onClick={() => addNode({ nodeType: "text", label: "Digite o valor" })}
        className="b-none p-4 hover:bg-blue-600 hover:text-white border-2 border-slate-100  rounded-lg"
      >
        <RxInput />
      </button>
      <button className="b-none p-4 hover:bg-blue-600 hover:text-white border-2 border-slate-100  rounded-lg">
        <RxButton />
      </button>
    </div>
  );
};
