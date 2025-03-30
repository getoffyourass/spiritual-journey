import { analytics } from '../../firebase/firebase-config';
import { logEvent } from 'firebase/analytics';

class Analytics {
  logPrayerComplete(duration, religion) {
    logEvent(analytics, 'prayer_complete', {
      duration,
      religion
    });
  }

  logMeditationComplete(duration, type) {
    logEvent(analytics, 'meditation_complete', {
      duration,
      type
    });
  }

  logPurchase(itemId, price) {
    logEvent(analytics, 'purchase', {
      itemId,
      price
    });
  }

  logAchievement(achievementId) {
    logEvent(analytics, 'achievement_unlocked', {
      achievementId
    });
  }
}

export default new Analytics();
