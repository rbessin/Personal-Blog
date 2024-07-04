import { getListOfPosts, getPostTags } from './utils/posts';
import BlogHome from "./components/bloghome";

export default function Home() {
  const posts = getListOfPosts();
  const tags = getPostTags();
  
  return <BlogHome posts={posts} tags={tags} />;
}
