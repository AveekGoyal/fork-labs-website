import React from 'react';
import { Twitter, Linkedin, Github, MessageCircle } from 'lucide-react';

interface SocialLink {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="py-12 border-t border-gray-800/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-center space-y-8">
          <div className="text-2xl font-bold bg-gradient-to-r from-violet-500 to-indigo-600 bg-clip-text text-transparent">
            ForkLabs
          </div>
          <div className="text-sm text-gray-500">
            &copy; {currentYear} ForkLabs. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };