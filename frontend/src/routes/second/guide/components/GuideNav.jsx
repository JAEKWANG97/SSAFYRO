import { useNavigate, useLocation } from "react-router-dom";
import Button from './../../../../components/Button';

export default function GuideNav() {
  const nav = useNavigate();
  const location = useLocation();

  // 현재 경로와 일치하는지 확인하는 함수
  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className="flex py-2 px-4">
        <Button 
          text={'인성면접'} 
          type={'GUIDENAV'} 
          onClick={() => nav('/second/guide/personality')}
          className={isActive('/second/guide/personality') ? 'bg-[#90CCF0] text-white' : ''}
        />
        <Button 
          text={'PT면접'} 
          type={'GUIDENAV'} 
          onClick={() => nav('/second/guide/pt')}
          className={isActive('/second/guide/pt') ? 'bg-[#90CCF0] text-white' : ''}
        />
        <Button 
          text={'최신 IT 이슈'} 
          type={'GUIDENAV'} 
          onClick={() => nav('/second/guide/it')}
          className={isActive('/second/guide/it') ? 'bg-[#90CCF0] text-white' : ''}
        />
      </nav>
    </>
  );
}
