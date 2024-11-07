import React from 'react';

interface BlurOverlayProps {
  isVisible: boolean;
}

const BlurOverlay: React.FC<BlurOverlayProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 z-40 backdrop-blur-l bg-black/60
                 transition-all duration-500 ease-in-out
                 animate-fade-in pointer-events-none
                 overflow-hidden"
    >
      {/* Subtle Bokeh Effects */}
      <div 
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full 
                   bg-violet-100/1 blur-xl animate-float-slow" 
      />
      <div 
        className="absolute top-1/2 right-1/3 w-96 h-96 rounded-full 
                   bg-indigo-100/1 blur-xl animate-float-slow-reverse" 
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full 
                   bg-purple-100/1 blur-xl animate-float-medium" 
      />
    </div>
  );
};

export default BlurOverlay;