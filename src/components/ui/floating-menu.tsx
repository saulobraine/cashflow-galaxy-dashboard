import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown } from "phosphor-react";

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
    <div className="fixed bottom-6 left-6 flex flex-col gap-2 z-50">
      <Button
        onClick={handleIncomeTransaction}
        size="lg"
        className="purple-gradient shadow-purple-glow h-12 w-12 rounded-full p-0"
      >
        <ArrowUp size={20} weight="bold" />
      </Button>
      <Button
        onClick={handleExpenseTransaction}
        size="lg"
        variant="destructive"
        className="h-12 w-12 rounded-full p-0"
      >
        <ArrowDown size={20} weight="bold" />
      </Button>
    </div>
  );
}