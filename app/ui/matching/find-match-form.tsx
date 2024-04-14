'use client';

import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Button } from '@/app/ui/button';

export default function Form({ username }) {
  const [topics, setTopics] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMatchFound, setIsMatchFound] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [matchedUsername, setMatchedUsername] = useState('')
  const [ws, setWs] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/categories')
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
        }
      }
    }
    return () => clearInterval(intervalId);
  }, [isLoading, timeLeft, isMatchFound]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setIsMatchFound(null);
    setTimeLeft(60);

    // Establish WebSocket connection only when submitting
    const ws = new WebSocket('ws://127.0.0.1:8080');
    ws.onopen = () => {
      console.log('WebSocket Connected');
      ws.send(JSON.stringify({type: 'register', username}))
    };
    ws.onmessage = (event) => {
      console.log("message from ws: ", event.data)
      const data = JSON.parse(event.data);
      if (data.type === 'match') {
          setIsMatchFound(true);
          setIsLoading(false);
          setMatchedUsername(data.matchWith)
          console.log("Match found with " + data.matchWith);
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

    fetch('http://127.0.0.1:5001/send', {
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
      <div className="match-info">
        <h3>Match Found!</h3>
        <p>Matched with: {matchedUsername}</p>
        <p>Shared Topics: "PLACEHOLDER"</p>
          <button className="start-button" onClick={() => ''}>
            Start Collaboration
          </button>

      </div>
    )}
    </form>
  );
}