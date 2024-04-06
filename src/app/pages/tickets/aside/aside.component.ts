import { Component,  EventEmitter ,OnInit, Output} from '@angular/core';
import { IMenuType } from '../../../models/menuType';
import { ITourTypeSelect } from 'src/app/models/tours';
import { TicketService } from 'src/app/services/tickets/ticket.service';



@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})


export class AsideComponent implements OnInit {

  menuTypes: IMenuType[]; // Публичное свойство для хранения типов меню
  selectedMenuType: IMenuType; // Публичное свойство для хранения выбранного типа меню

  @Output() updateMenuType: EventEmitter<IMenuType> = new EventEmitter<IMenuType>();

  tourTypes: ITourTypeSelect[] = [
    { label: 'Все', value: 'all' },
    { label: 'Одиночный', value: 'single' },
    { label: 'Групповой', value: 'multi' }
  ];
  currentDate: Date = new Date();
  selectedDate: Date;

  constructor(private ticketService: TicketService) { } // Инжектируем сервис

  selectDate(ev: string) {
    console.log('ev', ev);
    this.ticketService.updateTour({ date: ev });
  }

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

  changeTourType(ev:  {ev: Event, value: ITourTypeSelect}): void {
    this.ticketService.updateTour(ev.value)
  }

}
