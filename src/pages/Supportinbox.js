import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Supportinbox() {
  const [messages, setMessages] = useState([]);

  // Fetch messages from backend on load
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get('http://localhost:8080/support/all'); // your backend endpoint
        setMessages(res.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-8 text-gray-800">
      <h1 className="text-3xl font-bold mb-8 text-blue-700">📬 Support Inbox</h1>

      {messages.length === 0 ? (
        <p className="text-gray-500 text-center">No messages received yet.</p>
      ) : (
        <div className="space-y-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="bg-white p-5 rounded-lg shadow border border-gray-200 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold text-blue-600">{msg.userEmail}</h2>
                <span className="text-sm text-gray-500">
                  {new Date(msg.timestamp).toLocaleString()}
                </span>
              </div>
              <p className="text-gray-700">{msg.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}