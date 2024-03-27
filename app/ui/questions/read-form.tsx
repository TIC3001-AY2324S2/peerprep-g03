'use client';

import {
  QueueListIcon,
  DocumentTextIcon,
  ChartPieIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { updateQuestion } from '@/app/lib/action';

export default function EditInvoiceForm(
  { questions, categories }: {
    questions: {
      id: string;
      title: string;
      description: string;
      category: string;
      complexity: string;
    }[];
    categories: {
      id: string;
      name: string
    }[]
  }) {

  const [selectedOptions, setSelectedOptions] = useState([]);

  console.log(questions.category);

  const currentQuestionCategories = questions.category.split(',');

  useEffect(() => {
    // Find the category objects that match the category names
    const defaultCategoryValues = categories.filter(category =>
      currentQuestionCategories.includes(questions.category.name)
    );

    console.log(defaultCategoryValues);

    // Set the default values for the Select component
    setSelectedOptions(defaultCategoryValues);
  }, [categories, currentQuestionCategories]);

  // const setHandle = (e) => {
  //   setSelectedOptions(Array.isArray(e) ? e.map((hotel) => hotel.label) : []);
  // };


  return (
    <form>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Title */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Title
          </label>
          <div className="relative">
            <input
              id="titl"
              name="title"
              type="string"
              defaultValue={questions.title}
              placeholder="Enter the title"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              required
            />
            <QueueListIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Description
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <textarea
                id="description"
                name="description"
                placeholder="Enter the description"
                defaultValue={questions.description}
                rows='10'
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
              />
              <DocumentTextIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Categories
          </label>
          <div className="relative">
            <div className=" px-2	">
              <Select
                id="category"
                name="categoryId"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                options={categories}
                
                value={selectedOptions}
                defaultValue={selectedOptions}
                isMulti
                required
              />
              <ChartPieIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Complexity */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the question complexity
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="easy"
                  name="complexity"
                  type="radio"
                  value="easy"
                  defaultChecked={questions.complexity === 'easy'}
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
                  defaultChecked={questions.complexity === 'medium'}
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
                  defaultChecked={questions.complexity === 'hard'}
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
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
