import fs from 'fs';
import path from 'path';

export async function DELETE(req) {
  try {
    const { slug } = await req.json(); // Parse the JSON body

    if (!slug) {
      return new Response(
        JSON.stringify({ error: 'Slug is required to delete a file' }),
        { status: 400 }
      );
    }

    // Construct the file path
    const filePath = path.join(process.cwd(), 'posts', `${slug}.md`);

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      return new Response(
        JSON.stringify({ error: 'File not found' }),
        { status: 404 }
      );
    }

    // Delete the file
    fs.unlinkSync(filePath);

    return new Response(
      JSON.stringify({ message: 'File deleted successfully!' }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting file:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to delete file' }),
      { status: 500 }
    );
  }
}
