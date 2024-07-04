'use client';

import { useState } from "react";
import Navigation from "./navigation";
import BlogIndex from "./blogindex";

export default function BlogHome({ posts, tags }) {
  const [filter, setFilter] = useState("None");

  const filteredPosts = filter === "None" ? posts : posts.filter(post => post.tags.includes(filter));

  function handleFilter(e) {
    const { value } = e.currentTarget;
    setFilter(value);
  }

  function getButtonClass(value) {
    return value === filter
      ? "font-bold border-2 bg-gray-700 hover:bg-gray-900 hover:border-2 text-white px-2 py-1 rounded"
      : "font-bold border-2 bg-gray-200 hover:bg-white hover:border-2 text-black px-2 py-1 rounded";
  }

  return (
    <main className="flex min-h-screen flex-col p-8 bg-white space-y-4">
      <Navigation />
      <section className="flex flex-col items-center justify-center w-full text-black">
        <h1 className="text-4xl font-bold">Welcome to my Blog</h1>
        <p className="text-lg">A simple handcrafted student-made blog</p>
      </section>
      <section className="flex items-center p-4 bg-gray-800 text-white w-full rounded">
        <img className="h-8 mr-2 bg-white rounded" src="/Filter.png" alt="Filter icon" />
        <h2 className="mr-4 text-2xl font-bold">Filter</h2>
        <div className="flex space-x-2">
          <button onClick={handleFilter} key={0} value="None" className={getButtonClass("None")}>
            N / A
          </button>
          {tags.map((tag, index) => (
            <button onClick={handleFilter} key={index + 1} value={tag} className={getButtonClass(tag)}>
              {tag}
            </button>
          ))}
        </div>
      </section>
      <BlogIndex posts={filteredPosts} />
    </main>
  );
}
