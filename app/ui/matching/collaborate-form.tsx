'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function Form({sessionId}) {
    const [chatHistory, setChatHistory] = useState<string[]>([]);
    const [message, setMessage] = useState<string>('');
    const ws = useRef<WebSocket | null>(null);
    const chatHistoryRef = useRef<HTMLDivElement>(null);
    const reader = useRef(new FileReader());  // Use useRef to keep the same FileReader instance

    const handleSendMessage = () => {
        if (message.trim() && ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(message);
            setChatHistory(prev => [...prev, message]); // Echo local message
            setMessage('');
        }
    };

    useEffect(() => {
        ws.current = new WebSocket(`ws://127.0.0.1:8080?sessionId=${sessionId}`);
        
        reader.current.onload = () => {
            const text = reader.current.result as string;
            setChatHistory(prev => [...prev, text]);
        };

        ws.current.onmessage = (event) => {
            if (typeof event.data === 'string') {
                setChatHistory(prev => [...prev, event.data]);
            } else {
                reader.current.readAsText(event.data);
            }
        };

        ws.current.onclose = () => console.log("WebSocket disconnected.");

        return () => {
            ws.current?.close();
        };
    }, [sessionId]);

    useEffect(() => {
        if (chatHistoryRef.current) {
            chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
        }
    }, [chatHistory]);

    return (
        <main className="flex flex-col h-screen">
            {/* Chat history display */}
            <div ref={chatHistoryRef} className="bg-gray-200 p-4 rounded-lg overflow-y-auto" style={{ height: '250px' }}>
                {chatHistory.map((msg, index) => (
                    <div key={index} className="mb-2">{msg}</div>
                ))}
            </div>

            {/* Input box */}
            <div className="flex items-center p-2">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-grow p-2 border rounded-l-lg"
                />
                <button
                    onClick={handleSendMessage}
                    className="bg-blue-500 text-white px-4 py-2 rounded-r-lg"
                >
                    Send
                </button>
            </div>
        </main>
    );
}