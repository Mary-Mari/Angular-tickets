import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObservableExampleService {
  private subject = new Subject<string>();

  constructor() { }

  // Метод для получения Observable
  getSubject(): Observable<string> {
    return this.subject.asObservable();
  }

  // Метод для обновления данных в Subject
  updateData(data: string): void {
    this.subject.next(data);
  }
}
