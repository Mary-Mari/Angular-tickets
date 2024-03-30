import { Component, OnInit, Input, SimpleChanges} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { IUser } from 'src/app/models/users';
import { UserService } from 'src/app/services/user/user.service'; 
import { IMenuType } from '../../../models/menuType';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  items: MenuItem[];
  user: IUser; // Объявляем свойство user типа IUser

  @Input() menuType: IMenuType;

  settingsActive: boolean = false; // Инициализация здесь
  
  constructor(private userService: UserService,//// Инжектируем сервис UserService
)
   { } 


  ngOnInit(): void {

   // Получаем текущего пользователя из сервиса UserService
   this.user = this.userService.getUser();
   this.items = this.initMenuItems();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('menuType' in changes) {
      this.settingsActive = this.menuType?.type === 'extended';
      this.items = this.initMenuItems();
    }
  }
  initMenuItems(): MenuItem[] {
    return [
      {
          label: 'Билеты',
          routerLink: ['tickets-list']
      },

      {
        label: 'Настройки',
        routerLink:['/settings'],
        visible: this.settingsActive
      },

      {
          label: 'Выйти',
          routerLink: ['/auth']
      },
      
  ];
  }

}
