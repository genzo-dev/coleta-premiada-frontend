import { Button } from "../ui/button";

type DefaultModalProps = {
  modalTitle: string;
  children: React.ReactNode;
  onClick: () => void;
};

export default function DefaultModal({
  modalTitle,
  children,
  onClick,
}: DefaultModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex flex-col items-center justify-center z-50 px-4 sm:px-0">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
        <div className="flex items-center justify-between mb-6 border-b-2 border-gray-300 pb-2">
          <h3 className="text-xl sm:text-2xl font-bold">{modalTitle}</h3>
          <Button
            className="bg-red-700 hover:bg-red-800"
            type="button"
            onClick={onClick}
          >
            Fechar
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
}
