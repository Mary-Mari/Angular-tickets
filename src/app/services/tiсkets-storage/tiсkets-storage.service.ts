import { Injectable } from '@angular/core';

import { ITour } from 'src/app/models/tours'; 

@Injectable({
  providedIn: 'root'
})
export class TiсketsStorageService {
  private ticketStorage: ITour[]

  constructor() { }

  //установка данных
  setStorage(data: ITour[]): void {
    this.ticketStorage = data;
  }


  //получение данных
  getStorage(): ITour[] {
    return this.ticketStorage;
  }
}
