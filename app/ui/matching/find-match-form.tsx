'use client'

import Link from 'next/link';
import {
  DocumentTextIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import React, { useState } from "react";
import { useRouter } from 'next/navigation'

export default function Form() {
  const [isLoading, setIsLoading] = useState(false);
  const [isMatchFound, setIsMatchFound] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false); // Add state for form submission
  const router = useRouter();

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    

    // Simulate some processing time (replace with your actual logic)
    setTimeout(() => {
      const isMatched = true;/* Your logic to check for a match */ // Replace with actual logic
      setIsLoading(false);
      setIsMatchFound(isMatched);
      setIsFormSubmitted(true); // Update form submission state

      if (isMatched) {
        router.push('/matching/collaborate'); // Redirect on match found
      }
    }, 30000);
  };

  return (
    <form onSubmit={handleFormSubmit}> {/* todo: action={handleFormAction} */}
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Title */}
        <div className="mb-4">
          <label htmlFor="topic" className="mb-2 block text-sm font-medium">
            Topic
          </label>
          <div className="relative">
            <input
              id="topic"
              name="topic"
              type="string"
              placeholder="Enter the topic"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              required
            />
            <DocumentTextIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>

        {/* Complexity */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Difficulty Level
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="easy"
                  name="complexity"
                  type="radio"
                  value="easy"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  required
                />
                <label
                  htmlFor="easy"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Easy
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="medium"
                  name="complexity"
                  type="radio"
                  value="medium"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="medium"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-orange-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Medium
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="hard"
                  name="complexity"
                  type="radio"
                  value="hard"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="hard"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-red-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Hard
                </label>
              </div>
            </div>
          </div>
        </fieldset>
      </div>

      <div className="flex justify-center">
        <Button type="submit" disabled={isLoading}>{isLoading ? 'Matching...' : 'Find Matching'}</Button>
      </div>

      {isLoading && (
        <div className="flex justify-center mt-4">
          <div className="loader"></div>
        </div>
      )}

      {isFormSubmitted  && !isMatchFound && (
        <div className="text-center text-red-500 text-[20px]">
          No match found! Retry Matching!
        </div>
      )}
    </form>
  );
}
