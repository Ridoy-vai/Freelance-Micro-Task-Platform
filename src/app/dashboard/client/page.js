export default function ClientDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Client Dashboard</h1>

      <div className="grid md:grid-cols-4 gap-4 mt-6">
        <div className="p-5 rounded-xl bg-white shadow">
          Total Tasks
        </div>

        <div className="p-5 rounded-xl bg-white shadow">
          Open Tasks
        </div>

        <div className="p-5 rounded-xl bg-white shadow">
          In Progress
        </div>

        <div className="p-5 rounded-xl bg-white shadow">
          Total Spent
        </div>
      </div>
    </div>
  );
}