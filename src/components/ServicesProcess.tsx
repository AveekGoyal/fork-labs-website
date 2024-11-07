import React, { useEffect, useRef, useState } from 'react';
import { Brain, Lock, Globe, ChevronRight } from 'lucide-react';

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

const Services = () => {
  const servicesRef = useRef<HTMLDivElement>(null);
  const isVisible = useInView(servicesRef);
  const services = [
    {
      icon: <Brain className="w-12 h-12 text-violet-400" />,
      title: "AI Solutions",
      description: "Enhance your applications with powerful AI capabilities. We integrate cutting-edge AI technologies to make your applications smarter, more efficient, and capable of delivering exceptional user experiences.",
      features: [
        "AI-Powered Features",
        "Smart Automation",
        "Intelligent Analytics",
        "Enhanced User Experience"
      ]
    },
    {
      icon: <Lock className="w-12 h-12 text-violet-400" />,
      title: "Blockchain Development",
      description: "Build secure, transparent, and decentralized applications using cutting-edge blockchain technology. We specialize in smart contracts, DeFi solutions, and enterprise blockchain implementations.",
      features: [
        "Smart Contracts",
        "DeFi Applications",
        "NFT Platforms",
        "Private Blockchains"
      ]
    },
    {
      icon: <Globe className="w-12 h-12 text-violet-400" />,
      title: "Web Applications",
      description: "Create powerful, scalable, and user-friendly web applications that drive business growth. Our web solutions are built with modern technologies and follow best practices for performance and security.",
      features: [
        "Full-Stack Development",
        "Cloud Architecture",
        "API Development",
        "Real-time Systems"
      ]
    }
  ];

  return (
    <section id="services" className="py-16 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,_rgba(99,102,241,0.1),transparent_50%)]
                      animate-pulse-slow" />
      <div className="container mx-auto px-6 relative">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Our Expertise</h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            We specialize in transforming complex technical challenges into elegant, scalable solutions.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-16" ref={servicesRef}>
          {services.map((service, index) => (
            <div 
              key={index} 
              className={`flex flex-col items-center transition-all duration-1000 transform
                         ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ 
                transitionDelay: `${index * 200}ms`
              }}
            >
              {/* Icon Container with Hover Animation */}
              <div className="mb-8 p-5 bg-gray-900/50 rounded-2xl backdrop-blur-sm 
                            ring-1 ring-violet-500/10 shadow-lg shadow-violet-500/5
                            transform transition-all duration-500 hover:scale-110
                            hover:shadow-violet-500/20 hover:ring-violet-500/30
                            group">
                <div className="transform transition-transform duration-500 group-hover:rotate-12">
                  {service.icon}
                </div>
              </div>

              {/* Content remains the same */}
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold text-white
                             transition-all duration-300 hover:text-violet-400">
                  {service.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {service.description}
                </p>

                <ul className="space-y-3 mt-6">
                  {service.features.map((feature, i) => (
                    <li 
                      key={i} 
                      className="flex items-center justify-center text-gray-300
                               transform transition-all duration-300 hover:translate-x-2"
                      style={{ transitionDelay: `${i * 50}ms` }}
                    >
                      <div className="flex items-center space-x-2 group">
                        <ChevronRight className="w-4 h-4 text-violet-400 transition-transform duration-300
                                               group-hover:translate-x-1" />
                        <span>{feature}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Process = () => {
  const processRef = useRef<HTMLDivElement>(null);
  const isVisible = useInView(processRef);
  const steps = [
    {
      number: "01",
      title: "Discovery & Planning",
      description: "We begin with a deep dive into your business objectives, technical requirements, and vision. Our team works closely with you to understand the challenges and opportunities, creating a comprehensive project roadmap.",
      details: [
        "Requirements Analysis",
        "Technical Architecture",
        "Project Timeline",
        "Resource Planning"
      ]
    },
    {
      number: "02",
      title: "Design & Strategy",
      description: "Our experts develop a detailed technical strategy and architecture that aligns with your goals. We focus on creating scalable, maintainable solutions that provide long-term value.",
      details: [
        "System Architecture",
        "UI/UX Design",
        "Technology Stack",
        "Security Planning"
      ]
    },
    {
      number: "03",
      title: "Agile Development",
      description: "Using agile methodologies, we develop your solution with regular updates and iterations. Our transparent process ensures you're always informed about progress and can provide feedback.",
      details: [
        "Sprint Planning",
        "Regular Updates",
        "Quality Assurance",
        "Continuous Integration"
      ]
    },
    {
      number: "04",
      title: "Launch & Support",
      description: "We ensure a smooth deployment and provide comprehensive support post-launch. Our team remains available for maintenance, updates, and ongoing improvements to your solution.",
      details: [
        "Deployment Strategy",
        "Performance Testing",
        "User Training",
        "Ongoing Support"
      ]
    }
  ];

  return (
    <section id="process" className="py-24 bg-gray-900/50">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-center">Our Development Process</h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            We follow a proven, systematic approach to project development...
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12" ref={processRef}>
          {steps.map((step, index) => (
            <div 
              key={index}
              className={`relative bg-black/20 p-8 rounded-2xl backdrop-blur-sm
                         transform transition-all duration-1000
                         hover:scale-105 hover:bg-black/30
                         ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ 
                transitionDelay: `${index * 200}ms`
              }}
            >
              <div className="text-5xl font-bold text-violet-600/20 mb-4">
                {step.number}
              </div>
              <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">{step.description}</p>
              <ul className="space-y-2">
                {step.details.map((detail, i) => (
                  <li 
                    key={i} 
                    className="text-gray-500 flex items-center transform transition-all duration-300
                             hover:translate-x-2 hover:text-gray-300"
                  >
                    <ChevronRight className="w-4 h-4 mr-2 text-violet-500" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Services, Process };