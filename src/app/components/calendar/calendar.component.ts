import {Component, OnInit} from '@angular/core';
import dayjs from 'dayjs';
import type {Day, Events} from '@ts/day';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit {
  currentDate!: dayjs.Dayjs;
  monthDays!: Day[][];
  days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  expandedDate: string | undefined = undefined;
  events: Events = {
    '2024-03-25': [
      {
        title: 'Booking 1'
      },
      {
        title: 'Booking 2'
      }
    ],
    '2024-03-26': [
      {
        title: 'Booking 1'
      },
      {
        title: 'Booking 2'
      }
    ],
    '2024-03-01': [
      {
        title: 'Booking 1'
      },
      {
        title: 'Booking 2'
      }
    ],
    '2024-04-15': [
      {
        title: 'Booking 1'
      },
      {
        title: 'Booking 2'
      }
    ]
  };

  constructor() {
  }

  ngOnInit(): void {
    this.currentDate = dayjs();
    this.generateCalendar();
  }

  handleEventClick(event: string | undefined) {
    this.expandedDate = event;
  }

  generateCalendar() {
    const firstDayOfMonth = this.currentDate.startOf('month');
    const lastDayOfMonth = this.currentDate.endOf('month');
    const startOfWeek = firstDayOfMonth.startOf('week');
    const endOfWeek = lastDayOfMonth.endOf('week');
    const days = [];
    let currentDate = startOfWeek;

    while (currentDate.isBefore(endOfWeek, 'day') || currentDate.isSame(endOfWeek, 'day')) {
      const week = [];
      for (let i = 0; i < 7; i++) {
        week.push({
          date: currentDate,
          isCurrentMonth: currentDate.isSame(this.currentDate, 'month')
        });
        currentDate = currentDate.add(1, 'day');
      }
      days.push(week);
    }

    this.monthDays = days;
  }


  nextMonth() {
    this.currentDate = this.currentDate.add(1, 'month');
    this.generateCalendar();

  }

  prevMonth() {
    this.currentDate = this.currentDate.subtract(1, 'month');
    this.generateCalendar();

  }

  today() {
    this.currentDate = dayjs();
    this.generateCalendar();
  }
}
