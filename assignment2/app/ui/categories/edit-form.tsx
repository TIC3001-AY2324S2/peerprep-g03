'use client';

import {
  QueueListIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import React, { useState, useEffect } from "react";
import { CategoriesField, QuestionsField } from '@/app/lib/definitions';
import { updateCategory } from '@/app/lib/action';
import { notFound } from 'next/navigation';

export default function EditCategoryForm(
  { categories }: {
  categories: CategoriesField[];
}) {

  function handleFormAction(formData: FormData) {
    const rawFormData = {
      label: formData.get('category'),
      value: categories.value,
    }
    
    try {
      updateCategory(rawFormData);
    } catch (error) {      
      notFound();
    }    
  }

  return (
    <form action={handleFormAction}> {/*action={updateQuestionWithId}*/}
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Category */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
          Category
          </label>
          <div className="relative">
            <input
              id="category"
              name="category"
              type="string"
              defaultValue={categories.label}
              placeholder="Enter the category"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              required
            />
            <QueueListIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>
        
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Category</Button>
      </div>
    </form>
  );
}
