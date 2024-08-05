import { useNavigate, useLocation } from 'react-router-dom';
import useFirstStore from '../../../stores/FirstStore';
import { useEffect } from 'react';

export default function FirstdNav() {
  const activeTab = useFirstStore((state) => state.activeTab);
  const setActiveTab = useFirstStore((state) => state.setActiveTab);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('essay')) {
      setActiveTab('essay');
    } else if (location.pathname.includes('test')) {
      setActiveTab('test');
    }
  }, [location, setActiveTab]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === 'essay') {
      navigate('/first/essay');
    } else if (tab === 'test') {
      navigate('/first/test');
    }
  };

  return (
    <>
      <div className="pt-6 mb-6 border-b border-gray-400">
        <ul
          className="flex flex-wrap text-sm font-medium text-center"
          id="default-tab"
          data-tabs-toggle="#default-tab-content"
          role="tablist"
        >
          <li className="me-2" role="essay">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg font-extrabold ${
                activeTab === 'essay'
                  ? 'border-blue-400 text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-600 hover:border-gray-300'
              }`}
              id="essay-tab"
              data-tabs-target="#essay"
              type="button"
              role="tab"
              aria-controls="essay"
              aria-selected={activeTab === 'essay'}
              onClick={() => handleTabClick('essay')}
            >
              에세이
            </button>
          </li>
          <li className="me-2" role="test">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg font-extrabold ${
                activeTab === 'test'
                  ? 'border-blue-400 text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-600 hover:border-gray-300'
              }`}
              id="test-tab"
              data-tabs-target="#test"
              type="button"
              role="tab"
              aria-controls="test"
              aria-selected={activeTab === 'test'}
              onClick={() => handleTabClick('test')}
            >
              SW 적성진단
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}
