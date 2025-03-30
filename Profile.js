import React, { useState, useEffect } from 'react';
import { useAuth } from '../features/auth/AuthContext';
import { useProfile } from '../hooks/useProfile';
import ProfileStats from '../components/profile/ProfileStats';
import AchievementsList from '../components/profile/AchievementsList';
import PracticeHistory from '../components/profile/PracticeHistory';
import ProfileSettings from '../components/profile/ProfileSettings';

const Profile = () => {
  const { user } = useAuth();
  const { 
    profile, 
    stats, 
    achievements,
    history,
    loading,
    error,
    updateProfile 
  } = useProfile(user.uid);

  const [activeSection, setActiveSection] = useState('overview');

  if (loading) return <div className="loading-spinner" />;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="profile-page">
      <header className="profile-header">
        <div className="profile-info">
          <img 
            src={user.photoURL || '/assets/default-avatar.png'} 
            alt="Profile" 
            className="profile-avatar"
          />
          <div className="profile-details">
            <h1>{user.displayName}</h1>
            <p>{profile.religion || 'No religion specified'}</p>
          </div>
        </div>

        <nav className="profile-nav">
          <button 
            className={`nav-btn ${activeSection === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveSection('overview')}
          >
            Overview
          </button>
          <button 
            className={`nav-btn ${activeSection === 'achievements' ? 'active' : ''}`}
            onClick={() => setActiveSection('achievements')}
          >
            Achievements
          </button>
          <button 
            className={`nav-btn ${activeSection === 'history' ? 'active' : ''}`}
            onClick={() => setActiveSection('history')}
          >
            History
          </button>
          <button 
            className={`nav-btn ${activeSection === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveSection('settings')}
          >
            Settings
          </button>
        </nav>
      </header>

      <div className="profile-content">
        {activeSection === 'overview' && (
          <ProfileStats stats={stats} />
        )}
        
        {activeSection === 'achievements' && (
          <AchievementsList achievements={achievements} />
        )}
        
        {activeSection === 'history' && (
          <PracticeHistory history={history} />
        )}
        
        {activeSection === 'settings' && (
          <ProfileSettings 
            profile={profile}
            onUpdate={updateProfile}
          />
        )}
      </div>
    </div>
  );
};

export default Profile;
