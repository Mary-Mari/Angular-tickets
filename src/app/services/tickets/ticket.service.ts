import { Injectable } from '@angular/core';
import { TicketRestService } from '../rest/ticket-rest.service';
import { ITour, ITourTypeSelect } from 'src/app/models/tours';
import { Observable, Subject} from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private ticketsCopy: ITour[] = []; // Инициализация переменной ticketsCopy
  private tickets: ITour[] = []; // Инициализируйте пустой массив туров
  private ticketSubject = new Subject<ITourTypeSelect>();

  // Публичное свойство только для чтения $ticketType, представляющее Observable для подписки
  readonly $ticketType: Observable<ITourTypeSelect> = this.ticketSubject.asObservable();

  constructor(private ticketServiceRest: TicketRestService) { }

  getTickets(): Observable<ITour[]> {
    return this.ticketServiceRest.getTickets()
      .pipe(
        tap(tickets => {
          this.tickets = tickets;
          this.ticketsCopy = [...this.tickets]; // Копируем массив туров
        })
      );
  }


  getTicketTypeObservable(): Observable<ITourTypeSelect> {
    return this.ticketSubject.asObservable();
  }
    
  updateTour(type: ITourTypeSelect): void {
    this.ticketSubject.next(type);
  }

}
