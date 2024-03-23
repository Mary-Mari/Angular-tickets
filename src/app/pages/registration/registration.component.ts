import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../../services/regis/registration.service';
import { MessageService } from 'primeng/api';
import { IUser } from 'src/app/models/users';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']
    
  })

    export class RegistrationComponent implements OnInit {
        loginText='Логин';
        pswdText='Пароль';
        confirmPsw='Подтверждение пароля';
        psw:string;
        psw2:string;
        login:string;
        email:string;
        username: string;
        regisTextButton:string;
        error: boolean = false; // Добавляем переменную error и устанавливаем ее значение по умолчанию в false

        saveToLocalStorage: boolean = false; // Свойство для хранения состояния чекбокса

constructor(
    private registrationService: RegistrationService,
    private messageService: MessageService) {}


ngOnInit(): void {
    this.regisTextButton = "Зарегистрироваться" //присвоение текста к кнопке 

  }

  onRegister(ev: Event): void {
    // Проверяем, заполнены ли все обязательные поля
    if (!this.login || !this.psw || !this.confirmPsw) {
        this.messageService.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: 'Пожалуйста, заполните все обязательные поля'
        });
        return;
      }
  
      if (this.psw !== this.psw2) {
        this.messageService.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: 'Пароли не совпадают'
        });
        return;
      }

    const userData: IUser = {
        login: this.login,
        psw: this.psw,
    };


        // Вызываем метод регистрации из сервиса регистрации
    this.registrationService.register(userData).subscribe(
        () => {
            console.log('Registration successful');
            this.messageService.add({ 
                severity: 'success', 
                summary: 'Успешно', 
                detail: 'Регистрация успешно завершена' });
            

            // Сохранение пользователя в локальное хранилище
        if (this.saveToLocalStorage) {
            localStorage.setItem('currentUser', JSON.stringify(userData));
            console.log('User saved to local storage');
          }
        },
        (error) => {
            console.error('Registration failed', error);
            this.messageService.add({ 
                severity: 'error', 
                summary: 'Ошибка', 
                detail: 'Не удалось зарегистрировать пользователя' });
        }
    );
        }}
