import { NextRequest, NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';

// GET - Fetch the knowledge base from the generated JSON file
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const forceRefresh = searchParams.get('refresh') === 'true';

    const kbPath = path.join(process.cwd(), 'src', 'data', 'asi_kb.json');

    if (!fs.existsSync(kbPath)) {
      return NextResponse.json(
        { error: 'Knowledge base not found. Please run: npm run update-kb' },
        { status: 404 }
      );
    }

    const kbContent = fs.readFileSync(kbPath, 'utf-8');
    const kb = JSON.parse(kbContent);

    return NextResponse.json(kb, {
      headers: {
        'Cache-Control': forceRefresh ? 'no-cache' : 'public, max-age=300, stale-while-revalidate=600',
      }
    });
  } catch (error) {
    console.error('Error fetching knowledge base:', error);
    return NextResponse.json(
      { error: 'Failed to fetch knowledge base' },
      { status: 500 }
    );
  }
}
