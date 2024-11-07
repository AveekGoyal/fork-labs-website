import React, { useState, useEffect } from 'react';

interface TypeWriterProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
}

const TypeWriter: React.FC<TypeWriterProps> = ({ words, typingSpeed = 150, deletingSpeed = 100, pauseTime = 2000 }) => {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const currentWord = words[wordIndex];
      
      if (isPaused) {
        setIsPaused(false);
        setIsDeleting(true);
        return;
      }

      if (isDeleting) {
        setText(currentWord.substring(0, text.length - 1));
        if (text === '') {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      } else {
        setText(currentWord.substring(0, text.length + 1));
        if (text === currentWord) {
          setIsPaused(true);
        }
      }
    }, isDeleting ? deletingSpeed : isPaused ? pauseTime : typingSpeed);

    return () => clearTimeout(timer);
  }, [text, wordIndex, isDeleting, isPaused, words, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span className="bg-gradient-to-r from-violet-500 to-indigo-600 bg-clip-text text-transparent">
      {text}
      <span className="animate-blink">|</span>
    </span>
  );
};

export default TypeWriter;