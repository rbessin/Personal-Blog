import Link from "next/link"

export default function BlogIndex({ posts }) {
  return (
    <section className="text-black space-y-2">
      {
        posts.map(post => (
          <article className='flex flex-col border-2 rounded p-4' key={post.slug}>
            <div className='italic'>{new Date(post.date).toLocaleDateString()}</div>
            <div>
              <Link 
                className='
                  text-lg font-bold relative 
                  after:bg-black after:absolute after:h-0.5 
                  after:w-0 after:bottom-0 after:left-0 hover:after:w-full 
                  after:transition-all after:duration-300 cursor-pointer' 
                href={`blog/${post.slug}`}>
                {post.title}
              </Link>
            </div>
            {post.subtitle}
            <div className='space-x-2 mt-2'>
              {post.tags.map((tag, index) => (
                <span key={index} className="border-2 bg-gray-200 px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))

      }
    </section>
  )
}