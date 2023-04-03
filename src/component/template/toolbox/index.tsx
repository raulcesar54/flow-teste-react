import { useBoard } from "@/hooks/useBoard";
import { FiChevronLeft, FiFileText, FiHome, FiShoppingBag, FiShoppingCart, FiShuffle } from "react-icons/fi";
import { RxInput, RxButton, RxFileText } from "react-icons/rx";

export const Toolbox = () => {
  const { addNode } = useBoard();
  // const {} = useNodes
  const onDragStart = (event: any, nodeType: any) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
  return (
    <div className="absolute z-50 bg-white left-0 h-full w-[100px] pl-[24px] pr-[24px] pt-[40px] gap-4 flex flex-col items-center border-r-2 border-slate-200">
      <button
        onDragStart={(event) => onDragStart(event, "MenuPrincipal")}
        draggable
        className="b-none p-4 hover:bg-slate-50  border-2 border-slate-200 rounded-lg"
      >
        <FiHome />
      </button>
      <button
        onDragStart={(event) => onDragStart(event, "IndComercial")}
        draggable
        className="b-none p-4 hover:bg-slate-50  border-2 border-slate-200 rounded-lg"
      >
        <FiShoppingCart />
      </button>
      <button
        onDragStart={(event) => onDragStart(event, "Detalhar")}
        draggable
        className="b-none p-4 hover:bg-slate-50  border-2 border-slate-200 rounded-lg"
      >
        <FiFileText />
      </button>
      <button
        onDragStart={(event) => onDragStart(event, "IndComercial")}
        draggable
        className="b-none p-4 hover:bg-slate-50  border-2 border-slate-200 rounded-lg"
      >
        <FiShoppingBag />
      </button>
      <button
        onDragStart={(event) => onDragStart(event, "MenuAnterior")}
        draggable
        className="b-none p-4 hover:bg-slate-50  border-2 border-slate-200 rounded-lg"
      >
        <FiChevronLeft />
      </button>
      <button
        onDragStart={(event) => onDragStart(event, "Pergunta")}
        draggable
        className="b-none p-4 hover:bg-slate-50  border-2 border-slate-200 rounded-lg"
      >
        <FiShuffle />
      </button>
     
    </div>
  );
};
