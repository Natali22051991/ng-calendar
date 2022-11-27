export type StringDateFormat = 'long' | 'short' | 'narrow';

export class CalendarDate {
  currentDate: Date;

  get year(): number {
    return this.currentDate.getFullYear();
  }

  get month(): number {
    return this.currentDate.getMonth();
  }

  get day(): number {
    return this.currentDate.getDate();
  }

  get dayInWeek(): string {
    return CalendarDate.getFullDateString(this.currentDate);
  }

  get fullDate(): string {
    return CalendarDate.getFullDateString(this.currentDate);
  }

  get date(): string {
    return CalendarDate.getShorftDateString(this.currentDate);
  }

  constructor(date: Date) {
    this.currentDate = date;
  }

  public static getMonthYearString(date: Date): string {
    return new Intl.DateTimeFormat('ru-RU', {
      month: 'long',
      year: 'numeric'
    }).format(date);
  }

  public static getFullDateString(date: Date): string {
    return new Intl.DateTimeFormat('ru-RU', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }).format(date);
  }

  public static getShorftDateString(date: Date): string {
    return new Intl.DateTimeFormat('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  }

  public static getDaysInMonth(year: number, month: number): number {
    return 33 - new Date(year, month - 1, 33).getDate();
  }

  public static getFirstDayOfMonth(year: number, month: number): number {
    const result = new Date(year, month - 1, 1).getDay();
    return result === 0
      ? 7
      : result;
  }

  public static getCalendarMonth(year: number, month: number): (number | '')[] {
    const days = CalendarDate.getDaysInMonth(year, month);
    const day = CalendarDate.getFirstDayOfMonth(year, month);
    return new Array(42)
      .fill('')
      .map((el, i) =>
        i + 1 < day
          ? ''
          : i > days + day - 2
            ? ''
            : i + 2 - day
      );
  }

  public week(weekday: StringDateFormat | undefined = 'long'): string {
    return new Intl.DateTimeFormat('ru-RU', {
      weekday
    }).format();
  }

  public static getTime(date: Date): string {
    return new Intl.DateTimeFormat('ru-RU', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }
}
