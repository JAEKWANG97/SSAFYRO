import Swal from "sweetalert2";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { initUserType } from './../api/profileApi';

export default function ChoiceType() {
  const nav = useNavigate();

  useEffect(() => {
    Swal.fire({
      title: "전공자 / 비전공자 선택",
      text: "당신의 전공을 선택하세요",
      icon: "question",
      showCancelButton: false, // 기본 취소 버튼을 사용하지 않음
      showConfirmButton: false, // 기본 확인 버튼을 사용하지 않음
      html: `
        <button id="major-button" class="swal2-confirm swal2-styled" style="margin-right: 10px;">
          전공자
        </button>
        <button id="nonmajor-button" class="swal2-cancel swal2-styled">
          비전공자
        </button>
      `,
      didOpen: () => {
        const majorButton = Swal.getPopup().querySelector("#major-button");
        const nonmajorButton = Swal.getPopup().querySelector("#nonmajor-button");

        majorButton.addEventListener('click', () => {
          Swal.fire({
            title: "전공자를 선택하셨습니다!",
            icon: "success",
            confirmButtonText: "확인",
          }).then(() => {
            initUserType("MAJOR");
            nav("/");
          });
        });

        nonmajorButton.addEventListener('click', () => {
          Swal.fire({
            title: "비전공자를 선택하셨습니다!",
            icon: "success",
            confirmButtonText: "확인",
          }).then(() => {
            initUserType("NONMAJOR");
            nav("/");
          });
        });
      }
    });
  }, [nav]);

  return null;
}
