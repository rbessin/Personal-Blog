import ReactMarkdown from 'react-markdown'
import Link from 'next/link';

export default function BlogPage({ content, data }) {
  return (
    <>
      <section className='flex items-center justify-between p-4 bg-gray-200 border-2 border-gray-300 text-gray-800 font-bold rounded'>
        <div className='flex items-center space-x-2'>
          <Link className='bg-gray-300 hover:bg-gray-400 px-4 rounded' href='/'>&larr;</Link>
          <h1>{data.title}</h1>
        </div>
        <h2>Created - {new Date(data.date).toDateString()} | Last Updated - {new Date(data.update).toDateString()}</h2>
      </section>
      <div className="w-full px-4">
        <ReactMarkdown className="markdown w-full">{content}</ReactMarkdown>
      </div>
    </>
  )
}