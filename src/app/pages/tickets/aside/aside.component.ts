import { Component,  EventEmitter ,OnInit, Output} from '@angular/core';
import { IMenuType } from '../../../models/menuType';



@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})


export class AsideComponent implements OnInit {
  menuTypes: IMenuType[]; // Публичное свойство для хранения типов меню
  selectedMenuType: IMenuType; // Публичное свойство для хранения выбранного типа меню

  @Output() updateMenuType: EventEmitter<IMenuType> = new EventEmitter<IMenuType>();


  constructor() { }

  ngOnInit(): void {
    this.menuTypes = [
      {type: 'custom', label : 'Обычное'},
      {type: 'extended', label : 'Расширенное'}
    ];
  }

  onSelectType(menuType: IMenuType): void {
    this.selectedMenuType = menuType;
    this.updateMenuType.emit(menuType);
  }

  changeType(event: any): void {
    console.log('event', event);
    this.updateMenuType.emit(event.value);
  }

}
