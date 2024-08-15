import GuestContents from "./components/GuestContents.jsx";
import MemberContents from "./components/MemberContents.jsx";
import useAuthStore from "../stores/AuthStore";


export default function Home() {

  const isLogin = useAuthStore((state) => state.isLogin)

  return (
    <>
    {isLogin ? <MemberContents /> : <GuestContents />}
    </>
   
  );
}
