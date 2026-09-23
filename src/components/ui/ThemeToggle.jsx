import { useTheme } from "@/hooks";
import { Button } from "@/components/ui";

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <Button
      onClick={toggleTheme}
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
    >
      {isDark ? "🌜" : "🌞"}
    </Button>
  );
}
