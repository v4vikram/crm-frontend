import { LeadList } from "@/features/leads/lead-list";

export default function LeadsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="font-heading text-2xl font-semibold tracking-tight">Leads</h1>
        <p className="text-sm text-muted-foreground">Track and manage incoming leads.</p>
      </div>
      <LeadList />
    </div>
  );
}
