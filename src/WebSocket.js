import { useState, useEffect } from "react";


function useWebSocket(clientId) {
    const [websckt, setWebsckt] = useState();
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
  
    const sendMessage = (message) => {
      websckt.send(message);
    };
  
    return { messages, sendMessage };
  }
  
  export default useWebSocket;