import React, { useState } from 'react';
import { useAuth } from '../features/auth/AuthContext';
import { useSettings } from '../hooks/useSettings';
import NotificationSettings from '../components/settings/NotificationSettings';
import ThemeSettings from '../components/settings/ThemeSettings';
import PrivacySettings from '../components/settings/PrivacySettings';
import LanguageSettings from '../components/settings/LanguageSettings';

const Settings = () => {
  const { user } = useAuth();
  const { 
    settings, 
    loading, 
    error,
    updateSettings 
  } = useSettings(user.uid);

  const handleUpdate = async (section, updates) => {
    try {
      await updateSettings({
        ...settings,
        [section]: {
          ...settings[section],
          ...updates
        }
      });
      // Show success message
    } catch (err) {
      // Show error message
    }
  };

  if (loading) return <div className="loading-spinner" />;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="settings-page">
      <header className="settings-header">
        <h1>Settings</h1>
      </header>

      <div className="settings-content">
        <section className="settings-section">
          <h2>Notifications</h2>
          <NotificationSettings 
            settings={settings.notifications}
            onUpdate={(updates) => handleUpdate('notifications', updates)}
          />
        </section>

        <section className="settings-section">
          <h2>Theme</h2>
          <ThemeSettings 
            settings={settings.theme}
            onUpdate={(updates) => handleUpdate('theme', updates)}
          />
        </section>

        <section className="settings-section">
          <h2>Privacy</h2>
          <PrivacySettings 
            settings={settings.privacy}
            onUpdate={(updates) => handleUpdate('privacy', updates)}
          />
        </section>

        <section className="settings-section">
          <h2>Language</h2>
          <LanguageSettings 
            settings={settings.language}
            onUpdate={(updates) => handleUpdate('language', updates)}
          />
        </section>
      </div>
    </div>
  );
};

export default Settings;
