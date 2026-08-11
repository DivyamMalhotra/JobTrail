import { DndContext } from '@dnd-kit/core';
import Column from './Column';

const STATUSES = ['Wishlist', 'Applied', 'Interview', 'Offer', 'Rejected'];

export default function Board({ jobs, onStatusChange, onDelete }) {
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const jobId = active.id;
    const newStatus = over.id;

    const job = jobs.find((j) => j._id === jobId);
    if (job && job.status !== newStatus) {
      onStatusChange(jobId, newStatus);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex gap-4 overflow-x-auto p-6">
        {STATUSES.map((status) => (
          <Column
            key={status}
            title={status}
            jobs={jobs.filter((j) => j.status === status)}
            onDelete={onDelete}
          />
        ))}
      </div>
    </DndContext>
  );
}