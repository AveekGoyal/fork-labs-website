// UpcomingPricing.tsx
import React, { useRef, useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import AIChat from '../components/AIChat';

// InView hook with state management
const useInView = (ref: React.RefObject<HTMLElement>) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);

  return isVisible;
};

const UpcomingProjects = () => {
  const upcomingRef = useRef<HTMLDivElement>(null);
  const isVisible = useInView(upcomingRef);

  return (
    <section id="upcoming" className="py-24 relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(99,102,241,0.1),transparent_50%)]
                     animate-pulse-slow" />
      
      <div className="container mx-auto px-6 relative">
        <div className="max-w-3xl mx-auto text-center mb-16">
          {/* Badge with animation */}
          <div className={`flex justify-center mb-4 transition-all duration-1000 transform
                          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
            <div className="inline-block px-4 py-1 bg-violet-500/10 rounded-full text-violet-400
                          transform transition-all duration-300 hover:scale-110 hover:bg-violet-500/20">
              Coming Soon
            </div>
          </div>
          
          <h2 className={`text-4xl font-bold mb-4 text-center transition-all duration-1000 transform
                         ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
               style={{ transitionDelay: '200ms' }}>
            Upcoming Projects
          </h2>
          
          <p className={`text-gray-400 text-lg leading-relaxed transition-all duration-1000 transform
                        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
             style={{ transitionDelay: '400ms' }}>
            Stay tuned for our exciting upcoming projects. We're constantly working on innovative solutions 
            to help businesses leverage cutting-edge technology.
          </p>
        </div>

        {/* Empty state with animations */}
        <div 
          ref={upcomingRef}
          className={`text-center py-16 bg-black/20 rounded-2xl backdrop-blur-sm
                     transform transition-all duration-1000 hover:bg-black/30
                     ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{ transitionDelay: '600ms' }}
        >
          <div className="relative">
            {/* Pulsing circle background */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-violet-500/5 rounded-full animate-pulse-slow" />
            </div>
            
            <p className="text-gray-400 relative z-10 transform transition-all duration-300
                         hover:scale-105 hover:text-gray-300">
              New projects coming soon. Check back later for updates.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Pricing = () => {
  const pricingRef = useRef<HTMLDivElement>(null);
  const isVisible = useInView(pricingRef);

  const plans = [
    {
      title: "Base MVP",
      price: "2,000",
      description: "Perfect for startups and small businesses looking to establish their digital presence.",
      features: [
        "Custom Web Application",
        "Basic AI Integration",
        "Basic Web3 Integration",
        "1 Month Support",
        "Weekly Progress Updates",
        "Code Repository Access",
        "Technical Documentation",
        "Performance Monitoring"
      ]
    },
    {
      title: "Growth",
      price: "3,000",
      description: "Ideal for growing companies requiring advanced features and integrations.",
      features: [
        "Everything in MVP",
        "Advanced Web Application",
        "Custom AI Integration",
        "Custom Web3 Integration",
        "2 Months Support",
        "Comprehensive Documentation",
        "24/7 Priority Support",
        "Performance Optimization",
      ],
      isPopular: true
    },
    {
      title: "Enterprise",
      price: "Custom",
      description: "Tailored solutions for enterprises with complex requirements.",
      features: [
        "Everything in Standard",
        "Full-Scale Custom Solution",
        "Enterprise AI and Blockchain Systems",
        "Priority feature development",
        "3 Months Premium Support",
        "White Label Options",
        "24/7 VIP Support",
        "Dedicated Team"
      ]
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-gray-900/50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-violet-500/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-indigo-500/5 rounded-full blur-3xl animate-pulse-slow"
             style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-6 relative">
        <div className={`max-w-3xl mx-auto text-center mb-16 transition-all duration-1000 transform
                        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl font-bold mb-4 text-center">Transparent Pricing</h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Choose the perfect plan for your project needs. Our pricing is transparent and flexible, 
            designed to provide maximum value for your investment.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto" ref={pricingRef}>
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative p-8 rounded-2xl backdrop-blur-sm
                         transform transition-all duration-1000
                         hover:translate-y-[-8px]
                         ${plan.isPopular ? 
                           'bg-black/30 ring-2 ring-violet-500 scale-105' : 
                           'bg-black/20 hover:bg-black/30'
                         }
                         ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ 
                transitionDelay: `${index * 200}ms`
              }}
            >
              {/* Popular badge with animation */}
              {plan.isPopular && (
            <div className="absolute -top-4 inset-x-0 mx-auto w-fit px-4 py-1 
                            bg-violet-500 rounded-full text-sm animate-pulse-slow">
              Most Popular
            </div>
            )}
              
              {/* Plan content */}
              <div className="flex flex-col h-full">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2 transition-colors duration-300
                               hover:text-violet-400">
                    {plan.title}
                  </h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    {plan.price !== 'Custom' && 
                      <span className="text-gray-400">/project</span>
                    }
                  </div>
                  <p className="text-gray-400 leading-relaxed">
                    {plan.description}
                  </p>
                </div>
                
                {/* Features list with stagger animation */}
                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li 
                      key={i}
                      className="flex items-center text-gray-400 transform transition-all duration-300
                               hover:translate-x-2 group"
                      style={{ transitionDelay: `${i * 50}ms` }}
                    >
                      <Check className="w-5 h-5 text-violet-500 mr-3 flex-shrink-0 
                                      transition-transform duration-300 group-hover:scale-110" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <AIChat 
                  triggerText="Get Started"
                  className={`w-full rounded-full py-6 transition-all duration-500
                             ${plan.isPopular ? 
                               'bg-gradient-to-r from-violet-600 to-indigo-600 animate-gradient' : 
                               'bg-gray-800 hover:bg-gray-700'
                             }`}
                />
              </div>

              {/* Decorative bottom border */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r 
                             from-violet-500/20 to-indigo-500/20 rounded-b-2xl
                             transform origin-left transition-transform duration-500
                             scale-x-0 group-hover:scale-x-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { UpcomingProjects, Pricing };