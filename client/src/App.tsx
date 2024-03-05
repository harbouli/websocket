import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';

const socket = io('http://localhost:3030');  

const App: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [chat, setChat] = useState<string[]>([]);

  useEffect(() => {
    socket.on('chat message', (msg: string) => {
      setChat((prevChat) => [...prevChat, msg]);
    });

    return () => {
      socket.off('chat message');
    };
  }, []);

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message) {
      socket.emit('chat message', message);
      setMessage('');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Chat</h1>
        <ul id="messages">
          {chat.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
        <form onSubmit={sendMessage}>
          <input value={message} onChange={(e) => setMessage(e.target.value)} />
          <button type="submit">Send</button>
        </form>
      </header>
    </div>
  );
}

export default App;
