import Navigation from "./components/navigation";
import { getListOfPosts } from './utils/posts';
import BlogIndex from "./components/blogindex";

export default function Home() {
  const posts = getListOfPosts();
  
  return (
    <main className="flex min-h-screen flex-col p-8 bg-white space-y-4">
      <Navigation />
      <section className="flex flex-col items-center justify-center w-full text-black">
        <h1 className="text-4xl font-bold">Welcome to my Blog</h1>
        <p className="text-lg">A simple handcrafted student-made blog</p>
      </section>
      <BlogIndex posts={posts} />
    </main>
  );
}
