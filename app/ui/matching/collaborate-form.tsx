'use client'

import React, { useState } from 'react';

export default function Form() {
    const [chatHistory, setChatHistory] = useState<string[]>([]);
    const [message, setMessage] = useState<string>('');

    const handleSendMessage = () => {
        if (message.trim()) {
            setChatHistory([...chatHistory, message]);
            setMessage('');
        }
    };

    return (
        <main className="flex flex-col h-screen">
            {/* Chat history display */}
            <div className="bg-gray-200 p-4 rounded-lg mb-4 overflow-y-auto" style={{ height: '500' }}>
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