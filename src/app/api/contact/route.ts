import { NextResponse } from 'next/server';
import { z } from 'zod';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(7).max(30),
  message: z.string().trim().max(1000).optional().default(''),
});

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed' }, { status: 422 });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.error('Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID env vars.');
    return NextResponse.json({ error: 'Server not configured' }, { status: 500 });
  }

  const { name, phone, message } = parsed.data;
  const text = [
    '🚀 <b>New portfolio message</b>',
    '',
    `👤 <b>Name:</b> ${escapeHtml(name)}`,
    `📞 <b>Phone:</b> ${escapeHtml(phone)}`,
    message ? `💬 <b>Message:</b>\n${escapeHtml(message)}` : '💬 <i>No message</i>',
  ].join('\n');

  try {
    const tgRes = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: 'HTML',
          disable_web_page_preview: true,
        }),
      },
    );

    if (!tgRes.ok) {
      console.error('Telegram API error:', await tgRes.text());
      return NextResponse.json({ error: 'Delivery failed' }, { status: 502 });
    }
  } catch (error) {
    console.error('Telegram request failed:', error);
    return NextResponse.json({ error: 'Delivery failed' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
