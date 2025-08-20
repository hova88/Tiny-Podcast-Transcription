import { NextResponse } from 'next/server';
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions';
import { logger } from '@/lib/utils';
import { localAI } from '@/lib/localAI';

export async function POST(request: Request) {
  try {
    logger.info('[Summarize] Starting summarization request');
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      logger.warn('[Summarize] Invalid messages format');
      return NextResponse.json(
        { error: 'Invalid messages format' },
        { status: 400 }
      );
    }

    const systemMessage: ChatCompletionMessageParam = {
      role: "system",
      content: `You are a professional content summarizer. Create a well-structured summary following this format:

📝 OVERVIEW
[2-3 sentences overview]

🎯 KEY POINTS
• [Point 1]
• [Point 2]
• [Point 3]

💡 INSIGHTS
[2-3 main insights]

🗣️ QUOTES
[1-2 significant quotes]

🔍 CONTEXT
[Important background info]

Format with:
• Section headers with emojis
• Bullet points
• Proper spacing
• Concise but informative
• Quote marks for quotes`
    };

    const allMessages = [systemMessage, ...messages];
    logger.info('[Summarize] Sending request to local AI model');

    const summary = await localAI.createChatCompletion(allMessages, {
      temperature: 0.7,
      max_tokens: 1000,
    });

    logger.info('[Summarize] Received response from local AI model');

    if (!summary) {
      logger.error('[Summarize] No summary generated');
      throw new Error('No summary generated');
    }

    logger.info('[Summarize] Successfully generated summary');
    return NextResponse.json({ summary });
  } catch (error) {
    logger.error('[Summarize] Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate summary' },
      { status: 500 }
    );
  }
}
