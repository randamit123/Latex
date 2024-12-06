// // 'use client';
// import React, { useState } from 'react';
// import { generateReferral } from '../queries/referral'
// // import { auth } from '../auth/NextAuth'

// // const session = auth();

// export default function Referral() {
//     // const session = await auth();

//     const [email, setEmail] = useState(''); // initialize email to ''
//     const [status, setStatus] = useState<string | null>(null);
//     const [code, setCode] = useState<string | null>('');

//     async function getReferralCode(data: FormData)
//     {
//         'use server'
//         const email_data = {
//             email: data.get('value'),
//         };

//         // setEmail(e.target.value);
//          // if (session == null || session.user?.id == null)
//              // setCode('Forbidden');
//          // else {
//          if (email_data.email?.toString() != undefined) {
//             try {
//                  const ref_code = await generateReferral(email_data.email.toString());
//                  if (ref_code == 'Invalid session' || ref_code == 'Error: User already exists!' || ref_code == 'Error: Email already referred!')
//                      setCode(ref_code);
//                  else {
//                      // if (ref_code.code != null) {
//                          setCode(ref_code.code);
//                          // setStatus('Sending code!');
//                          // setTimeout(() => {
//                              // setStatus(`Code sent to ${email}`);
//                          // }, 1000);
//                      // }
//                 }
//             } catch(error) {
//                  setCode('Forbidden');
//             }
//         }

//          // return <></>
//     }

//     const handleSubmit = async(e: React.FormEvent) => {
//         e.preventDefault();
//         setStatus('Sending code!');
//         setTimeout(() => {
//             if (code == 'Error: User already exists!' || code == 'Error: Email already referred!')
//                 setStatus(code);
//             else
//                 setStatus(`Code sent to ${email}`);
//         }, 1000);
//     };

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-100">
//             <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//                 <h1 className="text-3xl font-extrabold text-center mb-6">Referral Form</h1>
//                 <h2 className="text-xl font-bold mb-4 text-center">refer a friend to PaperLeaf to keep using the service!</h2>
//                 <form action={getReferralCode} onSubmit={handleSubmit} className="flex flex-col gap-2">
//                     <label htmlFor="email" className="text-lg font-medium">email</label>
//                     <input
//                         id="email"
//                         type="email"
//                         placeholder="ex: myname@example.com"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                         className="border p-2 rounded"
//                     />
//                     <button
//                         type="submit"
//                         className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
//                     >
//                         Continue
//                     </button>
//                 </form>
//                 {status && <p className="mt-4 text-green-600 text-center">{status}</p>} {/* Show status message if exists */}
//             </div>
//         </div>
//     );
// }

'use client';
import React, { useState, useActionState } from 'react';
import { useFormStatus } from 'react-dom'
import { getReferralCode } from '../actions'

export default function Referral() {
    const [email, setEmail] = useState(''); // initialize email to ''
    const [status, setStatus] = useState<string | null>(null);
    const [code, setCode] = useState('');

    // const setCodeWithEmail = setCode.bind(email, refEmail);
    // const { data } = useFormStatus();

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        setStatus('Creating code!');

        const refCode = await getReferralCode(email);
        setTimeout(() => {
            setStatus(refCode);
            // setStatus(`Code sent to ${email}`);
        }, 1000);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-extrabold text-center mb-6">Referral Form</h1>
                <h2 className="text-xl font-bold mb-4 text-center">Refer a Friend to PaperLeaf</h2>
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