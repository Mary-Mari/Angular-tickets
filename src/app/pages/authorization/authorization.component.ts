import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/users';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss'],
})

export class AuthorizationComponent implements OnInit {
  loginText='Логин';
  pswdText='Пароль';
  psw:string;
  login:string;
  selectedValue: boolean;
  cardNumber: string;
  authTextButton:string;
  error: boolean = false; // Добавляем переменную error и устанавливаем ее значение по умолчанию в false


  constructor( 
    private authService: AuthService,
    private messageService: MessageService, // Внедряем MessageService в конструктор компонента
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.authTextButton = "Авторизоваться" //присвоение текста к кнопке 

  }

  vipStatusSelected(): void {
   
  }

  onAuth(ev: Event): void {
    const authUser: IUser = {
      login: this.login,
      psw: this.psw
    }
    // Вызываем метод проверки пользователя из сервиса AuthService
  if (this.authService.checkUser(authUser)) {
    // Если пользователь успешно прошел аутентификацию, сохраняем его в UserService
    this.userService.setUser(authUser); // Передача объект пользователя в setUser
    // Перенаправляем пользователя на страницу списка билетов
    console.log('User successfully set in UserService:', authUser);
    this.router.navigate(['tickets/tickets-list']);
  } else {
    // Если аутентификация не удалась, показываем сообщение об ошибке
    this.messageService.add({severity:'error', summary:'Ошибка', detail:'Неверное имя пользователя или пароль'});
  }
}
}
