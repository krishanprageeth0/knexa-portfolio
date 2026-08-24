import React from 'react';
import { motion } from 'framer-motion';

interface GridDividerProps {
  direction?: 'horizontal' | 'vertical';
  className?: string;
  delay?: number;
}

export const GridDivider: React.FC<GridDividerProps> = ({
  direction = 'horizontal',
  className = '',
  delay = 0,
}) => {
  return (
    <motion.div
      initial={direction === 'horizontal' ? { scaleX: 0 } : { scaleY: 0 }}
      whileInView={direction === 'horizontal' ? { scaleX: 1 } : { scaleY: 1 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1], delay }}
      style={{
        originX: 0,
        originY: 0,
      }}
      className={`bg-white/10 ${
        direction === 'horizontal' ? 'h-[1px] w-full' : 'w-[1px] h-full'
      } ${className}`}
    />
  );
};

export default GridDivider;
