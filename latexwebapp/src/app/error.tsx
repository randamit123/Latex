"use client"

import * as React from 'react';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  React.useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main>
      <section className='bg-white'>
        <div className='layout flex min-h-screen flex-col items-center justify-center text-center text-black'>
          <h1 className='mt-8 text-4xl md:text-6xl'>
            404 | Oops, something went wrong!
          </h1>
        </div>
      </section>
    </main>
  );
}