'use client';

class AudioService {
  private static instance: AudioService;
  private audio: HTMLAudioElement | null = null;
  private currentVerseKey: string | null = null;
  private stopListeners: Set<(reason?: string) => void> = new Set();
  private loadingPromise: Promise<void> | null = null;
  private retryAttempts: number = 3;
  private retryDelay: number = 1000;
  private repeatCount: number = 0;
  private maxRepeats: number = 1;
  private settings = {
    playbackSpeed: 1,
    volume: 1,
    autoPlay: false,
    repeatEnabled: false,
    repeatCount: 1
  };

  private constructor() {
    if (typeof window !== 'undefined') {
      this.audio = new Audio();
      this.audio.preload = 'auto';
      this.setupAudioElement();
    }
  }

  private setupAudioElement() {
    if (!this.audio) return;

    const handleEnded = () => {
      if (this.settings.repeatEnabled && this.repeatCount < this.maxRepeats - 1) {
        this.repeatCount++;
        if (this.audio) {
          this.audio.currentTime = 0;
          this.audio.play().catch(console.error);
        }
      } else {
        this.repeatCount = 0;
        this.currentVerseKey = null;
        this.notifyStop('ended');
      }
    };

    this.audio.addEventListener('ended', () => {
      handleEnded();
    });

    // Handle errors
    this.audio.addEventListener('error', () => {
      console.error('Audio error:', {
        code: this.audio?.error?.code,
        message: this.audio?.error?.message,
        src: this.audio?.src
      });
      this.currentVerseKey = null;
      this.notifyStop('error');
    });
  }

  public static getInstance(): AudioService {
    if (!AudioService.instance) {
      AudioService.instance = new AudioService();
    }
    return AudioService.instance;
  }

  private notifyStop(reason?: string) {
    this.stopListeners.forEach(listener => listener(reason));
  }

  public onStop(callback: (reason?: string) => void) {
    this.stopListeners.add(callback);
  }

  public offStop(callback: (reason?: string) => void) {
    this.stopListeners.delete(callback);
  }

  public updateSettings(settings: Partial<typeof this.settings>): void {
    this.settings = { ...this.settings, ...settings };
    
    if (typeof settings.repeatCount !== 'undefined') {
      this.maxRepeats = settings.repeatCount;
      this.repeatCount = 0;
    }

    if (this.audio) {
      if (typeof settings.playbackSpeed !== 'undefined') {
        this.audio.playbackRate = settings.playbackSpeed;
      }
      if (typeof settings.volume !== 'undefined') {
        this.audio.volume = settings.volume;
      }
    }
  }

  public getCurrentRepeat(): number {
    return this.repeatCount + 1;
  }

  public getTotalRepeats(): number {
    return this.maxRepeats;
  }

  private async loadAudioWithRetry(url: string, attempts: number = 0): Promise<void> {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const buffer = await response.arrayBuffer();
      const blob = new Blob([buffer], { type: 'audio/mpeg' });
      const objectUrl = URL.createObjectURL(blob);

      if (!this.audio) throw new Error('Audio not initialized');

      // Clean up previous object URL
      if (this.audio.src.startsWith('blob:')) {
        URL.revokeObjectURL(this.audio.src);
      }

      return new Promise((resolve, reject) => {
        if (!this.audio) return reject(new Error('Audio not initialized'));
        
        const handleCanPlay = () => {
          this.audio?.removeEventListener('canplay', handleCanPlay);
          this.audio?.removeEventListener('error', handleError);
          resolve();
        };
        
        const handleError = () => {
          this.audio?.removeEventListener('canplay', handleCanPlay);
          this.audio?.removeEventListener('error', handleError);
          reject(new Error('Failed to load audio'));
        };
        
        this.audio.addEventListener('canplay', handleCanPlay);
        this.audio.addEventListener('error', handleError);
        this.audio.src = objectUrl;
        this.audio.load();
      });
    } catch (error) {
      if (attempts < this.retryAttempts) {
        await new Promise(resolve => setTimeout(resolve, this.retryDelay));
        return this.loadAudioWithRetry(url, attempts + 1);
      }
      throw error;
    }
  }

  public async playVerse(verseKey: string, audioUrl: string): Promise<void> {
    if (!this.audio) {
      throw new Error('Audio not initialized');
    }

    // If same verse is playing, stop it
    if (this.currentVerseKey === verseKey && !this.audio.paused) {
      this.stop();
      return;
    }

    try {
      // Stop any current playback
      this.stop();
      
      this.currentVerseKey = verseKey;
      this.repeatCount = 0;

      await this.loadAudioWithRetry(audioUrl);
      await this.audio.play();
    } catch (error) {
      this.stop();
      console.error('Audio playback error:', error);
      throw error;
    }
  }

  public stop(): void {
    if (this.audio) {
      const wasPlaying = !this.audio.paused;
      this.audio.pause();
      this.audio.currentTime = 0;
      this.currentVerseKey = null;
      this.repeatCount = 0;
      if (wasPlaying) {
        this.notifyStop('manual');
      }
    }
  }

  public isPlaying(verseKey: string): boolean {
    return this.currentVerseKey === verseKey && this.audio && !this.audio.paused;
  }
}

export const audioService = AudioService.getInstance();