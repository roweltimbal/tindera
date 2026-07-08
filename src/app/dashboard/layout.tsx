import { DashboardSidebar, DashboardTabBar } from "@/components/dashboard/DashboardNav";

// Shared dashboard shell: nav, session check
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-cream lg:flex-row">
      <div className="hidden lg:flex">
        <DashboardSidebar />
      </div>
      <div className="flex lg:hidden">
        <DashboardTabBar />
      </div>
      <main className="min-w-0 flex-1 pb-[100px] lg:pb-0">{children}</main>
    </div>
  );
}
