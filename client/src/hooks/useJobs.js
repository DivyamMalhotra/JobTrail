import { useState, useEffect } from 'react';
import axios from '../api/axios';

export default function useJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/jobs');
      setJobs(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  const addJob = async (jobData) => {
    const res = await axios.post('/jobs', jobData);
    setJobs((prev) => [res.data, ...prev]);
  };

  const updateJobStatus = async (id, status) => {
    const res = await axios.put(`/jobs/${id}`, { status });
    setJobs((prev) => prev.map((job) => (job._id === id ? res.data : job)));
  };

  const deleteJob = async (id) => {
    await axios.delete(`/jobs/${id}`);
    setJobs((prev) => prev.filter((job) => job._id !== id));
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return { jobs, loading, error, addJob, updateJobStatus, deleteJob, refetch: fetchJobs };
}