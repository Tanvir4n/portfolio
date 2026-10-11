import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Astronaut, AstronautMood, AstronautAction } from './components/ui/Astronaut';

export const SpaceSceneAstronaut: React.FC = () => {
  const [mood, setMood] = useState<AstronautMood>('neutral');
  const [action, setAction] = useState<AstronautAction>('idle');
  const [say, setSay] = useState<string | undefined>(undefined);

  const moods: AstronautMood[] = ['neutral', 'happy', 'wow', 'thinking', 'focused'];
  const actions: AstronautAction[] = ['idle', 'wave', 'scan', 'drill', 'flag', 'sample', 'celebrate', 'walk'];

  const cycleNext = () => {
    const nextActionIdx = (actions.indexOf(action) + 1) % actions.length;
    const nextMoodIdx = (moods.indexOf(mood) + 1) % moods.length;
    const nextAction = actions[nextActionIdx];
    const nextMood = moods[nextMoodIdx];
    setAction(nextAction);
    setMood(nextMood);

    if (nextAction === 'wave') setSay("Greetings from Dhaka Analog Base!");
    else if (nextAction === 'scan') setSay("HUD LIDAR: Terrain analog confirmed.");
    else if (nextAction === 'drill') setSay("Extracting subterranean core sample.");
    else if (nextAction === 'flag') setSay("Permanent lunar base perimeter set!");
    else if (nextAction === 'sample') setSay("Basaltic mineral sample secured.");
    else if (nextAction === 'celebrate') setSay("NASA Space Apps 2026 Champion!");
    else if (nextAction === 'walk') setSay("EVA survey trek across terrain.");
    else setSay("Hi, I'm Astra! Orbiting Earth & Mars.");
  };

  return (
    <div
      className="celestial-astronaut-interactive"
      onClick={(e) => {
        e.stopPropagation();
        cycleNext();
      }}
      title="Click Astra to swap EVA action & visor HUD mood!"
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Astronaut
        size={66}
        mood={mood}
        action={action}
        say={say}
        sayAlign="left"
      />
      <div className="celestial-astro-tag">
        <span className="astro-ping-dot" aria-hidden="true" />
        <span>ASTRA // {action.toUpperCase()}</span>
      </div>
    </div>
  );
};

const rootEl = document.getElementById('astronaut-root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(<SpaceSceneAstronaut />);
}

export default SpaceSceneAstronaut;
