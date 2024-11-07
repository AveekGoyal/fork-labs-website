import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const data = await req.json();
    console.log('Received project inquiry data:', data);

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Convert markdown headers and lists to HTML
    const markdownToHtml = (text) => {
      return text
        .replace(/^# (.*$)/gm, '<h1 style="color: #6366f1; font-size: 24px; margin: 20px 0;">$1</h1>')
        .replace(/^## (.*$)/gm, '<h2 style="color: #4f46e5; font-size: 20px; margin: 16px 0;">$1</h2>')
        .replace(/^\* (.*$)/gm, '<li style="margin: 8px 0;">$1</li>')
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br>')
        .replace(/^/, '<p>')
        .replace(/$/, '</p>');
    };

    // Format the HTML version of the email
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
        <div style="background: linear-gradient(to right, #6366f1, #4f46e5); padding: 2px;"></div>
        ${markdownToHtml(data.message)}
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 14px; color: #6b7280;">
          <p>Sent via ForkLabs Project Inquiry System</p>
        </div>
      </div>
    `;

    // Prepare email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'fork.labs.devs@gmail.com',
      subject: `New Project Inquiry from ${data.name}`,
      text: data.message,
      html: htmlContent,
    };

    console.log('Attempting to send email notification:', {
      to: mailOptions.to,
      subject: mailOptions.subject
    });

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in email route:', error);
    return NextResponse.json(
      { error: 'Failed to send email: ' + error.message },
      { status: 500 }
    );
  }
}