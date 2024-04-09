'use client';

import {
  QueueListIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import React, { useState, useEffect } from "react";
import { CategoriesField, QuestionsField } from '@/app/lib/definitions';
import { updateQuestion } from '@/app/lib/action';
import { preSelectCheckbox } from '@/app/lib/func';

export default function EditForm(
  { questions, categories }: {
    questions: QuestionsField[];
    categories: CategoriesField[];
  }) {

  // State to keep track of selected categories
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Function to handle checkbox change
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    const category = categories.find(category => category.value === value);
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter((selectedCategory) => selectedCategory.value !== value));
    }
  };

  // Effect to pre-select checkboxes based on questions.category
  useEffect(() => {
    preSelectCheckbox(questions, categories, setSelectedCategories);
  }, []);

  const getSelectedLabels = () => {
    return selectedCategories.map(category => category.label);
  };


  function handleFormAction(formData: FormData) {
    const id = questions.id;
    const rawFormData = {
      title: formData.get('title'),
      description: formData.get('description'),
      categories: getSelectedLabels().join(", "),
      complexity: formData.get('complexity'),
    }
    updateQuestion(rawFormData, id);
  }

  return (
    <form action={handleFormAction}> {/*action={updateQuestionWithId}*/}
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Title */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Title
          </label>
          <div className="relative">
            <input
              id="title"
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
              {categories.map((category) =>
                <div key={category.value}>
                  <label>
                    <input
                      type="checkbox"
                      id="category"
                      name="categoryId"
                      value={category.value}
                      checked={selectedCategories.some((selectedCategory) => selectedCategory.value === category.value)}
                      onChange={handleCheckboxChange}
                    />
                    {category.label}
                  </label>
                </div>
              )}

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
                  defaultChecked={questions.complexity.toLowerCase() === 'easy'}
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
                  defaultChecked={questions.complexity.toLowerCase() === 'medium'}
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
                  defaultChecked={questions.complexity.toLowerCase() === 'hard'}
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
        <Button type="submit">Edit Questions</Button>
      </div>
    </form>
  );
}
