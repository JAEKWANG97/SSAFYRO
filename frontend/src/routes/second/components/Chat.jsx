// Chat.jsx

import React, { useState, useEffect, useRef } from "react";
import { Client as StompClient } from "@stomp/stompjs";
import sendImg from "../../../../public/main/send.jpeg";
import ssafyLogo from "../../../../public/SSAFYRO.png";
import userImg from "../../../../public/main/user.jpg";
// import userImg from "../../../../public/main/users.png";

const Chat = ({ currentUser, currentRoom, messages, setMessages }) => {
  const [newMessage, setNewMessage] = useState("");
  const stompClient = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (currentRoom) {
      connectToRoom(currentRoom);
    }

    return () => {
      if (stompClient.current) {
        sendLeaveMessage(currentRoom);
        stompClient.current.deactivate();
      }
    };
  }, [currentRoom]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const connectToRoom = (roomId) => {
    stompClient.current = new StompClient({
      brokerURL: "ws://i11c201.p.ssafy.io:9999/ssafyro-chat",
      onConnect: (frame) => {
        console.log("Connected: " + frame);
        stompClient.current.subscribe(`/topic/${roomId}`, (message) => {
          console.log("Received message: ", message.body);
          const msg = JSON.parse(message.body);
          console.log("Parsed message: ", msg);
          setMessages((prevMessages) => [...prevMessages, msg]);
        });
        sendEnterMessage(roomId);
      },
      onWebSocketError: (error) => {
        console.error("WebSocket error: ", error);
      },
      onStompError: (frame) => {
        console.error("STOMP error: ", frame.headers["message"]);
        console.error("STOMP error details: ", frame.body);
      },
    });

    stompClient.current.activate();
  };

  const sendMessage = () => {
    if (!currentRoom || !stompClient.current || newMessage.trim() === "")
      return;

    console.log("Sending message: ", newMessage);

    stompClient.current.publish({
      destination: `/chat/${currentRoom}`,
      body: JSON.stringify({
        userId: currentUser.userId,
        name: currentUser.userName,
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

  const sendEnterMessage = (roomId) => {
    if (!roomId) {
      alert("Please select a chat room first");
      return;
    }

    const message = `${currentUser.userName}님이 입장하셨습니다.`;

    stompClient.current.publish({
      destination: `/chat/enter/${roomId}`,
      body: JSON.stringify({
        userId: currentUser.userId,
        name: currentUser.userName,
        message: message,
      }),
    });
  };

  const sendLeaveMessage = (roomId) => {
    if (!roomId) {
      return;
    }

    const message = `${currentUser.userName}님이 퇴장하셨습니다.`;

    stompClient.current.publish({
      destination: `/chat/leave/${roomId}`,
      body: JSON.stringify({
        userId: currentUser.userId,
        name: currentUser.userName,
        message: message,
      }),
    });
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex-grow rounded-lg p-5 bg-white shadow-md mt-7 mr-2 flex flex-col mb-4 h-[200px]">
      <h1 className="font-bold mb-4">Chat</h1>
      <hr className="mb-4" />

      <div className="flex-grow overflow-y-auto mb-4">
        {messages.map((message, index) => {
          console.log("message : ", message);
          const showProfile =
            index === 0 || messages[index - 1].name !== message.name;
          const isCurrentUser = message.name === currentUser.userName;

          if (message.content) {
            return (
              <div key={index} className="text-center mb-4 text-gray-500">
                {message.content}
              </div>
            );
          }

          return (
            <div
              key={index}
              className={`mb-4 flex ${isCurrentUser ? "justify-end" : ""}`}
            >
              {showProfile && !isCurrentUser && (
                <>
                  <img
                    src={userImg}
                    alt="User"
                    className="w-8 h-8 rounded-full mr-3"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500">
                      {message.name}
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
        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-center p-2 bg-gray-100 rounded-3xl">
        <img src={userImg} alt="User" className="w-8 h-8 rounded-full mr-3" />
        <input
          type="text"
          placeholder="내용을 입력하세요."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-grow bg-transparent border-none outline-none"
        />
        <button onClick={handleSendMessage} className="text-2xl text-gray-500">
          <img
            src={ssafyLogo}
            alt="SSAFYRO 로고"
            className="w-4 h-4 mt-1 mr-3 rounded-md"
          />
        </button>
      </div>
    </div>
  );
};

export default Chat;
