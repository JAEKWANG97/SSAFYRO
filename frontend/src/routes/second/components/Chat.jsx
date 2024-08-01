// Chat.jsx

import React, { useState, useEffect, useRef } from "react";
import { Client as StompClient } from '@stomp/stompjs';
import sendImg from '../../../../public/main/send.jpeg';
import ssafyLogo from '../../../../public/SSAFYRO.png'

const Chat = ({ currentUser, currentRoom, messages, setMessages }) => {
  const [newMessage, setNewMessage] = useState("");
  const stompClient = useRef(null);

  useEffect(() => {
    if (currentRoom) {
      connectToRoom(currentRoom);
    }

    return () => {
      if (stompClient.current) stompClient.current.deactivate();
    };
  }, [currentRoom]);

  const connectToRoom = (roomId) => {
    stompClient.current = new StompClient({
      brokerURL: 'ws://i11c201.p.ssafy.io:9999/ssafyro-chat',
      onConnect: (frame) => {
        console.log("Connected: " + frame);
        stompClient.current.subscribe(`/topic/${roomId}`, (message) => {
          console.log("Received message: ", message.body)
          const msg = JSON.parse(message.body);
          console.log("Parsed message: ", msg)
          setMessages(prevMessages => [...prevMessages, msg]);
        });
      },
      onWebSocketError: (error) => {
        console.error("WebSocket error: ", error);
      },
      onStompError: (frame) => {
        console.error("STOMP error: ", frame.headers["message"]);
        console.error("STOMP error details: ", frame.body);
      }
    });

    stompClient.current.activate();
  };

  const sendMessage = () => {
    if (!currentRoom || !stompClient.current || newMessage.trim() === "") return;

    console.log("Sending message: ", newMessage)

    stompClient.current.publish({
      destination: `/chat/${currentRoom}`,
      body: JSON.stringify({
        userId: currentUser.userId,
        name: currentUser.name,
        message: newMessage,
      }),
    });
    setNewMessage("");
  };

  const handleSendMessage = () => {
    sendMessage();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="flex-grow rounded-lg p-5 bg-white shadow-md mt-4 flex flex-col h-[50%]">
      <h1 className="font-bold mb-4">Chat</h1>
      <hr className="mb-4" />

      <div className="flex-grow overflow-auto mb-4">
        {messages.map((message, index) => {
          console.log("message : ", message)
          const showProfile = index === 0 || messages[index - 1].name !== message.name;
          const isCurrentUser = message.name === currentUser.name;

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
                      {message.name}
                    </span>
                    <div className="bg-gray-100 p-2 rounded-lg inline-block mt-1">
                      {/* {message.content} */}
                      {message.message}
                    </div>
                  </div>
                </>
              )}
              {isCurrentUser && (
                <div className="bg-blue-100 p-2 rounded-lg inline-block mr-5">
                  {/* {message.content} */}
                  {message.message}
                </div>
              )}
              {!showProfile && !isCurrentUser && (
                <div className="bg-gray-100 p-2 rounded-lg inline-block ml-10">
                  {/* {message.content} */}
                  {message.message}
                </div>
              )}
            </div>
          );
        })}
      </div>

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
          <img src={ssafyLogo} alt="SSAFYRO 로고" className="w-6 h-6 mr-2 rounded-md" />
        </button>
      </div>
    </div>
  );
}

export default Chat;
