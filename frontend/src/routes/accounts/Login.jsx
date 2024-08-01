export default function Login() {
  return (
    <div className="flex items-start justify-center min-h-screen">
      <div className="w-full max-w-[350px] mx-auto p-10 bg-white shadow-xl rounded-lg flex flex-col items-center justify-center mt-40">
        <p className="text-2xl font-extrabold text-center text-[#000000] mb-8">SSAFYRO</p>
        <div className="flex flex-col items-center space-y-4 w-full">
          <button className="w-full max-w-xs bg-[#FFE812] text-yellow-800 border-yellow-300 hover:bg-opacity-70 font-semibold rounded-lg text-sm py-3 text-center inline-flex items-center justify-center">
            <img src="/public/login/kakao.png" alt="Kakao" className="w-6 h-6 mr-2" />
            카카오 계정으로 로그인
          </button>
          <button className="w-full max-w-xs bg-white text-gray-800 border border-[#B1B3B6] hover:bg-gray-50 font-semibold rounded-lg text-sm py-3 text-center inline-flex items-center justify-center">
            <img src="/public/login/google.png" alt="Google" className="w-6 h-6 mr-2" />
            구글 계정으로 로그인
          </button>
          <button className="w-full max-w-xs bg-[#1EDE00] text-green-800 border-green-300 hover:bg-opacity-70 font-semibold rounded-lg text-sm py-3 text-center inline-flex items-center justify-center">
            <img src="/public/login/naver.png" alt="Naver" className="w-6 h-6 mr-2" />
            네이버 계정으로 로그인
          </button>
        </div>
      </div>
    </div>
  );
}
