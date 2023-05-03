import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { concatMap, take } from 'rxjs';
import { lazyService } from './lazy-load-service';

const DataServiceImport = () =>
  import('./data.service').then((m) => m.DataService);

@Component({
  selector: 'app-lazy',
  template: `
    <ul>
      <li *ngFor="let todo of todos$ | async">
        {{ todo.title }}
      </li>
    </ul>
  `,
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LazyComponent {
  dataService$ = lazyService(DataServiceImport);
  todos$ = this.dataService$.pipe(concatMap((service) => service.getTodos()));

  constructor() {
    setTimeout(() => {
      this.addTodo();
    }, 4000);
  }

  addTodo() {
    this.dataService$
      .pipe(
        concatMap((service) => service.addTodo()),
        take(1)
      )
      .subscribe({
        next: (res) => {
          console.log('Added todo', res);
        },
      });
  }
}
