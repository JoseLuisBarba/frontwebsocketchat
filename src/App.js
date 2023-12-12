//import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from "react"


function App() {

  const generateClientId = () => Math.floor(new Date().getTime() / 1000);

  const [clientId, setClientId] = useState( generateClientId());

  const [websckt, setWebsckt] = useState();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const url = `ws://localhost:8000/ws/${clientId}`;
    const ws = new WebSocket(url);

    const handleOpen = () => {
      ws.send("Connect");
    };

    const handleMessage = (e) => {
      const receivedMessage = JSON.parse(e.data);
      setMessages((prevMessages) => [...prevMessages, receivedMessage]);
    };

    ws.onopen = handleOpen;
    ws.onmessage = handleMessage;

    setWebsckt(ws);

    return () => {
      ws.close();
    };
  }, [clientId]);

  const sendMessage = () => {
    websckt.send(message);
    setMessage('');
  };


  return (
    <div className="container">
      <h1>WhatsApp</h1>
      <h2>Your client id: {clientId} </h2>
      <div className="chat-container">
        <div className="chat">
          {messages.map((value, index) => {
            const isMyMessage = value.clientId === clientId;
            const messageContainerClass = isMyMessage
              ? "my-message-container"
              : "another-message-container";

            return (
              <div key={index} className={messageContainerClass}>
                <div className={isMyMessage ? "my-message" : "another-message"}>
                  <p className="client">client id: {value.clientId}</p>
                  <p className="message">{value.message}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="input-chat-container">
        <input
            className="input-chat"
            type="text"
            placeholder="Chat message ..."
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          ></input>
          <button className="submit-chat" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
