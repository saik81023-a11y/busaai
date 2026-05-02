import AdminLayout from "./AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminContact = () => (
  <AdminLayout>
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Contact</h1>
      <Card>
        <CardHeader><CardTitle>Get in touch</CardTitle></CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Email: <a className="text-primary underline" href="mailto:contactbusaai@gmail.com">contactbusaai@gmail.com</a></p>
        </CardContent>
      </Card>
    </div>
  </AdminLayout>
);
export default AdminContact;
