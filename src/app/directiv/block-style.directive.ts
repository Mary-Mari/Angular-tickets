import { AfterViewInit, Directive, Input, HostListener, Output, ElementRef, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appBlockStyle]',
  exportAs: 'blockStyle'
})
export class BlockStyleDirective implements AfterViewInit {
  @Input() selector: string;
  @Output() renderComplete = new EventEmitter();
  private items: HTMLElement[];
  private currentIndex = 0;


  constructor(private elementRef: ElementRef) {}

  updateItems(): void {
    this.items = this.elementRef.nativeElement.querySelectorAll('.ticket-item');
  }

  ngAfterViewInit(): void {
    this.items = this.elementRef.nativeElement.querySelectorAll(this.selector);
    this.initStyle(this.currentIndex);
  }

  @HostListener('document:keyup', ['$event'])
  initKeyUp(event: KeyboardEvent): void {
    if (event.key === 'ArrowRight') {
      this.moveToNext();
    } else if (event.key === 'ArrowLeft') {
      this.moveToPrevious();
    }
  }

  moveToNext(): void {
    if (this.currentIndex < this.items.length - 1) {
      this.currentIndex++;
      this.initStyle(this.currentIndex);
    }
  }

  moveToPrevious(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.initStyle(this.currentIndex);
    }
  }

  getActiveElement(): number {
    return this.currentIndex + 1;
  }

  initStyle(index: number): void {
    this.items.forEach((item) => item.removeAttribute('style'));
    if (this.items[index]) {
      this.items[index].setAttribute('style', 'border: 2px solid blue');
    }
  }
}
