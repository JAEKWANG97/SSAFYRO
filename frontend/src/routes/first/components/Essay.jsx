import { useState } from 'react';

export default function Essay() {
  const [selected, setSelected] = useState('major');
  const [showCorrection, setShowCorrection] = useState(false);

  const handleSelect = (type) => {
    setSelected(type);
    setShowCorrection(false); // 새로운 타입을 선택할 때 AI 첨삭 상태 초기화
  };

  const handleAiCorrection = () => {
    setShowCorrection(true);
  };

  return (
    <>
    


      <h1>에세이</h1>
      <button
        type="button"
        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        onClick={() => handleSelect('major')}
      >
        전공자
      </button>
      <button
        type="button"
        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        onClick={() => handleSelect('nonMajor')}
      >
        비전공자
      </button>

      {selected === 'major' && (
        <div>
          <h2>전공자 질문 (500자 내외/ 최대 600자 까지)</h2>
          <button
            type="button"
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            onClick={handleAiCorrection}
          >
            ai첨삭
          </button>
        </div>
      )}

      {selected === 'nonMajor' && (
        <div>
          <h2>비전공자 질문 (500자 내외/ 최대 600자 까지)</h2>
          <button
            type="button"
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            onClick={handleAiCorrection}
          >
            ai첨삭
          </button>
        </div>
      )}
      
      <div>
        <label
          htmlFor="majorMessage"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        ></label>
        <textarea
          id="majorMessage"
          rows="4"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="여기에 작성해주세요."
        ></textarea>
        {showCorrection && (
          <textarea
            id="correctionMessage"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2"
            placeholder="여기에 AI 첨삭 내용이 표시됩니다."
          ></textarea>
        )}
        <button
          type="button"
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          저장
        </button>
      </div>
    </>
  );
}
