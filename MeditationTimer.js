import React, { useEffect, useState } from 'react';
import { CircularProgress } from '../common/CircularProgress';
import { useMeditation } from '../../hooks/useMeditation';
import { useAudio } from '../../hooks/useAudio';

const MeditationTimer = ({ duration, type, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isActive, setIsActive] = useState(false);
  const { recordSession } = useMeditation();
  const { playSound, stopSound } = useAudio();

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleComplete();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const handleStart = () => {
    setIsActive(true);
    playSound('meditation-start.mp3');
  };

  const handlePause = () => {
    setIsActive(false);
    playSound('meditation-pause.mp3');
  };

  const handleComplete = async () => {
    setIsActive(false);
    stopSound();
    playSound('meditation-complete.mp3');
    await recordSession({
      duration,
      type,
      completedAt: new Date()
    });
    onComplete?.();
  };

  return (
    <div className="meditation-timer">
      <CircularProgress 
        percentage={(duration - timeLeft) / duration * 100} 
        size={300}
      />
      
      <div className="timer-display">
        {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
      </div>

      <div className="timer-controls">
        {!isActive ? (
          <button 
            className="btn btn-primary btn-large"
            onClick={handleStart}
          >
            {timeLeft === duration ? 'Start' : 'Resume'}
          </button>
        ) : (
          <button 
            className="btn btn-secondary btn-large"
            onClick={handlePause}
          >
            Pause
          </button>
        )}
      </div>
    </div>
  );
};

export default MeditationTimer;
