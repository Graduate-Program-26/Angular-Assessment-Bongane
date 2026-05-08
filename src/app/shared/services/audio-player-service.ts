import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AudioPlayerService {
  private audio = new Audio();

  currentUrl = signal<string | null>(null);
  isPlaying = signal(false);
  isEnded = signal(false);

  constructor() {
    this.audio.addEventListener('ended', () => {
      this.isPlaying.set(false);
      this.isEnded.set(true);
    });

    this.audio.addEventListener('play', () => {
      this.isPlaying.set(true);
      this.isEnded.set(false);
    });

    this.audio.addEventListener('pause', () => {
      this.isPlaying.set(false);
    });
  }

  play(url: string) {
    const proxied = url.replace('https://cdnt-preview.dzcdn.net', '/cdn');

    if (this.audio.src !== proxied) {
      this.audio.src = proxied;
      this.currentUrl.set(proxied);
    }

    this.audio.load();
    this.audio.play();
  }

  pause() {
    this.audio.pause();
  }

  stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.isPlaying.set(false);
  }

  get currentTime() {
    return this.audio.currentTime;
  }

  get duration() {
    return this.audio.duration;
  }
}
