
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SubjectCard from "@/components/SubjectCard";
import ScoreAnalysis from "@/components/ScoreAnalysis";
import OverallPerformance from "@/components/OverallPerformance";
import { useMarks } from "@/contexts/MarksContext";
import SideNavigation from "@/components/SideNavigation";
import CgpaDisplay from "@/components/CgpaDisplay";

// For demo purposes, using student ID 1 as the logged-in student
const CURRENT_STUDENT_ID = 1;

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { marks } = useMarks();
  const [studentData, setStudentData] = useState<any>(null);

  useEffect(() => {
    // Find the current student's data
    const currentStudent = marks.find(student => student.studentId === CURRENT_STUDENT_ID);
    setStudentData(currentStudent);
  }, [marks]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  if (!studentData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 dark:border-gray-700 border-t-blue-500 dark:border-t-blue-400 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-sf text-gray-600 dark:text-gray-300">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Extract subject data for the current student
  const subjectData = Object.entries(studentData.subjects).map(([subject, data]: [string, any]) => ({
    subject,
    score: data.score,
    grade: data.grade,
    semester: "Spring 2023"
  }));

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <SideNavigation />
      
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center mb-4 p-4 border-b border-gray-200 dark:border-gray-800">
          <h1 className="text-xl font-bold">Student Dashboard</h1>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
        
        <div className="p-4 flex-1 overflow-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-1">{studentData.studentName}</h2>
              <p className="text-gray-500">Student ID: CS2023-00{studentData.studentId}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {subjectData.map((subject: any, index: number) => (
              <SubjectCard
                key={index}
                subject={subject.subject}
                score={subject.score}
                semester={subject.semester}
              />
            ))}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ScoreAnalysis />
            </div>
            <div className="lg:col-span-1">
              <div className="mb-6">
                <CgpaDisplay />
              </div>
              <OverallPerformance />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
