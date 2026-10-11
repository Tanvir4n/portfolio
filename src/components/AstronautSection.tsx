import React from 'react';
import { Astronaut } from './ui/Astronaut';

export const AstronautSection: React.FC = () => {
  return (
    <div className="astronaut-section">
      {/* Default idle state (as seen in the screenshot): */}
      <Astronaut size={96} mood="neutral" action="idle" />
    </div>
  );
};

export default AstronautSection;
