import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Item } from '@/lib/types';

export async function GET() {
  try {
    const filePath = join(process.cwd(), 'data', 'items.json');
    const fileContents = readFileSync(filePath, 'utf8');
    const items: Item[] = JSON.parse(fileContents);
    
    return NextResponse.json(items);
  } catch (error) {
    console.error('Error reading items:', error);
    return NextResponse.json({ error: 'Failed to load items' }, { status: 500 });
  }
}