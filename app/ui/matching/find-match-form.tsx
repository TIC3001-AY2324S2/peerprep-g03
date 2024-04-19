'use client';

import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Button } from '@/app/ui/button';
import { useRouter } from 'next/navigation';

export default function Form({ username }) {
  const [topics, setTopics] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMatchFound, setIsMatchFound] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [matchedUsername, setMatchedUsername] = useState('')
  const [matchedDifficulty, setMatchedDifficulty] = useState('')
  const [matchedTopics, setMatchedTopics] = useState([])
  const [sessionId, setSessionId] = useState({})
  const [ws, setWs] = useState(null);
  const router = useRouter();

  const handleStartCollaboration = () => {
    const topics = matchedTopics.join(',');
    router.push(`/matching/collaborate?sessionid=${sessionId}&peer=${matchedUsername}&topics=${topics}&difficulty=${matchedDifficulty}`);
  };

  useEffect(() => {
    fetch('http://localhost:5000/categories')
      .then(response => response.json())
      .then(data => {
        const options = data.map(topic => ({ label: topic.label, value: topic.label }));
        setTopics(options);
      })
      .catch(error => console.error('Error fetching topics:', error));
  }, []);

  useEffect(() => {
    let intervalId;
    if (isLoading && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(intervalId);
      if (timeLeft <= 0 && isLoading) {
        setIsLoading(false);
        // Only set isMatchFound to false if a match wasn't found
        if (isMatchFound === null) {
          setIsMatchFound(false);
          ws.close();
        }
      }
    }
    return () => clearInterval(intervalId);
  }, [isLoading, timeLeft, isMatchFound]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setIsMatchFound(null);
    setTimeLeft(20);

    // Establish WebSocket connection only when submitting
    const ws = new WebSocket('ws://localhost:8080');
    ws.onopen = () => {
      console.log('WebSocket Connected');
      ws.send(JSON.stringify({ type: 'register', username }))
    };
    ws.onmessage = (event) => {
      console.log("message from ws: ", event.data)
      const data = JSON.parse(event.data);
      if (data.type === 'match') {
        setTimeout(() => {
          setIsMatchFound(true);
        setIsLoading(false);
        setMatchedUsername(data.matchWith)
        setMatchedDifficulty(data.difficulty)
        setMatchedTopics(data.topics)
        setSessionId(data.sessionId)
        console.log("Match found with " + data.matchWith);
        }, 3000);
        
      } else if (data.type === 'timeout') {
        setIsMatchFound(false);
        setIsLoading(false);
        console.log("No match found, retry matching!");
      }
    };

    setWs(ws);

    const formData = {
      topics: selectedTopics.map(topic => topic.value),
      difficulty: document.querySelector('input[name="complexity"]:checked')?.value,
      username
    };

    fetch('http://localhost:5001/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        console.log("Data sent to RabbitMQ and waiting for match...");
      })
      .catch(error => {
        console.error('Failed to send data:', error);
        setIsLoading(false);
        setIsMatchFound(false);
      });
    
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Multi-select Dropdown for Topics */}
        <div className="mb-4">
          <label htmlFor="topic" className="mb-2 block text-sm font-medium">Topic</label>
          <Select
            id="topic"
            isMulti
            options={topics}
            onChange={setSelectedTopics}
            className="text-sm"
            closeMenuOnSelect={false}  // Keeps the dropdown open on selection
            placeholder="Select topics"
            value={selectedTopics}
            required
          />
        </div>

        {/* Complexity Radio Buttons */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">Difficulty Level</legend>
          <div className="flex gap-4">
            {['easy', 'medium', 'hard'].map((level) => (
              <div key={level} className="flex items-center">
                <input
                  id={level}
                  name="complexity"
                  type="radio"
                  value={level}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  required
                />
                <label htmlFor={level} className={`ml-2 flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-white ${level === 'easy' ? 'bg-green-500' : level === 'medium' ? 'bg-orange-500' : 'bg-red-500'}`}>
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </label>
              </div>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="flex justify-center">
        <Button type="submit" disabled={isLoading}>{isLoading ? `Matching in ${timeLeft}s...` : 'Find Match'}</Button>
      </div>

      {isLoading && (
        <div className="flex justify-center mt-4">
          <div className="loader"></div>
        </div>
      )}

      {isMatchFound === false && !isLoading && (
        <div className="text-center text-red-500 text-[20px]">
          No match found! Retry Matching!
        </div>
      )}
      {isMatchFound && (
        <div className="match-info p-4 bg-gray-50 rounded-md shadow">
          <h3 className="text-left text-green-600 text-[20px] mb-4">Match Found!</h3>
          <div className="flex items-center gap-2 mb-2">
            <span className="h-6 w-6 bg-gray-400 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 5l9-5-9-5-9 5 9 5z" /></svg>
            </span>
            <p>Matched with: <b>{matchedUsername.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</b></p>
          </div>
          <div className="mt-2">
            <p className="text-sm font-medium">Shared Topics:</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {matchedTopics.map(topic => (
                <span key={topic} className="cursor-pointer rounded-full px-3 py-1 text-xs font-medium text-white bg-green-500">
                  {topic}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-3">
            <p className="text-sm font-medium">Difficulty Level:</p>
            <span className={`mt-1 inline-block cursor-pointer rounded-full px-3 py-1 text-xs font-medium text-white ${matchedDifficulty === 'easy' ? 'bg-green-500' : matchedDifficulty === 'medium' ? 'bg-orange-500' : 'bg-red-500'}`}>
              {matchedDifficulty.charAt(0).toUpperCase() + matchedDifficulty.slice(1)}
            </span>
          </div>
          <Button type='button' onClick={handleStartCollaboration} className="mt-4">
            Start Collaboration
          </Button>
        </div>
      )}
    </form>
  );
}