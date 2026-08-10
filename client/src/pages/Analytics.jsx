import { useMemo } from 'react';
import { BarChart, Bar, XAxis, ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import Navbar from '../components/Navbar';
import useJobs from '../hooks/useJobs';

const COLORS = { Applied: '#6366F1', Interview: '#F59E0B', Offer: '#10B981', Rejected: '#EF4444' };

export default function Analytics() {
  const { jobs, loading } = useJobs();

  const weeklyData = useMemo(() => {
    const weeks = {};
    jobs.forEach((j) => {
      const week = `W${Math.ceil(new Date(j.dateApplied).getDate() / 7)}`;
      weeks[week] = (weeks[week] || 0) + 1;
    });
    return Object.entries(weeks).map(([name, count]) => ({ name, count }));
  }, [jobs]);

  const statusData = useMemo(() => {
    return Object.keys(COLORS).map((status) => ({
      name: status,
      value: jobs.filter((j) => j.status === status).length,
    })).filter((s) => s.value > 0);
  }, [jobs]);

  const responded = jobs.filter((j) => ['Interview', 'Offer', 'Rejected'].includes(j.status)).length;
  const responseRate = jobs.length ? ((responded / jobs.length) * 100).toFixed(1) : 0;

  if (loading) return <p className="p-8">Loading analytics...</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Analytics</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-5 border">
            <p className="text-gray-500 mb-2">Total Applications</p>
            <p className="text-3xl font-bold">{jobs.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5 border">
            <p className="text-gray-500 mb-2">Response Rate</p>
            <p className="text-3xl font-bold">{responseRate}%</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5 border">
            <p className="text-gray-500 mb-2">Interviews Landed</p>
            <p className="text-3xl font-bold">{jobs.filter(j => j.status === 'Interview').length}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border">
            <h3 className="font-semibold mb-4">Applications Over Time</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={weeklyData}>
                <XAxis dataKey="name" />
                <Tooltip />
                <Bar dataKey="count" fill="#6366F1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border">
            <h3 className="font-semibold mb-4">Status Distribution</h3>
            {statusData.length === 0 ? (
              <p className="text-gray-400 text-sm">No data yet</p>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={statusData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80}>
                    {statusData.map((entry) => (
                      <Cell key={entry.name} fill={COLORS[entry.name]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
            <div className="flex flex-col gap-1 mt-3">
              {Object.entries(COLORS).map(([name, color]) => (
                <div key={name} className="flex items-center gap-2 text-sm">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
                  {name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}