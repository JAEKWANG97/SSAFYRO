import { useState } from 'react';
import { useParams } from 'react-router-dom';
import PersonalityFeedback from './PersonalityFeedback';
import PtFeedback from './PtFeedback';


export default function Profile() {

  const params = useParams();
  const [person, serPerson] = useState(false)
  const [pt, setPt] = useState(false)

  return (
    <>
      <div>{`${params.userId}번 회원의 프로필 페이지 입니다`}</div>

      {person && <PersonalityFeedback />}
      {pt && <PtFeedback />}

    </>
  );
};


