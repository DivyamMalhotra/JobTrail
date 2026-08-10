import { useState } from 'react';
import AutocompleteInput from './AutocompleteInput';

const COMPANY_SUGGESTIONS = [
  'Google', 'Microsoft', 'Amazon', 'Apple', 'Meta', 'Netflix', 'Tesla',
  'Deloitte', 'Accenture', 'TCS', 'Infosys', 'Wipro', 'Cognizant', 'Capgemini',
  'IBM', 'Oracle', 'Adobe', 'Salesforce', 'Intel', 'Nvidia', 'Uber', 'Airbnb',
  'Stripe', 'Slack', 'Figma', 'Notion', 'Atlassian', 'Goldman Sachs', 'JPMorgan Chase'
];

const ROLE_SUGGESTIONS = [
  'Software Engineer', 'Senior Software Engineer', 'Frontend Developer',
  'Backend Developer', 'Full Stack Developer', 'SDE Intern', 'SDE-1', 'SDE-2',
  'Product Manager', 'Product Designer', 'UI/UX Designer', 'Data Analyst',
  'Data Scientist', 'DevOps Engineer', 'QA Engineer', 'Business Analyst',
  'Marketing Manager', 'HR Manager', 'Sales Executive', 'Project Manager'
];

export default function AddJobModal({ isOpen, onClose, onAdd }) {
  const [form, setForm] = useState({
    company: '', role: '', link: '', status: 'Applied',
    dateApplied: new Date().toISOString().split('T')[0],
    priority: 'Medium', notes: ''
  });

  if (!isOpen) return null;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onAdd(form);
    setForm({ company: '', role: '', link: '', status: 'Applied', dateApplied: new Date().toISOString().split('T')[0], priority: 'Medium', notes: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-5 sm:p-8 w-full max-w-xl shadow-lg relative max-h-[90vh] overflow-y-auto">
        <button type="button" onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600">✕</button>
        <h2 className="text-2xl font-semibold mb-6">Add New Job</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <AutocompleteInput
            name="company" label="Company Name" placeholder="e.g. Stripe"
            value={form.company} onChange={handleChange} suggestions={COMPANY_SUGGESTIONS}
          />
          <AutocompleteInput
            name="role" label="Role / Position" placeholder="e.g. Product Designer"
            value={form.role} onChange={handleChange} suggestions={ROLE_SUGGESTIONS}
          />
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium block mb-1">Job Description Link</label>
          <input name="link" placeholder="https://careers.company.com/jobs/..." value={form.link} onChange={handleChange}
            className="w-full border rounded-lg p-3" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="text-sm font-medium block mb-1">Status</label>
            <select name="status" value={form.status} onChange={handleChange} className="w-full border rounded-lg p-3">
              <option>Wishlist</option>
              <option>Applied</option>
              <option>Interview</option>
              <option>Offer</option>
              <option>Rejected</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">Date Applied</label>
            <input type="date" name="dateApplied" value={form.dateApplied} onChange={handleChange}
              className="w-full border rounded-lg p-3" />
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">Priority</label>
            <select name="priority" value={form.priority} onChange={handleChange} className="w-full border rounded-lg p-3">
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
        </div>

        <div className="mb-6">
          <label className="text-sm font-medium block mb-1">Notes</label>
          <textarea name="notes" rows="3" value={form.notes} onChange={handleChange}
            placeholder="Add specific interview prep notes, referral names, or compensation details here..."
            className="w-full border rounded-lg p-3" />
        </div>

        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-lg border font-medium">Cancel</button>
          <button type="submit" className="px-5 py-2.5 rounded-lg bg-indigo-600 text-white font-medium">Save Job</button>
        </div>
      </form>
    </div>
  );
}