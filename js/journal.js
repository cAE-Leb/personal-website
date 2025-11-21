// Fetch and render the journal entries
async function loadJournalEntries() {
    const response = await fetch('posts/posts.json'); // We'll generate this file
    const posts = await response.json();

    const container = document.getElementById('journal-entries');
    const postCount = document.getElementById('post-count');
    const lastPosted = document.getElementById('last-posted');

    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    postCount.textContent = posts.length;
    lastPosted.textContent = posts[0]?.date || '--/--/----';

    // Renders individual posts
    posts.forEach(post => {
        const entry = document.createElement('div');
        entry.className = 'journal-entry';
        entry.innerHTML = `
            <div class="entry-header" aria-expanded="false" onclick="toggleEntry(this)">
                <h3>${post.title}</h3>
                <span class="entry-date">${post.date}</span>
                <span class="expand-indicator">▼</span>
            </div>
            <div class="entry-content">
                ${post.content.split('\n').map(paragraph => `<p>${paragraph}</p>`).join('')}
            </div>
        `;
        container.appendChild(entry);
    });
}

// toggling functionality
function toggleEntry(header) {
    const content = header.nextElementSibling;
    const indicator = header.querySelector('.expand-indicator');
    const isExpanded = header.getAttribute('aria-expanded') === 'true';

    header.setAttribute('aria-expanded', !isExpanded);
    content.style.display = isExpanded ? 'none' : 'block';
}

// Unsure what this is doing, I just know I need it...
document.addEventListener('DOMContentLoaded', loadJournalEntries);
