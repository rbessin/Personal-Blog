'use client';

import { useState, useEffect } from "react";
import Navigation from "./navigation";
import { useRouter } from 'next/navigation';
import BlogIndex from "./blogindex";

export default function BlogHome({ posts, tags }) {
  const [filter, setFilter] = useState("None");
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [showModal, setModal] = useState("False");
  // New Post
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostSubtitle, setNewPostSubtitle] = useState("");
  const [newPostTags, setNewPostTags] = useState([]);
  const newPostDate = new Date();
  // Verification
  const password = "PASS2007";
  const router = useRouter();

  useEffect(() => {
    if (filter === "None") {setFilteredPosts(posts);}
    else {setFilteredPosts(posts.filter(post => post.tags.includes(filter)));}
  }, [filter, posts]);

  function handleFilter(e) {
    const { value } = e.currentTarget;
    setFilter(value);
  }

  function getButtonClass(value) {
    return value === filter
      ? "font-bold border-2 bg-gray-700 hover:bg-gray-900 hover:border-2 text-white px-2 py-1 rounded"
      : "font-bold border-2 bg-gray-200 hover:bg-white hover:border-2 text-black px-2 py-1 rounded";
  }

  function search(e) {
    const { value } = e.currentTarget;
    const filtered = posts.filter(post => post.title.toLowerCase().includes(value.toLowerCase()));
    setFilter("None");
    setFilteredPosts(filtered);
  }

  function handleNewPostTitle(e) {
    if (e.target.value !== "") {
      setNewPostTitle(e.target.value);
    }
  }
  function handleNewPostSubtitle(e) {
    if (e.target.value !== "") {
      setNewPostSubtitle(e.target.value);
    }
  }
  function handleNewPostTag() {
    const tagInput = document.getElementById("TagInput").value.toLowerCase();
    if (tagInput.trim() !== "") {
      if (newPostTags.includes(tagInput)) {return;}
      setNewPostTags((prevTags) => [...prevTags, tagInput]);
      document.getElementById("TagInput").value = "";
    }
  }

  function handleModalClose() {setModal("False")}
  function handleModalOpen() {setModal("True")}

  async function handleNewPost(e) {
    console.log("Creating new post...");
    e.preventDefault();
    if (newPostTitle !== "" && newPostSubtitle !== "" && newPostTags.length > 0 && password === document.getElementById("PasswordInput").value) {
      // Create new markdown file with metadata.

      const newPostDate = new Date();
      const formattedDate = newPostDate.toISOString();

      const data = {
        title: newPostTitle,
        subtitle: newPostSubtitle,
        tags: newPostTags,
        date: formattedDate,
        update: formattedDate,
      };

      try {
        const response = await fetch("/api/create-post", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (!response.ok) {throw new Error("Failed to create post");}

        handleModalClose();
        router.push('/edit/' + newPostTitle.toLowerCase().replace(/\s/g, "-"));
      } catch (error) {
        new Response(`Error: ${error.message}`);
      }
    }
  }

  return (
    <main className="flex flex-col p-8 bg-white space-y-4">
      <Navigation />
      <section className="flex flex-col items-center justify-center w-full text-black">
        <h1 className="text-4xl font-bold">Welcome to my Blog</h1>
        <p className="text-lg">A simple handcrafted student-made blog</p>
      </section>
      <section className="flex">
        <article className="flex items-center p-4 bg-gray-800 text-white grow rounded">
          <img className="h-8 mr-2 bg-white rounded ml-0" src="/Filter.png" alt="Filter icon" />
          <h2 className="mr-4 text-2xl font-bold">Filter</h2>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Search"
              className="border-2 px-2 py-1 rounded text-black"
              onChange={search}
            />
            <button onClick={handleFilter} value="None" className={getButtonClass("None")}>
              all
            </button>
            {tags.map((tag, index) => (
              <button onClick={handleFilter} key={index} value={tag} className={getButtonClass(tag)}>
                {tag}
              </button>
            ))}
          </div>
        </article>
        <button onClick={handleModalOpen} className="text-2xl font-bold ml-2 p-4 bg-gray-800 text-white rounded">New Post</button>
      </section>
      
      {showModal=="True" && <section className="fixed top-12 bottom-16 left-16 right-16 bg-white border-8 border-gray-800 z-10 space-y-2 rounded">
        <div className="flex bg-gray-800 p-2 w-full justify-between items-center">
          <h1 className="text-4xl font-bold text-gray-200">Create a New Post</h1>
          <button onClick={handleModalClose} className="text-2xl transform transition-transform duration-500 hover:rotate-180">❌</button>
        </div>
        <div className="mx-4">
          <input className="w-full bg-gray-800 text-gray-200 p-2 my-1 rounded" id="TitleInput" onChange={handleNewPostTitle} placeholder="Title"></input>
          <input className="w-full bg-gray-800 text-gray-200 p-2 my-1 rounded" id="SubtitleInput" onChange={handleNewPostSubtitle} placeholder="Subtitle"></input>
          <input className="w-full bg-gray-800 text-gray-200 p-2 my-1 rounded" id="TagInput" placeholder="Tags"></input>
          {newPostTags.length > 0 && <div className="flex flex-wrap gap-2 my-1">
            {newPostTags.map((tag, index) => (
              <div className="pr-1 bg-gray-200 text-gray-800 border-2 border-gray-800 rounded flex space-x-1 items-center">
                <label key={index} className="m-1">{tag}</label>
                <button onClick={() => setNewPostTags(newPostTags.filter((_, i) => i !== index))} className="bg-red-700 text-gray-200 rounded transform transition-transform duration-500 hover:rotate-180">❌</button>
              </div>
            ))}
          </div>}
          <button onClick={handleNewPostTag} onClick={handleNewPostTag} className="w-full bg-green-700 text-gray-200 p-2 mt-1 rounded">Add Tag</button>
        </div>
        <div className="flex mx-4 space-x-2">
          <input className="w-full bg-gray-800 text-gray-200 p-2 rounded" id="PasswordInput" placeholder="Passkey"></input>
          <button onClick={handleNewPost} className="w-full bg-green-700 text-gray-200 p-2 rounded">Edit Post</button>
        </div>
      </section>}
      <BlogIndex posts={filteredPosts} />
    </main>
  );
}
