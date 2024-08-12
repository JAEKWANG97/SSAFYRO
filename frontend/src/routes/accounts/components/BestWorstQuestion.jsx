export default function BestWorstQuestion() {

  return (
    <>
      <div className="container mx-auto p-5 max-w-2xl bg-white rounded-lg shadow-md mt-10 mb-20">

        

        <div className="pl-7">
                <div 
                  className="max-w-xl h-[80px] border rounded-xl flex flex-col font-extrabold pl-4 pt-4 relative transition-transform transform hover:scale-105"
                  onClick={() => nav('bestworst_feedback', { state: { activeTab: "tab3" } })}
                >
                  더 자세히 알아보기
                  <span className="text-sm font-medium pt-1">유사 질답 내용을 모아놨아요.</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </div>
              </div>
      </div>
      
    </>
  );
};


