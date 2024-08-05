import { useNavigate, useLocation } from 'react-router-dom';
import useSecondStore from "../../../stores/SecondStore";
import { useEffect } from 'react';

export default function SecondNav() {
  const secondActiveTab = useSecondStore((state) => state.secondActiveTab);
  const setSecondActiveTab = useSecondStore((state) => state.setSecondActiveTab);
  const navigate = useNavigate();
  const location = useLocation();

  // URL 경로를 기반으로 secondActiveTab 설정
  useEffect(() => {
    if (location.pathname.includes('/second/guide')) {
      setSecondActiveTab('guide');
    } else if (location.pathname.includes('/second/interview')) {
      setSecondActiveTab('practice');
    }
  }, [location.pathname, setSecondActiveTab]);

  const handleTabClick = (tab) => {
    setSecondActiveTab(tab);
    if (tab === 'guide') {
      navigate('/second/guide/personality');
    } else if (tab === 'practice') {
      navigate('/second/interview');
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
          <li className="me-2" role="guide">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg font-extrabold ${
                secondActiveTab === 'guide'
                  ? 'border-blue-400 text-blue-400'
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
              className={`inline-block p-4 border-b-2 rounded-t-lg font-extrabold ${
                secondActiveTab === 'practice'
                  ? 'border-blue-400 text-blue-400'
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
