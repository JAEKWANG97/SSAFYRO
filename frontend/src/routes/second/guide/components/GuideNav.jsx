import { useLocation } from "react-router-dom";

export default function GuideNav() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className="flex py-2 px-4">
        <a
          className={`mx-3 ${
            isActive("/second/guide/personality") ? "text-[#90CCF0]" : ""
          }`}
          href="/second/guide/personality"
        >
          인성면접
        </a>
        <a
          className={`mx-3 ${
            isActive("/second/guide/pt") ? "text-[#90CCF0]" : ""
          }`}
          href="/second/guide/pt"
        >
          PT면접
        </a>
        <a
          className={`mx-3 ${
            isActive("/second/guide/it") ? "text-[#90CCF0]" : ""
          }`}
          href="/second/guide/it"
        >
          최신 IT 이슈
        </a>
      </nav>
    </>
  );
}
