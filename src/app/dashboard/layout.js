export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-slate-900 text-white p-5">
        Sidebar
      </aside>

      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}