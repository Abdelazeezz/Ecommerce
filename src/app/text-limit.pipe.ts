import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textLimit'
})
export class TextLimitPipe implements PipeTransform {

  transform(text: string, limit: number): string {
    return text.split(' ').slice(0,limit).join(' ');
  }

}
