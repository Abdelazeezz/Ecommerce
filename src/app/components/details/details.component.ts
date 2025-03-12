import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  constructor(private _ActivatedRoute:ActivatedRoute,private _EcomdataService:EcomdataService,private _CartService:CartService,private _ToastrService:ToastrService){}


  productSlidersOption: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay:true,
    items:1,
    navSpeed: 700,
    navText: ['', ''],
   
    nav: true
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
  



productDetails:Product ={} as Product
  ngOnInit(): void {

    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        let idProduct:any = params.get('id');

        //api 
        this._EcomdataService.getProductById(idProduct).subscribe({
          next:(response)=>{
            this.productDetails = response.data

          }
        })




      }
    });
    
  }

}
