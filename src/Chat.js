import React, { useState } from "react";
import useWebSocket from "./WebSocket";


function Chat({ clientId }) {
    const { messages, sendMessage } = useWebSocket(clientId);
    const [message, setMessage] = useState('');
  
    const handleSendMessage = () => {
      sendMessage(message);
      setMessage("");
    };
  
    return (
      <div className="chat-container">
        <div className="chat">
          {/* Render messages */}
        </div>
        <div className="input-chat-container">
          <input
            className="input-chat"
            type="text"
            placeholder="Chat message ..."
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          <button className="submit-chat" onClick={handleSendMessage}>
            Send
          </button>
        </div>
      </div>
    );
  }
  
  export default Chat;