import React from 'react';
import { useTimer } from '../../hooks/useTimer';
import { usePrayer } from '../../hooks/usePrayer';

const PrayerCard = ({ prayer, onComplete }) => {
  const { startTimer, remainingTime, isActive } = useTimer(prayer.duration);
  const { markComplete } = usePrayer();

  const handleComplete = async () => {
    await markComplete(prayer.id);
    onComplete?.();
  };

  return (
    <div className="prayer-card">
      <div className="prayer-header">
        <h3>{prayer.title}</h3>
        <span className="prayer-tradition">{prayer.tradition}</span>
      </div>

      <div className="prayer-content">
        <p className="prayer-text">{prayer.text}</p>
        {prayer.translation && (
          <p className="prayer-translation">{prayer.translation}</p>
        )}
      </div>

      <div className="prayer-controls">
        {!isActive ? (
          <button 
            className="btn btn-primary"
            onClick={startTimer}
          >
            Begin Prayer
          </button>
        ) : (
          <div className="timer-display">
            {Math.floor(remainingTime / 60)}:{(remainingTime % 60).toString().padStart(2, '0')}
          </div>
        )}
      </div>

      <div className="prayer-footer">
        <span className="prayer-source">{prayer.source}</span>
        <button 
          className="btn btn-secondary"
          onClick={handleComplete}
        >
          Mark Complete
        </button>
      </div>
    </div>
  );
};

export default PrayerCard;
