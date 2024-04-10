'use client'

import Link from 'next/link';
import {  
  EnvelopeIcon,
  KeyIcon,
} from '@heroicons/react/24/outline';
import React, { useState } from "react";
import { DontHaveAccount } from '@/app/ui/user-service/buttons';
import { LogInButton } from '@/app/ui/button';
import { loginUser } from '@/app/lib/action';

export default function Form() {

  function handleFormAction(formData: FormData) {
    const rawFormData = {      
      email: formData.get('email'),
      password: formData.get('password'),
    }
    loginUser(rawFormData);
  }

  return (
    <form action={handleFormAction}> {/* todo: action={handleFormAction} */}
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        
        {/* Email Input */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Your email address.
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id='email'
                name='email'
                type="email"
                placeholder="Email"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
              />
              <EnvelopeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Your password here.
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id='password'
                name='password'
                type="password"
                placeholder="Password"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        {/*<LogInButton />*/}
        <LogInButton type="submit"></LogInButton>
      </div>
      <div>
        <DontHaveAccount />
      </div>
    </form >
  );
}
