import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Package, Activity } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const StatCard = ({ title, value, sub, icon: Icon, accent }: any) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="w-4 h-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className={`text-3xl font-bold ${accent ?? ""}`}>{value}</div>
      <p className="text-xs text-muted-foreground mt-1">{sub}</p>
    </CardContent>
  </Card>
);

const AdminDashboard = () => {
  const [userCount, setUserCount] = useState<number>(0);
  const [itemCount, setItemCount] = useState<number>(0);

  useEffect(() => {
    (async () => {
      const { count: pc } = await supabase.from("saved_plans").select("*", { count: "exact", head: true });
      setItemCount(pc ?? 0);
      const { count: ec } = await supabase.from("enquiries").select("*", { count: "exact", head: true });
      setUserCount(ec ?? 0);
    })();
  }, []);

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <header>
          <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
          <p className="text-muted-foreground mt-1">Welcome back to BusaAI. Here's what's happening today.</p>
        </header>

        <div className="grid gap-4 md:grid-cols-3">
          <StatCard title="Total Users" value={userCount} sub="Registered accounts" icon={Users} />
          <StatCard title="Tracked Items" value={itemCount} sub="Active items in system" icon={Package} />
          <StatCard title="System Status" value="Healthy" sub="All services operational" icon={Activity} accent="text-primary" />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader><CardTitle>Recent Users</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground py-8 text-center">No users found.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              <Button asChild variant="outline" className="w-full justify-center"><Link to="/admin/users">Manage Users</Link></Button>
              <Button asChild variant="outline" className="w-full justify-center"><Link to="/admin/items">Manage Items</Link></Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
