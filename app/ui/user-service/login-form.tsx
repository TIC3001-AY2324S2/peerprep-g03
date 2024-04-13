'use client'

import Link from 'next/link';
import {
  EnvelopeIcon,
  KeyIcon,
  ExclamationCircleIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';
import React, { useState } from "react";
import { DontHaveAccount, Button } from '@/app/ui/user-service/buttons';
import { LogInButton } from '@/app/ui/button';
import { loginUser, authenticate } from '@/app/lib/action';
import { useFormState, useFormStatus } from 'react-dom';

export default function Form() {

  // function handleFormAction(formData: FormData) {
  //   const rawFormData = {
  //     email: formData.get('email'),
  //     password: formData.get('password'),
  //   }
  //   loginUser(rawFormData);
  // }

  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <form action={dispatch}> {/* todo: action={handleFormAction} */}
      <div className="rounded-md bg-gray-50 p-4 md:p-6">

        {/* Email Input */}
        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Email
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id='email'
                name='email'
                type="email"
                placeholder="Enter your email address"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
              />
              <EnvelopeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label htmlFor="password" className="mb-2 block text-sm font-medium">
            Password
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id='password'
                name='password'
                type="password"
                placeholder="Enter password"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <LoginButton />
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
        <div className="flex h-8 items-end space-x-1">
          {/* Add form errors here */}
        </div>
      </div>          
    </form >
  );
}

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <Button className="mt-4 w-full" aria-disabled={pending}>
      Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}

