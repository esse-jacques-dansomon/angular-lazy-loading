import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { defer } from 'rxjs';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>App Component</h1>

    <ng-container *ngComponentOutlet="lazyCmp$ | async" />
  `,
})
export class App {
  lazyCmp$ = defer(() => import('./lazy.cmp').then((m) => m.LazyComponent));
}

bootstrapApplication(App, {
  providers: [provideHttpClient()],
});
