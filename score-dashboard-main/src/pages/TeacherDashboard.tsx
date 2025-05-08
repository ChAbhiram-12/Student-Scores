
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "@/components/DashboardHeader";
import SideNavigation from "@/components/SideNavigation";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useMarks } from "@/contexts/MarksContext";

// Mock subject data
const subjects = ["Mathematics", "Science", "English", "History", "Computer Science"];

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);
  const [tempMarks, setTempMarks] = useState<Record<string, number>>({});
  
  const { marks, updateStudentMarks } = useMarks();

  useEffect(() => {
    // Check if logged in as teacher
    const userRole = localStorage.getItem("userRole");
    if (userRole !== "teacher") {
      navigate("/login");
    }
    
    // Initialize marks with zero for all subjects
    const initialMarks: Record<string, number> = {};
    subjects.forEach(subject => {
      initialMarks[subject] = 0;
    });
    setTempMarks(initialMarks);
    
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [navigate]);

  // When a student is selected, load their marks
  useEffect(() => {
    if (selectedStudent) {
      const studentData = marks.find(student => student.studentId === selectedStudent);
      if (studentData) {
        const currentMarks: Record<string, number> = {};
        subjects.forEach(subject => {
          currentMarks[subject] = studentData.subjects[subject]?.score || 0;
        });
        setTempMarks(currentMarks);
      }
    }
  }, [selectedStudent, marks]);

  const handleMarkChange = (subject: string, value: string) => {
    // Ensure marks are between 0-100
    const numValue = Math.min(100, Math.max(0, parseInt(value) || 0));
    setTempMarks(prev => ({
      ...prev,
      [subject]: numValue
    }));
  };

  const handleSaveMarks = () => {
    if (!selectedStudent) {
      toast.error("Please select a student first");
      return;
    }
    
    // Update marks in context
    Object.entries(tempMarks).forEach(([subject, score]) => {
      updateStudentMarks(selectedStudent, subject, score);
    });
    
    toast.success(`Marks saved for ${marks.find(s => s.studentId === selectedStudent)?.studentName}`, {
      description: "Student records have been updated in real-time"
    });
    
    // Reset selection after saving
    setSelectedStudent(null);
    
    // Reset marks to zero
    const resetMarks: Record<string, number> = {};
    subjects.forEach(subject => {
      resetMarks[subject] = 0;
    });
    setTempMarks(resetMarks);
  };

  const getGrade = (score: number) => {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 dark:border-gray-700 border-t-blue-500 dark:border-t-blue-400 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-sf text-gray-600 dark:text-gray-300">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-dashboard-bg dark:bg-dashboard-bg-dark transition-colors duration-300">
      <SideNavigation />
      
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <DashboardHeader />
          
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-3 items-center">
              <h2 className="text-xl font-sf font-semibold">Teacher Dashboard</h2>
              <span className="text-sm text-gray-500 dark:text-gray-400 font-sf">Spring 2023</span>
            </div>
            
            <div className="flex gap-3">
              <Button 
                onClick={() => {
                  localStorage.removeItem("userRole");
                  navigate("/login");
                }} 
                variant="outline" 
                size="sm"
              >
                Logout
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Student List */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Students</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    {marks.map((student) => (
                      <div
                        key={student.studentId}
                        className={`p-3 rounded-md cursor-pointer flex justify-between items-center transition-colors ${
                          selectedStudent === student.studentId 
                            ? "bg-blue-100/10 dark:bg-blue-900/20 border border-blue-200/30 dark:border-blue-800/30" 
                            : "hover:bg-gray-100/10 dark:hover:bg-gray-800/20"
                        }`}
                        onClick={() => setSelectedStudent(student.studentId)}
                      >
                        <div>
                          <h3 className="font-medium">{student.studentName}</h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400">CS2023-00{student.studentId}</p>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Mark Entry Section */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {selectedStudent ? `Enter Marks for ${marks.find(s => s.studentId === selectedStudent)?.studentName}` : 'Select a student to enter marks'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedStudent ? (
                    <div className="space-y-6">
                      <div className="flex flex-col gap-1">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Student Details</p>
                        <div className="grid grid-cols-3 gap-4 p-3 rounded-md bg-gray-50/10 dark:bg-gray-900/20">
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Name</p>
                            <p>{marks.find(s => s.studentId === selectedStudent)?.studentName}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Roll Number</p>
                            <p>CS2023-00{selectedStudent}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Status</p>
                            <p className="text-green-500">Active</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Enter Marks (0-100)</p>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Subject</TableHead>
                              <TableHead>Current Score</TableHead>
                              <TableHead>New Score</TableHead>
                              <TableHead>Grade</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {subjects.map((subject) => {
                              const currentScore = marks.find(s => s.studentId === selectedStudent)?.subjects[subject]?.score || 0;
                              return (
                                <TableRow key={subject}>
                                  <TableCell>{subject}</TableCell>
                                  <TableCell>{currentScore}</TableCell>
                                  <TableCell>
                                    <Input
                                      type="number"
                                      min="0"
                                      max="100"
                                      value={tempMarks[subject] || 0}
                                      onChange={(e) => handleMarkChange(subject, e.target.value)}
                                      className="w-24"
                                    />
                                  </TableCell>
                                  <TableCell>
                                    {getGrade(tempMarks[subject] || 0)}
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                        
                        <div className="mt-6 flex justify-end">
                          <Button onClick={handleSaveMarks}>Save Marks</Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                      <p>Please select a student from the list to enter marks</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeacherDashboard;
