import React from 'react';
import ReactDOM from 'react-dom/client';
import { TypingKeyboard } from './components/ui/TypingKeyboard';

export const TerminalWorkbench: React.FC = () => {
  return (
    <TypingKeyboard
      autoTypeText="Hi, I’m Tanvir. A curious developer, passionate about AI, and obsessed with building things that matter. Crafted with ambition, driven by curiosity, and always building something new."
      typingSpeed={[35, 90]}
      accentColor="#3b82f6"
      secondaryAccent="#ff6545"
      showControls={true}
    />
  );
};

const rootEl = document.getElementById('keyboard-root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(<TerminalWorkbench />);
}
