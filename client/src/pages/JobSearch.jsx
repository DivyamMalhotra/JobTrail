import { useState } from 'react';
import Navbar from '../components/Navbar';
import axios from '../api/axios';
import useJobs from '../hooks/useJobs';
import AutocompleteInput from '../components/Forms/AutocompleteInput';

const COUNTRIES = [
  { code: 'in', label: 'India' },
  { code: 'us', label: 'United States' },
  { code: 'gb', label: 'United Kingdom' },
  { code: 'ca', label: 'Canada' },
  { code: 'au', label: 'Australia' },
  { code: 'de', label: 'Germany' },
];

const ROLE_SUGGESTIONS = [
  'Software Engineer', 'Senior Software Engineer', 'Frontend Developer',
  'Backend Developer', 'Full Stack Developer', 'SDE Intern', 'SDE-1', 'SDE-2',
  'Product Manager', 'Product Designer', 'UI/UX Designer', 'Data Analyst',
  'Data Scientist', 'DevOps Engineer', 'QA Engineer', 'Business Analyst',
  'Marketing Manager', 'HR Manager', 'Sales Executive', 'Project Manager'
];

const LOCATION_SUGGESTIONS_BY_COUNTRY = {
  in: ['Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Pune', 'Chennai', 'Gurgaon', 'Noida', 'Kolkata', 'Ahmedabad'],
  us: ['San Francisco', 'New York', 'Seattle', 'Austin', 'Boston', 'Chicago', 'Los Angeles', 'Denver', 'Atlanta'],
  gb: ['London', 'Manchester', 'Birmingham', 'Leeds', 'Bristol', 'Edinburgh', 'Glasgow'],
  ca: ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa'],
  au: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'],
  de: ['Berlin', 'Munich', 'Hamburg', 'Frankfurt', 'Cologne'],
};

export default function JobSearch() {
  const [role, setRole] = useState('Software Engineer');
  const [location, setLocation] = useState('');
  const [country, setCountry] = useState('in');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [savedIds, setSavedIds] = useState([]);
  const { addJob } = useJobs();

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
    setLocation('');
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSearched(true);
    try {
      const res = await axios.get('/search', { params: { role, location, country } });
      setResults(res.data);
    } catch (err) {
      console.error(err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (job) => {
    if (savedIds.includes(job.id)) return;
    await addJob({
      company: job.company,
      role: job.title,
      link: job.url,
      status: 'Wishlist',
      priority: 'Medium',
    });
    setSavedIds((prev) => [...prev, job.id]);
  };

  const handleApply = async (job) => {
    if (!savedIds.includes(job.id)) {
      await addJob({
        company: job.company,
        role: job.title,
        link: job.url,
        status: 'Wishlist',
        priority: 'Medium',
      });
      setSavedIds((prev) => [...prev, job.id]);
    }
    window.open(job.url, '_blank', 'noopener,noreferrer');
  };

  const isINR = country === 'in';
  const currencySymbol = isINR ? '₹' : '$';
  const formatSalary = (amount) =>
    isINR ? Math.round(amount / 100000) + 'L' : Math.round(amount / 1000) + 'k';

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-5xl mx-auto p-4 md:p-6">
        <h1 className="text-xl md:text-2xl font-semibold mb-1">Job Search</h1>
        <p className="text-gray-500 mb-6 text-sm md:text-base">Find your next role and add it instantly to your JobTrail board.</p>

        <form onSubmit={handleSearch} className="bg-white rounded-xl border p-4 mb-8">
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:items-end">
            <div className="w-full sm:flex-1 sm:min-w-[180px]">
              <AutocompleteInput
                name="role"
                label=""
                placeholder="Job title (e.g. Software Engineer)"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                suggestions={ROLE_SUGGESTIONS}
              />
            </div>
            <select
              value={country}
              onChange={handleCountryChange}
              className="w-full sm:w-auto border rounded-lg p-3"
            >
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>{c.label}</option>
              ))}
            </select>
            <div className="w-full sm:flex-1 sm:min-w-[180px]">
              <AutocompleteInput
                name="location"
                label=""
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                suggestions={LOCATION_SUGGESTIONS_BY_COUNTRY[country] || []}
              />
            </div>
            <button className="w-full sm:w-auto bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700">
              Search
            </button>
          </div>
        </form>

        {loading && <p className="text-gray-400">Searching...</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {results.map((job) => (
            <div key={job.id} className="bg-white rounded-xl border p-5">
              <div className="flex justify-between items-start mb-2 gap-3">
                <div>
                  <h3 className="font-semibold">{job.title}</h3>
                  <p className="text-sm text-gray-500">{job.company} · {job.location}</p>
                </div>
                {job.salaryMin && (
                  <span className="text-emerald-600 font-medium text-sm whitespace-nowrap">
                    {currencySymbol}{formatSalary(job.salaryMin)} - {currencySymbol}{formatSalary(job.salaryMax)}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                {job.description}
              </p>
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                <button
                  onClick={() => handleSave(job)}
                  disabled={savedIds.includes(job.id)}
                  className="border px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50 hover:bg-gray-50"
                >
                  {savedIds.includes(job.id) ? 'Saved ✓' : 'Save to Tracker'}
                </button>
                <button
                  onClick={() => handleApply(job)}
                  className="text-indigo-600 text-sm font-medium hover:underline text-left sm:text-right"
                >
                  View Original →
                </button>
              </div>
            </div>
          ))}
        </div>

        {!loading && searched && results.length === 0 && (
          <p className="text-gray-400 text-center py-10">No results found. Try a different role, location, or country.</p>
        )}

        {!searched && (
          <p className="text-gray-400 text-center py-10">Search for a role to see results.</p>
        )}
      </div>
    </div>
  );
}