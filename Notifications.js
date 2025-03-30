class NotificationService {
    constructor() {
      this.permission = null;
    }
  
    async init() {
      if (!('Notification' in window)) {
        return false;
      }
  
      this.permission = await Notification.requestPermission();
      return this.permission === 'granted';
    }
  
    async scheduleNotification(title, options, delay) {
      if (this.permission !== 'granted') return;
  
      setTimeout(() => {
        new Notification(title, options);
      }, delay);
    }
  
    async scheduleDailyReminder(time) {
      const now = new Date();
      const [hours, minutes] = time.split(':');
      const scheduledTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        parseInt(hours),
        parseInt(minutes)
      );
  
      if (scheduledTime < now) {
        scheduledTime.setDate(scheduledTime.getDate() + 1);
      }
  
      const delay = scheduledTime.getTime() - now.getTime();
  
      this.scheduleNotification(
        'Daily Spiritual Practice',
        {
          body: 'Time for your daily spiritual practice',
          icon: '/icons/notification-icon.png'
        },
        delay
      );
    }
  }
  
  export default new NotificationService();
