"use client";
import React, { useState } from "react";
import Link from "next/link";
import { insertReferralCode } from '../actions'

export default function EnterCode() {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<string|null>(null);

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Validating code!');

    const result = await insertReferralCode(code);
    setTimeout(() => {
      setStatus(result);
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-extrabold text-center mb-6">Referral Code</h1>
        <h2 className="text-xl font-bold mb-4 text-center">
          Enter your referral code below
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label htmlFor="code" className="text-lg font-medium">
            Referral Code
          </label>
          <input
            id="code"
            type="text"
            placeholder="Enter your referral code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            className="border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
        {status && <p className="mt-4 text-green-600 text-center">{status}</p>} {/* Show status message if exists */}
        <div className="text-right mt-2">
          <Link href="/referrals" className="text-sm text-blue-500 hover:underline">
            Back to referrals
          </Link>
        </div>
      </div>
    </div>
  );
}