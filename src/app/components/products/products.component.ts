import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  
  constructor(private _EcomdataService:EcomdataService,private _CartService:CartService,private _ToastrService:ToastrService){}

  products:Product[]=[];
  searchTerm:string ='';



  ngOnInit(): void {
    this._EcomdataService.getAllProduct().subscribe({
      next:(response)=>{
        // console.log(response);
        this.products=response.data
        
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
        this._CartService.cartNumber.next(response.numOfCartItems)
        this._ToastrService.success(response.message)
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
  

}
