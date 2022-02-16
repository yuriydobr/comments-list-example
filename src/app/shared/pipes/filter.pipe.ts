import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByProperty'
})

export class FilterPipe implements PipeTransform {
  transform(items: null | any[], query: string, fieldName: string): any {
    return (!items || !query) ? items : items.filter((item) => item[fieldName].some((el: string) => el.toLowerCase() === query.toLowerCase()));
  }
}
