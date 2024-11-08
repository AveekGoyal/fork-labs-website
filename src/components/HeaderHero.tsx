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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-black/90 backdrop-blur-lg py-4' : 'bg-transparent py-6'
    }`}>
      <nav className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo - mobile optimization only */}
          <div className="text-2xl font-bold bg-gradient-to-r from-violet-500 to-indigo-600 bg-clip-text text-transparent 
                        max-w-[150px] sm:max-w-none overflow-hidden text-ellipsis whitespace-nowrap">
            ForkLabs
          </div>
          
          {/* Desktop navigation remains unchanged */}
          <div className="hidden md:flex items-center space-x-12">
            <a href="#services" className="text-sm text-gray-300 hover:text-white transition-colors">Services</a>
            <a href="#process" className="text-sm text-gray-300 hover:text-white transition-colors">Process</a>
            <a href="#upcoming" className="text-sm text-gray-300 hover:text-white transition-colors">Upcoming Projects</a>
            <a href="#pricing" className="text-sm text-gray-300 hover:text-white transition-colors">Pricing</a>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <AIChat 
              className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-full px-4 py-4 text-g hover:opacity-90 transition-opacity"
            />
          </div>

          {/* Mobile menu button with improved touch target */}
          <button 
            className="md:hidden w-12 h-12 flex items-center justify-center text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile-only menu with improved spacing */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-lg mt-2">
            <div className="flex flex-col space-y-4 p-6">
              <a href="#services" className="text-gray-300 hover:text-white transition-colors py-2">Services</a>
              <a href="#process" className="text-gray-300 hover:text-white transition-colors py-2">Process</a>
              <a href="#upcoming" className="text-gray-300 hover:text-white transition-colors py-2">Upcoming Projects</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition-colors py-2">Pricing</a>
              
            </div>
          </div>
        )}
      </nav>
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