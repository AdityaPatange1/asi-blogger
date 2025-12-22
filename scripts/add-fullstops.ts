import mongoose from 'mongoose';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Load .env manually
const envPath = resolve(process.cwd(), '.env');
const envContent = readFileSync(envPath, 'utf-8');
envContent.split('\n').forEach(line => {
  const [key, ...valueParts] = line.split('=');
  if (key && valueParts.length) {
    process.env[key.trim()] = valueParts.join('=').trim();
  }
});

// Blog Schema (inline to avoid import issues)
const BlogSchema = new mongoose.Schema({
  authorName: String,
  authorEmail: String,
  description: String,
  topic: String,
  topicCategory: String,
  tags: [String],
  title: String,
  content: String,
  summary: String,
  likes: Number,
  views: Number,
}, { timestamps: true });

const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);

function addFullStops(content: string): string {
  const lines = content.split('\n');

  const processedLines = lines.map((line) => {
    const trimmedLine = line.trim();

    // Skip empty lines
    if (!trimmedLine) return line;

    // Skip main titles (# heading) - only h1
    if (/^#\s+/.test(trimmedLine) && !/^##/.test(trimmedLine)) {
      return line;
    }

    // Skip code blocks
    if (trimmedLine.startsWith('```')) return line;

    // Skip horizontal rules
    if (/^[-*_]{3,}$/.test(trimmedLine)) return line;

    // Skip lines that already end with punctuation
    if (/[.!?:;,]$/.test(trimmedLine)) return line;

    // Skip lines ending with code block markers or special markdown
    if (trimmedLine.endsWith('```') || trimmedLine.endsWith('|')) return line;

    // Process subtitles (## or ### or ####) - add full stop
    if (/^#{2,}\s+/.test(trimmedLine)) {
      return line.trimEnd() + '.';
    }

    // Process bullet points (- or * or numbered lists)
    if (/^[-*]\s+/.test(trimmedLine) || /^\d+\.\s+/.test(trimmedLine)) {
      return line.trimEnd() + '.';
    }

    // Process regular paragraphs and other lines
    if (trimmedLine.length > 0) {
      return line.trimEnd() + '.';
    }

    return line;
  });

  return processedLines.join('\n');
}

async function main() {
  console.log('Connecting to MongoDB...');

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI not found in environment');
  }

  await mongoose.connect(uri, { dbName: 'test' });
  console.log('Connected to MongoDB');

  // Fetch all blogs
  const blogs = await Blog.find({});
  console.log(`Found ${blogs.length} blogs to process`);

  let updatedCount = 0;

  for (const blog of blogs) {
    const originalContent = blog.content;
    const updatedContent = addFullStops(originalContent);

    // Also process summary
    const originalSummary = blog.summary;
    let updatedSummary = originalSummary;
    if (originalSummary && !originalSummary.trim().endsWith('.')) {
      updatedSummary = originalSummary.trim() + '.';
    }

    // Only update if content changed
    if (originalContent !== updatedContent || originalSummary !== updatedSummary) {
      await Blog.updateOne(
        { _id: blog._id },
        {
          $set: {
            content: updatedContent,
            summary: updatedSummary
          }
        }
      );
      updatedCount++;
      console.log(`Updated blog: "${blog.title}"`);
    }
  }

  console.log(`\nDone! Updated ${updatedCount} out of ${blogs.length} blogs.`);

  await mongoose.disconnect();
  console.log('Disconnected from MongoDB');
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
