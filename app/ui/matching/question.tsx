import React, { useState, useEffect } from 'react';

export default function MatchedQuestion({ topics, difficulty }) {
  const [question, setQuestion] = useState();

  useEffect(() => {
    const url = `http://question-service:8000/questions?categories=${topics}&complexity=${encodeURIComponent(difficulty)}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          const randomQuestion = data[Math.floor(Math.random() * data.length)];
          setQuestion(randomQuestion);
        }
      })
      .catch(error => console.error('Error fetching questions:', error));
  }, []);

  return (
    <div className="rounded-lg bg-white p-4 shadow">
      {question ? (
        <>
          <h3 className="text-md font-semibold mt-2">{question.title}</h3>
          <div className="mt-1">
            <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium text-white ${question.complexity.toLowerCase() === 'easy' ? 'bg-green-500' : question.complexity.toLowerCase() === 'medium' ? 'bg-orange-500' : 'bg-red-500'}`}>
              {question.complexity}
            </span>
            {question.categories.split(', ').map((category, index) => (
              <span key={index} className="ml-2 inline-block rounded-full px-3 py-1 text-xs font-medium bg-blue-500 text-white">
                {category}
              </span>
            ))}
          </div>
          <p className="text-gray-600 mt-2">{question.description}</p>
        </>
      ) : (
        <p className="mt-2 text-gray-600">No question matched your criteria or failed to fetch questions.</p>
      )}
    </div>
  );
};