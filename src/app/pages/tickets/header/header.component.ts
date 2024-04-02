import { Component, OnInit, Input, SimpleChanges, OnChanges, OnDestroy} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { IUser } from 'src/app/models/users';
import { UserService } from 'src/app/services/user/user.service'; 
import { IMenuType } from '../../../models/menuType';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges, OnDestroy {
  items: MenuItem[];
  user: IUser;
  time: Date;
  private timerInterval: number;
  private settingsActive = false;  // Инициализация здесь

  @Input() menuType: IMenuType;

  
  constructor(private userService: UserService,//// Инжектируем сервис UserService
)
   { } 


  ngOnInit(): void {

   // Получаем текущего пользователя из сервиса UserService
   this.user = this.userService.getUser();
    this.items = this.initMenuItems();
    this.timerInterval = window.setInterval(() => {
      this.time = new Date();
    }, 1000);
  }
  ngOnDestroy(): void {
    if (this.timerInterval) {
      window.clearInterval(this.timerInterval);
    }
  }

  ngOnChanges(ev: SimpleChanges): void {
    this.settingsActive = this.menuType?.type === "extended";
    this.items = this.initMenuItems();
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
