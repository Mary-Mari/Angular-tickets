import { Injectable } from '@angular/core';
import { IUser } from 'src/app/models/users';
import { Observable } from 'rxjs';
import { of } from 'rxjs';   // Это статический метод, который создает Observable, 
//который испускает переданные ему значения в качестве элементов последовательности.


@Injectable({
    providedIn: 'root'
  })
  export class RegistrationService {

    private usersStorage: IUser[] = [];

    constructor() { }

    register(user: IUser): Observable<boolean> {
        if (this.usersStorage.find((el) => el.login === user.login)) {
          return of (false); // Пользователь с таким логином уже существует
        }
    
        this.usersStorage.push(user); // Добавляем нового пользователя в хранилище
        return of (true); // Регистрация прошла успешно
      }
    }

  