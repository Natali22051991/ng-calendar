import { Pipe, PipeTransform } from '@angular/core';
import { TypeTask } from '../../models/type-task';
import { calendar } from '../../models/calendar';

@Pipe({
  name: 'filterTask'
})
export class FilterTaskPipe implements PipeTransform {

  transform(value: calendar.task.Type[] | undefined | null, type: TypeTask): calendar.task.Type[] {
    return value
      ? value.filter(t => t.type === type)
      : []
  }

}
