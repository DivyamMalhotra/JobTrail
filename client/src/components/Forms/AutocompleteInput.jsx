import { useState, useRef, useEffect } from 'react';

export default function AutocompleteInput({ name, value, onChange, suggestions, placeholder, label }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [filtered, setFiltered] = useState([]);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const val = e.target.value;
    onChange({ target: { name, value: val } });
    if (val.trim()) {
      setFiltered(suggestions.filter((s) => s.toLowerCase().includes(val.toLowerCase())).slice(0, 8));
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const handleSelect = (item) => {
    onChange({ target: { name, value: item } });
    setShowDropdown(false);
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <label className="text-sm font-medium block mb-1">{label}</label>
      <input
        name={name}
        value={value}
        onChange={handleChange}
        onFocus={handleChange}
        placeholder={placeholder}
        autoComplete="off"
        className="w-full border rounded-lg p-3"
        required
      />
      {showDropdown && filtered.length > 0 && (
        <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-56 overflow-y-auto">
          {filtered.map((item) => (
            <div
              key={item}
              onClick={() => handleSelect(item)}
              className="px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer"
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}