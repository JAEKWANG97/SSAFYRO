// GuideNav.jsx

export default function GuideNav() {
  return (
    <>
      <nav className="flex py-2">
        <a className="mx-3" href="/second/guide/personality">
          인성면접
        </a>
        <a className="mx-3" href="/second/guide/pt">
          PT면접
        </a>
        <a className="mx-3" href="/second/guide/it">
          최신 IT 이슈
        </a>
      </nav>
    </>
  );
}
