export default function Navbar() {
  return (
    <>
      <nav className="flex py-3 px-4 text-lg">
        {/* 로고 자리 */}
        <div className="flex-auto text-start">
          <a className="font-extrabold" href="/">
            <img
              className="h-full inline"
              src="../../public/SSAFYRO.png"
              alt=""
            />
            SSAFYRO
          </a>
        </div>
        {/* 메뉴 자리 */}
        <div className="flex-auto text-center">
          <a className="mx-3" href="">
            1차
          </a>
          <a className="mx-3" href="/second/guide/personality">
            2차
          </a>
        </div>
        {/* 회원 메뉴 */}
        <div className="flex-auto text-end">
          <a href="">로그인</a>
        </div>
      </nav>
    </>
  );
}
