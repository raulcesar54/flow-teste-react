export const Button = ({
  label,
  onClick,
  remove,
}: {
  label: string;
  onClick: () => void;
  remove?: boolean;
}) => (
  <button
    className={`w-full p-2 bg-violet-400 ${remove && 'bg-red-400'} text-white rounded-sm mt-4`}
    onClick={onClick}
  >
    {label}
  </button>
);
