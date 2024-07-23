import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Personality_feedback from './Personality_feedback';
import Pt_feedback from './Pt_feedback';


export default function Profile() {

  const params = useParams();
  const [person, serPerson] = useState(false)
  const [pt, setPt] = useState(false)

  return (
    <>
      <div>{`${params.userId}번 회원의 프로필 페이지 입니다`}</div>

      {person && <Personality_feedback />}
      {pt && <Pt_feedback />}

    </>
  );
};


