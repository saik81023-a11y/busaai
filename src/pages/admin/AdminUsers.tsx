import AdminLayout from "./AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminUsers = () => (
  <AdminLayout>
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Users</h1>
      <Card>
        <CardHeader><CardTitle>All Users</CardTitle></CardHeader>
        <CardContent><p className="text-sm text-muted-foreground py-8 text-center">No users found.</p></CardContent>
      </Card>
    </div>
  </AdminLayout>
);
export default AdminUsers;
