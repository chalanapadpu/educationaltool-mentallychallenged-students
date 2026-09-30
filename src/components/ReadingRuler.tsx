import React from 'react';
import { useAccessibility } from '../context/AccessibilityContext';

export const ReadingRuler: React.FC = () => {
  const { settings, readingRulerY } = useAccessibility();

  if (!settings.readingRuler) return null;

  return (
    <div 
      aria-hidden="true"
      className="fixed left-0 right-0 pointer-events-none z-50 transition-all duration-75"
      style={{
        top: `${readingRulerY - 24}px`,
        height: '48px',
        background: 'rgba(250, 204, 21, 0.18)',
        borderTop: '2px solid rgba(234, 179, 8, 0.7)',
        borderBottom: '2px solid rgba(234, 179, 8, 0.7)',
        boxShadow: '0 0 20px rgba(234, 179, 8, 0.25)'
      }}
    />
  );
};
