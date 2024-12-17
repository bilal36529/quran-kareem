'use client';

class AudioService {
  private static instance: AudioService;
  private audio: HTMLAudioElement | null = null;
  private currentVerseKey: string | null = null;
  private cleanupFunctions: (() => void)[] = [];
  private retryAttempts: number = 3;
  private retryDelay: number = 1000;
  private audioCache: Map<string, ArrayBuffer> = new Map();
  private loadingPromise: Promise<void> | null = null;
  private playbackSpeed: number = 1;
  private volume: number = 1;
  private autoPlay: boolean = false;

  private constructor() {
    if (typeof window !== 'undefined') {
      this.audio = new Audio();
      this.audio.preload = 'auto';
      this.setupGlobalErrorHandling();
    }
  }

  public static getInstance(): AudioService {
    if (!AudioService.instance) {
      AudioService.instance = new AudioService();
    }
    return AudioService.instance;
  }

  private setupGlobalErrorHandling(): void {
    if (!this.audio) return;

    this.audio.addEventListener('error', (e) => {
      console.error('Global audio error:', e);
      if (this.audio?.error) {
        console.error('Audio error details:', {
          code: this.audio.error.code,
          message: this.audio.error.message
        });
      }
    });
  }

  public setPlaybackSpeed(speed: number): void {
    this.playbackSpeed = speed;
    if (this.audio) {
      this.audio.playbackRate = speed;
    }
  }

  public setVolume(volume: number): void {
    this.volume = Math.max(0, Math.min(1, volume));
    if (this.audio) {
      this.audio.volume = this.volume;
    }
  }

  public setAutoPlay(enabled: boolean): void {
    this.autoPlay = enabled;
  }

  private cleanup(): void {
    this.cleanupFunctions.forEach(cleanup => cleanup());
    this.cleanupFunctions = [];
  }

  public async playVerse(
    verseKey: string,
    audioUrl: string,
    onEnd: () => void,
    onError: () => void,
    onComplete?: () => void
  ): Promise<void> {
    if (!this.audio || !audioUrl) {
      onError();
      return;
    }

    try {
      this.cleanup();
      
      if (this.currentVerseKey === verseKey && !this.audio.paused) {
        this.stop();
        onEnd();
        return;
      }

      if (this.currentVerseKey && this.currentVerseKey !== verseKey) {
        this.stop();
      }

      this.currentVerseKey = verseKey;
      await this.loadAudioWithRetry(audioUrl);

      const handleEnded = () => {
        this.stop();
        onEnd();
        if (this.autoPlay) {
          onComplete?.();
        }
      };

      const handleError = (e: Event) => {
        console.error('Playback error:', e);
        this.stop();
        onError();
      };

      this.audio.addEventListener('ended', handleEnded);
      this.audio.addEventListener('error', handleError);

      this.cleanupFunctions.push(() => {
        if (this.audio) {
          this.audio.removeEventListener('ended', handleEnded);
          this.audio.removeEventListener('error', handleError);
        }
      });

      // Apply current settings
      this.audio.playbackRate = this.playbackSpeed;
      this.audio.volume = this.volume;
      
      await this.audio.play();

    } catch (error) {
      console.error('Audio playback error:', error);
      this.stop();
      onError();
    }
  }

  private async loadAudioWithRetry(url: string, attempts: number = 0): Promise<void> {
    if (!this.audio || !url) throw new Error('Audio not initialized or invalid URL');

    if (this.loadingPromise) {
      return this.loadingPromise;
    }

    this.loadingPromise = (async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const buffer = await response.arrayBuffer();
        const blob = new Blob([buffer], { type: 'audio/mpeg' });
        const objectUrl = URL.createObjectURL(blob);
        
        await new Promise<void>((resolve, reject) => {
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
      } finally {
        this.loadingPromise = null;
      }
    })();

    return this.loadingPromise;
  }

  public stop(): void {
    if (this.audio) {
      this.cleanup();
      this.audio.pause();
      this.audio.currentTime = 0;
      this.currentVerseKey = null;
    }
  }

  public isPlaying(verseKey: string): boolean {
    return this.currentVerseKey === verseKey && this.audio && !this.audio.paused;
  }
}

export const audioService = AudioService.getInstance();