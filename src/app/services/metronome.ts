import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Metronome {

  private audioCtx: AudioContext | null = null;
  private timerId: number | null = null;
  private isPlaying = false;

  start(bpm: number): void {
    if (this.isPlaying) return;

    const AudioContextClass = 
      window.AudioContext || (window as unknown as {webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.audioCtx = this.audioCtx ?? new AudioContextClass();

    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    this.isPlaying = true;
    const intervalMs = (60 / bpm) * 1000;

    this.playClick();
    this.timerId = window.setInterval(() => {
      this.playClick();
    }, intervalMs);
  }

  stop(): void {
    this.isPlaying = false;
    if (this.timerId !== null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  private playClick(): void {
    if (!this.audioCtx) return;

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.value = 1000;

    gain.gain.setValueAtTime(0.3, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start();
    osc.stop(this.audioCtx.currentTime + 0.05);

  }

}
