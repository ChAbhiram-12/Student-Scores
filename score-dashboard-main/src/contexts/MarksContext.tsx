
import React, { createContext, useContext, useState, ReactNode } from "react";

// Types
export interface StudentMark {
  studentId: number;
  studentName: string;
  subjects: Record<string, {
    score: number;
    grade: string;
  }>;
}

interface MarksContextType {
  marks: StudentMark[];
  updateStudentMarks: (studentId: number, subject: string, score: number) => void;
  getStudentMarks: (studentId: number) => StudentMark | undefined;
}

// Mock initial data
const initialMarksData: StudentMark[] = [
  {
    studentId: 1,
    studentName: "Alex Johnson",
    subjects: {
      "Mathematics": { score: 68, grade: "C" },
      "Science": { score: 75, grade: "C" },
      "English": { score: 80, grade: "B" },
      "History": { score: 72, grade: "C" },
      "Computer Science": { score: 85, grade: "B" },
    }
  },
  {
    studentId: 2,
    studentName: "Maya Singh",
    subjects: {
      "Mathematics": { score: 82, grade: "B" },
      "Science": { score: 88, grade: "B" },
      "English": { score: 78, grade: "C" },
      "History": { score: 65, grade: "D" },
      "Computer Science": { score: 90, grade: "A" },
    }
  },
  {
    studentId: 3,
    studentName: "James Wilson",
    subjects: {
      "Mathematics": { score: 90, grade: "A" },
      "Science": { score: 85, grade: "B" },
      "English": { score: 75, grade: "C" },
      "History": { score: 80, grade: "B" },
      "Computer Science": { score: 78, grade: "C" },
    }
  },
  {
    studentId: 4,
    studentName: "Sofia Rodriguez",
    subjects: {
      "Mathematics": { score: 75, grade: "C" },
      "Science": { score: 82, grade: "B" },
      "English": { score: 90, grade: "A" },
      "History": { score: 88, grade: "B" },
      "Computer Science": { score: 92, grade: "A" },
    }
  },
  {
    studentId: 5,
    studentName: "Ethan Chen",
    subjects: {
      "Mathematics": { score: 95, grade: "A" },
      "Science": { score: 88, grade: "B" },
      "English": { score: 80, grade: "B" },
      "History": { score: 78, grade: "C" },
      "Computer Science": { score: 96, grade: "A" },
    }
  }
];

// Create the context
const MarksContext = createContext<MarksContextType | undefined>(undefined);

// Create a provider component
export const MarksProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [marks, setMarks] = useState<StudentMark[]>(initialMarksData);

  // Function to update student marks
  const updateStudentMarks = (studentId: number, subject: string, score: number) => {
    setMarks(prevMarks => 
      prevMarks.map(student => {
        if (student.studentId === studentId) {
          // Calculate grade based on score
          let grade = 'F';
          if (score >= 90) grade = 'A';
          else if (score >= 80) grade = 'B';
          else if (score >= 70) grade = 'C';
          else if (score >= 60) grade = 'D';

          return {
            ...student,
            subjects: {
              ...student.subjects,
              [subject]: {
                score,
                grade
              }
            }
          };
        }
        return student;
      })
    );
  };

  // Function to get a specific student's marks
  const getStudentMarks = (studentId: number) => {
    return marks.find(student => student.studentId === studentId);
  };

  return (
    <MarksContext.Provider value={{ marks, updateStudentMarks, getStudentMarks }}>
      {children}
    </MarksContext.Provider>
  );
};

// Create a custom hook for using this context
export const useMarks = () => {
  const context = useContext(MarksContext);
  if (!context) {
    throw new Error("useMarks must be used within a MarksProvider");
  }
  return context;
};
