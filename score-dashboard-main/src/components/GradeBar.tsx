
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface GradeBarProps {
  subject: string;
  score: number;
  maxScore?: number;
  color?: string;
}

const GradeBar = ({ subject, score, maxScore = 100, color = "blue" }: GradeBarProps) => {
  const [width, setWidth] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => {
            setWidth((score / maxScore) * 100);
          }, 200);
        }
      },
      { threshold: 0.1 }
    );
    
    if (barRef.current) {
      observer.observe(barRef.current);
    }
    
    return () => {
      if (barRef.current) {
        observer.unobserve(barRef.current);
      }
    };
  }, [score, maxScore]);
  
  const colorClasses = {
    blue: "bg-dashboard-blue dark:bg-dashboard-blue-dark",
    green: "bg-dashboard-green",
    yellow: "bg-dashboard-yellow",
    red: "bg-dashboard-red",
    purple: "bg-dashboard-purple",
  };
  
  return (
    <div className="mb-3 last:mb-0" ref={barRef}>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-sans">{subject}</span>
        <span className="text-sm font-medium font-display">{score}%</span>
      </div>
      <div className="h-2.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
        <div 
          className={cn(
            "h-full rounded-full transition-all duration-1000 ease-out",
            colorClasses[color as keyof typeof colorClasses] || "bg-dashboard-blue dark:bg-dashboard-blue-dark"
          )}
          style={{ width: `${width}%` }}
        ></div>
      </div>
    </div>
  );
};

export default GradeBar;
