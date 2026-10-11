import React from 'react';
import { Astronaut } from './ui/Astronaut';

export const AstronautSection: React.FC = () => {
  return (
    <div className="astronaut-section">
      <Astronaut size={110} mood="happy" action="celebrate" say="Mission successful!" />
    </div>
  );
};

export default AstronautSection;
