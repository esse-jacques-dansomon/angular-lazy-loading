import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class DataService {
  private http = inject(HttpClient);

  constructor() {
    console.log('DataService instantiated');
  }

  getTodos() {
    return this.http.get<any[]>(
      'https://jsonplaceholder.typicode.com/todos?_limit=5'
    );
  }

  addTodo() {
    return this.http.post('https://jsonplaceholder.typicode.com/todos', {
      title: 'foo',
      body: 'bar',
      userId: 1,
    });
  }
}
