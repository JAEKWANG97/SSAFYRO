import { useNavigate, useLocation } from "react-router-dom";
import Button from './../../../../components/Button';

export default function GuideNav() {
  const nav = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className="flex py-2 px-4">
        <Button 
          text="인성면접" 
          type="GUIDENAV" 
          onClick={() => nav('/second/guide/personality')}
          isActive={isActive('/second/guide/personality')}
        />
        <Button 
          text="PT면접" 
          type="GUIDENAV" 
          onClick={() => nav('/second/guide/pt')}
          isActive={isActive('/second/guide/pt')}
        />
        <Button 
          text="최신 IT 이슈" 
          type="GUIDENAV" 
          onClick={() => nav('/second/guide/it')}
          isActive={isActive('/second/guide/it')}
        />
      </nav>
    </>
  );
}
