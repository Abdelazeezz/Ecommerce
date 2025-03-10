import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './shared/interfaces/product';

@Pipe({
  name: 'slice'
})
export class SlicePipe implements PipeTransform {

  transform(produts: Product[],num:number): Product[] {
    return produts.slice(0,num);
  }

}
