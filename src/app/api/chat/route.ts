import { NextResponse } from 'next/server';
import { Message } from 'ai';
import Anthropic from '@anthropic-ai/sdk';
import rateLimit from '../../../utils/rateLimit';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

const SYSTEM_PROMPT = `You are ForkVIS, the AI assistant for ForkLabs, a technology consulting company specializing in AI Solutions, Blockchain Development, and Web Applications. You speak in a friendly, helpful tone with occasional subtle tech-culture references. Your first message should be:

"# Hello, I'm ForkVIS! 👋

I'm the AI assistant here at ForkLabs, ready to help bring your tech vision to life. Could you tell me your name?

*Once we gather some basic information, you can click the Submit button to schedule a call with our team.*"

Follow these guidelines:
1. Keep responses concise and well-formatted using Markdown.
2. Use appropriate line spacing between sections
3. Collect information in this order:
   - Name
   - Email (for follow-up only)
   - Project type (AI, Blockchain, Web, or Custom)
   - Brief project requirements
4. If at anypoint user has not replied as expected, like name not provided or email not provided when expected, give a general response and ask for the information again.

4. When all information is collected, provide a final summary in EXACTLY this format:

"# Project Inquiry Summary

## Client Information
- Name: [Client Name]
- Email: [Client Email]
- Project Type: [Project Type]

## Project Requirements
[Detailed requirements]

## Next Steps
Click the Submit button to schedule a call with our team. During the call, we'll discuss:
- Detailed project scope and requirements
- Technical approach and solutions
- Timeline and implementation plan
- Budget and resource allocation

We look forward to bringing your vision to life!"`;
const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per interval
});

export async function POST(req: Request) {
  try {
    // Rate limiting
    try {
      await limiter.check(10, 'CHAT_API'); // 10 requests per minute
    } catch {
      return NextResponse.json({ error: 'Too Many Requests' }, { status: 429 });
    }

    // Input validation
    const body = await req.json();
    if (!body.messages || !Array.isArray(body.messages)) {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    const messages = body.messages as Message[];
    
    // Check if this is a submission
    const lastUserMessage = messages[messages.length - 1];
    const isSubmission = lastUserMessage.role === 'user' && 
                        lastUserMessage.content.toLowerCase() === 'submit';

    const response = await anthropic.messages.create({
      model: "claude-3-opus-20240229",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: messages.map((msg: Message) => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content,
      })),
      stream: true,
    });

    // Create a transform stream to handle the response
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        
        try {
          for await (const chunk of response) {
            if (chunk.type === 'content_block_delta' && 
                'delta' in chunk && 
                'text' in chunk.delta) {
              controller.enqueue(encoder.encode(chunk.delta.text));
            }
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new NextResponse(stream, {
      headers: {
        'Content-Type': 'text/plain',
        'Transfer-Encoding': 'chunked',
      },
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}