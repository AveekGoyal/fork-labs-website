// import React from 'react';
// import {
//   Dialog,
//   DialogContent,
//   DialogTitle,
//   DialogHeader,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { CheckCircle, ArrowRight } from 'lucide-react';

// interface ProjectSummaryDialogProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSubmitSuccess: () => void;
//   projectInfo: {
//     name: string;
//     email: string;
//     projectType: string;
//     requirements: string;
//     conversation: Array<{ role: string; content: string; }>;
//   };
// }

// const ProjectSummaryDialog: React.FC<ProjectSummaryDialogProps> = ({
//   isOpen,
//   onClose,
//   onSubmitSuccess,
//   projectInfo
// }) => {
//   const handleSubmit = async () => {
//     try {
//       // Format conversation for better readability in email
//       const formattedConversation = projectInfo.conversation
//         .map(msg => `${msg.role.toUpperCase()}: ${msg.content.replace(/[#*`]/g, '')}`)
//         .join('\n\n');

//       const emailContent = {
//         name: projectInfo.name,
//         email: projectInfo.email,
//         projectType: projectInfo.projectType,
//         message: `
// Project Requirements: ${projectInfo.requirements}

// Full Conversation:
// ${formattedConversation}`,
//       };

//       const response = await fetch('/api/send-email', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(emailContent),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to send email');
//       }

//       onSubmitSuccess();
//     } catch (error) {
//       console.error('Error sending email:', error);
//       alert('Error sending email. Please try again.');
//     }
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="bg-gray-900/95 backdrop-blur-xl border-none max-w-2xl p-0 gap-0 rounded-3xl shadow-2xl">
//         {/* Top decorative gradient */}
//         <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-indigo-600 rounded-t-3xl" />

//         <DialogHeader className="p-6 border-b border-gray-800">
//           <DialogTitle className="text-2xl font-semibold bg-gradient-to-r from-violet-500 to-indigo-600 bg-clip-text text-transparent">
//             Review Your Project Details
//           </DialogTitle>
//           <p className="text-gray-400 text-sm mt-2">
//             Please confirm your information before we schedule a detailed discussion
//           </p>
//         </DialogHeader>

//         <div className="p-6 space-y-6">
//           {/* Client Information */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold text-white">Client Information</h3>
//             <div className="grid grid-cols-2 gap-4 p-4 bg-black/20 rounded-xl">
//               <div>
//                 <span className="text-gray-400 block mb-1">Name</span>
//                 <span className="text-white font-medium">{projectInfo.name || 'Not provided'}</span>
//               </div>
//               <div>
//                 <span className="text-gray-400 block mb-1">Email</span>
//                 <span className="text-white font-medium">{projectInfo.email || 'Not provided'}</span>
//               </div>
//             </div>
//           </div>

//           {/* Project Details */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold text-white">Project Details</h3>
//             <div className="space-y-4 p-4 bg-black/20 rounded-xl">
//               <div>
//                 <span className="text-gray-400 block mb-1">Project Type</span>
//                 <span className="text-white font-medium">{projectInfo.projectType || 'Not specified'}</span>
//               </div>
//               <div>
//                 <span className="text-gray-400 block mb-1">Requirements</span>
//                 <p className="text-white whitespace-pre-wrap">{projectInfo.requirements || 'No specific requirements provided'}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <DialogFooter className="p-6 border-t border-gray-800">
//           <div className="flex justify-end space-x-4 w-full">
//             <Button
//               variant="outline"
//               onClick={onClose}
//               className="border-gray-700 text-gray-300 hover:bg-gray-800"
//             >
//               Edit Details
//             </Button>
//             <Button
//               onClick={handleSubmit}
//               className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-8
//                        hover:from-violet-500 hover:to-indigo-500 transition-all duration-300
//                        group"
//             >
//               Submit Request
//               <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
//             </Button>
//           </div>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default ProjectSummaryDialog;