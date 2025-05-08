
import { Bell } from "lucide-react";

const DashboardHeader = () => {
  return (
    <header className="flex items-center justify-between pb-6 border-b border-gray-200/60 dark:border-gray-800/30 mb-8 transition-colors duration-300">
      <h1 className="text-3xl font-display font-medium tracking-tight text-dashboard-text-primary dark:text-dashboard-text-primary-dark">Dashboard</h1>
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-full hover:bg-gray-100/80 dark:hover:bg-gray-800/50 transition-colors duration-200">
          <Bell size={20} className="text-gray-700 dark:text-gray-300" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-dashboard-red rounded-full"></span>
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;
