
import { Book, BarChart3, GraduationCap, Home, Settings, LogOut, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

interface SideNavigationProps {
  className?: string;
}

const SideNavigation = ({ className }: SideNavigationProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize dark mode based on system preference
  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={cn(
      "flex flex-col h-full w-60 bg-white/90 dark:bg-dashboard-card-bg-dark backdrop-blur-sm border-r border-gray-200/60 dark:border-gray-800/30 py-6 px-4 animate-slide-in transition-colors duration-300",
      className
    )}>
      <div className="flex items-center gap-3 mb-10 px-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-dashboard-blue to-dashboard-blue/80 dark:from-dashboard-blue-dark dark:to-dashboard-blue-dark/80 flex items-center justify-center text-white font-bold text-lg">
          S
        </div>
        <div className="flex flex-col">
          <h2 className="font-display text-lg font-semibold">Academic</h2>
          <span className="text-xs text-gray-500 dark:text-gray-400 font-sans">support@scoreviz</span>
        </div>
      </div>
      
      <nav className="flex-1">
        <ul className="space-y-1">
          <NavItem icon={<Home size={20} />} label="Dashboard" active />
          <NavItem icon={<Book size={20} />} label="Courses" />
          <NavItem icon={<BarChart3 size={20} />} label="Performance" />
          <NavItem icon={<GraduationCap size={20} />} label="Grades" />
        </ul>
      </nav>
      
      <div className="mt-auto pt-6 border-t border-gray-200/60 dark:border-gray-800/30">
        <ul className="space-y-1">
          <li>
            <button
              onClick={toggleDarkMode}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all duration-200 text-gray-700 dark:text-gray-300 hover:bg-gray-50/80 dark:hover:bg-gray-800/50 group"
            >
              <span className="text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-200">
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </span>
              <span className="font-sans">{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
            </button>
          </li>
          <NavItem icon={<Settings size={20} />} label="Settings" />
          <NavItem icon={<LogOut size={20} />} label="Sign Out" />
        </ul>
      </div>
    </div>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const NavItem = ({ icon, label, active = false }: NavItemProps) => {
  return (
    <li>
      <a
        href="#"
        className={cn(
          "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-gray-700 dark:text-gray-300 hover:bg-gray-50/80 dark:hover:bg-gray-800/50 group",
          active && "bg-blue-50/80 dark:bg-blue-900/20 text-dashboard-blue dark:text-dashboard-blue-dark font-medium"
        )}
      >
        <span className={cn(
          "transition-colors duration-200",
          active 
            ? "text-dashboard-blue dark:text-dashboard-blue-dark" 
            : "text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300"
        )}>
          {icon}
        </span>
        <span className="font-sans">{label}</span>
      </a>
    </li>
  );
};

export default SideNavigation;
