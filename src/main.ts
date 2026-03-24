import { Component, inject, OnInit } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { RouterModule } from '@angular/router';
import { AngularSplitModule } from 'angular-split';
import { ThemeService } from './app/theme.service';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    RouterModule,
    AngularSplitModule
  ],
  templateUrl: 'app.html',
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }
  `
})
export class App implements OnInit {
  theme = inject(ThemeService);

  ngOnInit(): void {
    this.theme.apply();
  }

  toggleTheme(): void {
    this.theme.toggle();
  }
}
bootstrapApplication(App, appConfig);
