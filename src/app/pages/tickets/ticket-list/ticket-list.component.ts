import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/services/tickets/ticket.service';
import { ITour } from 'src/app/models/tours';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
  tickets: ITour[];

  constructor(
    private ticketService: TicketService
  ) { }

  ngOnInit(): void {
    this.ticketService.getTickets().subscribe(tickets => {
      this.tickets = tickets;
    });
  }

}
