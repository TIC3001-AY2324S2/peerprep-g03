'use client'

import React, { useState, useEffect, useRef } from 'react';

export default function Form({sessionId}) {
    const [chatHistory, setChatHistory] = useState<string[]>([]);
    const [message, setMessage] = useState<string>('');
    const [ws, setWs] = useState(null);
    const chatHistoryRef = useRef<HTMLDivElement>(null);

    const handleSendMessage = () => {
        if (message.trim() && ws && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ type: 'collaborate', message }));
            setMessage('');
        }
    };
    // Establish WebSocket connection and handle incoming messages
    useEffect(() => {
        const newWs = new WebSocket(`ws://127.0.0.1:8080?sessionID=${sessionId}`);
        newWs.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'chat-message') {
                setChatHistory(prev => [...prev, data.message]);
            }
        };
        newWs.onclose = () => console.log("WebSocket disconnected.");
        setWs(newWs);

        return () => {
            newWs.close();
        };
    }, [sessionId]);

    useEffect(() => {
        // Scroll chat history to bottom when chatHistory or message changes
        const ws = new WebSocket(`ws://127.0.0.1:8080?sessionId=${sessionId}`) 
        if (chatHistoryRef.current) {
            chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
        }
    }, [chatHistory, message]);

    return (
        <main className="flex flex-col h-screen">
            {/* Chat history display */}
            <div
                ref={chatHistoryRef}
                className="bg-gray-200 p-4 rounded-lg overflow-y-auto"
                style={{ height: '250px' }}
            >
                {chatHistory.map((msg: string, index: number) => (
                    <div key={index} className="mb-2">
                        {msg}
                    </div>
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