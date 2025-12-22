# ASI Blogger™

An AI-powered blog generation platform co-owned by Ekta Bhatia and Aditya Patange.

## Overview.

ASI Blogger™ is a modern web application that leverages advanced AI technology to help users create professional, engaging blog content across 1000+ topics. The platform combines cutting-edge AI capabilities with a sleek, user-friendly interface.

## Features.

### Core Features.

- **AI-Powered Blog Generation.** Create comprehensive blog posts using Anthropic Claude AI® with just a topic and description.
- **SEASHA Chat Assistant.** An intelligent, friendly AI assistant that helps users explore and discover content in the blog collection.
- **Blog Collection.** Browse, search, and filter through all published blogs with advanced sorting options.
- **Engagement System.** Like and comment on blogs without requiring user registration.
- **Responsive Design.** Fully responsive interface with an Orange and Black theme.

### Technical Features.

- **Streaming Responses.** Real-time streaming for the chat assistant to reduce perceived latency.
- **Markdown Rendering.** Full markdown support in chat messages and blog content.
- **Keyword Search.** Simple and reliable regex-based search across all blog fields.
- **Cookie Consent.** GDPR-compliant cookie consent banner with customizable preferences.

## Tech Stack.

- **Framework.** Next.js 16 with App Router.
- **Language.** TypeScript.
- **Database.** MongoDB with Mongoose ODM.
- **AI.** Anthropic Claude API (claude-sonnet-4-20250514).
- **Styling.** Inline styles (for Tailwind v4 compatibility).
- **Icons.** Lucide React.

## Getting Started.

### Prerequisites.

- Node.js 18 or higher.
- MongoDB Atlas account or local MongoDB instance.
- Anthropic API key.

### Installation.

1. Clone the repository.

```bash
git clone https://github.com/your-repo/asi-blogger.git
cd asi-blogger
```

2. Install dependencies.

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables.

```env
ANTHROPIC_API_KEY=your_anthropic_api_key_here
MONGODB_URI=your_mongodb_connection_string_here
```

4. Run the development server.

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production.

```bash
npm run build
npm start
```

## Project Structure.

```
src/
├── app/                    # Next.js App Router pages.
│   ├── api/               # API routes.
│   │   ├── blogs/         # Blog CRUD operations.
│   │   ├── chat/          # SEASHA chat endpoint.
│   │   ├── comments/      # Comment operations.
│   │   └── likes/         # Like operations.
│   ├── blogs/             # Blog listing and detail pages.
│   ├── create/            # Blog creation page.
│   ├── about/             # About page.
│   ├── terms/             # Terms of Service.
│   ├── privacy/           # Privacy Policy.
│   └── cookies/           # Cookie Policy.
├── components/            # Reusable React components.
│   ├── Header.tsx         # Navigation header.
│   ├── Footer.tsx         # Site footer.
│   ├── BlogCard.tsx       # Blog preview card.
│   ├── ChatAgent.tsx      # SEASHA chat widget.
│   └── CookieConsent.tsx  # Cookie consent banner.
├── lib/                   # Utility libraries.
│   ├── mongodb.ts         # Database connection.
│   └── utils.ts           # Helper functions.
├── models/                # Mongoose schemas.
│   ├── Blog.ts            # Blog model.
│   ├── Comment.ts         # Comment model.
│   └── Like.ts            # Like model.
└── data/                  # Static data.
    └── topics.ts          # Topic categories.
```

## API Endpoints.

### Blogs.

- `GET /api/blogs` - Fetch blogs with optional filters (search, category, pagination, sorting).
- `POST /api/blogs` - Create a new blog with AI-generated content.
- `GET /api/blogs/[id]` - Fetch a single blog by ID.
- `PUT /api/blogs/[id]` - Update a blog.
- `DELETE /api/blogs/[id]` - Delete a blog.

### Chat.

- `POST /api/chat` - Send a message to SEASHA and receive a streaming response.

### Comments.

- `GET /api/comments?blogId=` - Fetch comments for a blog.
- `POST /api/comments` - Add a comment to a blog.

### Likes.

- `POST /api/likes` - Toggle like on a blog.
- `GET /api/likes?blogId=&visitorId=` - Check if a visitor has liked a blog.

## Environment Variables.

| Variable | Description | Required |
|----------|-------------|----------|
| `ANTHROPIC_API_KEY` | Your Anthropic API key for Claude AI. | Yes. |
| `MONGODB_URI` | MongoDB connection string. | Yes. |

## Scripts.

- `npm run dev` - Start development server.
- `npm run build` - Build for production.
- `npm start` - Start production server.
- `npm run lint` - Run ESLint.
- `npx tsx scripts/add-fullstops.ts` - Migration script to add full stops to existing blog content.

## Formatting Guidelines.

All content in this project follows strict punctuation rules.

- All bullet points and list items end with a full stop.
- All subtitles (## and ###) end with a full stop.
- All paragraphs end with a full stop.
- All summaries end with a full stop.
- Exception: Main titles (h1) do not have a full stop.

## Legal Pages.

- **Terms of Service.** Available at `/terms`.
- **Privacy Policy.** Available at `/privacy`.
- **Cookie Policy.** Available at `/cookies`.
- **About.** Available at `/about`.

## Co-Owners.

### Ekta Bhatia.

- Security Engineer.
- Elite Dancer.
- Elite Rapper.
- Para SF Meditator.

### Aditya Patange.

- Security Engineer.
- Elite Dancer.
- Elite Rapper.
- Para SF Meditator.

## License.

MIT License. Copyright (c) 2025 Ekta Bhatia & Aditya Patange.

## Contact.

For inquiries, please email [hello@asi-blogger.com](mailto:hello@asi-blogger.com).

---

© 2025 ASI Blogger™. All Rights Reserved.
