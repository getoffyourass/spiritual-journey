import React, { useState } from 'react';
import MeditationTimer from '../components/meditation/MeditationTimer';
import MeditationSettings from '../components/meditation/MeditationSettings';
import { useMeditation } from '../hooks/useMeditation';
import { useAudio } from '../hooks/useAudio';

const Meditation = () => {
  const [settings, setSettings] = useState({
    duration: 600, // 10 minutes
    type: 'mindfulness',
    sound: 'nature',
    guidance: true
  });

  const { startSession, completeSession } = useMeditation();
  const { playAmbientSound, stopAmbientSound } = useAudio();

  const handleComplete = async () => {
    await completeSession({
      duration: settings.duration,
      type: settings.type,
      completedAt: new Date()
    });
    stopAmbientSound();
  };

  return (
    <div className="meditation-page">
      <header className="meditation-header">
        <h1>Meditation</h1>
      </header>

      <div className="meditation-content">
        <MeditationSettings 
          settings={settings}
          onChange={setSettings}
        />
        
        <MeditationTimer 
          duration={settings.duration}
          type={settings.type}
          onComplete={handleComplete}
        />
      </div>
    </div>
  );
};

export default Meditation;
