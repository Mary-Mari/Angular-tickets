import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/services/tickets/ticket.service';
import { ITour } from 'src/app/models/tours';
import { TiсketsStorageService} from '../../../services/tiсkets-storage/tiсkets-storage.service';
import { Router } from "@angular/router";


@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
  tickets: ITour[];
  searchText: string = ''; // Переменная для хранения текста поиска
  filteredTickets: ITour[]; // Список отфильтрованных туров
  activeElement: ITour; 

  constructor(
    private ticketService: TicketService,
    private ticketStorage: TiсketsStorageService,
    private router: Router,) { }

  ngOnInit(): void {
    this.ticketService.getTickets().subscribe(tickets => {
      this.tickets = tickets;
      // При инициализации компонента, отображаем все туры
      this.filteredTickets = [...this.tickets];
      this.ticketStorage.setStorage;
    });
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
