/**
 * ASI Knowledge Base Update Script
 *
 * This script indexes all blogs and creates a comprehensive knowledge base
 * that powers the ASI Chat (EB) feature.
 *
 * Usage: npm run update-kb
 *
 * Powered by Bhairava Kali Consciousness Technology (BKCT)
 */

import { MongoClient, ObjectId } from 'mongodb';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env') });

// Configuration
const MONGODB_URI = process.env.EB_MONGODB_URI || process.env.MONGODB_URI;
const KB_OUTPUT_PATH = path.join(__dirname, '..', 'src', 'data', 'asi_kb.json');

// Types
interface BlogDocument {
  _id: ObjectId;
  title: string;
  content: string;
  summary: string;
  topic: string;
  topicCategory: string;
  tags: string[];
  authorName: string;
  authorEmail: string;
  description: string;
  views: number;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}

interface ExtractedEntity {
  name: string;
  type: 'concept' | 'technology' | 'person' | 'organization' | 'method' | 'term';
  frequency: number;
}

interface ContentSection {
  heading: string;
  content: string;
  keyPoints: string[];
}

interface ProcessedBlog {
  id: string;
  title: string;
  summary: string;
  content: string;
  topic: string;
  topicCategory: string;
  tags: string[];
  author: {
    name: string;
    email: string;
  };
  description: string;
  engagement: {
    views: number;
    likes: number;
    popularityScore: number;
  };
  timestamps: {
    created: string;
    updated: string;
  };
  extraction: {
    wordCount: number;
    readingTimeMinutes: number;
    sections: ContentSection[];
    keyPoints: string[];
    keyConcepts: string[];
    entities: ExtractedEntity[];
    questions: string[];
    definitions: Record<string, string>;
    codeSnippets: string[];
    statistics: string[];
    quotes: string[];
  };
  searchIndex: {
    titleTokens: string[];
    contentTokens: string[];
    allTokens: string[];
    nGrams: string[];
  };
  relationships: {
    relatedTopics: string[];
    relatedCategories: string[];
    semanticTags: string[];
  };
}

interface KnowledgeBase {
  metadata: {
    name: string;
    version: string;
    description: string;
    poweredBy: string;
    generatedAt: string;
    lastUpdated: string;
    stats: {
      totalBlogs: number;
      totalWords: number;
      totalCategories: number;
      totalTopics: number;
      totalConcepts: number;
      avgReadingTime: number;
    };
  };
  taxonomy: {
    categories: Array<{
      name: string;
      blogCount: number;
      topics: string[];
      description: string;
    }>;
    topicIndex: Record<string, string[]>; // topic -> blog IDs
    tagIndex: Record<string, string[]>; // tag -> blog IDs
    conceptIndex: Record<string, string[]>; // concept -> blog IDs
  };
  blogs: ProcessedBlog[];
  globalConcepts: Array<{
    name: string;
    frequency: number;
    relatedBlogs: string[];
    description: string;
  }>;
  searchableContent: {
    allTitles: string[];
    allSummaries: string[];
    allKeyPoints: string[];
    allQuestions: string[];
    fullTextIndex: string;
  };
  qaKnowledge: Array<{
    question: string;
    answer: string;
    sourceBlogs: string[];
    confidence: number;
  }>;
}

class KnowledgeBaseBuilder {
  private client: MongoClient | null = null;
  private blogs: BlogDocument[] = [];
  private processedBlogs: ProcessedBlog[] = [];

  private log(message: string, type: 'info' | 'success' | 'error' | 'warning' = 'info') {
    const colors = {
      info: '\x1b[34m',
      success: '\x1b[32m',
      error: '\x1b[31m',
      warning: '\x1b[33m',
    };
    const reset = '\x1b[0m';
    const prefix = { info: '[INFO]', success: '[SUCCESS]', error: '[ERROR]', warning: '[WARNING]' };
    console.log(`${colors[type]}${prefix[type]}${reset} ${message}`);
  }

  private extractDbName(uri: string): string {
    const match = uri.match(/\/([^/?]+)(\?|$)/);
    return match ? match[1] : 'test';
  }

