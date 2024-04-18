'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function Form({ sessionId, username, collaborationEnded, setCollaborationEnded }) {
    const [chatHistory, setChatHistory] = useState<{ username: string; text: string }[]>([]);
    const [message, setMessage] = useState<string>('');
    const ws = useRef<WebSocket | null>(null);
    const chatHistoryRef = useRef<HTMLDivElement>(null);

    const handleSendMessage = () => {
        if (message.trim() && ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(JSON.stringify({ text: message, username }));
            setMessage('');
        }
    };


    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {  
            event.preventDefault();  
            handleSendMessage();
        }
    };


    const handleEndCollaboration = () => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            setCollaborationEnded(true); 
            const endMessage = "Collaboration ended - Peerprep";
            ws.current.send(JSON.stringify({ text: endMessage, username }));
            console.log("Collaboration ended by", username);
            
        }
    };

    useEffect(() => {
        ws.current = new WebSocket(`ws://127.0.0.1:8080?sessionId=${sessionId}`);

        ws.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.text === "Collaboration ended - Peerprep") {
                console.log(username)
                console.log(data.username)
                if (!collaborationEnded) {
                alert(`Collaboration has been ended by ${data.username}.`);
                } else {
                alert(`You have ended the collaboration.`);
                }
                setCollaborationEnded(true);               
            } else {
                setChatHistory(prev => [...prev, { text: data.text, username: data.username }]);
            }
        };

        ws.current.onclose = () => {
            console.log("WebSocket disconnected.");
        };

        return () => {
            ws.current?.close();
        };
    }, [sessionId, username]);

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
                    <div key={index} className="mb-2">
                        <strong>{msg.username}:</strong> {msg.text}
                    </div>
                ))}
            </div>

            <div className="flex items-center p-2">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message..."
                    className="flex-grow p-2 border rounded-l-lg"
                    disabled={collaborationEnded}
                />
                <button onClick={handleSendMessage} disabled={collaborationEnded} className="bg-blue-500 text-white px-4 py-2 rounded-r-lg">
                    Send
                </button>
                {!collaborationEnded && (
                    <button onClick={handleEndCollaboration} className="ml-2 bg-red-500 text-white px-4 py-2 rounded-lg">
                        End Collaboration
                    </button>
                )}
            </div>
            {collaborationEnded && (
                        <div className="text-center mt-4 text-red-600">
                            Collaboration has ended.
                        </div>
                    )}
        </main>
    );
}