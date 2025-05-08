import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TeacherDashboard from "./pages/TeacherDashboard";
import NotFound from "./pages/NotFound";
import { MarksProvider } from "./contexts/MarksContext";

const queryClient = new QueryClient();

// Route guard component to check user role
const RoleBasedRoute = () => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Get user role from localStorage
    const role = localStorage.getItem("userRole");
    const token = localStorage.getItem("token");
    
    if (!token) {
      setUserRole(null);
      setIsLoading(false);
      return;
    }
    
    // Verify token with backend
    fetch('http://localhost:5000/api/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Invalid token');
      }
      return response.json();
    })
    .then(data => {
      setUserRole(data.user.role);
      setIsLoading(false);
    })
    .catch(() => {
      // Clear invalid token
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      setUserRole(null);
      setIsLoading(false);
    });
  }, []);
  
  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  // If no role is found, redirect to login
  if (!userRole) {
    return <Navigate to="/login" />;
  }
  
  // Route based on role
  return userRole === "teacher" ? <TeacherDashboard /> : <Index />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <MarksProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<RoleBasedRoute />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </MarksProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