  async connect(): Promise<void> {
    if (!MONGODB_URI) {
      throw new Error('No MongoDB URI configured');
    }
    this.log('Connecting to database...');
    this.client = new MongoClient(MONGODB_URI);
    await this.client.connect();
    this.log('Connected to database', 'success');
  }

  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close();
      this.log('Disconnected from database');
    }
  }

  async fetchBlogs(): Promise<void> {
    const dbName = this.extractDbName(MONGODB_URI!);
    const db = this.client!.db(dbName);
    const collection = db.collection<BlogDocument>('blogs');

    this.blogs = await collection.find({}).sort({ createdAt: -1 }).toArray();
    this.log(`Fetched ${this.blogs.length} blogs from database`, 'success');
  }

  // Extract key sentences from content
  private extractKeySentences(content: string, maxSentences: number = 10): string[] {
    const sentences = content
      .replace(/\n+/g, ' ')
      .split(/(?<=[.!?])\s+/)
      .filter(s => s.trim().length > 30 && s.trim().length < 500)
      .map(s => s.trim());

    // Score sentences by importance indicators
    const scored = sentences.map(sentence => {
      let score = 0;
      const lower = sentence.toLowerCase();

      // Important keyword indicators
      const importantWords = ['important', 'key', 'significant', 'essential', 'critical',
        'fundamental', 'primary', 'main', 'crucial', 'notably', 'specifically',
        'particularly', 'especially', 'therefore', 'thus', 'consequently',
        'demonstrates', 'shows', 'reveals', 'indicates', 'suggests', 'proves'];

      importantWords.forEach(word => {
        if (lower.includes(word)) score += 2;
      });

      // Definition patterns
      if (lower.includes(' is ') || lower.includes(' are ') || lower.includes(' refers to ')) {
        score += 3;
      }

      // Statistical/numerical content
      if (/\d+%|\d+\s*(million|billion|thousand)/i.test(sentence)) {
        score += 2;
      }

      // Longer sentences often contain more information
      if (sentence.length > 100) score += 1;

      return { sentence, score };
    });

    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, maxSentences)
      .map(s => s.sentence);
  }

  // Extract sections from content
  private extractSections(content: string): ContentSection[] {
    const sections: ContentSection[] = [];

    // Split by markdown-style headings or double newlines
    const parts = content.split(/(?=#{1,3}\s)|(?=\n\n[A-Z])/);

    for (const part of parts) {
      const lines = part.trim().split('\n');
      if (lines.length === 0) continue;

      let heading = 'Introduction';
      let contentStart = 0;

      // Check for heading
      if (lines[0].startsWith('#')) {
        heading = lines[0].replace(/^#+\s*/, '').trim();
        contentStart = 1;
      } else if (lines[0].length < 100 && lines[0].match(/^[A-Z]/)) {
        heading = lines[0].trim();
        contentStart = 1;
      }

      const sectionContent = lines.slice(contentStart).join('\n').trim();
      if (sectionContent.length > 50) {
        sections.push({
          heading,
          content: sectionContent,
          keyPoints: this.extractKeySentences(sectionContent, 3)
        });
      }
    }

    return sections.length > 0 ? sections : [{
      heading: 'Main Content',
      content: content,
      keyPoints: this.extractKeySentences(content, 5)
    }];
  }

  // Extract entities and concepts
  private extractEntities(content: string, title: string, tags: string[]): ExtractedEntity[] {
    const entities: Map<string, ExtractedEntity> = new Map();
    const text = `${title} ${content}`;

    // Technology/tool patterns
    const techPatterns = [
      /\b(AI|ML|API|SDK|REST|GraphQL|SQL|NoSQL|HTTP|HTTPS|JSON|XML|HTML|CSS|JavaScript|TypeScript|Python|Java|C\+\+|Ruby|Go|Rust|Swift|Kotlin)\b/gi,
      /\b(React|Angular|Vue|Node\.js|Express|Django|Flask|Spring|Laravel|Rails)\b/gi,
      /\b(AWS|Azure|GCP|Docker|Kubernetes|Terraform|Jenkins|GitHub|GitLab)\b/gi,
      /\b(MongoDB|PostgreSQL|MySQL|Redis|Elasticsearch|Kafka|RabbitMQ)\b/gi,
      /\b(TensorFlow|PyTorch|Keras|scikit-learn|pandas|NumPy|OpenAI|GPT|BERT|Transformer)\b/gi
    ];

    techPatterns.forEach(pattern => {
      const matches = text.match(pattern) || [];
      matches.forEach(match => {
        const normalized = match.trim();
        if (entities.has(normalized.toLowerCase())) {
          const entity = entities.get(normalized.toLowerCase())!;
          entity.frequency++;
        } else {
          entities.set(normalized.toLowerCase(), {
            name: normalized,
            type: 'technology',
            frequency: 1
          });
        }
      });
    });

    // Concept patterns (capitalized multi-word phrases)
    const conceptPattern = /\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)\b/g;
    const conceptMatches = text.match(conceptPattern) || [];
    conceptMatches.forEach(match => {
      const normalized = match.trim();
      if (normalized.length > 5 && !['The', 'This', 'That', 'These', 'Those', 'When', 'Where', 'What', 'Which'].some(w => normalized.startsWith(w))) {
        if (entities.has(normalized.toLowerCase())) {
          const entity = entities.get(normalized.toLowerCase())!;
          entity.frequency++;
        } else {
          entities.set(normalized.toLowerCase(), {
            name: normalized,
            type: 'concept',
            frequency: 1
          });
        }
      }
    });

    // Add tags as entities
    tags.forEach(tag => {
      if (!entities.has(tag.toLowerCase())) {
        entities.set(tag.toLowerCase(), {
          name: tag,
          type: 'term',
          frequency: 1
        });
      }
    });

    return Array.from(entities.values())
      .sort((a, b) => b.frequency - a.frequency)
      .slice(0, 30);
  }

  // Extract definitions from content
  private extractDefinitions(content: string): Record<string, string> {
    const definitions: Record<string, string> = {};

    // Pattern: "X is Y" or "X refers to Y" or "X, which is Y"
    const patterns = [
      /\b([A-Z][a-zA-Z\s]{2,30})\s+is\s+(?:a|an|the)?\s*([^.]+\.)/gi,
      /\b([A-Z][a-zA-Z\s]{2,30})\s+refers?\s+to\s+([^.]+\.)/gi,
      /\b([A-Z][a-zA-Z\s]{2,30}),?\s+which\s+is\s+([^.]+\.)/gi,
      /\b([A-Z][a-zA-Z\s]{2,30})\s+can\s+be\s+defined\s+as\s+([^.]+\.)/gi
    ];

    patterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        const term = match[1].trim();
        const definition = match[2].trim();
        if (term.length > 2 && definition.length > 20 && definition.length < 300) {
          definitions[term] = definition;
        }
      }
    });

    return definitions;
  }

  // Extract code snippets
  private extractCodeSnippets(content: string): string[] {
    const snippets: string[] = [];

    // Markdown code blocks
    const codeBlockPattern = /```[\s\S]*?```/g;
    const matches = content.match(codeBlockPattern) || [];
    snippets.push(...matches.map(m => m.replace(/```\w*\n?/g, '').trim()));

    // Inline code
    const inlinePattern = /`([^`]+)`/g;
    let inlineMatch;
    while ((inlineMatch = inlinePattern.exec(content)) !== null) {
      if (inlineMatch[1].length > 10) {
        snippets.push(inlineMatch[1]);
      }
    }

    return snippets.slice(0, 10);
  }

  // Extract statistics and numbers
  private extractStatistics(content: string): string[] {
    const stats: string[] = [];

    // Sentences with percentages or large numbers
    const sentences = content.split(/[.!?]+/);
    sentences.forEach(sentence => {
      if (/\d+%|\d{1,3}(,\d{3})+|\d+\s*(million|billion|trillion|thousand)/i.test(sentence)) {
        const trimmed = sentence.trim();
        if (trimmed.length > 20 && trimmed.length < 300) {
          stats.push(trimmed);
        }
      }
    });

    return stats.slice(0, 10);
  }

  // Extract quotes
  private extractQuotes(content: string): string[] {
    const quotes: string[] = [];

    // Double quotes
    const quotePattern = /"([^"]{20,200})"/g;
    let match;
    while ((match = quotePattern.exec(content)) !== null) {
      quotes.push(match[1]);
    }

    return quotes.slice(0, 5);
  }

  // Generate potential questions from content
  private generateQuestions(blog: BlogDocument): string[] {
    const questions: string[] = [];
    const { title, topic, topicCategory, summary, content } = blog;

    // Basic questions about the topic
    questions.push(`What is ${topic}?`);
    questions.push(`How does ${topic} work?`);
    questions.push(`Why is ${topic} important?`);
    questions.push(`What are the benefits of ${topic}?`);
    questions.push(`What are the key concepts in ${topic}?`);
    questions.push(`Can you explain ${topic}?`);
    questions.push(`Tell me about ${topic}`);

    // Questions from title
    if (title.includes('How')) {
      questions.push(title.endsWith('?') ? title : `${title}?`);
    } else {
      questions.push(`What does "${title}" mean?`);
      questions.push(`Can you summarize "${title}"?`);
    }

    // Category-based questions
    questions.push(`What are the latest developments in ${topicCategory}?`);
    questions.push(`What should I know about ${topicCategory}?`);

    // Extract question-like patterns from content
    const questionPatterns = content.match(/(?:how|what|why|when|where|which|who)\s+[^.?!]*\?/gi) || [];
    questions.push(...questionPatterns.slice(0, 5));

    return [...new Set(questions)].slice(0, 20);
  }

  // Tokenize text for search
  private tokenize(text: string): string[] {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(token => token.length > 2)
      .filter(token => !['the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had', 'her', 'was', 'one', 'our', 'out'].includes(token));
  }

  // Generate n-grams for better search
  private generateNGrams(tokens: string[], n: number = 2): string[] {
    const nGrams: string[] = [];
    for (let i = 0; i <= tokens.length - n; i++) {
      nGrams.push(tokens.slice(i, i + n).join(' '));
    }
    return nGrams;
  }

  // Calculate popularity score
  private calculatePopularityScore(views: number, likes: number): number {
    return Math.round((views * 0.3 + likes * 10) * 100) / 100;
  }

  // Process a single blog
  private processBlog(blog: BlogDocument): ProcessedBlog {
    const content = blog.content || '';
    const wordCount = content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200); // ~200 words per minute

    const sections = this.extractSections(content);
    const entities = this.extractEntities(content, blog.title, blog.tags || []);
    const definitions = this.extractDefinitions(content);
    const codeSnippets = this.extractCodeSnippets(content);
    const statistics = this.extractStatistics(content);
    const quotes = this.extractQuotes(content);
    const questions = this.generateQuestions(blog);
    const keyPoints = this.extractKeySentences(content, 10);
    const keyConcepts = entities.filter(e => e.type === 'concept').map(e => e.name);

    const titleTokens = this.tokenize(blog.title);
    const contentTokens = this.tokenize(content);
    const allTokens = [...new Set([...titleTokens, ...contentTokens, ...this.tokenize(blog.summary || '')])];
    const nGrams = this.generateNGrams(allTokens, 2);

    return {
      id: blog._id.toString(),
      title: blog.title,
      summary: blog.summary || '',
      content: content,
      topic: blog.topic,
      topicCategory: blog.topicCategory,
      tags: blog.tags || [],
      author: {
        name: blog.authorName,
        email: blog.authorEmail
      },
      description: blog.description || '',
      engagement: {
        views: blog.views || 0,
        likes: blog.likes || 0,
        popularityScore: this.calculatePopularityScore(blog.views || 0, blog.likes || 0)
      },
      timestamps: {
        created: blog.createdAt?.toISOString() || new Date().toISOString(),
        updated: blog.updatedAt?.toISOString() || new Date().toISOString()
      },
      extraction: {
        wordCount,
        readingTimeMinutes: readingTime,
        sections,
        keyPoints,
        keyConcepts,
        entities,
        questions,
        definitions,
        codeSnippets,
        statistics,
        quotes
      },
      searchIndex: {
        titleTokens,
        contentTokens: contentTokens.slice(0, 500), // Limit for size
        allTokens: allTokens.slice(0, 1000),
        nGrams: nGrams.slice(0, 200)
      },
      relationships: {
        relatedTopics: [], // Will be filled later
        relatedCategories: [],
        semanticTags: [...new Set([...blog.tags || [], blog.topic, ...keyConcepts.slice(0, 5)])]
      }
    };
  }

  // Build relationships between blogs
  private buildRelationships(): void {
    this.log('Building relationships between blogs...');

    // Build topic and category maps
    const topicMap = new Map<string, string[]>();
    const categoryMap = new Map<string, string[]>();

    this.processedBlogs.forEach(blog => {
      // Topic mapping
      if (!topicMap.has(blog.topic)) {
        topicMap.set(blog.topic, []);
      }
      topicMap.get(blog.topic)!.push(blog.id);

      // Category mapping
      if (!categoryMap.has(blog.topicCategory)) {
        categoryMap.set(blog.topicCategory, []);
      }
      categoryMap.get(blog.topicCategory)!.push(blog.id);
    });

    // Set related topics and categories for each blog
    this.processedBlogs.forEach(blog => {
      // Related topics from same category
      const categoryBlogs = categoryMap.get(blog.topicCategory) || [];
      const relatedTopics = new Set<string>();

      categoryBlogs.forEach(blogId => {
        if (blogId !== blog.id) {
          const relatedBlog = this.processedBlogs.find(b => b.id === blogId);
          if (relatedBlog) {
            relatedTopics.add(relatedBlog.topic);
          }
        }
      });

      blog.relationships.relatedTopics = Array.from(relatedTopics).slice(0, 10);

      // Related categories based on shared concepts
      const blogConcepts = new Set(blog.extraction.keyConcepts.map(c => c.toLowerCase()));
      const relatedCategories = new Set<string>();

      this.processedBlogs.forEach(otherBlog => {
        if (otherBlog.topicCategory !== blog.topicCategory) {
          const otherConcepts = otherBlog.extraction.keyConcepts.map(c => c.toLowerCase());
          const shared = otherConcepts.filter(c => blogConcepts.has(c));
          if (shared.length >= 2) {
            relatedCategories.add(otherBlog.topicCategory);
          }
        }
      });

      blog.relationships.relatedCategories = Array.from(relatedCategories).slice(0, 5);
    });
  }

  // Build taxonomy
  private buildTaxonomy(): KnowledgeBase['taxonomy'] {
    this.log('Building taxonomy...');

    const categories: KnowledgeBase['taxonomy']['categories'] = [];
    const topicIndex: Record<string, string[]> = {};
    const tagIndex: Record<string, string[]> = {};
    const conceptIndex: Record<string, string[]> = {};

    const categoryMap = new Map<string, { topics: Set<string>; blogIds: string[] }>();

    this.processedBlogs.forEach(blog => {
      // Categories
      if (!categoryMap.has(blog.topicCategory)) {
        categoryMap.set(blog.topicCategory, { topics: new Set(), blogIds: [] });
      }
      const catData = categoryMap.get(blog.topicCategory)!;
      catData.topics.add(blog.topic);
      catData.blogIds.push(blog.id);

      // Topic index
      if (!topicIndex[blog.topic]) {
        topicIndex[blog.topic] = [];
      }
      topicIndex[blog.topic].push(blog.id);

      // Tag index
      blog.tags.forEach(tag => {
        const normalizedTag = tag.toLowerCase();
        if (!tagIndex[normalizedTag]) {
          tagIndex[normalizedTag] = [];
        }
        tagIndex[normalizedTag].push(blog.id);
      });

      // Concept index
      blog.extraction.keyConcepts.forEach(concept => {
        const normalizedConcept = concept.toLowerCase();
        if (!conceptIndex[normalizedConcept]) {
          conceptIndex[normalizedConcept] = [];
        }
        conceptIndex[normalizedConcept].push(blog.id);
      });
    });

    // Build category array
    categoryMap.forEach((data, categoryName) => {
      categories.push({
        name: categoryName,
        blogCount: data.blogIds.length,
        topics: Array.from(data.topics),
        description: `Articles covering ${Array.from(data.topics).slice(0, 3).join(', ')} and more in ${categoryName}`
      });
    });

    return {
      categories: categories.sort((a, b) => b.blogCount - a.blogCount),
      topicIndex,
      tagIndex,
      conceptIndex
    };
  }

  // Build global concepts
  private buildGlobalConcepts(): KnowledgeBase['globalConcepts'] {
    this.log('Building global concepts...');

    const conceptMap = new Map<string, { frequency: number; blogIds: Set<string> }>();

    this.processedBlogs.forEach(blog => {
      blog.extraction.entities.forEach(entity => {
        const key = entity.name.toLowerCase();
        if (!conceptMap.has(key)) {
          conceptMap.set(key, { frequency: 0, blogIds: new Set() });
        }
        const data = conceptMap.get(key)!;
        data.frequency += entity.frequency;
        data.blogIds.add(blog.id);
      });
    });

    return Array.from(conceptMap.entries())
      .map(([name, data]) => ({
        name,
        frequency: data.frequency,
        relatedBlogs: Array.from(data.blogIds),
        description: `Concept appearing in ${data.blogIds.size} blog(s)`
      }))
      .sort((a, b) => b.frequency - a.frequency)
      .slice(0, 100);
  }

  // Build searchable content
  private buildSearchableContent(): KnowledgeBase['searchableContent'] {
    this.log('Building searchable content index...');

    const allTitles: string[] = [];
    const allSummaries: string[] = [];
    const allKeyPoints: string[] = [];
    const allQuestions: string[] = [];
    let fullTextParts: string[] = [];

    this.processedBlogs.forEach(blog => {
      allTitles.push(blog.title);
      allSummaries.push(blog.summary);
      allKeyPoints.push(...blog.extraction.keyPoints);
      allQuestions.push(...blog.extraction.questions);
      fullTextParts.push(`${blog.title} ${blog.summary} ${blog.content}`);
    });

    return {
      allTitles,
      allSummaries,
      allKeyPoints: [...new Set(allKeyPoints)],
      allQuestions: [...new Set(allQuestions)],
      fullTextIndex: fullTextParts.join(' ').substring(0, 100000) // Limit size
    };
  }

  // Build Q&A knowledge pairs
  private buildQAKnowledge(): KnowledgeBase['qaKnowledge'] {
    this.log('Building Q&A knowledge pairs...');

    const qaKnowledge: KnowledgeBase['qaKnowledge'] = [];

    this.processedBlogs.forEach(blog => {
      // Create Q&A pairs from the blog
      const questions = blog.extraction.questions;
      const keyPoints = blog.extraction.keyPoints;

      // Basic topic question
      qaKnowledge.push({
        question: `What is ${blog.topic}?`,
        answer: blog.summary || keyPoints[0] || `${blog.topic} is covered in the blog "${blog.title}".`,
        sourceBlogs: [blog.id],
        confidence: 0.9
      });

      // Key points as answers
      if (keyPoints.length > 0) {
        qaKnowledge.push({
          question: `What are the key points about ${blog.topic}?`,
          answer: keyPoints.slice(0, 3).join(' '),
          sourceBlogs: [blog.id],
          confidence: 0.85
        });
      }

      // Definitions as Q&A
      Object.entries(blog.extraction.definitions).forEach(([term, definition]) => {
        qaKnowledge.push({
          question: `What is ${term}?`,
          answer: definition,
          sourceBlogs: [blog.id],
          confidence: 0.95
        });
      });
    });

    return qaKnowledge;
  }

  // Process all blogs
  async processAllBlogs(): Promise<void> {
    this.log(`Processing ${this.blogs.length} blogs...`);

    for (let i = 0; i < this.blogs.length; i++) {
      const blog = this.blogs[i];
      this.log(`Processing [${i + 1}/${this.blogs.length}]: ${blog.title.substring(0, 50)}...`);

      const processed = this.processBlog(blog);
      this.processedBlogs.push(processed);
    }

    this.buildRelationships();
    this.log(`Processed ${this.processedBlogs.length} blogs`, 'success');
  }

  // Build the complete knowledge base
  buildKnowledgeBase(): KnowledgeBase {
    this.log('Building complete knowledge base...');

    const taxonomy = this.buildTaxonomy();
    const globalConcepts = this.buildGlobalConcepts();
    const searchableContent = this.buildSearchableContent();
    const qaKnowledge = this.buildQAKnowledge();

    const totalWords = this.processedBlogs.reduce((sum, b) => sum + b.extraction.wordCount, 0);
    const avgReadingTime = this.processedBlogs.length > 0
      ? Math.round(this.processedBlogs.reduce((sum, b) => sum + b.extraction.readingTimeMinutes, 0) / this.processedBlogs.length)
      : 0;

    const kb: KnowledgeBase = {
      metadata: {
        name: 'ASI Knowledge Base',
        version: '2.0.0',
        description: 'Comprehensive knowledge base for ASI Blogger platform with full blog indexing and semantic search capabilities',
        poweredBy: 'Bhairava Kali Consciousness Technology (BKCT)',
        generatedAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
        stats: {
          totalBlogs: this.processedBlogs.length,
          totalWords,
          totalCategories: taxonomy.categories.length,
          totalTopics: Object.keys(taxonomy.topicIndex).length,
          totalConcepts: globalConcepts.length,
          avgReadingTime
        }
      },
      taxonomy,
      blogs: this.processedBlogs,
      globalConcepts,
      searchableContent,
      qaKnowledge
    };

    return kb;
  }

  // Save knowledge base to file
  saveKnowledgeBase(kb: KnowledgeBase): void {
    this.log(`Saving knowledge base to ${KB_OUTPUT_PATH}...`);

    const jsonContent = JSON.stringify(kb, null, 2);
    fs.writeFileSync(KB_OUTPUT_PATH, jsonContent, 'utf-8');

    const fileSizeMB = (Buffer.byteLength(jsonContent, 'utf-8') / (1024 * 1024)).toFixed(2);
    this.log(`Knowledge base saved (${fileSizeMB} MB)`, 'success');
  }

  // Main execution
  async run(): Promise<void> {
    console.log('');
    console.log('==============================================');
    console.log('   ASI Knowledge Base Update');
    console.log('   Powered by BKCT');
    console.log('==============================================');
    console.log('');

    try {
      await this.connect();
      await this.fetchBlogs();

      if (this.blogs.length === 0) {
        this.log('No blogs found in database', 'warning');
        return;
      }

      await this.processAllBlogs();
      const kb = this.buildKnowledgeBase();
      this.saveKnowledgeBase(kb);

      // Print summary
      console.log('');
      console.log('==============================================');
      console.log('   Knowledge Base Summary');
      console.log('==============================================');
      console.log('');
      console.log(`  Total Blogs: ${kb.metadata.stats.totalBlogs}`);
      console.log(`  Total Words: ${kb.metadata.stats.totalWords.toLocaleString()}`);
      console.log(`  Total Categories: ${kb.metadata.stats.totalCategories}`);
      console.log(`  Total Topics: ${kb.metadata.stats.totalTopics}`);
      console.log(`  Total Concepts: ${kb.metadata.stats.totalConcepts}`);
      console.log(`  Avg Reading Time: ${kb.metadata.stats.avgReadingTime} minutes`);
      console.log(`  Q&A Pairs: ${kb.qaKnowledge.length}`);
      console.log('');

      this.log('Knowledge base update complete!', 'success');

    } catch (error) {
      this.log(`Failed to update knowledge base: ${error}`, 'error');
      throw error;
    } finally {
      await this.disconnect();
    }
  }
}

// Run the script
const builder = new KnowledgeBaseBuilder();
builder.run().catch((error) => {
  console.error('Script failed:', error);
  process.exit(1);
});
