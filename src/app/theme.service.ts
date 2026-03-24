import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly storageKey = 'ame-theme';
  darkMode = signal(this.loadTheme());

  private loadTheme(): boolean {
    const stored = localStorage.getItem(this.storageKey);
    if (stored !== null) return stored === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  toggle(): void {
    this.darkMode.update(v => !v);
    this.apply();
  }

  apply(): void {
    const isDark = this.darkMode();
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem(this.storageKey, isDark ? 'dark' : 'light');
  }
}
