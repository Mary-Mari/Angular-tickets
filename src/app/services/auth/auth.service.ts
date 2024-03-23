import { Injectable } from '@angular/core';
import { IUser } from 'src/app/models/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usersStorage: IUser[] = [];

  constructor() { }

  checkUser(user: IUser): boolean {
    // Проверяем наличие пользователя в локальном хранилище
    const userFromStorageString = window.localStorage.getItem('currentUser');
    if (userFromStorageString) {
      const userFromStorage: IUser = JSON.parse(userFromStorageString);
      if (userFromStorage.login === user.login && userFromStorage.psw === user.psw) {
        return true; // Возвращаем true, если пользователь найден и пароль совпадает
      }
    }

    // Проверяем наличие пользователя в массиве usersStorage
    const isUserExists = this.usersStorage.find((el) => el.login === user.login);
    if (isUserExists) {
      return isUserExists.psw === user.psw;
    }

    return false; // Возвращаем false, если пользователь не найден
  }

  setUser(user: IUser): void {
    const isUserExists = this.usersStorage.find((el) => el.login === user.login);
    if (!isUserExists && user?.login) {
      this.usersStorage.push(user);
    }
}
}


