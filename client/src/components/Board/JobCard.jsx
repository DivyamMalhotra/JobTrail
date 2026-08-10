import { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Trash2 } from 'lucide-react';
import ConfirmDialog from '../ConfirmDialog';

const AVATAR_COLORS = ['bg-indigo-50 text-indigo-600', 'bg-blue-50 text-blue-600', 'bg-amber-50 text-amber-600', 'bg-emerald-50 text-emerald-600', 'bg-rose-50 text-rose-600'];
const PRIORITY_STYLE = { High: 'bg-red-50 text-red-500', Medium: 'bg-gray-100 text-gray-500', Low: 'bg-gray-100 text-gray-500' };

export default function JobCard({ job, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: job._id,
  });

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)`, zIndex: 50 }
    : undefined;

  const initial = job.company?.[0]?.toUpperCase() || '?';
  const colorClass = AVATAR_COLORS[initial.charCodeAt(0) % AVATAR_COLORS.length];

  const handleConfirmDelete = () => {
    onDelete(job._id);
    setShowConfirm(false);
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className={`bg-white rounded-xl shadow-sm p-4 mb-3 border border-gray-100 hover:shadow-md transition-shadow group relative ${isDragging ? 'opacity-50' : ''}`}
      >
        <button
          onClick={(e) => { e.stopPropagation(); setShowConfirm(true); }}
          className="absolute top-3 right-3 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Trash2 size={15} />
        </button>

        <div {...listeners} {...attributes} className="cursor-grab">
          <div className="flex items-start gap-3 mb-3 pr-5">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium ${colorClass}`}>
              {initial}
            </div>
            <div>
              <p className="font-medium text-gray-900 leading-tight">{job.role}</p>
              <p className="text-sm text-gray-500">{job.company}</p>
            </div>
          </div>
          <div className="border-t pt-2 flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs text-gray-400">
              {new Date(job.dateApplied).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
            <div className="flex gap-1">
              {job.priority && (
                <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${PRIORITY_STYLE[job.priority]}`}>
                  {job.priority}
                </span>
              )}
              {job.jobType && (
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600">
                  {job.jobType}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <ConfirmDialog
        isOpen={showConfirm}
        title="Delete this job?"
        message={`This will permanently remove "${job.role}" at ${job.company} from your tracker.`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  );
}