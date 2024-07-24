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
      <div className="mb-4 border-b border-gray-300">
        <ul
          className="flex flex-wrap -mb-px text-sm font-medium text-center"
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
            className="p-4 rounded-lg bg-gray-50"
            id="essay"
            role="tabpanel"
            aria-labelledby="essay-tab"
          >
            <Essay />
          </div>
        )}
        {activeTab === 'sw' && (
          <div
            className="p-4 rounded-lg bg-gray-50"
            id="sw"
            role="tabpanel"
            aria-labelledby="sw-tab"
          >
            <Test />
          </div>
        )}
      </div>
    </>
  );
}