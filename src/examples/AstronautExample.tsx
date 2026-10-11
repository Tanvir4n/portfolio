import React from 'react';
import { Astronaut } from "../components/ui/Astronaut";

export const AstronautExample: React.FC = () => {
  return (
    <div className="astronaut-celebrate-example">
      <Astronaut size={110} mood="happy" action="celebrate" say="Mission successful!" />
    </div>
  );
};

export default AstronautExample;
