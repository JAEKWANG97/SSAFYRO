import { useState } from 'react';
import Button from '../../../components/Button';

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
      <div className='flex border-b pb-4 items-center'>
        <p className="text-3xl font-bold pr-4">에세이</p>
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button 
            type="button" 
            className={`px-4 py-2 text-sm font-bold bg-white border border-gray-200 rounded-s-lg ${
              selected === 'major' 
                ? 'font-bold text-[#90CCF0] border-[#90CCF0] focus:ring-[#90CCF0] focus:border-[#90CCF0]'
                : 'font-bold text-gray-900 hover:text-[#90CCF0] focus:z-10 focus:ring-2 focus:ring-[#90CCF0] focus:text-[#90CCF0]'
            }`}
            onClick={() => handleSelect('major')}>
            전공자
          </button>

          <button 
            type="button" 
            className={`px-4 py-2 text-sm font-bold bg-white border border-gray-200 rounded-e-lg ${
              selected === 'nonMajor' 
                ? 'text-[#90CCF0] border-[#90CCF0] focus:ring-[#90CCF0] focus:border-[#90CCF0]'
                : 'text-gray-900 hover:text-[#90CCF0] focus:z-10 focus:ring-2 focus:ring-[#90CCF0] focus:text-[#90CCF0]'
            }`}
            onClick={() => handleSelect('nonMajor')}>
            비전공자
          </button>
        </div>
        <button
          type="button"
          className="ml-auto text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          onClick={handleAiCorrection}>
          AI 첨삭
        </button>
      </div>
  
      <div className="border-t border-gray-300">
        {selected === 'major' && (
          <div className="py-5 flex justify-center border-b border-gray-300">
            <h2>전공자 질문 (500자 내외/ 최대 600자 까지)</h2>
          </div>
        )}

        {selected === 'nonMajor' && (
          <div className="py-5 flex justify-center border-b border-gray-300">
            <h2>비전공자 질문 (500자 내외/ 최대 600자 까지)</h2>
          </div>
        )}
      </div>

      <div className="py-5">
        <div className={`flex ${showCorrection ? 'flex-row space-x-4' : 'flex-col'}`}>
          <textarea
            className="block p-4 w-full h-64 resize-none text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-[#90CCF0] focus:border-[#90CCF0]"
            placeholder="여기에 작성해주세요."
            spellCheck="false"
            autoCorrect="off"
            autoComplete="off"
          ></textarea>

          {showCorrection && (
            <div
              className="block p-4 w-full h-64 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
            >첨삭 내용</div>
          )}
        </div>
        <div className="flex">
          <button
            type="button"
            className="ml-auto mt-4 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            저장
          </button>
        </div>
      </div>
    </>
  );
}
