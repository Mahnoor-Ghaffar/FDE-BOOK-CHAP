# AI Fluency Study Notes Website

A clean, minimal digital textbook website for exam preparation built with HTML, Tailwind CSS, and vanilla JavaScript.

## Getting Started

To run this website locally:

1. Clone or download this repository
2. Open `index.html` in your web browser (Chrome recommended)
3. No build process or dependencies required - it's pure HTML, CSS, and JavaScript
4. Use the sidebar to navigate between chapters
5. Use the search box in the header to find specific content

## Project Structure

```
exam-prep-repo/
│
├── index.html              # Home/Book Cover page
├── toc.html                # Table of Contents page
├── chapters/               # Individual chapter pages
│   ├── chapter-01.html     # First chapter
│   ├── chapter-02.html     # Second chapter
│   ├── chapter-03.html     # Third chapter
│   ├── chapter-template.html # Template for new chapters
│   └── ...
│
├── source/                 # Source .txt files (provided by user)
│   ├── chapter-01.txt
│   ├── chapter-02.txt
│   └── ...
│
├── css/                    # Custom CSS
│   └── style.css
│
├── js/                     # JavaScript functionality
│   └── main.js
│
├── assets/                 # Images, icons, etc.
│
├── header.html             # Header partial
├── sidebar.html            # Sidebar navigation
├── footer.html             # Footer partial
│
├── ADDING_CHAPTERS.md      # Guide for adding new chapters
└── README.md               # This file
```

## Features

- ✅ **Clean, academic design** - Feels like a digital textbook
- ✅ **Responsive layout** - Works on mobile, tablet, and desktop
- ✅ **Easy navigation** - Sidebar with chapter list, prev/next controls
- ✅ **Progress tracking** - Uses localStorage to remember completed chapters
- ✅ **Search functionality** - Client-side search within chapters
- ✅ **Exam practice** - Toggleable questions and answers
- ✅ **Quick revision** - Summary sections for fast review
- ✅ **Code blocks** - Properly formatted code with copy capability
- ✅ **Important highlights** - Styled boxes for definitions, examples, warnings, etc.
- ✅ **Easy to extend** - Simple process for adding new chapters

## Design Philosophy

- **Minimal distractions** - Focus on content, not flashy UI
- **Excellent readability** - Comfortable typography and spacing
- **Professional appearance** - Clean, book-like aesthetic
- **Mobile-friendly** - Optimized for reading on any device
- **Academic styling** - Subtle colors, clear hierarchy, no unnecessary animations

## How to Use

### For Students
1. Open `index.html` in any modern browser
2. Use the sidebar to navigate between chapters
3. Use the search box in the header to find specific content
4. Track your progress - completed chapters are automatically saved
5. Use quick revision sections for fast review
6. Toggle exam answers to test your understanding

### For Adding New Chapters
When you receive `.txt` files with chapter content:

1. **Place .txt files** in the `source/` directory
2. **Convert to HTML** using one of these methods:
   - **Manual** (recommended for control): 
     - Copy `chapters/chapter-template.html`
     - Format the .txt content into proper HTML (h2, h3, p, ul, ol, etc.)
     - Add appropriate styling for special content
     - Save as `chapters/chapter-XX.html`
   - **Semi-automated**: 
     - Use simple text replacement to convert markdown-like formatting to HTML
     - Apply the chapter template structure

3. **Update navigation**:
   - Add the new chapter link to `sidebar.html`
   - Add the new chapter entry to `toc.html`
   - Update chapter counts in `index.html`, `toc.html`, etc.

4. **Test** the new chapter in your browser

See `ADDING_CHAPTERS.md` for detailed instructions.

## Technical Details

- **HTML5** - Semantic markup for accessibility and SEO
- **Tailwind CSS** (via CDN) - Utility-first CSS for rapid styling
- **Vanilla JavaScript** - No frameworks, minimal dependencies
- **localStorage** - Persistent progress tracking in browser
- **Responsive design** - Mobile-first approach with Tailwind breakpoints

## Browser Support

Works in all modern browsers:
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Customization

### Colors
The site uses a grayscale base with blue accents:
- Primary blue: `#3b82f6` (Tailwind blue-500)
- Gray background: `#f9fafb` (Tailwind gray-50)
- Text: Dark gray for readability

To change colors, modify the Tailwind classes in the HTML files or add custom CSS to `css/style.css`.

### Typography
- Uses system fonts for excellent readability
- Comfortable line height (1.7) for long reading sessions
- Clear heading hierarchy (h1-h4)

## Future Enhancements

Planned features for future versions:
- Dark mode toggle
- Font size adjustment
- Bookmarking specific sections
- Export to PDF/print functionality
- Chapter notes/highlighting
- Spaced repetition system

## Credits

Built with Tailwind CSS and vanilla JavaScript following academic design principles for optimal learning experience.