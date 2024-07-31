import { useParams } from "react-router-dom";

export default function PtFeedback() {
  const params = useParams();

  return (
    <>
      <div>{`${params.userId}번 회원의 pt면접 결과 페이지 입니다`}</div>
      
    </>
  );
};


