
import { useState, useEffect } from "react";
import { BarChart2, Activity } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from "@/lib/utils";
import GradeBar from "./GradeBar";
import { useMarks } from "@/contexts/MarksContext";

// For demo purposes, using student ID 1 as the logged-in student
const CURRENT_STUDENT_ID = 1;

interface SubjectScore {
  subject: string;
  score: number;
  weakAreas: string[];
  strongAreas: string[];
}

// Fixed test data that won't change
const testData = [
  { name: 'Test 1', Mathematics: 65, Science: 75, English: 80 },
  { name: 'Test 2', Mathematics: 70, Science: 82, English: 75 },
  { name: 'Quiz 1', Mathematics: 55, Science: 78, English: 90 },
  { name: 'Mid-term', Mathematics: 68, Science: 90, English: 85 },
  { name: 'Quiz 2', Mathematics: 75, Science: 85, English: 82 },
  { name: 'Final', Mathematics: 72, Science: 92, English: 88 },
];

// Fixed areas data
const subjectAreaDetails = {
  "Mathematics": {
    weakAreas: ["Calculus", "Trigonometry"],
    strongAreas: ["Algebra", "Statistics"]
  },
  "Science": {
    weakAreas: ["Physics formulas"],
    strongAreas: ["Biology", "Chemistry", "Lab work"]
  },
  "English": {
    weakAreas: ["Grammar"],
    strongAreas: ["Comprehension", "Writing", "Literature"]
  },
  "History": {
    weakAreas: ["Modern History", "Dates"],
    strongAreas: ["Ancient Civilizations", "Cultural Studies"]
  },
  "Computer Science": {
    weakAreas: ["Advanced Algorithms"],
    strongAreas: ["Programming", "Database Design", "Web Development"]
  }
};

const ScoreAnalysis = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'detail'>('overview');
  const { marks } = useMarks();
  const [subjectScores, setSubjectScores] = useState<SubjectScore[]>([]);

  useEffect(() => {
    const studentData = marks.find(student => student.studentId === CURRENT_STUDENT_ID);
    
    if (studentData) {
      const scoreData = Object.entries(studentData.subjects).map(([subject, data]: [string, any]) => ({
        subject,
        score: data.score,
        weakAreas: subjectAreaDetails[subject as keyof typeof subjectAreaDetails]?.weakAreas || [],
        strongAreas: subjectAreaDetails[subject as keyof typeof subjectAreaDetails]?.strongAreas || []
      }));
      
      setSubjectScores(scoreData);
    }
  }, [marks]);

  return (
    <div className="card-apple animate-fade-in">
      <h2 className="text-xl font-display font-medium mb-4 flex items-center gap-2">
        <BarChart2 size={18} className="text-dashboard-blue dark:text-dashboard-blue-dark" />
        <span className="apple-highlight">Score Analysis</span>
      </h2>
      
      <div className="flex space-x-4 mb-5 border-b border-gray-200/60 dark:border-gray-800/30">
        <button
          className={cn(
            "pb-2 font-sans text-gray-500 dark:text-gray-400 transition-colors relative",
            activeTab === 'overview' && "text-dashboard-blue dark:text-dashboard-blue-dark font-medium"
          )}
          onClick={() => setActiveTab('overview')}
        >
          Overview
          {activeTab === 'overview' && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-dashboard-blue dark:bg-dashboard-blue-dark rounded-full"></span>
          )}
        </button>
        <button
          className={cn(
            "pb-2 font-sans text-gray-500 dark:text-gray-400 transition-colors relative",
            activeTab === 'detail' && "text-dashboard-blue dark:text-dashboard-blue-dark font-medium"
          )}
          onClick={() => setActiveTab('detail')}
        >
          Detailed Analysis
          {activeTab === 'detail' && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-dashboard-blue dark:bg-dashboard-blue-dark rounded-full"></span>
          )}
        </button>
      </div>
      
      {activeTab === 'overview' ? (
        <div className="mt-4 h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={testData} margin={{ top: 20, right: 30, left: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" className="dark:stroke-gray-800/50" />
              <XAxis 
                dataKey="name" 
                tickLine={false} 
                axisLine={{ stroke: "#e0e0e0" }} 
                tick={{ fontFamily: "SF Pro Text", fontSize: 12 }} 
                className="dark:text-gray-400" 
              />
              <YAxis 
                tickLine={false} 
                axisLine={{ stroke: "#e0e0e0" }} 
                tick={{ fontFamily: "SF Pro Text", fontSize: 12 }} 
                className="dark:text-gray-400" 
              />
              <Tooltip 
                contentStyle={{ 
                  fontFamily: "SF Pro Text", 
                  borderRadius: "8px", 
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  border: "1px solid #eaeaea",
                  backgroundColor: document.documentElement.classList.contains('dark') ? "#222222" : "#ffffff",
                  color: document.documentElement.classList.contains('dark') ? "#f5f5f7" : "#1d1d1f"
                }} 
              />
              <Bar dataKey="Mathematics" fill="#007aff" radius={[4, 4, 0, 0]} animationDuration={1500} />
              <Bar dataKey="Science" fill="#34c759" radius={[4, 4, 0, 0]} animationDuration={1500} />
              <Bar dataKey="English" fill="#af52de" radius={[4, 4, 0, 0]} animationDuration={1500} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="mt-3 space-y-6">
          {subjectScores.map((subjectData) => (
            <div key={subjectData.subject} className="pb-5 mb-2 last:mb-0 last:pb-0">
              <GradeBar 
                subject={subjectData.subject} 
                score={subjectData.score} 
                color={subjectData.subject === "Mathematics" ? "blue" : 
                      subjectData.subject === "Science" ? "green" : "purple"} 
              />
              
              <div className="mt-3">
                <div className="text-sm font-medium mb-1 font-sans">Strength Analysis</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <h4 className="text-xs uppercase text-gray-500 dark:text-gray-400 mb-1 font-sans">Weak Areas</h4>
                    <div className="space-y-2">
                      {subjectData.weakAreas.map((area) => (
                        <HeatmapCell key={area} label={area} score={30 + Math.random() * 30} type="weak" />
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs uppercase text-gray-500 dark:text-gray-400 mb-1 font-sans">Strong Areas</h4>
                    <div className="space-y-2">
                      {subjectData.strongAreas.map((area) => (
                        <HeatmapCell key={area} label={area} score={70 + Math.random() * 30} type="strong" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

interface HeatmapCellProps {
  label: string;
  score: number;
  type: 'weak' | 'strong';
}

const HeatmapCell = ({ label, score, type }: HeatmapCellProps) => {
  const [hover, setHover] = useState(false);
  
  const getColor = () => {
    if (type === 'weak') {
      if (score < 40) return 'bg-dashboard-red';
      if (score < 50) return 'bg-red-400';
      return 'bg-red-300 dark:bg-red-800';
    } else {
      if (score > 90) return 'bg-dashboard-green';
      if (score > 80) return 'bg-green-500';
      return 'bg-green-400 dark:bg-green-700';
    }
  };
  
  return (
    <div 
      className="flex items-center gap-2 p-1 rounded-md heatmap-cell"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className={cn(
        "w-full h-7 relative rounded-lg flex items-center px-2 transition-all duration-300",
        getColor()
      )}>
        <span className="text-xs text-white font-medium z-10 font-sans">{label}</span>
        
        {hover && (
          <div className="absolute right-2 text-white text-xs font-medium z-10 flex items-center gap-1 animate-fade-in">
            <Activity size={14} />
            <span>{Math.round(score)}%</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScoreAnalysis;
