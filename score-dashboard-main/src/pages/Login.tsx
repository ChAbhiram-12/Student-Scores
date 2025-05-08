import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GraduationCap, School } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<"student" | "teacher" | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) {
      toast.error("Please select a role");
      return;
    }
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          role: selectedRole
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Store token and role
      localStorage.setItem('token', data.token);
      localStorage.setItem('userRole', selectedRole);
      
      toast.success('Login successful!');
      navigate('/');
    } catch (error: any) {
      toast.error(error.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dashboard-bg via-dashboard-bg/95 to-dashboard-bg/90 dark:from-dashboard-bg-dark dark:via-dashboard-bg-dark/95 dark:to-dashboard-bg-dark/90">
      <Card className="w-full max-w-md mx-4 bg-white/10 dark:bg-black/20 backdrop-blur-lg border-white/20">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-display">Welcome Back</CardTitle>
          <CardDescription>Choose your role to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Button
              variant={selectedRole === "student" ? "default" : "outline"}
              className="flex flex-col items-center gap-2 py-4 h-auto"
              onClick={() => setSelectedRole("student")}
            >
              <GraduationCap size={24} />
              <span>Student</span>
            </Button>
            <Button
              variant={selectedRole === "teacher" ? "default" : "outline"}
              className="flex flex-col items-center gap-2 py-4 h-auto"
              onClick={() => setSelectedRole("teacher")}
            >
              <School size={24} />
              <span>Teacher</span>
            </Button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/5 border-white/10"
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/5 border-white/10"
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-500 hover:text-blue-600">
                Register
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
