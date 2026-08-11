import { useDroppable } from '@dnd-kit/core';
import JobCard from './JobCard';

export default function Column({ title, jobs, onDelete }) {
  const { setNodeRef, isOver } = useDroppable({ id: title });

  return (
    <div
      ref={setNodeRef}
      className={`rounded-xl p-3 w-72 flex-shrink-0 min-h-[500px] ${isOver ? 'bg-indigo-50' : 'bg-gray-50'}`}
    >
      <h3 className="text-sm font-medium text-gray-600 mb-3 px-1">
        {title} <span className="text-gray-400">({jobs.length})</span>
      </h3>
      {jobs.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-10">No jobs yet</p>
      ) : (
        jobs.map((job) => <JobCard key={job._id} job={job} onDelete={onDelete} />)
      )}
    </div>
  );
}