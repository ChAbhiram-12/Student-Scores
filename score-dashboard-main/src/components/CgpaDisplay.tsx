import { Award } from "lucide-react";
import { useState, useEffect } from "react";
import { useMarks } from "@/contexts/MarksContext";

// For demo purposes, using student ID 1 as the logged-in student
const CURRENT_STUDENT_ID = 1;

const CgpaDisplay = () => {
  const { marks } = useMarks();
  const [cgpa, setCgpa] = useState(0);
  
  useEffect(() => {
    const calculateCGPA = () => {
      const studentData = marks.find(student => student.studentId === CURRENT_STUDENT_ID);
      
      if (studentData) {
        // Calculate grade points for each subject
        const gradePoints = Object.values(studentData.subjects).map(subject => {
          const score = subject.score;
          if (score >= 90) return 4.0; // A
          if (score >= 80) return 3.0; // B
          if (score >= 70) return 2.0; // C
          if (score >= 60) return 1.0; // D
          return 0.0; // F
        });
        
        // Calculate average CGPA
        const totalGradePoints = gradePoints.reduce((sum, points) => sum + points, 0);
        const calculatedCGPA = totalGradePoints / gradePoints.length;
        
        // Animate the CGPA display
      let startTime: number | null = null;
      const duration = 1500; // 1.5 seconds
      
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
          setCgpa(progress * calculatedCGPA);
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      
      window.requestAnimationFrame(step);
      }
    };
    
    calculateCGPA();
  }, [marks]);
  
  // Count grades for the grade distribution display
  const gradeCounts = {
    A: 0,
    B: 0,
    C: 0,
    F: 0
  };
  
  const studentData = marks.find(student => student.studentId === CURRENT_STUDENT_ID);
  if (studentData) {
    Object.values(studentData.subjects).forEach(subject => {
      const score = subject.score;
      if (score >= 90) gradeCounts.A++;
      else if (score >= 80) gradeCounts.B++;
      else if (score >= 70) gradeCounts.C++;
      else gradeCounts.F++;
    });
  }
  
  return (
    <div className="card-apple animate-fade-in">
      <h2 className="text-xl font-display font-medium mb-4 flex items-center gap-2">
        <Award size={18} className="text-dashboard-blue dark:text-dashboard-blue-dark" />
        <span className="apple-highlight">CGPA</span>
      </h2>
      
      <div className="flex flex-col items-center justify-center p-2">
        <div className="relative w-36 h-36 flex items-center justify-center mb-3">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#f5f5f7"
              strokeWidth="8"
              className="dark:stroke-gray-800"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#007aff"
              strokeWidth="8"
              strokeDasharray="283"
              strokeDashoffset={283 - (283 * (cgpa / 4))}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out animate-draw-line dark:stroke-[#0A84FF]"
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold font-display">{cgpa.toFixed(2)}</span>
            <span className="text-sm text-dashboard-text-secondary dark:text-dashboard-text-secondary-dark font-sans">of 4.00</span>
          </div>
        </div>
        
        <div className="w-full mt-3 grid grid-cols-4 gap-2">
          {[
            { label: "A", value: gradeCounts.A.toString(), color: "bg-dashboard-green" },
            { label: "B", value: gradeCounts.B.toString(), color: "bg-dashboard-blue dark:bg-dashboard-blue-dark" },
            { label: "C", value: gradeCounts.C.toString(), color: "bg-dashboard-yellow" },
            { label: "F", value: gradeCounts.F.toString(), color: "bg-dashboard-red" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center">
              <div className={`w-6 h-6 rounded-full ${item.color} flex items-center justify-center text-white text-xs font-medium mb-1`}>
                {item.label}
              </div>
              <span className="text-sm font-sans">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CgpaDisplay;
