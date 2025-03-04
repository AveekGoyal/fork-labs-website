# Fork Labs Website

This is the official website for Fork Labs, built with [Next.js](https://nextjs.org) and modern web technologies.

## Project Overview

Fork Labs website is a modern, responsive web application that showcases the company's products, services, and vision. The site is built with performance, accessibility, and user experience as top priorities.

## Features

- Modern, responsive design
- Server-side rendering for optimal performance
- AI-powered features using Anthropic's Claude API
- Contact form with email notifications
- Markdown rendering with syntax highlighting
- Optimized for SEO and accessibility

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
- **AI Integration**: [Anthropic Claude](https://www.anthropic.com/)
- **Email**: [Nodemailer](https://nodemailer.com/)
- **Markdown**: [Marked](https://marked.js.org/)

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/fork-labs-website.git
   cd fork-labs-website
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:
   ```
   ANTHROPIC_API_KEY=your_anthropic_api_key
   EMAIL_USER=your_email_username
   EMAIL_PASS=your_email_password
   EMAIL_TO=recipient_email
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `src/app/` - Next.js app router pages and layouts
- `src/components/` - Reusable UI components
- `src/hooks/` - Custom React hooks
- `src/lib/` - Utility libraries and configurations
- `src/utils/` - Helper functions and utilities

## Deployment

The project is configured for easy deployment on [Vercel](https://vercel.com), the platform from the creators of Next.js.

```bash
npm run build
# or
yarn build
```

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
