import React, { useState, useEffect } from 'react';
import { usePrayer } from '../hooks/usePrayer';
import PrayerCard from '../components/prayer/PrayerCard';
import PrayerFilter from '../components/prayer/PrayerFilter';
import { useAuth } from '../features/auth/AuthContext';

const Prayer = () => {
  const { user } = useAuth();
  const { prayers, loading, error, fetchPrayers } = usePrayer();
  const [filters, setFilters] = useState({
    tradition: 'all',
    duration: 'all',
    language: 'all'
  });

  useEffect(() => {
    fetchPrayers(filters);
  }, [filters]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div className="prayer-page">
      <header className="prayer-header">
        <h1>Daily Prayers</h1>
        <PrayerFilter 
          filters={filters}
          onChange={setFilters}
        />
      </header>

      <div className="prayer-grid">
        {prayers.map(prayer => (
          <PrayerCard 
            key={prayer.id}
            prayer={prayer}
            onComplete={() => {/* Handle completion */}}
          />
        ))}
      </div>
    </div>
  );
};

export default Prayer;
