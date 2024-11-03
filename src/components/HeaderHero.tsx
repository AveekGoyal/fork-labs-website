// HeaderHero.tsx
import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import QuickContactForm from './QuickContactForm';

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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-black/90 backdrop-blur-lg py-4' : 'bg-transparent py-6'
    }`}>
      <nav className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-violet-500 to-indigo-600 bg-clip-text text-transparent
                          animate-fadeIn hover-scale">
            ForkLabs
          </div>
          
          <div className="hidden md:flex items-center space-x-12">
            {['Services', 'Process', 'Upcoming Projects', 'Pricing'].map((item, index) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="text-sm text-gray-300 hover:text-white transition-all duration-300 hover-lift
                          animate-fadeIn"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {item}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4 animate-fadeIn" style={{ animationDelay: '400ms' }}>
            <QuickContactForm 
              className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-full px-4 py-4 
                        hover:opacity-90 transition-all duration-300 hover-lift"
            />
          </div>

          <button 
            className="md:hidden text-white transition-transform duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu with Animation */}
        <div className={`md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-lg mt-2 py-6 px-6
                        transition-all duration-300 transform ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
          <div className="flex flex-col space-y-6">
            {['Services', 'Process', 'Upcoming Projects', 'Pricing'].map((item, index) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="text-gray-300 hover:text-white transition-colors duration-300
                          transform hover:translate-x-2"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {item}
              </a>
            ))}
            <QuickContactForm 
              className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-full"
            />
          </div>
        </div>
      </nav>
    </header>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center pt-20 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(99,102,241,0.2),transparent_60%)]
                      animate-pulse-slow" />
      <div className="container mx-auto px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6 px-8 py-2 bg-gray-900/50 rounded-full backdrop-blur-sm
                         animate-slideDown">
            <span className="text-sm text-gray-400">Transforming Ideas into Digital Reality</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight animate-slideUp delay-200">
            Building <span className="bg-gradient-to-r from-violet-500 to-indigo-600 bg-clip-text text-transparent
                                   animate-gradient">Next-Gen Solutions</span> for Forward-Thinking Businesses
          </h1>
          
          <p className="text-xl text-gray-400 mb-10 leading-relaxed max-w-3xl mx-auto
                       animate-slideUp delay-300">
            We're a team of expert developers specializing in AI-powered solutions, blockchain applications,
            and cutting-edge web platforms. Our mission is to help businesses leverage emerging technologies
            to stay ahead in the digital age.
          </p>
          
          <div className="flex justify-center mb-12 animate-slideUp delay-400">
            <QuickContactForm 
              className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-full px-8 py-6 text-lg
                         hover:opacity-90 transition-all duration-300 hover-lift"
            />
          </div>
          
          <div className="border-t border-gray-800/50 pt-12 animate-fadeIn delay-500">
            <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              {['Innovation', 'Dedication', 'Support'].map((value, index) => (
                <div key={value} className="text-center transform hover-scale transition-all duration-300"
                     style={{ animationDelay: `${600 + index * 100}ms` }}>
                  <div className="text-2xl font-bold text-violet-400 mb-2">{value}</div>
                  <div className="text-gray-400">
                    {index === 0 && 'Cutting-edge Technologies'}
                    {index === 1 && 'Committed to Excellence'}
                    {index === 2 && 'Always Here to Help'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Header, Hero };