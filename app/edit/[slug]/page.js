import Navigation from "../../components/navigation";
import EditPage from "@/app/components/editpage";
import { getListOfPosts, getPostContent } from "../../utils/posts"

export const generateStaticParams = async () => {
  const posts = getListOfPosts()
  return posts.map(post => { slug: post.slug })
}

export default function EditPost({ params }) {
  const { content, data } = getPostContent(params.slug)
  const { slug } = params;

  return (
    <main className="flex min-h-screen flex-col p-8 bg-white space-y-4">
      <Navigation />
      <EditPage content={content} data={{ ...data, slug }} />
    </main>
  );
}