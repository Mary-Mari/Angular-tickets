import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITour } from 'src/app/models/tours';


@Injectable({
  providedIn: 'root'
})
export class TicketRestService {

  constructor(private http:HttpClient) { }


getTickets(): Observable <ITour[]> { //обработка асинх/операций
  console.log('Sending request to get tickets...');
  return this.http.get<ITour[]>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/tours/');
}
}
