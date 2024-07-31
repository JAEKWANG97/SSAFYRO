// Chat.jsx
import React, { useState } from "react";
import sendImg from '../../../../public/main/send.jpeg'

function Chat({ currentUser, messages, sendMessage }) {
  const [newMessage, setNewMessage] = useState("");

  function handleSendMessage() {
    if (newMessage.trim() !== "") {
      sendMessage(newMessage);
      setNewMessage("");
    }
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  }

  return (
    <div className="flex-grow rounded-lg p-5 bg-white shadow-md mt-4 flex flex-col h-[50%]">
      <h1 className="font-bold mb-4">Chat</h1>
      <hr className="mb-4" />

      {/* 채팅 메시지 리스트를 감싸는 div */}
      <div className="flex-grow overflow-auto mb-4">
        {messages.map((message, index) => {
          const showProfile =
            index === 0 || messages[index - 1].userId !== message.userId;
          const isCurrentUser = message.userId === currentUser.userId;

          return (
            <div
              key={index}
              className={`mb-4 flex ${isCurrentUser ? 'justify-end' : ''}`}
            >
              {showProfile && !isCurrentUser && (
                <>
                  <img
                    src="/main/users.png"
                    alt="User"
                    className="w-8 h-8 rounded-full mr-3"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500">
                      {message.userId}
                    </span>
                    <div className="bg-gray-100 p-2 rounded-lg inline-block mt-1">
                      {message.message}
                    </div>
                  </div>
                </>
              )}
              {isCurrentUser && (
                <div className="bg-blue-100 p-2 rounded-lg inline-block mr-5">
                  {message.message}
                </div>
              )}
              {!showProfile && !isCurrentUser && (
                <div className="bg-gray-100 p-2 rounded-lg inline-block ml-10">
                  {message.message}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 채팅 입력 영역 */}
      <div className="flex items-center p-2 bg-gray-100 rounded-3xl">
        <img
          src="/main/users.png"
          alt="User"
          className="w-8 h-8 rounded-full mr-3"
        />
        <input
          type="text"
          placeholder="내용을 입력하세요."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-grow bg-transparent border-none outline-none"
        />
        <button onClick={handleSendMessage} className="text-2xl text-gray-500">
          <img src={sendImg} alt="SSAFYRO 로고" className="w-6 h-6 mr-2 rounded-md" />
          {/* 😃 */}
        </button>
      </div>
    </div>
  );
}

export default Chat;
