document.addEventListener('DOMContentLoaded', async () => {
    // Load partials
    const loadPartial = (id, url) => {
        const element = document.getElementById(id);
        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error(`Failed to load ${id}`);
                return response.text();
            })
            .then(html => {
                element.innerHTML = html;

                // Initialize sidebar links after loading
                if (id === 'sidebar') {
                    initializeSidebar();
                    initializeProgressTracking();
                    initializeSearch();
                }
            })
            .catch(error => {
                element.innerHTML = `<p class="text-red-500 p-4">Failed to load ${id}</p>`;
                console.error(error);
            });
    };

    // Load all partials
    Promise.all([
        loadPartial('header', 'header.html'),
        loadPartial('sidebar', 'sidebar.html'),
        loadPartial('footer', 'footer.html')
    ]).then(() => {
        // Initialize chapter-specific functionality
        initializeChapterNavigation();
        initializeExamToggles();
        initializeQuickRevision();
    });
});

// Initialize sidebar functionality
function initializeSidebar() {
    // Highlight active chapter link
    const currentPage = location.pathname.split('/').pop();
    document.querySelectorAll('#sidebar .chapter-link').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('bg-blue-50', 'text-blue-600', 'font-medium', 'border-l-2', 'border-blue-500');
        }
    });
}

// Initialize progress tracking
function initializeProgressTracking() {
    const currentPage = location.pathname.split('/').pop();
    const completed = JSON.parse(localStorage.getItem('completedChapters') || '[]');

    // Mark as completed if user has scrolled to bottom (simple approach)
    let hasScrolledToBottom = false;
    const checkScroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 && !hasScrolledToBottom) {
            hasScrolledToBottom = true;
            if (!completed.includes(currentPage)) {
                completed.push(currentPage);
                localStorage.setItem('completedChapters', JSON.stringify(completed));
                updateProgressIndicator();
            }
        }
    };

    window.addEventListener('scroll', checkScroll);

    // Also check on load in case they're already at bottom
    setTimeout(checkScroll, 100);
}

// Update progress indicator in sidebar
function updateProgressIndicator() {
    const completed = JSON.parse(localStorage.getItem('completedChapters') || '[]');
    const totalChapters = document.querySelectorAll('#sidebar .chapter-link').length;
    const progress = Math.round((completed.length / totalChapters) * 100);

    // Update or create progress indicator
    let progressEl = document.querySelector('.progress-indicator');
    if (!progressEl) {
        progressEl = document.createElement('div');
        progressEl.className = 'progress-indicator mt-6 p-3 bg-gray-50 rounded';
        progressEl.innerHTML = `
            <div class="flex justify-between text-sm">
                <span>Progress:</span>
                <span id="progress-text">0%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div id="progress-bar" class="bg-blue-600 h-2 rounded-full" style="width: 0%"></div>
            </div>
        `;
        const sidebarNav = document.querySelector('#sidebar nav');
        sidebarNav.appendChild(progressEl);
    }

    document.getElementById('progress-text').textContent = progress + '%';
    document.getElementById('progress-bar').style.width = progress + '%';
}

// Initialize chapter navigation (previous/next)
function initializeChapterNavigation() {
    const currentPage = location.pathname.split('/').pop();
    const chapterMatch = currentPage.match(/chapter-?(\d+)\.html/);

    if (chapterMatch) {
        const chapterNum = parseInt(chapterMatch[1]);

        // Previous chapter link
        const prevLinks = document.querySelectorAll('.nav-prev');
        prevLinks.forEach(link => {
            if (chapterNum > 1) {
                link.href = `chapter-${String(chapterNum - 1).padStart(2, '0')}.html`;
            } else {
                link.href = '#';
                link.classList.add('text-gray-400', 'cursor-not-allowed');
            }
        });

        // Next chapter link
        const nextLinks = document.querySelectorAll('.nav-next');
        nextLinks.forEach(link => {
            link.href = `chapter-${String(chapterNum + 1).padStart(2, '0')}.html`;
            // Note: We don't disable if chapter doesn't exist - it will 404 which is acceptable
        });
    }
}

// Initialize exam question toggles
function initializeExamToggles() {
    document.querySelectorAll('.exam-question .answer-button').forEach(button => {
        button.addEventListener('click', () => {
            const answer = button.nextElementSibling;
            const isHidden = answer.classList.toggle('hidden');
            button.textContent = isHidden ? 'Show Answer' : 'Hide Answer';
        });
    });
}

// Initialize search functionality
function initializeSearch() {
    // Create search input
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search in this chapter...';
    searchInput.className = 'border border-gray-300 rounded px-3 py-2 w-full md:w-auto mb-4';

    // Add to header
    const header = document.querySelector('#header');
    if (header) {
        header.appendChild(searchInput);
    }

    // Add search functionality
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase().trim();

        if (term === '') {
            // Show all content
            document.querySelectorAll('#main p, #main li, #main h1, #main h2, #main h3, #main h4, #main blockquote, #main pre').forEach(el => {
                el.style.display = '';
            });
            return;
        }

        // Hide/show elements based on search term
        document.querySelectorAll('#main p, #main li, #main h1, #main h2, #main h3, #main h4, #main blockquote, #main pre').forEach(el => {
            const text = el.textContent.toLowerCase();
            if (text.includes(term)) {
                el.style.display = '';
                // Highlight the term (simple approach)
                const regex = new RegExp(`(${term})`, 'gi');
                el.innerHTML = el.textContent.replace(regex, '<mark class="bg-yellow-200">$1</mark>');
            } else {
                el.style.display = 'none';
            }
        });
    });
}

// Initialize quick revision section (if exists)
function initializeQuickRevision() {
    const revisionSection = document.querySelector('#quick-revision');
    if (revisionSection) {
        // Add a toggle for quick revision if it's long
        const content = revisionSection.querySelector('.revision-content');
        if (content && content.offsetHeight > 200) {
            const toggleBtn = document.createElement('button');
            toggleBtn.textContent = 'Show Quick Revision';
            toggleBtn.className = 'mt-4 btn btn-outline';
            toggleBtn.addEventListener('click', () => {
                const isHidden = revisionSection.classList.toggle('hidden');
                toggleBtn.textContent = isHidden ? 'Show Quick Revision' : 'Hide Quick Revision';
            });
            revisionSection.parentNode.insertBefore(toggleBtn, revisionSection.nextSibling);
        }
    }
}

// Utility function to create styled boxes for important content
function createStyledBox(title, content, type = 'info') {
    const colors = {
        'info': 'bg-blue-50 border-blue-200 text-blue-800',
        'important': 'bg-yellow-50 border-yellow-200 text-yellow-800',
        'warning': 'bg-red-50 border-red-200 text-red-800',
        'tip': 'bg-green-50 border-green-200 text-green-800',
        'definition': 'bg-purple-50 border-purple-200 text-purple-800',
        'example': 'bg-gray-50 border-gray-200 text-gray-800'
    };

    const box = document.createElement('div');
    box.className = `mb-6 p-4 rounded-lg border ${colors[type] || colors.info}`;

    if (title) {
        const titleEl = document.createElement('h4');
        titleEl.className = 'font-semibold mb-2';
        titleEl.textContent = title;
        box.appendChild(titleEl);
    }

    if (content) {
        box.innerHTML += content;
    }

    return box;
}