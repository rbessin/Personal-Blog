import fs from 'fs';
import path from 'path';

export async function POST(req) {
  try {
    const body = await req.json(); // Parse the JSON body
    const { slug, content, metadata } = body;

    if (!slug || !content || !metadata) {
      return new Response(
        JSON.stringify({ error: 'Slug, content, and metadata are required' }),
        { status: 400 }
      );
    }

    // Validate metadata structure
    const { title, subtitle, date, tags } = metadata;
    if (!title || !subtitle || !date || !tags) {
      return new Response(
        JSON.stringify({ error: 'Metadata must include title and date' }),
        { status: 400 }
      );
    }

    // Add or update the last updated timestamp
    const update = new Date().toISOString();

    // Format the metadata as front matter (YAML-like syntax)
    const frontMatter = `---
title: ${title}
subtitle: ${subtitle}
date: ${date}
update: ${update}
tags:
  - ${tags.join("\n  - ")}
---`;

    // Combine metadata with content
    const fileContent = frontMatter + content;

    // Construct the file path
    const filePath = path.join(process.cwd(), 'posts', `${slug}.md`);

    // Write the updated content to the file
    fs.writeFileSync(filePath, fileContent, 'utf8');
    
  } catch (error) {
    console.error('Error saving file:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to save file' }),
      { status: 500 }
    );
  }
}
