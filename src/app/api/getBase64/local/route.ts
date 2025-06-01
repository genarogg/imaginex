import { NextRequest, NextResponse } from 'next/server';
import fs from 'node:fs/promises';
import { getPlaiceholder } from 'plaiceholder';

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const filePath = searchParams.get('filePath');

  if (!filePath) {
    return NextResponse.json({ error: 'File path is required' }, { status: 400 });
  }

  try {
    const file = await fs.readFile(filePath);
    const { base64 } = await getPlaiceholder(file);

    return NextResponse.json({ data: base64 }, { status: 200 });

  } catch (err) {
    return NextResponse.json({ error: 'Failed to read image' }, { status: 500 });
  }
};