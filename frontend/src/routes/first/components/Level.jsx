import React from 'react';

function Level({ text = '1', color = '#CD7F32' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="60"  // Increased width
      height="74" // Increased height
      viewBox="0 0 30 30" // Adjusted viewBox to maintain proportions
      fill="none"
    >
      {/* 큰 방패의 외곽선 */}
      <path
        d="M15 29s10-5 10-12.5V7.12c0-.84-.58-1.57-1.4-1.75l-8.75-1.75a1.5 1.5 0 0 0-.95 0l-8.75 1.75A1.5 1.5 0 0 0 5 7.12V16.5C5 24 15 29 15 29z"
        fill={color} // 큰 방패 내부 색상
        stroke={color} // 큰 방패 외곽선 색상
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* 작은 방패 - 더욱 크게 조정 */}
      <path
        d="M15 26s8.75-4.375 8.75-10V8.4375c0-.5625-.375-.9375-.875-1.1875l-7.875-1.6875a.75.75 0 0 0-.5 0L7.125 7.25c-.5.25-.875.625-.875 1.1875v7.5C6.25 21.625 15 26 15 26z"
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
        fontSize="10" // Increased text size for better visibility
        fontWeight="700" // Corrected weight setting to 700 for bold text
        fill="#FFFFFF" // 텍스트 색깔을 하얀색으로 설정
        className="font-extrabold"
      >
        {text}
      </text>
    </svg>
  );
}

export default Level;
