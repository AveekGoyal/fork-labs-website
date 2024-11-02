import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, MessageCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SuccessDialog from './SuccessDialog';

const QuickContactForm = ({ triggerText = "Connect with us", className = "" }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: 'fork.labs.devs@gmail.com',
          ...formData
        }),
      });

      if (response.ok) {
        setShowSuccess(true);
        setIsFormOpen(false);
        setFormData({
          name: '',
          email: '',
          projectType: '',
          message: ''
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      alert('Error sending message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
  };

  return (
    <>
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogTrigger asChild>
          <Button className={className}>
            {triggerText}
          </Button>
        </DialogTrigger>
        
        <DialogContent className="bg-gray-900/90 backdrop-blur-xl border-none max-w-xl p-0 gap-0 rounded-3xl shadow-2xl">
          {/* Top decorative gradient */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-indigo-600 rounded-t-3xl" />
          
          <form onSubmit={handleSubmit} className="p-8">
            <DialogHeader className="mb-8">
              <div className="flex items-center mb-2">
                <MessageCircle className="w-6 h-6 text-violet-400 mr-2" />
                <span className="text-sm text-violet-400 font-medium">Let's Connect</span>
              </div>
              <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-violet-500 to-indigo-600 bg-clip-text text-transparent">
                Tell us about your project
              </DialogTitle>
              <p className="text-gray-300 mt-2 text-sm">
                Share your vision and we'll help bring it to life with cutting-edge technology.
              </p>
            </DialogHeader>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-200">Name</label>
                  <Input 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-white/10 border-0 rounded-xl h-11 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-violet-500/20" 
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-200">Email</label>
                  <Input 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-white/10 border-0 rounded-xl h-11 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-violet-500/20" 
                    placeholder="your@email.com" 
                    type="email"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-200">Project Type</label>
                <select 
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border-0 rounded-xl h-11 px-3 text-white placeholder:text-gray-400 
                           focus:ring-2 focus:ring-violet-500/20 appearance-none cursor-pointer"
                  required
                >
                  <option value="" className="bg-gray-900">Select project type</option>
                  <option value="web" className="bg-gray-900">Web Application</option>
                  <option value="ai" className="bg-gray-900">AI Integration</option>
                  <option value="blockchain" className="bg-gray-900">Blockchain Solution</option>
                  <option value="custom" className="bg-gray-900">Custom Development</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-200">Message</label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="bg-white/10 border-0 rounded-xl min-h-[120px] text-white placeholder:text-gray-400 
                           focus:ring-2 focus:ring-violet-500/20 resize-none"
                  placeholder="Tell us about your project ideas and requirements..."
                  required
                />
              </div>

              <Button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl py-6 text-white font-medium
                         hover:from-violet-500 hover:to-indigo-500 transition-all duration-300 group shadow-lg
                         hover:shadow-violet-500/20 hover:-translate-y-0.5"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>

              <div className="flex items-center justify-center space-x-2 text-sm text-gray-300">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <p>We typically respond within 24 hours</p>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <SuccessDialog 
        isOpen={showSuccess} 
        onClose={handleSuccessClose}
      />
    </>
  );
};

export default QuickContactForm;