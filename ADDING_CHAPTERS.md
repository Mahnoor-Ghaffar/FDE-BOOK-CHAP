# How to Add New Chapters

## Method 1: Manual Copy (Simple)

1. Copy an existing chapter file (e.g., `chapters/chapter-01.html`)
2. Rename it to the new chapter number (e.g., `chapters/chapter-04.html`)
3. Update the content:
   - Change the `<title>` tag
   - Change the chapter header (`<h1>`)
   - Replace the main content with your new material
   - Update the navigation links at the bottom
4. Add the new chapter to the sidebar and TOC manually (or wait for auto-update)

## Method 2: Using Chapter Data (Recommended for Future)

A more automated approach would involve:
1. Creating a `chapters.json` file with chapter metadata
2. Using JavaScript to dynamically generate the sidebar, TOC, and chapter list
3. Creating chapter pages from markdown or text templates

For now, since you'll be providing `.txt` files, here's the recommended workflow:

## Working with .txt Files

When you receive `.txt` chapter files:

1. **Place the .txt file** in a `source/` directory (create if needed)
2. **Convert to HTML** using the chapter template:
   - Copy `chapters/chapter-template.html` (create this template)
   - Replace the content area with formatted version of your .txt
   - Apply proper HTML semantics (h1, h2, p, ul, ol, etc.)
   - Add appropriate styling for definitions, examples, etc.
3. **Save as** `chapters/chapter-XX.html` where XX is the chapter number
4. **Update navigation** in sidebar.html and toc.html (or enable dynamic loading)

## Chapter Template Structure

Each chapter should follow this structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[Chapter Title]</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="../css/style.css" rel="stylesheet">
    <script src="../js/main.js" defer></script>
</head>
<body class="flex min-h-screen bg-gray-50">
    <div id="header"></div>
    <div id="sidebar"></div>
    <div id="main" class="flex-1 overflow-y-auto p-6">
        <div class="prose prose-lg max-w-none">
            <!-- Chapter Header -->
            <div class="mb-8">
                <h1 class="text-3xl font-bold">[Chapter Number]: [Chapter Title]</h1>
                <p class="text-gray-600 mb-4">[Brief description]</p>
            </div>

            <!-- Chapter Content Goes Here -->
            <!-- Format your .txt content into proper HTML -->
            <!-- Use h2 for sections, h3 for subsections -->
            <!-- Use p for paragraphs -->
            <!-- Use ul/ol for lists -->
            <!-- Use blockquote for quotes -->
            <!-- Use pre/code for code blocks -->
            <!-- Use styled boxes for definitions, examples, warnings, etc. -->

            <!-- Quick Revision Section (auto-generated from content preferred) -->
            <section id="quick-revision" class="mt-12 pt-8 border-t border-gray-200">
                <!-- Quick revision points -->
            </section>

            <!-- Exam Practice Section -->
            <section id="exam-practice" class="mt-12 pt-8 border-t border-gray-200">
                <!-- Exam questions with toggleable answers -->
            </section>
        </div>
    </div>

    <!-- Chapter Navigation -->
    <div class="chapter-nav flex justify-between mt-10 pt-6 border-t hidden md:block">
        <!-- Previous chapter link -->
        <!-- Next chapter link -->
    </div>

    <!-- Mobile Chapter Navigation -->
    <div class="chapter-nav flex justify-between mt-4 pt-4 border-t block md:hidden">
        <!-- Previous chapter link -->
        <!-- Next chapter link -->
    </div>

    <div id="footer"></div>
</body>
</html>
```

## Content Formatting Guidelines

When converting .txt to HTML:

- **Headings**: Use h2 for main sections, h3 for subsections
- **Paragraphs**: Wrap in p tags
- **Lists**: Use ul for bullet points, ol for numbered lists
- **Quotes**: Use blockquote
- **Code**: Use pre/code blocks
- **Important Boxes**: Create styled divs for:
  - Definitions: `bg-purple-50 border-purple-200 text-purple-800`
  - Examples: `bg-gray-50 border-gray-200 text-gray-800`
  - Warnings: `bg-red-50 border-red-200 text-red-800`
  - Tips: `bg-green-50 border-green-200 text-green-800`
  - Important: `bg-yellow-50 border-yellow-200 text-yellow-800`

## Automatic Updates

To make adding chapters truly easy in the future, consider:
1. Creating a build script that reads chapter metadata
2. Using JavaScript to load chapter list from a JSON file
3. Implementing client-side chapter generation from markdown

But for now, the manual copy method works well and maintains full control over each chapter's content and structure.