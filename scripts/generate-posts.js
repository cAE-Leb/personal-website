const fs = require('fs');
const path = require('path');
const marked = require('marked'); // For converting markdown to HTML

const postsDir = path.join(__dirname, '../posts');
const outputFile = path.join(__dirname, '../posts.json');

const posts = [];

// Read all markdown files in the posts directory
fs.readdirSync(postsDir).forEach(file => {
    if (file.endsWith('.md')) {
        const filePath = path.join(postsDir, file);
        const content = fs.readFileSync(filePath, 'utf8');

        // Extract front matter (title, date)
        const frontMatterMatch = content.match(/---([\s\S]*?)---/);
        let frontMatter = {};
        if (frontMatterMatch) {
            frontMatterMatch[1].trim().split('\n').forEach(line => {
                const [key, value] = line.split(':').map(s => s.trim());
                frontMatter[key] = value.replace(/["']/g, '');
            });
        }

        // Extract the markdown content (after front matter)
        const markdownContent = content.replace(/---([\s\S]*?)---/, '').trim();
        const htmlContent = marked.parse(markdownContent);

        posts.push({
            title: frontMatter.title,
            date: frontMatter.date,
            content: htmlContent
        });
    }
});

// Sort posts by date (newest first)
posts.sort((a, b) => new Date(b.date) - new Date(a.date));

// Write to posts.json
fs.writeFileSync(outputFile, JSON.stringify(posts, null, 2));
console.log('posts.json generated!');
