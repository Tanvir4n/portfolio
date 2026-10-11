import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Astronaut, AstronautMood, AstronautAction } from './components/ui/Astronaut';

interface MissionStage {
  action: AstronautAction;
  mood: AstronautMood;
  say: string;
}

const missionStages: MissionStage[] = [
  { action: 'celebrate', mood: 'happy', say: 'Mission successful!' },
  { action: 'wave', mood: 'happy', say: 'Greetings from Dhaka Analog Base!' },
  { action: 'scan', mood: 'focused', say: 'HUD LIDAR: Terrain analog confirmed.' },
  { action: 'drill', mood: 'focused', say: 'Extracting subterranean core sample.' },
  { action: 'flag', mood: 'happy', say: 'Permanent lunar base perimeter set!' },
  { action: 'sample', mood: 'wow', say: 'Basaltic mineral sample secured.' },
  { action: 'walk', mood: 'neutral', say: 'EVA survey trek across terrain.' },
  { action: 'idle', mood: 'neutral', say: "Hi, I'm Astra! Orbiting Earth & Mars." },
];

export const SpaceSceneAstronaut: React.FC = () => {
  const [stageIdx, setStageIdx] = useState(0);

  const cycleNext = () => {
    setStageIdx((prev) => (prev + 1) % missionStages.length);
  };

  const currentStage = missionStages[stageIdx];

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
        size={104}
        mood={currentStage.mood}
        action={currentStage.action}
        say={currentStage.say}
        sayAlign="left"
      />
      <div className="celestial-astro-tag">
        <span className="astro-ping-dot" aria-hidden="true" />
        <span>ASTRA // {currentStage.action.toUpperCase()}</span>
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
