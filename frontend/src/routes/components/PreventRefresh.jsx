import { useEffect } from 'react';

const PreventRefresh = () => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "F5" || (event.ctrlKey && event.key === "r")) {
        event.preventDefault();
        alert("해당 페이지에서는 사용할 수 없는 기능입니다.")
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return null; // 이 컴포넌트는 UI를 렌더링하지 않으므로 null을 반환합니다.
};

export default PreventRefresh;
