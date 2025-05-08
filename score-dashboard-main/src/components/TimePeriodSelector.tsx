
import { useState } from "react";
import { Calendar, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const semesters = [
  "Spring 2023",
  "Fall 2022",
  "Summer 2022",
  "Spring 2022",
  "Fall 2021",
];

const TimePeriodSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(semesters[0]);

  return (
    <div className="relative card-apple min-w-[250px] animate-fade-in">
      <div className="flex items-center gap-2 mb-2">
        <Calendar size={18} className="text-dashboard-blue dark:text-dashboard-blue-dark" />
        <h3 className="font-display text-lg font-medium">Time Period</h3>
      </div>
      
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "mt-2 relative flex items-center justify-between px-4 py-2.5 border border-gray-200/70 dark:border-gray-800/30 rounded-lg bg-white/80 dark:bg-black/20 backdrop-blur-sm",
          "cursor-pointer transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-700"
        )}
      >
        <span className="font-sans">{selected}</span>
        <ChevronDown
          size={16}
          className={cn(
            "text-gray-500 dark:text-gray-400 transition-transform duration-200",
            isOpen && "transform rotate-180"
          )}
        />
      </div>
      
      {isOpen && (
        <div className="absolute left-0 right-0 mt-1 bg-white/90 dark:bg-dashboard-card-bg-dark backdrop-blur-sm border border-gray-200/70 dark:border-gray-800/30 rounded-lg shadow-lg z-10 py-1 animate-scale-in">
          {semesters.map((semester) => (
            <div
              key={semester}
              className={cn(
                "px-4 py-2 cursor-pointer hover:bg-gray-50/80 dark:hover:bg-gray-800/50 transition-colors font-sans",
                semester === selected && "bg-blue-50/80 dark:bg-blue-900/20 text-dashboard-blue dark:text-dashboard-blue-dark"
              )}
              onClick={() => {
                setSelected(semester);
                setIsOpen(false);
              }}
            >
              {semester}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TimePeriodSelector;
