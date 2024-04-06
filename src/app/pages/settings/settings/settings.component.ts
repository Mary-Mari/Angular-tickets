import { Component, OnInit, OnDestroy } from '@angular/core';
import { ObservableExampleService } from '../../../services/obser/observable-example.service';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  private subjectScope: Subject<string> = new Subject<string>();
  private subjectUnsubscribe: Subscription;

  constructor(private observableService: ObservableExampleService) { } // Инжектирование ObservableExampleService

  ngOnInit(): void {
    this.subjectUnsubscribe = this.observableService.getSubject().subscribe((data: string) => {
      console.log('data', data);
    });

  // Отправка данных с помощью next()
  this.subjectScope.next('Ваши данные здесь');
}

  ngOnDestroy(): void {
  // В этом блоке вы можете отписаться от Observable при уничтожении компонента
  if (this.subjectUnsubscribe) {
    this.subjectUnsubscribe.unsubscribe();
  }
}
}
