import React from 'react';
import { useAuth } from '../features/auth/AuthContext';
import { useDailyPractice } from '../hooks/useDailyPractice';
import PrayerCard from '../components/prayer/PrayerCard';
import MeditationCard from '../components/meditation/MeditationCard';
import ProgressTracker from '../components/progress/ProgressTracker';

const Home = () => {
  const { user } = useAuth();
  const { dailyPrayer, dailyMeditation, progress } = useDailyPractice();

  if (!user) {
    return <Navigate to="/auth" />;
  }

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome, {user.displayName}</h1>
        <ProgressTracker progress={progress} />
      </header>

      <section className="daily-practices">
        <h2>Today's Practices</h2>
        <div className="practice-cards">
          {dailyPrayer && (
            <PrayerCard 
              prayer={dailyPrayer}
              onComplete={() => {/* Update progress */}}
            />
          )}
          {dailyMeditation && (
            <MeditationCard 
              meditation={dailyMeditation}
              onComplete={() => {/* Update progress */}}
            />
          )}
        </div>
      </section>

      <section className="achievements">
        <h2>Recent Achievements</h2>
        {/* Achievement components */}
      </section>
    </div>
  );
};

export default Home;
