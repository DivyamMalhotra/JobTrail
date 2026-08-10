import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = { Wishlist: '#9CA3AF', Applied: '#6366F1', Interview: '#F59E0B', Offer: '#10B981', Rejected: '#EF4444' };

export default function AnalyticsChart({ jobs }) {
  const statusCounts = Object.keys(COLORS).map((status) => ({
    name: status,
    value: jobs.filter((j) => j.status === status).length,
  }));

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 border">
      <h3 className="font-semibold mb-4">Status Breakdown</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie data={statusCounts} dataKey="value" nameKey="name" outerRadius={90} label>
            {statusCounts.map((entry) => (
              <Cell key={entry.name} fill={COLORS[entry.name]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}