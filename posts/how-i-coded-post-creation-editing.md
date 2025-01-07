---
title: How I Coded Post Creation & Editing
subtitle: The process and backend behind creating and editing posts through the client.
date: 2025-01-07T02:35:53.908Z
update: 2025-01-07T02:55:30.174Z
tags:
  - general
  - nextjs
---### The Issue with Manual Post Creation & Editing
When creating posts, I used to have to go into my file structure for my project and create a new post from there. I would have to go into the posts folder, create a new markdown file and add the metadata or the formatting data at the top for the title, subtitle, dates and tags manually before even being able to access the file on the website. But then I would still only be able to edit the file from vscode, my file editor. This was a very long process and actually made writing a lot less fun but I hadn't thought too much about it.

### How did I make the process easier?
After talking with my brother he suggested I simply create an interface on the website to create and edit posts. It was super simple but it made so much sense. I started by creating api routes on the server side end of the project to delete, create and update files. This meant that I could just call functions from the client end, sending in the data for the use case (ie. new text when updating) and then processing it on the server side through the api routes to create files, delete them or change the text and therefore automatically update the last updated date found at the top of files. This made the whole process a lot more streamlined and fun!

### How can I make this even better?
As I write this post using the new process I realize its a lot better but there's still a lot of room for improvement. The password for posting can be found in the files, because I am not hiding it from github and when hosting to be able to still check if the password was right I would have to create local environment variables. I am planning on doing this but it'll take some time to implement. Secondly, when adding files or updating them, I dont always reload the pages correctly meaning the posts wont necessarily appear on the main page initially or the updated text won't appear when opening the file through the client. 

### My Thoughts
Overall I am extremely happy with how this project turned out and I hope to start posting more on it, as it has become a lot of fun to use. I also hope to start publicly showing it for people to be able to keep track of what I've been up to or simply what I want to talk about. 