import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/users';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css'],
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
    private messageService: MessageService // Внедряем MessageService в конструктор компонента
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
    if (this.authService.checkUser(authUser)){
      console.log('auth true');
    } else {
      // console.log('auth false');
      // this.error = true; // Устанавливаем значение error в true в случае ошибки
      this.messageService.add({severity:'error', summary:'Ошибка', detail:'Неверное имя пользователя или пароль'});
    }
}
}
