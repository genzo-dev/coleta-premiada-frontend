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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4 py-6 sm:px-0">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b-2 border-gray-300 flex-shrink-0">
          <h3 className="text-xl sm:text-2xl font-bold">{modalTitle}</h3>
          <Button
            className="bg-red-700 hover:bg-red-800"
            type="button"
            onClick={onClick}
          >
            Fechar
          </Button>
        </div>
        <div className="overflow-y-auto px-6 py-4">
          {children}
        </div>
      </div>
    </div>
  );
}
