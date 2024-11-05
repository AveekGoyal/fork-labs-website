import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Twitter, Linkedin, Github, MessageCircle } from 'lucide-react';
// const ContactForm = () => {
//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-full px-8 py-6 text-lg">
//           Start Your Project
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="bg-gray-900/95 backdrop-blur-xl border-gray-800">
//         <DialogHeader>
//           <DialogTitle className="text-2xl">Let's discuss your project</DialogTitle>
//         </DialogHeader>
//         <div className="space-y-6 mt-6">
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="text-sm text-gray-400 mb-2 block">Name</label>
//               <Input className="bg-black/50 border-gray-800" placeholder="Your name" />
//             </div>
//             <div>
//               <label className="text-sm text-gray-400 mb-2 block">Email</label>
//               <Input className="bg-black/50 border-gray-800" placeholder="your@email.com" />
//             </div>
//           </div>
//           <div>
//             <label className="text-sm text-gray-400 mb-2 block">Project Type</label>
//             <select className="w-full px-4 py-2 bg-black/50 border border-gray-800 rounded-lg focus:border-violet-500 focus:outline-none text-white">
//               <option>Web Application</option>
//               <option>AI Solution</option>
//               <option>Blockchain Development</option>
//               <option>Custom Project</option>
//             </select>
//           </div>
//           <div>
//             <label className="text-sm text-gray-400 mb-2 block">Budget Range</label>
//             <select className="w-full px-4 py-2 bg-black/50 border border-gray-800 rounded-lg focus:border-violet-500 focus:outline-none text-white">
//               <option>$5,000 - $10,000</option>
//               <option>$10,000 - $20,000</option>
//               <option>$20,000+</option>
//               <option>To be discussed</option>
//             </select>
//           </div>
//           <div>
//             <label className="text-sm text-gray-400 mb-2 block">Project Details</label>
//             <Textarea 
//               className="bg-black/50 border-gray-800 h-32"
//               placeholder="Tell us about your project requirements, timeline, and any specific features you're looking for..."
//             />
//           </div>
//           <Button className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full py-6">
//             Submit Request
//           </Button>
//           <p className="text-sm text-gray-500 text-center">
//             We typically respond within 24 hours to schedule a detailed discussion.
//           </p>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
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
            <a href="#" className="text-gray-400 hover:text-violet-400 transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-violet-400 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-violet-400 transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-violet-400 transition-colors">
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>

          {/* Quick Links */}
          {/* <div className="flex items-center space-x-6 text-sm text-gray-400">
            <a href="#" className="hover:text-violet-400 transition-colors">About</a>
            <a href="#" className="hover:text-violet-400 transition-colors">Contact</a>
            <a href="#" className="hover:text-violet-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-violet-400 transition-colors">Terms</a>
          </div> */}
          
          {/* Copyright */}
          <div className="text-sm text-gray-500">
            &copy; {currentYear} ForkLabs. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
export {Footer };