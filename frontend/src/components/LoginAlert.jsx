import Swal from "sweetalert2";
import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";  

export default function LoginAlert(){
  const Token = localStorage.getItem('Token')
  const nav = useNavigate()

  useEffect(() => {
    
    if (!Token) {
      Swal.fire({
        title: "로그인을 해주세요",
        text: "로그인이 필요한 기능입니다.",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "확인",
      }).then((result) => {
        if (result.isConfirmed) {
          nav("/account/login");
        }
      });
      return;
    }
}, []);


}