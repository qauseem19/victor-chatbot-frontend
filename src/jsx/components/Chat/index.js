import React, { useRef, useEffect } from 'react';
import { Button } from 'react-bootstrap';

const ChatWindow = ({
  character,
  messages,
  inputMessage,
  onInputChange,
  onSendMessage,
  onBack,
  onNewChat,
  isLoading,  // New prop to track loading state
}) => {
  const chatWindowRef = useRef(null);

  useEffect(() => {
    // Auto-scroll to the latest message
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <div
        className="chat-window bg-light p-3 rounded"
        style={{ height: '65vh', overflowY: 'auto', marginBottom: '10px', borderRadius: '10px' }}
        ref={chatWindowRef}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chat-message ${message.user ? 'user' : 'bot'}`}
            style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '10px' }}
          >
            {message.user ? (
              <div className="d-flex justify-content-end w-100">
                <div
                  className="bg-info text-white p-2 rounded-3"
                  style={{
                    maxWidth: '70%', // Limits the width of the message bubble
                    wordBreak: 'break-word', // Prevents overflow for long words
                  }}
                >
                  <p className="mb-0">{message.Msg}</p>
                </div>
                <img
                  src={character.image}
                  alt={character.name}
                  style={{ width: '40px', height: '40px', borderRadius: '50%', marginLeft: '10px' }}
                />
              </div>
            ) : (
              <div className="d-flex justify-content-start w-100">
                <img
                  src={character.image}
                  alt={character.name}
                  style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }}
                />
                <div
                  className="bg-secondary text-white p-2 rounded-3"
                  style={{
                    maxWidth: '70%', // Limits the width of the message bubble
                    wordBreak: 'break-word', // Prevents overflow for long words
                  }}
                >
                  <p className="mb-0">{message.Msg}</p>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Inline typing loader */}
        {isLoading && (
          <div className="loader-container d-flex justify-content-center align-items-center">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        )}
      </div>

      <div className="chat-input mt-3 d-flex">
        <input
          type="text"
          className="form-control"
          placeholder="Type a message..."
          value={inputMessage}
          onChange={onInputChange}
        />
        <Button variant="primary" onClick={onSendMessage} className="ms-2">
          Send
        </Button>
      </div>

      {/* Loader CSS */}
      <style jsx>{`
        .loader-container {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 4px;
          margin-top: 10px;
        }

        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: #00bcd4;
          animation: bounce 1.4s infinite both;
        }

        .dot:nth-child(1) {
          animation-delay: 0s;
        }

        .dot:nth-child(2) {
          animation-delay: 0.2s;
        }

        .dot:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }
      `}</style>
    </>
  );
};

export default ChatWindow;
