'use client';

import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Button } from '@/app/ui/button';

export default function Form() {
  const [topics, setTopics] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMatchFound, setIsMatchFound] = useState(null);  // null indicates no result yet
  const [timeLeft, setTimeLeft] = useState(60);  // Initialize countdown timer

  useEffect(() => {
    fetch('http://127.0.0.1:5000/categories')
      .then(response => response.json())
      .then(data => {
        const options = data.map(topic => ({ label: topic.label, value: topic.value }));
        setTopics(options);
      })
      .catch(error => console.error('Error fetching topics:', error));
  }, []);

  useEffect(() => {
    // Update the document title using the browser API
    if (isLoading && timeLeft > 0) {
      const intervalId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    } else if (timeLeft <= 0) {
      setIsLoading(false);
      setIsMatchFound(false);  // Simulate no match found when time runs out
    }
  }, [isLoading, timeLeft]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setIsMatchFound(null);  // Reset matching status
    setTimeLeft(60);  // Reset the timer

    const formData = {
      topics: selectedTopics.map(topic => topic.value),
      difficulty: document.querySelector('input[name="complexity"]:checked')?.value
    };

    fetch('http://localhost:3000/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      setIsMatchFound(data.matchFound);
      setIsLoading(false);
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
                  onChange={(e) => setSelectedDifficulty(e.target.value)}  // Assume complexity can be multi-selected for demonstration
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
    </form>
  );
}