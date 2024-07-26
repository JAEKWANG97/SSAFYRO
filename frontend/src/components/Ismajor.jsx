import useFirstStore from "../stores/FirstStore";


export default function Ismajor() {
  const selected = useFirstStore((state) => state.selected)
  const setSelected = useFirstStore((state) => state.setSelected);
  const setShowCorrection = useFirstStore((state) => state.setShowCorrection);

  const handleSelect = (type) => {
    setSelected(type);
    setShowCorrection(false); // 새로운 타입을 선택할 때 AI 첨삭 상태 초기화
  };


  return (
    <>
    <div className="inline-flex rounded-md" role="group">
          <button 
            type="button" 
            className={`px-4 py-2 text-sm font-bold bg-white border border-gray-200 rounded-s-lg ${
              selected === 'major' 
                ? 'font-bold text-[#90CCF0]'
                : 'font-bold text-gray-900'
            }`}
            onClick={() => handleSelect('major')}>
            전공자
          </button>

          <button 
            type="button" 
            className={`px-4 py-2 text-sm font-bold bg-white border border-gray-200 rounded-e-lg ${
              selected === 'nonMajor' 
                ? 'text-[#90CCF0]'
                : 'text-gray-900'
            }`}
            onClick={() => handleSelect('nonMajor')}>
            비전공자
          </button>
        </div>
      
    </>
  );
}
