'use client'

import React, { useState, useEffect, useRef } from 'react';

export default function Form() {
    const [chatHistory, setChatHistory] = useState<string[]>([]);
    const [message, setMessage] = useState<string>('');
    const chatHistoryRef = useRef<HTMLDivElement>(null);

    const handleSendMessage = () => {
        if (message.trim()) {
            setChatHistory([...chatHistory, message]);
            setMessage('');
        }
    };

    useEffect(() => {
        // Scroll chat history to bottom when chatHistory or message changes
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