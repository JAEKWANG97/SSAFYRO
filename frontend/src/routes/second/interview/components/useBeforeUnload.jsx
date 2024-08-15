import { useEffect } from "react";

const useBeforeUnload = (callback) => {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = ''; // 표준에 따라 추가된 코드
      callback();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        callback();
      }
    };

    const handlePopState = (event) => {
      callback();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [callback]);
};

export default useBeforeUnload;
