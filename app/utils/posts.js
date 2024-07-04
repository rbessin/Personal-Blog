import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'

export const getListOfPosts = () => {
  const folder = path.join(process.cwd(), 'posts');
  const files = fs.readdirSync(folder);
  const mdFiles = files.filter(file => file.endsWith('.md'));

  const posts = mdFiles.map(filename => {
    const contents = fs.readFileSync(path.join(folder, filename), 'utf8');
    const { data } = matter(contents);

    return {
      ...data,
      slug: filename.replace('.md', '')
    };
  });

  // Sort posts by date in descending order
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const getPostContent = (slug) => {
  const file = path.join(process.cwd(), 'posts', slug) + '.md'
  const content = fs.readFileSync(file, 'utf8')
  return matter(content)
}

export const getPostTags = () => {
  const posts = getListOfPosts()
  const tags = posts.flatMap(post => post.tags)
  return [...new Set(tags)]
}