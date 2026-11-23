import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Metronome } from './services/metronome';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('MetroGnome-app');

  private metronome = inject(Metronome);

  bpm = signal(120);
  playing = signal(false);

  togglePlay(): void {
    if (this.playing()) {
      this.metronome.stop();
      this.playing.set(false);
    } else {
      this.metronome.start(this.bpm());
      this.playing.set(true);
    }
  }

  changeBpm(delta: number): void {
    const next = Math.min(240, Math.max(40, this.bpm() + delta))
    this.bpm.set(next);

    if (this.playing()) {
      this.metronome.stop();
      this.metronome.start(next);
    }
  }

  setBpm(value: number): void {
    if (Number.isNaN(value)) return;

    const next = Math.min(240, Math.max(40, Math.round(value)))
    this.bpm.set(next);

    if (this.playing()) {
      this.metronome.stop();
      this.metronome.start(this.bpm())
    }
  }
}
