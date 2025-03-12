import { Product } from './../../shared/interfaces/product';

import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ICategory } from 'src/app/shared/interfaces/icategory';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit,OnDestroy {

  constructor(private _EcomdataService:EcomdataService,private _CartService:CartService,private _ToastrService:ToastrService){}
 getProductSubscipe! :Subscription;
 private readonly _spinner = inject(NgxSpinnerService)

// products:Product[]=[];
products:WritableSignal<Product[]> =signal([]);
// catigories:ICategory[]=[];
catigories:WritableSignal<ICategory[]> = signal([]);

searchTerm:string ='';


pageSize:number =0
currentPage:number =1
total:number =0

categoriesSliderOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: true,
  autoplay:true,
  autoplayTimeout:500,
  autoplaySpeed:500,
  navSpeed: 500,
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
mainSliderOption: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: true,
  autoplay:true,
  autoplayTimeout:500,
  autoplaySpeed:500,
  items:1,
  navSpeed: 500,
  navText: ['', ''],
 
  nav: true
}




  ngOnInit(): void {
    this._spinner.show("loading");
    this.getProductSubscipe = this._EcomdataService.getAllProduct().subscribe({
      next:(response)=>{
        // console.log(response);
        this.products.set(response.data);
        this.pageSize = response.metadata.limit;
        this.currentPage = response.metadata.currentPage;
        this.total = response.results;
    this._spinner.hide("loading");

      },
      error(err:HttpErrorResponse) {
        console.log(err);
        
      },
    })


    this._EcomdataService.getCatigories().subscribe({
      next:(response)=>{
        this.catigories.set(response.data) ;
        // console.log( response.data);
        

      },
      error(err:HttpErrorResponse) {
        console.log(err);
        
      },
    })
  }

  addCart(id:string):void{
    this._CartService.addToCart(id).subscribe({
      next:(response)=>{
        // console.log(response);
        this._CartService.cartNumber.set(response.numOfCartItems)
        this._ToastrService.success(response.message)
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
  
  pageChanged(event:number):void{
    this._EcomdataService.getAllProduct(event).subscribe({
      next:(response)=>{
        // console.log(response);
        this.products=response.data
        this.pageSize = response.metadata.limit;
        this.currentPage = response.metadata.currentPage;
        this.total = response.results;
      },
      error(err:HttpErrorResponse) {
        console.log(err);
        
      },
    })


  }

ngOnDestroy(): void {
  this.getProductSubscipe?.unsubscribe();
}
}
