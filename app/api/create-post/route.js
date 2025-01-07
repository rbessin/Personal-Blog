import fs from "fs";
import path from "path";

export async function POST(req) {
  try {
    const body = await req.json();
    const { title, subtitle, tags, date, update } = body;

    if (!title || !subtitle || !tags || !date || !update) {
      return new Response("Missing required fields", { status: 400 });
    }

    const postDirectory = path.join(process.cwd(), "posts");
    const filename = `${title.replace(/\s+/g, "-").toLowerCase()}.md`;

    const metadata = `---
title: ${title}
subtitle: ${subtitle}
date: ${date}
update: ${update}
tags:
  - ${tags.join("\n  - ")}
---`;

    // Ensure the posts directory exists
    if (!fs.existsSync(postDirectory)) {
      fs.mkdirSync(postDirectory, { recursive: true });
    }
    fs.writeFileSync(path.join(postDirectory, filename), metadata);
    
  } catch (error) {
    return new Response("Error creating post", { status: 500 });
  }
}
