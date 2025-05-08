
import { TrendingUp, BarChart2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMarks } from "@/contexts/MarksContext";
import { useEffect, useState } from "react";

// For demo purposes, using student ID 1 as the logged-in student
const CURRENT_STUDENT_ID = 1;

interface MetricProps {
  label: string;
  value: string | number;
  change?: string;
  positive?: boolean;
  icon: React.ReactNode;
}

const OverallPerformance = () => {
  const { marks } = useMarks();
  const [averageScore, setAverageScore] = useState(0);
  const [passRate, setPassRate] = useState(0);
  
  useEffect(() => {
    const studentData = marks.find(student => student.studentId === CURRENT_STUDENT_ID);
    
    if (studentData) {
      // Calculate average score
      const scores = Object.values(studentData.subjects).map((subj: any) => subj.score);
      const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
      setAverageScore(Math.round(average * 10) / 10);
      
      // Calculate pass rate (subjects with score >= 60)
      const passedSubjects = scores.filter(score => score >= 60).length;
      const passRateValue = (passedSubjects / scores.length) * 100;
      setPassRate(Math.round(passRateValue));
    }
  }, [marks]);

  return (
    <div className="card-apple animate-fade-in">
      <h2 className="text-xl font-display font-medium mb-4 flex items-center gap-2">
        <TrendingUp size={18} className="text-dashboard-blue dark:text-dashboard-blue-dark" />
        <span className="apple-highlight">Overall Performance</span>
      </h2>
      
      <div className="grid grid-cols-1 gap-6 mt-4">
        <Metric 
          label="Average Score" 
          value={`${averageScore}%`}
          change="+5.2%" 
          positive={true}
          icon={<BarChart2 size={18} className="text-dashboard-blue dark:text-dashboard-blue-dark" />}
        />
        
        <Metric 
          label="Pass Rate" 
          value={`${passRate}%`}
          change="+2.4%" 
          positive={true} 
          icon={<div className="w-4 h-4 rounded-full bg-dashboard-green"></div>}
        />
        
        <div className="mt-2">
          <div className="flex justify-between items-center text-sm mb-1">
            <span className="text-dashboard-text-secondary dark:text-dashboard-text-secondary-dark font-sans">Overall Progress</span>
            <span className="font-medium font-sans">{Math.round(averageScore * 0.8)}%</span>
          </div>
          <div className="h-2.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden relative">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-dashboard-blue to-dashboard-blue/80 dark:from-dashboard-blue-dark dark:to-dashboard-blue-dark/80 rounded-full animate-pulse-subtle"
              style={{ width: `${Math.round(averageScore * 0.8)}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Metric = ({ label, value, change, positive, icon }: MetricProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        {icon}
        <span className="text-dashboard-text-secondary dark:text-dashboard-text-secondary-dark font-sans">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-medium font-display text-lg">{value}</span>
        {change && (
          <span className={cn(
            "text-xs px-1.5 py-0.5 rounded-full font-sans",
            positive 
              ? "text-dashboard-green bg-green-50 dark:bg-green-900/20" 
              : "text-dashboard-red bg-red-50 dark:bg-red-900/20",
          )}>
            {change}
          </span>
        )}
      </div>
    </div>
  );
};

export default OverallPerformance;
