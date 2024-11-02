'use client'
import React from 'react';
import { Header, Hero } from '../components/HeaderHero';
import { Services, Process } from '../components/ServicesProcess';
import { UpcomingProjects, Pricing } from '../components/UpcomingPricing';
import { Footer } from '../components/ContactFooter';
import QuickContactForm from '../components/QuickContactForm';

const App = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main>
        <Hero />
        <Services />
        <Process />
        <UpcomingProjects />
        <Pricing />
        <section className="py-32 relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(99,102,241,0.1),transparent_50%)]" />
          <div className="container mx-auto px-6 text-center relative">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to Transform Your Ideas?</h2>
              <p className="text-gray-400 text-lg mb-12 leading-relaxed">
                Let's collaborate to build something extraordinary together. Our team of experts is ready to help you navigate the complexities of modern technology and create solutions that drive real business value.
              </p>
              <QuickContactForm 
                className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-full px-8 py-6 text-lg"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,_rgba(99,102,241,0.1),transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_100%,_rgba(99,102,241,0.1),transparent_50%)]" />
      </div>
    </div>
  );
};

export default App;