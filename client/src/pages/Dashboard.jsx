import { useState } from 'react';
import Navbar from '../components/Navbar';
import Board from '../components/Board/Board';
import StatsRow from '../components/Dashboard/StatsRow';
import AddJobModal from '../components/Forms/AddJobModal';
import useJobs from '../hooks/useJobs';

export default function Dashboard() {
  const { jobs, loading, addJob, updateJobStatus, deleteJob } = useJobs();
  const [isModalOpen, setModalOpen] = useState(false);

  if (loading) return <p className="p-8">Loading your board...</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <StatsRow jobs={jobs} />

        <div className="flex justify-between items-center px-6 pt-6">
          <h1 className="text-xl font-medium text-gray-800">Your Job Board</h1>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm"
          >
            + Add Job
          </button>
        </div>

        <Board jobs={jobs} onStatusChange={updateJobStatus} onDelete={deleteJob} />
      </div>

      <AddJobModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} onAdd={addJob} />
    </div>
  );
}