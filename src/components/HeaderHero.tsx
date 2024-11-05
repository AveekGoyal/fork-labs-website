import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import AIChat from '../components/AIChat';


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
          <div className="text-2xl font-bold bg-gradient-to-r from-violet-500 to-indigo-600 bg-clip-text text-transparent">
            ForkLabs
          </div>
          
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

          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-lg mt-2 py-6 px-6">
            <div className="flex flex-col space-y-6">
              <a href="#services" className="text-gray-300 hover:text-white transition-colors">Services</a>
              <a href="#process" className="text-gray-300 hover:text-white transition-colors">Process</a>
              <a href="#upcoming" className="text-gray-300 hover:text-white transition-colors">Upcoming Projects</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
              <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-full">
              <AIChat 
              className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-full px-8 py-6 text-lg hover:opacity-90 transition-opacity"
              />
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};


const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center pt-20 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(99,102,241,0.2),transparent_60%)]" />
      <div className="container mx-auto px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6 px-8 py-2 bg-gray-900/50 rounded-full backdrop-blur-sm">
            <span className="text-sm text-gray-400">Transforming Ideas into Digital Reality</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            Building <span className="bg-gradient-to-r from-violet-500 to-indigo-600 bg-clip-text text-transparent">Next-Gen Solutions</span> for Forward-Thinking Businesses
          </h1>
          <p className="text-xl text-gray-400 mb-10 leading-relaxed max-w-3xl mx-auto">
            We're a team of expert developers specializing in AI-powered solutions, blockchain applications, and cutting-edge web platforms. Our mission is to help businesses leverage emerging technologies to stay ahead in the digital age.
          </p>
          
          {/* Centered Connect with us button */}
          <div className="flex justify-center mb-12">
            <AIChat 
              className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-full px-8 py-6 text-lg hover:opacity-90 transition-opacity"
            />
          </div>
          
          {/* Values section with reduced spacing */}
          <div className="border-t border-gray-800/50 pt-12">
            <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-violet-400 mb-2">Innovation</div>
                <div className="text-gray-400">Cutting-edge Technologies</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-violet-400 mb-2">Dedication</div>
                <div className="text-gray-400">Committed to Excellence</div>
              </div>
              <div className="text-center">
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