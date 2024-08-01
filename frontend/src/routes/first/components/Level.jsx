import React from 'react';

function Level({ text = '1', color = '#CD7F32' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="49"
      viewBox="0 0 24 24"
      fill="none"
    >
      {/* 큰 방패의 외곽선 */}
      <path
        d="M12 22s8-4 8-10V5.69c0-.67-.46-1.26-1.12-1.4l-7-1.4a1.5 1.5 0 0 0-.76 0l-7 1.4A1.5 1.5 0 0 0 4 5.69V12c0 6 8 10 8 10z"
        fill={color} // 큰 방패 내부 색상
        stroke={color} // 큰 방패 외곽선 색상
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* 작은 방패 - 더욱 크게 조정 */}
      <path
        d="M12 20s7-3.5 7-8V6.75c0-.45-.3-.85-.7-.95l-6.3-1.26a.75.75 0 0 0-.4 0L5.7 5.8c-.4.1-.7.5-.7.95v5.25c0 4.5 7 8 7 8z"
        fill={color} // 작은 방패 내부 색상
        stroke="#FFFFFF" // 작은 방패 외곽선 흰색
        strokeWidth="1.5" // 작은 방패의 외곽선 두께
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="7" // 텍스트 크기를 설정
        fontWeight="=700" // 두껍게 설정하여 가독성 강화
        fill="#FFFFFF" // 텍스트 색깔을 하얀색으로 설정
        className="font-extrabold"
      >
        {text}
      </text>
    </svg>
  );
}

export default Level;
