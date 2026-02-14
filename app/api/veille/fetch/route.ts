import { NextResponse } from 'next/server';
import { getSupabaseServiceClient } from '@/lib/supabase-server';

function parseRss(xml: string) {
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  const titleRegex = /<title><!\[CDATA\[(.*?)\]\]><\/title>|<title>(.*?)<\/title>/;
  const linkRegex = /<link>(.*?)<\/link>/;
  const dateRegex = /<pubDate>(.*?)<\/pubDate>/;

  const items: { title: string; url: string; published_at: string }[] = [];
  let match: RegExpExecArray | null;

  while ((match = itemRegex.exec(xml)) && items.length < 20) {
    const block = match[1];
    const titleMatch = block.match(titleRegex);
    const linkMatch = block.match(linkRegex);
    const dateMatch = block.match(dateRegex);
    const title = (titleMatch?.[1] || titleMatch?.[2] || '').trim();
    const url = (linkMatch?.[1] || '').trim();
    const published_at = new Date(dateMatch?.[1] || Date.now()).toISOString();
    if (title && url) items.push({ title, url, published_at });
  }

  return items;
}

export async function GET() {
  const supabase = getSupabaseServiceClient();
  if (!supabase) return NextResponse.json({ ok: false, message: 'SUPABASE_SERVICE_ROLE_KEY manquante.' }, { status: 500 });

  const { data: sources, error: srcError } = await supabase.from('news_sources').select('id,name,rss_url,tags_json').eq('enabled', true);
  if (srcError) return NextResponse.json({ ok: false, message: srcError.message }, { status: 500 });

  let inserted = 0;

  for (const source of sources ?? []) {
    try {
      const response = await fetch(source.rss_url, { next: { revalidate: 0 } });
      const xml = await response.text();
      const parsed = parseRss(xml);

      for (const item of parsed) {
        const { error } = await supabase.from('news_items').upsert({
          source_id: source.id,
          title: item.title,
          url: item.url,
          published_at: item.published_at,
          tags_json: source.tags_json ?? [],
          summary: null,
          status: 'draft'
        }, { onConflict: 'url' });

        if (!error) inserted += 1;
      }
    } catch {
      continue;
    }
  }

  return NextResponse.json({ ok: true, inserted });
}
