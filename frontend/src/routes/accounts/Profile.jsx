import EssayDetail from './components/EssayDetail';
import InterviewResult from './components/InterviewResult';
import UserImg from './../../../public/main/user.jpg';
import useAuthStore from '../../stores/AuthStore';
import { useNavigate } from 'react-router-dom';
import Button from './../../../src/components/Button';
import { Tabs } from "flowbite-react";
import { HiOutlineDocumentText, HiUsers, HiOutlinePencil } from "react-icons/hi";

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
    <div>
      <div className="container mx-auto p-5 max-w-4xl bg-white rounded-lg shadow-md mt-10 mb-20">
        <Tabs
          aria-label="Full width tabs"
          variant="default"  // 변경: fullWidth를 제거하여 기본 탭 배치로 설정
          className="w-full"
          theme={{
            tablist: {
              base: 'flex space-x-2', // 탭을 가로로 배치
              tabitem: {
                base: 'flex items-center justify-center p-4 text-sm font-medium first:ml-0 disabled:cursor-not-allowed disabled:text-gray-400 focus:ring-0 focus:outline-none rounded-t-lg border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-600',
              },
            },
          }}
        >
          <Tabs.Item 
            active 
            title="Profile" 
            icon={HiOutlineDocumentText}
            className="active:bg-transparent active:border-none active:text-black"
          >
            {/* Profile content */}
          </Tabs.Item>
          <Tabs.Item 
            title="Dashboard" 
            icon={HiOutlinePencil}
            className="hover:bg-transparent hover:border-none hover:text-black"
          >
            {/* Dashboard content */}
          </Tabs.Item>
          <Tabs.Item 
            title="Settings" 
            icon={HiUsers}
            className="hover:bg-transparent hover:border-none hover:text-black"
          >
            {/* Settings content */}
          </Tabs.Item>
        </Tabs>

        <div className="flex items-center mb-6 gap-4">
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
            <h2 className="text-xl font-semibold pt-5 text-center">{`${userInfo.userName}`}</h2>
          </div>
        </div>

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
    </div>
  );
}
