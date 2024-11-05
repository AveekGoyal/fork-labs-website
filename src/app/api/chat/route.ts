// app/api/chat/route.ts
import { NextResponse } from 'next/server';
import { Message } from 'ai';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});
const SYSTEM_PROMPT = `You are an AI assistant for ForkLabs, a technology consulting company specializing in AI Solutions, Blockchain Development, and Web Applications. Your first message should be:

"# Welcome to ForkLabs! 👋

I'm here to learn about your project. Could you tell me your name?

*Once we gather some basic information, you can click the Submit button to schedule a call with our team.*"

Follow these guidelines:

1. Keep responses concise and well-formatted using Markdown
2. Use appropriate line spacing between sections
3. Collect information in this order:
   - Name
   - Email (for follow-up only)
   - Project type (AI, Blockchain, Web, or Custom)
   - Brief project requirements

4. Ask focused questions for each project type:
   - AI: Data availability, specific AI needs
   - Blockchain: Smart contract needs, blockchain type
   - Web: Core features, tech preferences
   - Custom: Key requirements

5. After each response, add:

"---
*Click the Submit button when you're ready to schedule a call with our team.*"

Always maintain a professional yet friendly tone, and keep responses clear and concise.`;


export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

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
    return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}