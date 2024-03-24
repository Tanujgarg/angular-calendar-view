import {Component, EventEmitter, Input, Output} from '@angular/core';
import type {Day, Event} from '@ts/day'
import dayjs from 'dayjs';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrl: './day.component.css'
})
export class DayComponent {
  @Input({required: true}) day!: Day;
  @Input({required: true}) events: Event[] = [];
  showTooltip = false;
  @Input({required: true}) set expandedDate(value: string | undefined) {
    this.showTooltip = !!(value && value === this.day.date.format('D M YYYY'));
  }

  @Output() onEventClick = new EventEmitter<string | undefined>();


  get isToday() {
    return this.day.date.format('D M YYYY') === dayjs().format('D M YYYY');
  }

  close() {
    this.onEventClick.emit(undefined);
  }

  open() {
    this.onEventClick.emit(this.day.date.format('D M YYYY'));
  }
}
