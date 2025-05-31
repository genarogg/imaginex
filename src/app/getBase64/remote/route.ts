import { NextRequest, NextResponse } from 'next/server';
import { getPlaiceholder } from 'plaiceholder';

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  try {
    const buffer = await fetch(url).then(async (response) =>
      Buffer.from(await response.arrayBuffer())
    );

    const { base64 } = await getPlaiceholder(buffer);

    return NextResponse.json({ data: base64 }, { status: 200 });

  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch image' }, { status: 500 });
  }
};