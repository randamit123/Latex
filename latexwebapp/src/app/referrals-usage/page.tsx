'use client';
import React, { useState, useActionState } from 'react';
import { useFormStatus } from 'react-dom'
import { getReferralCode } from '../actions'

export default function Referral() {
    const [email, setEmail] = useState(''); // initialize email to ''
    const [status, setStatus] = useState<string | null>(null);
    const [code, setCode] = useState('');

    async function Email(code: string)
    {
        // TODO: add send email code when time permits
    }


    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        setStatus('Creating code!');

        const refCode = await getReferralCode(email);
        setTimeout(() => {
            setStatus(refCode);
        }, 1000);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-extrabold text-center mb-6">Thank you for using PaperLeaf!</h1>
                <h2 className="text-xl font-bold mb-4 text-center">Refer a Friend to Keep Using This Service</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            </div>
        </div>
    );
}