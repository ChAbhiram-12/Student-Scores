
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentDashboard from "@/components/StudentDashboard";

const Index = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<string | null>(null);
  
  useEffect(() => {
    // Check if user is logged in
    const role = localStorage.getItem("userRole");
    if (!role) {
      navigate("/login");
    }
    setUserRole(role);
  }, [navigate]);

  // Only render dashboard if user is logged in as a student
  if (userRole === "student") {
    return <StudentDashboard />;
  }
  
  return null;
};

export default Index;
