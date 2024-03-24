import dayjs from 'dayjs';

export type Day = {
  date: dayjs.Dayjs,
  isCurrentMonth: boolean
}


export type Event = { title: string }

export type Events = { [key: string]: Event[] }
