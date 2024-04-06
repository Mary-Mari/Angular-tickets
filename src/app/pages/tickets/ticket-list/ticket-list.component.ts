import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { TicketService } from 'src/app/services/tickets/ticket.service';
import { ITour, ITourTypeSelect } from 'src/app/models/tours';
import { TiсketsStorageService} from '../../../services/tiсkets-storage/tiсkets-storage.service';
import { Router } from "@angular/router";
import { Subscription } from 'rxjs';
import { BlockStyleDirective } from '../../../directiv/block-style.directive';


@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit, OnDestroy {
  @ViewChild(BlockStyleDirective) blockDirective: BlockStyleDirective; //ViewChild для доступа к экземпляру директивы BlockStyleDirective
  private ticketUnsubscriber: Subscription; // свойство для очистки 
  private tourUnsubscriber: Subscription;
  tickets: ITour[];
  searchText: string = ''; // Переменная для хранения текста поиска
  filteredTickets: ITour[]; // Список отфильтрованных туров
  activeElement: ITour; 
  ticketsCopy: ITour[];
  

  constructor(
    private ticketService: TicketService,
    private ticketStorage: TiсketsStorageService,
    private router: Router,
    ) { }


  ngOnInit(): void {
    // массив туров
      this.ticketUnsubscriber = this.ticketService.getTickets().subscribe(tickets => {
      this.tickets = tickets;
      this.filteredTickets = [...this.tickets];
    });
    // Подписка на изменения типа билета
    this.tourUnsubscriber = this.ticketService.$ticketType.subscribe((data: ITourTypeSelect) => {
      console.log('data', data);
  
      let ticketType: string;
      switch (data.value) {
        case "single":
          this.tickets = this.ticketsCopy.filter((el) => el.type === "single");
          break;
        case "multi":
          this.tickets = this.ticketsCopy.filter((el) => el.type === "multi");
          break;
        case "all":
          this.tickets = [...this.ticketsCopy];
          break;
      }
      //проверку на свойство date
      if (data.date) {
        const dateWithoutTime = new Date(data.date).toISOString().split('T');
        const dateValue = dateWithoutTime[0]
        console.log('dateValue',dateValue)
        this.tickets = this.ticketsCopy.filter((el) => el.date === dateValue);
      }

      // Вызов методов директивы после инициализации ticketType$
    setTimeout(() => {
      this.blockDirective.updateItems();
      this.blockDirective.initStyle(0); // Сбрасываем индекс на 0 элемент
    });
  });

  }

  ngOnDestroy(): void {
    if (this.tourUnsubscriber) {
      this.tourUnsubscriber.unsubscribe();
    }
  }

  // Метод для фильтрации туров по введенному тексту
  filterTickets(searchText: string): void {
    if (searchText.trim() === '') {
      // Если поле поиска пустое, отображаем все туры
      this.filteredTickets = [...this.tickets];
    } else {
      // Фильтруем туры по введенному тексту
      this.filteredTickets = this.tickets.filter(tour => 
        tour.name.toLowerCase().includes(searchText.trim().toLowerCase())
      );
    }
  }


  getActiveCount(): number {
    return this.filteredTickets ? this.filteredTickets.length : 0; // Возвращаем количество элементов в отфильтрованном списке туров
  }

  goToTicketInfoPage(item: ITour) {
    this.router.navigate([`/tickets/ticket/${item.id}`]);
  }

  
}
