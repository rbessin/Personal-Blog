'use client'
import React, { useState } from 'react';
import Link from 'next/link';

export default function EditPage({ content, data }) {
  const [markdownContent, setMarkdownContent] = useState(content);

  const saveChanges = async () => {
    await fetch('/api/save-markdown', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        slug: data.slug , 
        content: markdownContent,
        metadata: {
          title: data.title,
          subtitle: data.subtitle,
          date: data.date,
          update: new Date().toISOString(),
          tags: data.tags,
        }
      }),
    });
  };
  

  return (
    <>
      <section className='flex items-center justify-between p-4 bg-gray-200 border-2 border-gray-300 text-gray-800 font-bold rounded'>
        <div className='flex items-center space-x-2'>
          <Link className='bg-gray-300 hover:bg-gray-400 px-4 rounded' href='/'>&larr;</Link>
          <h1>{data.title}</h1>
        </div>
        <h2>
          Created - {new Date(data.date).toDateString()} | Last Updated - {new Date(data.update).toDateString()}
        </h2>
      </section>
      <div className="w-full">
        <textarea
          className="w-full h-96 p-2 border-2 border-gray-300 rounded"
          value={markdownContent}
          onChange={(e) => setMarkdownContent(e.target.value)}
        />
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={saveChanges}
        >
          Save Changes
        </button>
      </div>
    </>
  );
}
