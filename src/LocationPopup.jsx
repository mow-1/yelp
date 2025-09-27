import React, { useEffect, useMemo, useState } from 'react';
import { MapPin } from 'lucide-react';

const LocationPopup = ({ isOpen, onClose, onSelectLocation }) => {
  const [selectedBranch, setSelectedBranch] = useState('');
  const [seconds, setSeconds] = useState(10);

  const branches = useMemo(() => ([
    { key: 'Madinaty', title: 'Madinaty', subtitle: 'Fastest delivery' },
    { key: 'New Cairo', title: 'New Cairo', subtitle: 'Fastest delivery' },
    { key: '3rd Branch', title: '3rd Branch', subtitle: 'City coverage' },
    { key: 'All Egypt', title: 'All over Egypt', subtitle: '48 hrs delivery' }
  ]), []);

  useEffect(() => {
    if (!isOpen) return;
    setSeconds(10);
    const interval = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          clearInterval(interval);
          onClose();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, onClose]);

  const handleChoose = (branch) => {
    setSelectedBranch(branch.title);
    onSelectLocation(branch.title);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true" aria-label="Select location">
      <div className="rounded-2xl max-w-2xl w-full p-6 relative" style={{background:'linear-gradient(180deg,#1E2A44 0%, #2A4066 100%)', boxShadow:'0 20px 60px rgba(0,0,0,0.35)'}}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-300 hover:text-white"
          aria-label="Close"
          title="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-extrabold text-white mb-1">Where are we delivering?</h2>
          <p className="text-gray-300">Choose your area to tailor delivery speed & availability.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          {branches.map((b) => (
            <button
              key={b.key}
              onClick={() => handleChoose(b)}
              className={`text-left rounded-xl p-4 transition-all border ${selectedBranch === b.title ? 'bg-yellow-400 text-blue-900 shadow-[0_0_30px_rgba(244,207,98,0.6)] border-yellow-400' : 'bg-transparent text-white border-gray-600 hover:border-yellow-400'}`}
            >
              <div className="font-semibold text-lg">{b.title}</div>
              <div className={`text-sm ${selectedBranch === b.title ? 'text-blue-900/80' : 'text-gray-300'}`}>{b.subtitle}</div>
            </button>
          ))}
        </div>

        <div className="text-center text-gray-300 mb-2">Auto-close in <span className="font-semibold text-white">{seconds}</span> s</div>
        <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-yellow-400" style={{width: `${((10 - Math.max(seconds,0)) / 10) * 100}%`}} />
        </div>
      </div>
    </div>
  );
};

export default LocationPopup;