import EssayDetail from './components/EssayDetail';
import InterviewResult from './components/InterviewResult';
import UserImg from './../../../public/main/user.jpg';
import useAuthStore from '../../stores/AuthStore';
import { useNavigate } from 'react-router-dom';
import Button from './../../../src/components/Button';

export default function Profile() {

  const nav = useNavigate();
  const isPerson = useAuthStore((state) => state.isPerson);
  const isPt = useAuthStore((state) => state.isPt);
  const userInfo = useAuthStore((state) => state.userInfo);

  const onHandlePT = () => {
    if (isPt) {
      nav('pt_feedback');
    }
  };

  const onHandlePersonality = () => {
    if (isPerson) {
      nav('personality_feedback');
    }
  };

  return (
    <div className="container mx-auto p-5 max-w-4xl bg-white rounded-lg shadow-md mt-10 mb-20">
      <div className="flex flex-col items-center mb-6 pt-12">
        <img 
          src={UserImg} 
          alt="UserImg" 
          style={{
            width: '100px', 
            height: '100px', 
            borderRadius: '50%', 
            objectFit: 'cover', 
          }}
        />
        <div>
          <h2 className="text-xl font-semibold pt-5">{`${userInfo.userName}`}</h2>
        </div>
      </div>

      <EssayDetail/>
      <InterviewResult/>

      <div className={`flex ${isPerson && isPt ? 'justify-center gap-4' : 'justify-center'}`}>
        {isPerson && (
          <Button 
            type='PERSONALITY'
            text='인성 면접 결과 자세히 보기'
            onClick={onHandlePersonality}
          />
        )}
        
        {isPt && (
          <Button 
            type='PT'
            text='PT 면접 결과 자세히 보기'
            onClick={onHandlePT}
          />
        )}
      </div>

      <div className="flex pb-10 items-center relative pt-4 ">
      </div>
    </div>
  );
}
