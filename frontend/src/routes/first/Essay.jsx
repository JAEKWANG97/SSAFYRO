import FirstdNav from './components/FirstNav';
import useFirstStore from '../../stores/FirstStore';
import Ismajor from './../../components/Ismajor';
import Button from './../../components/Button';

export default function Essay() {
  const selected = useFirstStore((state) => state.selected);
  const showCorrection = useFirstStore((state) => state.showCorrection);
  const setShowCorrection = useFirstStore((state) => state.setShowCorrection);
  const handleAiCorrection = () => {
    setShowCorrection(true);
  };

  return (
    <>
      <FirstdNav />
      <div
        className="container mx-auto p-5 max-w-4xl bg-white rounded-lg shadow-md mt-10"
        style={{
          boxShadow:
            '0 4px 6px -1px rgba(0, 0, 0, 0.03), 0 -4px 6px -1px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div className="flex pb-10 items-center">
          <p className="text-2xl font-extrabold pr-4 pl-2">에세이</p>
          <Ismajor />
          <Button text="AI 첨삭" type="ESSAYAI" onClick={handleAiCorrection} />
        </div>

        <div className="border border-gray-400 rounded-lg bg-white">
          {selected === 'major' && (
            <div className="py-5 flex flex-col items-center font-bold text-center">
              <p>향후 어떤 SW 개발자로 성장하고 싶은지 SW 관련 경험을 토대로 기술하고,</p>
              <p>SSAFY에 지원하신 동기에 대해서도 작성 바랍니다. (500자 내외/ 최대 600자 까지)</p>
            </div>
          )}

          {selected === 'nonMajor' && (
            <div className="py-5 flex flex-col items-center font-bold text-center">
              <p>학업 및 취업준비를 하며 가장 어려웠던 경험과 이를 해결하기 위해 했던 노력을 기술하고,</p>
              <p>SSAFY에 지원하신 동기에 대해서도 작성 바랍니다. (500자 내외/ 최대 600자 까지)</p>
            </div>
          )}
        </div>

        <div className="pt-6">
          <div
            className={`flex ${
              showCorrection ? 'flex-row space-x-4' : 'flex-col'
            }`}
          >
            <textarea
              className="block p-4 w-full h-64 resize-none text-sm text-gray-900 rounded-lg border border-gray-400 focus:ring-[#90CCF0] focus:border-[#90CCF0]"
              placeholder="여기에 작성해주세요."
              spellCheck="false"
              autoCorrect="off"
              autoComplete="off"
            ></textarea>

            {showCorrection && (
              <div className="block p-4 w-full h-64 text-sm text-gray-900 rounded-lg border border-gray-400">
                첨삭 내용
              </div>
            )}
          </div>
          <div className="flex">
            <Button text="저장" type="ESSAYSAVE" />
          </div>
        </div>
      </div>
    </>
  );
}
