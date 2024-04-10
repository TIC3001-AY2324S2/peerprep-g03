'use client'

import Link from 'next/link';
import {
  QueueListIcon,
  DocumentTextIcon,
  ChartPieIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import React, { useState } from "react";
import Select from "react-select";
import { createQuestion } from '@/app/lib/action';
import { CategoriesField } from '@/app/lib/definitions';
import { CreateQuestion, CreateCategory, CreateAccountButton, LogInButton } from '@/app/ui/questions/buttons';

export default function Form() {

  // const [selectedOptions, setSelectedOptions] = useState([]);

  // const setHandle = (e) => {
  //   setSelectedOptions(Array.isArray(e) ? e.map((cat) => cat.label) : []);
  // };

  // function handleFormAction(formData: FormData) {
  //   const rawFormData = {
  //     title: formData.get('title'),
  //     description: formData.get('description'),
  //     categories: selectedOptions.join(", "),
  //     complexity: formData.get('complexity'),
  //   }
  //   createQuestion(rawFormData);
  // }



  return (
    <form> {/* todo: action={handleFormAction} */}
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Username Input */}
        <input
          id='username'
          name='username'
          type="string"
          placeholder="Username"
          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          required
        />
        <br />
        {/* Email Input */}
        <input
          id='email'
          name='email'
          type="email"
          placeholder="Email"
          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          required
        />
        <br />
        {/* Password Input */}
        <input
          id='password'
          name='password'
          type="password"
          placeholder="Password"
          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          required
        />
        <br />
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <CreateAccountButton />
      </div>
    </form>
  );
}
