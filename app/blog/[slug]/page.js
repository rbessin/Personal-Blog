import Navigation from "../../components/navigation";
import BlogPage from '../../components/blogpage'
import { getListOfPosts, getPostContent } from "../../utils/posts"

export const generateStaticParams = async () => {
  const posts = getListOfPosts()
  return posts.map(post => { slug: post.slug })
}

export default function Post({ params }) {
  const { content, data } = getPostContent(params.slug)

  return (
    <main className="flex min-h-screen flex-col p-8 bg-white space-y-4">
      <Navigation />
      <BlogPage content={content} data={data} />
    </main>
  )
}