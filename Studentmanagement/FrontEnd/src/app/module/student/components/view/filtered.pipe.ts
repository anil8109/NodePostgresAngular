import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtered'
})
export class FilteredPipe implements PipeTransform {

  transform(value: any, filterString: string, propName: string): any {
    if (value.length === 0 || filterString === "") {
      return value; 
    }
    const res = [];

    for (const iterator of value) {
      if (iterator[propName] === filterString) { 
        res.push(iterator)
      }
    }
    return res;

  }
}
