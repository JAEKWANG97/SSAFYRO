// First.jsx
import Essay from './components/Essay';
import Test from './components/Test';
import useFirstStore from '../../stores/FirstStore';

export default function First() {
  const activeTab = useFirstStore((state) => state.activeTab);
  const setActiveTab = useFirstStore((state) => state.setActiveTab);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="mb-6 border-b border-gray-200">
        <ul
          className="flex flex-wrap text-sm font-medium text-center "
          id="default-tab"
          data-tabs-toggle="#default-tab-content"
          role="tablist"
        >
          <li className="me-2" role="presentation">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg font-bold ${
                activeTab === 'essay'
                  ? 'border-[#90CCF0] text-[#90CCF0]'
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
          <li className="me-2" role="presentation">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg font-bold ${
                activeTab === 'sw'
                  ? 'border-[#90CCF0] text-[#90CCF0]'
                  : 'border-transparent text-gray-500 hover:text-gray-600 hover:border-gray-300'
              }`}
              id="sw-tab"
              data-tabs-target="#sw"
              type="button"
              role="tab"
              aria-controls="sw"
              aria-selected={activeTab === 'sw'}
              onClick={() => handleTabClick('sw')}
            >
              SW 적성진단
            </button>
          </li>
        </ul>
      </div>
      <div id="default-tab-content">
        {activeTab === 'essay' && (
          <div
            className="p-4 rounded-lg"
            id="essay"
            role="tabpanel"
            aria-labelledby="essay-tab"
            style={{
              background: 'rgba(144, 204, 240, 0.25)', 
              marginBottom: '20px' // 추가된 여백
            }}
          >
            <Essay />
          </div>
        )}
        {activeTab === 'sw' && (
          <div
            className="p-4 rounded-lg bg-[#90CCF0]"
            id="sw"
            role="tabpanel"
            aria-labelledby="sw-tab"
            style={{
              marginBottom: '20px' // 추가된 여백
            }}
          >
            <Test />
          </div>
        )}
      </div>
    </>
  );
}
