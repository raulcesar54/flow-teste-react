import { HoverCard } from "@/component/uiKit/hoverCard";
import { FiFileText, FiHome, FiShuffle, FiType } from "react-icons/fi";

export const Toolbox = () => {
  const onDragStart = (event: any, nodeType: any) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
  return (
    <div className="absolute z-50 bg-white left-0 h-full w-[100px] pl-[24px] pr-[24px] pt-[40px] gap-4 flex flex-col items-center border-r-2 border-slate-200">
      <HoverCard title="Documento">
        <button
          onDragStart={(event) => onDragStart(event, "Documento")}
          draggable
          className="b-none p-4 hover:bg-slate-50  border-2 border-slate-200 rounded-lg"
        >
          <FiFileText />
        </button>
      </HoverCard>
      <HoverCard title="Texto">
        <button
          onDragStart={(event) => onDragStart(event, "Texto")}
          draggable
          className="b-none p-4 hover:bg-slate-50  border-2 border-slate-200 rounded-lg"
        >
          <FiType />
        </button>
      </HoverCard>
      <HoverCard title="Ações">
        <button
          onDragStart={(event) => onDragStart(event, "Acao")}
          draggable
          className="b-none p-4 hover:bg-slate-50  border-2 border-slate-200 rounded-lg"
        >
          <FiShuffle />
        </button>
      </HoverCard>
      <HoverCard title="Menu">
        <button
          onDragStart={(event) => onDragStart(event, "MenuPrincipal")}
          draggable
          className="b-none p-4 hover:bg-slate-50  border-2 border-slate-200 rounded-lg"
        >
          <FiHome />
        </button>
      </HoverCard>
    </div>
  );
};
