import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
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
    <TooltipProvider>
      <div className="fixed bottom-6 left-6 flex flex-col gap-2 z-50">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={handleIncomeTransaction}
              size="lg"
              className="purple-gradient shadow-purple-glow h-12 w-12 rounded-full p-0"
            >
              <Plus size={20} weight="bold" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Adicionar entrada</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={handleExpenseTransaction}
              size="lg"
              variant="destructive"
              className="h-12 w-12 rounded-full p-0"
            >
              <Minus size={20} weight="bold" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Adicionar saída</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}