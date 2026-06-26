import { CustomerList } from "@/features/customers/customer-list";

export default function CustomersPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="font-heading text-2xl font-semibold tracking-tight">Customers</h1>
        <p className="text-sm text-muted-foreground">Customers converted from won leads.</p>
      </div>
      <CustomerList />
    </div>
  );
}
