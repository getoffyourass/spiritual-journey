class Timer {
    constructor(duration, onTick, onComplete) {
      this.duration = duration;
      this.remaining = duration;
      this.onTick = onTick;
      this.onComplete = onComplete;
      this.timerId = null;
    }
  
    start() {
      if (this.timerId) return;
      
      const startTime = Date.now();
      this.timerId = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        this.remaining = Math.max(0, this.duration - elapsed);
        
        if (this.onTick) {
          this.onTick(this.remaining);
        }
        
        if (this.remaining === 0) {
          this.stop();
          if (this.onComplete) {
            this.onComplete();
          }
        }
      }, 1000);
    }
  
    pause() {
      if (this.timerId) {
        clearInterval(this.timerId);
        this.timerId = null;
      }
    }
  
    resume() {
      if (!this.timerId && this.remaining > 0) {
        this.start();
      }
    }
  
    stop() {
      this.pause();
      this.remaining = this.duration;
    }
  }
  
  export default Timer;
