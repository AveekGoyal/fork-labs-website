import React from 'react';
import { Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import QuickContactForm from './QuickContactForm';

const UpcomingProjects = () => {
  return (
    <section id="upcoming" className="py-24 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(99,102,241,0.1),transparent_50%)]" />
      <div className="container mx-auto px-6 relative">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="inline-block px-4 py-1 bg-violet-500/10 rounded-full text-violet-400">
              Coming Soon
            </div>
          </div>
          <h2 className="text-4xl font-bold mb-4 text-center">Upcoming Projects</h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Stay tuned for our exciting upcoming projects. We're constantly working on innovative solutions 
            to help businesses leverage cutting-edge technology.
          </p>
        </div>

        {/* Empty state for upcoming projects */}
        <div className="text-center py-16 bg-black/20 rounded-2xl backdrop-blur-sm">
          <p className="text-gray-400">
            New projects coming soon. Check back later for updates.
          </p>
        </div>
      </div>
    </section>
  );
};

const Pricing = () => {
  const plans = [
    {
      title: "Base MVP",
      price: "2,000",
      description: "Perfect for startups and small businesses looking to establish their digital presence with modern technology.",
      features: [
        "Custom Web Application",
        "Basic AI Integration",
        "3 Months Support",
        "Technical Documentation",
        "Weekly Progress Updates",
        "Performance Monitoring",
        "Security Best Practices",
        "Code Repository Access",
        "Basic Analytics",
        "Email Support",
        "Regular Backups"
      ]
    },
    {
      title: "Growth",
      price: "3,000",
      description: "Ideal for growing companies requiring advanced features and integrations to scale their operations.",
      features: [
        "Advanced Web Application",
        "Custom AI Integration",
        "Blockchain Integration",
        "6 Months Support",
        "Comprehensive Documentation",
        "24/7 Priority Support",
        "Performance Optimization",
        "API Development",
        "Cloud Infrastructure",
        "Advanced Security Features",
        "Advanced Analytics"
      ],
      isPopular: true
    },
    {
      title: "Enterprise",
      price: "Custom",
      description: "Tailored solutions for enterprises with complex requirements and large-scale operations.",
      features: [
        "Full-Scale Custom Solution",
        "Enterprise AI Systems",
        "Private Blockchain Networks",
        "1 Year Premium Support",
        "White Label Options",
        "24/7 VIP Support",
        "Custom SLA",
        "Dedicated Team",
        "Infrastructure Management",
        "Regular Security Audits",
        "Scalability Planning"
      ]
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-gray-900/50">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-center">Transparent Pricing</h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Choose the perfect plan for your project needs. Our pricing is transparent and flexible, 
            designed to provide maximum value for your investment. All plans include our core development 
            expertise and commitment to quality.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div key={index} className={`relative p-8 rounded-2xl bg-black/20 backdrop-blur-sm hover:bg-black/30 transition-all duration-300 flex flex-col ${
              plan.isPopular ? 'ring-2 ring-violet-500 scale-105' : ''
            }`}>
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-violet-500 rounded-full text-sm">
                  Most Popular
                </div>
              )}
              
              <div className="flex-grow">
                <h3 className="text-2xl font-bold mb-2 text-center">{plan.title}</h3>
                <div className="mb-4 text-center">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  {plan.price !== 'Custom' && <span className="text-gray-400">/project</span>}
                </div>
                
                <p className="text-gray-400 mb-8 leading-relaxed text-center">
                  {plan.description}
                </p>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-400">
                      <Check className="w-5 h-5 text-violet-500 mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <QuickContactForm 
                triggerText="Get Started"
                className={`w-full rounded-full py-6 mt-auto ${
                  plan.isPopular 
                    ? 'bg-gradient-to-r from-violet-600 to-indigo-600' 
                    : 'bg-gray-800 hover:bg-gray-700'
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


export { UpcomingProjects, Pricing };