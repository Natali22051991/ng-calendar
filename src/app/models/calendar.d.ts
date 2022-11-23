import { TypeTask } from './type-task';

export namespace calendar {
  export namespace task {
    export interface Base {
      /** идентификатор */
      id: string;
      /** дата создания */
      createDate: string;
      /** название */
      title: string;
      type: TypeTask;

      text?: string;
      targetDate?: string;
      status?: string;
      shift?: Shift;
      description?: string;
      eventType?: string;

      start?: string;
      end?: string;
      duration?: string;
      hourlyRate?: number;
      amount?: number;
    }

    export interface Note extends Base {
      text: string;
    }

    export interface Task extends Note {
      /** дата выполнения задачи */
      targetDate: string;
      /** статус выполнения задачи */
      status: string;
    }

    export interface WorkingShift extends Base {
      shift: Shift;
      description: string;
    }

    export interface Shift {
      start: string;
      end: string;
      /** продолжительность смены */
      duration: string;
      /** почасовая ставка */
      hourlyRate: number;
      amount: number;
    }

    export interface Event extends Note {
      /** тип события */
      eventType: string;
    }

    export type Type = Event | WorkingShift | Note | Task;
  }
}
