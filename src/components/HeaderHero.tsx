import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import AIChat from '../components/AIChat';
import TypeWriter from './TypeWriter';


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
  className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 w-full`} 
  style={{ 
    minWidth: '320px',
    width: '100%',
    contain: 'layout size',
    willChange: 'background-color, padding',
    padding: scrolled ? '16px 0' : '24px 0'  // Replace py-4 and py-6 with fixed values
  }}
>

      {/* Fixed width container to prevent shifting */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        <nav className="relative flex items-center justify-between">
          {/* Logo - Fixed width to prevent shifting */}
          <div className="flex-shrink-0 w-32 sm:w-auto">
            <div className="text-2xl font-bold bg-gradient-to-r from-violet-500 to-indigo-600 bg-clip-text text-transparent truncate">
              ForkLabs
            </div>
          </div>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-sm text-gray-300 hover:text-white transition-colors">Services</a>
            <a href="#process" className="text-sm text-gray-300 hover:text-white transition-colors">Process</a>
            <a href="#upcoming" className="text-sm text-gray-300 hover:text-white transition-colors">Upcoming</a>
            <a href="#pricing" className="text-sm text-gray-300 hover:text-white transition-colors">Pricing</a>
          </div>

          {/* Desktop AIChat - Hidden on mobile */}
          <div className="hidden md:block flex-shrink-0">
            <AIChat 
              className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-full px-6 py-2 text-sm hover:opacity-90 transition-opacity"
            />
          </div>

          {/* Mobile Menu Button - Fixed position and size */}
          <div className="flex md:hidden items-center">
            <button 
              className="flex-shrink-0 w-12 h-12 flex items-center justify-center text-white hover:text-violet-400 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu - Fixed positioning */}
        {isMenuOpen && (
          <div className="absolute left-0 right-0 top-full mt-2 bg-slate-950/90 backdrop-blur-md border-t border-slate-800/50 rounded-b-xl">
            <div className="py-2 px-4">
              <a href="#services" className="block w-full py-3 text-gray-300 hover:text-white transition-colors">Services</a>
              <a href="#process" className="block w-full py-3 text-gray-300 hover:text-white transition-colors">Process</a>
              <a href="#upcoming" className="block w-full py-3 text-gray-300 hover:text-white transition-colors">Upcoming</a>
              <a href="#pricing" className="block w-full py-3 text-gray-300 hover:text-white transition-colors">Pricing</a>
              

            </div>
          </div>
        )}
      </div>
    </header>
  );
};

const Hero = () => {
  const typingWords = ['Vision', 'Innovation', 'Future'];

  return (
    <section className="relative min-h-[80vh] flex items-center pt-20 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(99,102,241,0.2),transparent_60%)]" />
      <div className="container mx-auto px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Mobile-optimized spacing for badge */}
          <div className="inline-block mb-6 px-4 sm:px-8 py-2 bg-gray-900/50 rounded-full backdrop-blur-sm">
            <span className="text-xs sm:text-sm text-gray-400">Your <TypeWriter words={typingWords} />. Our Expertise.</span>
          </div>

          {/* Mobile-optimized heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 leading-tight px-4 sm:px-0">
            Got a Big Idea?{'\n'}
            <span className="bg-gradient-to-r from-violet-500 to-indigo-600 bg-clip-text text-transparent">
              Let's make it real together
            </span>
          </h1>

          {/* Mobile-optimized paragraph */}
          <p className="text-base sm:text-lg text-gray-400 mb-10 leading-relaxed max-w-3xl mx-auto px-4 sm:px-0">
            Every great innovation starts with a conversation. We're a team of tech enthusiasts who love turning ambitious ideas into reality – whether that's through AI that thinks ahead, blockchain that builds trust, or web platforms that wow your users.
          </p>

          {/* Mobile-optimized CTA button */}
          <div className="flex justify-center mb-12 px-4 sm:px-0">
            <AIChat 
              className="w-full sm:w-auto bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-full px-8 py-6 text-lg hover:opacity-90 transition-opacity"
            />
          </div>
          
          {/* Mobile-optimized grid */}
          <div className="border-t border-gray-800/50 pt-8 pb-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto px-4 sm:px-0">
              <div className="text-center py-4 sm:py-0">
                <div className="text-2xl font-bold text-violet-400 mb-2">Innovation</div>
                <div className="text-gray-400">Cutting-edge Technologies</div>
              </div>
              <div className="text-center py-4 sm:py-0">
                <div className="text-2xl font-bold text-violet-400 mb-2">Dedication</div>
                <div className="text-gray-400">Committed to Excellence</div>
              </div>
              <div className="text-center py-4 sm:py-0">
                <div className="text-2xl font-bold text-violet-400 mb-2">Support</div>
                <div className="text-gray-400">Always Here to Help</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export { Header, Hero };