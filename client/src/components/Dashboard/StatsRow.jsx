import { Star, FileText, CalendarClock, Trophy, XCircle } from 'lucide-react';

export default function StatsRow({ jobs }) {
  const wishlist = jobs.filter((j) => j.status === 'Wishlist').length;
  const applied = jobs.length;
  const interviews = jobs.filter((j) => j.status === 'Interview').length;
  const offers = jobs.filter((j) => j.status === 'Offer').length;
  const rejected = jobs.filter((j) => j.status === 'Rejected').length;

  const stats = [
    { label: 'Wishlist', value: wishlist, icon: Star, color: 'text-gray-400' },
    { label: 'Total Applied', value: applied, icon: FileText, color: 'text-indigo-500' },
    { label: 'Interviews', value: interviews, icon: CalendarClock, color: 'text-amber-500' },
    { label: 'Offers', value: offers, icon: Trophy, color: 'text-emerald-500' },
    { label: 'Rejected', value: rejected, icon: XCircle, color: 'text-red-400' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 px-6 pt-6">
      {stats.map((s) => {
        const Icon = s.icon;
        return (
          <div key={s.label} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-5 border border-gray-100">
            <div className="flex justify-between items-start mb-3">
              <p className="text-gray-500 text-sm">{s.label}</p>
              <span className={`${s.color}`}>
                <Icon size={18} strokeWidth={1.75} />
              </span>
            </div>
            <p className="text-2xl font-semibold text-gray-900">{s.value}</p>
          </div>
        );
      })}
    </div>
  );
}