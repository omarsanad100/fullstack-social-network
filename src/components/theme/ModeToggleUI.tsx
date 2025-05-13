import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

type ModeToggleUIProps = {
  theme: string;
  toggleTheme: () => void;
};

const ModeToggleUI = ({ theme, toggleTheme }: ModeToggleUIProps) => {
  return (
    <div>
      <Button
        size="icon"
        onClick={toggleTheme}
        variant="outline"
        className={`relative ${
          theme === "dark"
            ? "bg-slate-100 text-slate-900"
            : "bg-slate-900 text-slate-100"
        }`}
      >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </Button>
    </div>
  );
};

export default ModeToggleUI;
