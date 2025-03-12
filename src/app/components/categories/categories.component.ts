import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ICategory } from 'src/app/shared/interfaces/icategory';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
private readonly _CategoryService = inject(CategoryService)
catigories:WritableSignal<ICategory[]> = signal([]);

categoriesSliderOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: true,
  autoplay:true,
  autoplayTimeout:7000,
  autoplaySpeed:1000,
  navSpeed: 700,
  navText: ['', ''],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 6
    }
  },
  nav: true
}
ngOnInit(): void {
  this._CategoryService.getAllCategories().subscribe({
    next:(response)=>{
    // console.log(response);
    this.catigories.set(response.data) ;

    },
    error:(err)=>{
      console.log(err);
      
    }
  });


  // this._CategoryService.getSpecificCategories(id:String).subscribe({
  //   next:(response)=>{
  //     console.log(response);
      
  //   },
  //   error:(err)=>{
  //     console.log(err);
      
  //   }
  // })

}
}
