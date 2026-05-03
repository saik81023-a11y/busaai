import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import PlanForm from "./pages/PlanForm";
import SavedPlans from "./pages/SavedPlans";
import Enquiry from "./pages/Enquiry";
import Suggestions from "./pages/Suggestions";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminItems from "./pages/admin/AdminItems";
import AdminContact from "./pages/admin/AdminContact";
import RequireAdmin from "./components/RequireAdmin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/auth/callback" element={<Login />} />
            <Route path="/plan" element={<PlanForm />} />
            <Route path="/saved-plans" element={<SavedPlans />} />
            <Route path="/enquiry" element={<Enquiry />} />
            <Route path="/contact" element={<Enquiry />} />
            <Route path="/suggestions" element={<Suggestions />} />
            <Route path="/admin" element={<RequireAdmin><AdminDashboard /></RequireAdmin>} />
            <Route path="/admin/users" element={<RequireAdmin><AdminUsers /></RequireAdmin>} />
            <Route path="/admin/items" element={<RequireAdmin><AdminItems /></RequireAdmin>} />
            <Route path="/admin/contact" element={<RequireAdmin><AdminContact /></RequireAdmin>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
