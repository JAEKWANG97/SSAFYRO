import { useParams } from 'react-router-dom';
import PersonalityFeedback from './PersonalityFeedback';
import PtFeedback from './PtFeedback';
import useAuthStore from '../../stores/AuthStore';


export default function Profile() {

  const params = useParams();
  const IsPerson = useAuthStore((state) => state.IsPerson);
  const setIsPerson = useAuthStore((state) => state.setIsPerson);
  const IsPt = useAuthStore((state) => state.IsPt);
  const setIsPt = useAuthStore((state) => state.setIsPt);

  return (
    <>

      <div        
        className="container mx-auto p-5 max-w-4xl bg-white rounded-lg shadow-md mt-10 mb-20"
        style={{
          boxShadow:
            '0 4px 6px -1px rgba(0, 0, 0, 0.03), 0 -4px 6px -1px rgba(0, 0, 0, 0.1)',
          }}
          >
          <div>{`${params.userId}번 회원의 프로필 페이지 입니다`}</div>
              {IsPerson && <PersonalityFeedback />} 
              {IsPt && <PtFeedback />}
        <div className="flex pb-10 items-center relative pt-4 ">
          
        </div>
      </div>



 

    </>
  );
};


