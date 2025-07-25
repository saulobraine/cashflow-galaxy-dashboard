import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Plus, Minus } from "phosphor-react";

export function FloatingMenu() {
  const handleIncomeTransaction = () => {
    // TODO: Implementar dialog de transação de entrada
    console.log("Nova transação de entrada");
  };

  const handleExpenseTransaction = () => {
    // TODO: Implementar dialog de transação de saída
    console.log("Nova transação de saída");
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            size="lg"
            className="purple-gradient shadow-purple-glow h-12 w-12 rounded-full p-0"
          >
            <Plus size={20} weight="bold" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-48 p-2">
          <div className="flex flex-col gap-1">
            <Button
              onClick={handleIncomeTransaction}
              variant="ghost"
              className="justify-start"
            >
              <Plus size={16} weight="bold" className="text-green-500" />
              Adicionar entrada
            </Button>
            <Button
              onClick={handleExpenseTransaction}
              variant="ghost"
              className="justify-start"
            >
              <Minus size={16} weight="bold" className="text-red-500" />
              Adicionar saída
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}