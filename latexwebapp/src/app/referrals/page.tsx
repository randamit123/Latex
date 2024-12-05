'use client';
import React, { useState } from 'react';
import Link from "next/link";

export default function Referral() {
    const [email, setEmail] = useState(''); // initialize email to ''
    const [status, setStatus] = useState<string | null>(null);

    const submission = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('Sending code!');
        setTimeout(() => {
            setStatus(`Code sent to ${email}`);
        }, 1000);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-extrabold text-center mb-6">Referral Form</h1>
                <h2 className="text-xl font-bold mb-4 text-center">Refer a Friend to PaperLeaf</h2>
                <form onSubmit={submission} className="flex flex-col gap-4">
                    <label htmlFor="email" className="text-lg font-medium">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="ex: myname@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="border p-2 rounded"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                        Continue
                    </button>
                </form>
                {status && <p className="mt-4 text-green-600 text-center">{status}</p>} {/* Show status message if exists */}
                <div className="text-right mt-2">
                <Link href="/enter-code" className="text-sm text-blue-500 hover:underline">
                    Have a code?
                </Link>
                </div>
            </div>
        </div>
    );
}
