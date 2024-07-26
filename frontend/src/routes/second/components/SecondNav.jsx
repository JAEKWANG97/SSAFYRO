import { useNavigate } from 'react-router-dom';
import useSecondStore from "../../../stores/SecondStore";

export default function SeconddNav() {
  const secondActiveTab = useSecondStore((state) => state.secondActiveTab);
  const setSecondActiveTab = useSecondStore((state) => state.setSecondActiveTab);
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setSecondActiveTab(tab);
    if (tab === 'practice') {
      navigate('/second/interview');
    } else if ('tab == guide') {
      navigate('/second/guide/personality');
    }
  };

  return (
    <>
      <div className="mb-6 border-b border-gray-200">
        <ul
          className="flex flex-wrap text-sm font-medium text-center"
          id="default-tab"
          data-tabs-toggle="#default-tab-content"
          role="tablist"
        >
          <li className="me-2" role="guide">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg font-bold ${
                secondActiveTab === 'guide'
                  ? 'border-[#90CCF0] text-[#90CCF0]'
                  : 'border-transparent text-gray-500 hover:text-gray-600 hover:border-gray-300'
              }`}
              id="guide-tab"
              data-tabs-target="#guide"
              type="button"
              role="tab"
              aria-controls="guide"
              aria-selected={secondActiveTab === 'guide'}
              onClick={() => handleTabClick('guide')}
            >
              면접 가이드
            </button>
          </li>
          <li className="me-2" role="practice">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg font-bold ${
                secondActiveTab === 'practice'
                  ? 'border-[#90CCF0] text-[#90CCF0]'
                  : 'border-transparent text-gray-500 hover:text-gray-600 hover:border-gray-300'
              }`}
              id="practice-tab"
              data-tabs-target="#practice"
              type="button"
              role="tab"
              aria-controls="practice"
              aria-selected={secondActiveTab === 'practice'}
              onClick={() => handleTabClick('practice')}
            >
              면접 연습하기
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}
