import GuestContents from "./components/GuestContents.jsx";
import MemberContents from "./components/MemberContents.jsx";
import useFirstStore from "../stores/FirstStore.jsx";


export default function Home() {

  const isLogin = useFirstStore((state) => state.isLogin)

  return (
    <>
    {isLogin ? <MemberContents /> : <GuestContents />}
    </>
   
  );
}
