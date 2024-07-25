// SecondNav.jsx
import useSecondStore from "../../../stores/SecondStore";
import GuidePersonality from "../guide/GuidePersonality";
import Interview from '../interview/Interview'

export default function SecondNav() {
  // const activeTab = useSecondStore((state) => state.activeTab);
  // const setActiveTab = useSecondStore((state) => state.setActiveTab);

  // const handleTabClick = (tab) => {
  //   setActiveTab(tab);
  // };

  return (
    <>
      <nav className="flex py-2 px-4">
        <a className="mx-3" href="/second/guide/personality">
          면접가이드
        </a>
        <a className="mx-3" href="/second/interview">
          면접 연습
        </a>
      </nav>
    </>
  //   <>
  //     <div className="mb-4 border-b border-gray-300">
  //       <ul
  //         className="flex flex-wrap -mb-px text-sm font-medium text-center"
  //         id="default-tab"
  //         data-tabs-toggle="#default-tab-content"
  //         role="tablist"
  //       >
  //         <li className="me-2" role="presentation">
  //           <button
  //             className={`inline-block p-4 border-b-2 rounded-t-lg font-bold ${
  //               activeTab === "guide"
  //                 ? "border-[#90CCF0] text-[#90CCF0]"
  //                 : "border-transparent text-gray-500 hover:text-gray-600 hover:border-gray-300"
  //             }`}
  //             id="guide-tab"
  //             data-tabs-target="#guide"
  //             type="button"
  //             role="tab"
  //             aria-controls="guide"
  //             aria-selected={activeTab === "guide"}
  //             onClick={() => handleTabClick("guide")}
  //           >
  //             면접 가이드
  //           </button>
  //         </li>
  //         <li className="me-2" role="presentation">
  //           <button
  //             className={`inline-block p-4 border-b-2 rounded-t-lg font-bold ${
  //               activeTab === "practice"
  //                 ? "border-[#90CCF0] text-[#90CCF0]"
  //                 : "border-transparent text-gray-500 hover:text-gray-600 hover:border-gray-300"
  //             }`}
  //             id="practice-tab"
  //             data-tabs-target="#practice"
  //             type="button"
  //             role="tab"
  //             aria-controls="practice"
  //             aria-selected={activeTab === "practice"}
  //             onClick={() => handleTabClick("practice")}
  //           >
  //             SW 적성진단
  //           </button>
  //         </li>
  //       </ul>
  //     </div>
  //     <div id="default-tab-content">
  //       {activeTab === "guide" && (
  //         <div
  //           className="p-4 rounded-lg bg-gray-50"
  //           id="guide"
  //           role="tabpanel"
  //           aria-labelledby="guide-tab"
  //         >
  //           <GuidePersonality />
  //         </div>
  //       )}
  //       {activeTab === "sw" && (
  //         <div
  //           className="p-4 rounded-lg bg-gray-50"
  //           id="sw"
  //           role="tabpanel"
  //           aria-labelledby="sw-tab"
  //         >
  //           <Interview />
  //         </div>
  //       )}
  //     </div>
  //   </>
  );
}
