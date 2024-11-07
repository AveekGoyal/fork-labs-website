import React from 'react';
import { Twitter, Linkedin, Github, MessageCircle } from 'lucide-react';

interface SocialLink {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks: SocialLink[] = [
    {
      href: 'https://twitter.com/forklabs',
      icon: <Twitter className="w-5 h-5" />,
      label: 'Twitter'
    },
    {
      href: 'https://linkedin.com/company/forklabs',
      icon: <Linkedin className="w-5 h-5" />,
      label: 'LinkedIn'
    },
    {
      href: 'https://github.com/forklabs',
      icon: <Github className="w-5 h-5" />,
      label: 'GitHub'
    }
  ];
  
  return (
    <footer className="py-12 border-t border-gray-800/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-center space-y-8">
          {/* Logo */}
          <div className="text-2xl font-bold bg-gradient-to-r from-violet-500 to-indigo-600 bg-clip-text text-transparent">
            ForkLabs
          </div>
          
          {/* Social Links
          <div className="flex items-center space-x-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-gray-400 hover:text-violet-400 transition-colors"
                aria-label={link.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.icon}
              </a>
            ))}
          </div>
           */}
          {/* Copyright */}
          <div className="text-sm text-gray-500">
            &copy; {currentYear} ForkLabs. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };