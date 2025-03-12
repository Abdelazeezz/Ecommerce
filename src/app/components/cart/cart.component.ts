import { Component, OnInit, Renderer2 } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
constructor(private _CartService:CartService,private _Renderer2:Renderer2){}

cartDetails:any={};

ngOnInit(): void {
  this._CartService.getUserCart().subscribe({
    next:(response)=>{
     console.log(response)
    this.cartDetails = response.data

    }


    ,error:(err) => {
  console.log(err);
  
},
      
  })
}

Removeproduct(Id:string):void{
  this._CartService.removeItem(Id).subscribe({
    next:(response)=>{
      //console.log(response)
      this._CartService.cartNumber.set(response.numOfCartItems)
      this.cartDetails= response.data
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}

changeCount(Id:string,count:number,ele1:HTMLButtonElement,ele2:HTMLButtonElement):void{
 
  if(count>0){
    this._Renderer2.setAttribute(ele1,'disabled','true')
    this._Renderer2.setAttribute(ele2,'disabled','true')
    this._CartService.updateCartProduct(Id,count).subscribe({
      next:(response)=>{
        //console.log(response)
        this.cartDetails= response.data
        this._Renderer2.removeAttribute(ele1,'disabled')
        this._Renderer2.removeAttribute(ele2,'disabled')
      },
      error:(err)=>{
        console.log(err);
        this._Renderer2.removeAttribute(ele1,'disabled')
        this._Renderer2.removeAttribute(ele2,'disabled')
      }
    })
  }
}

clearcart():void{
  this._CartService.clearCartitems().subscribe({
    next:(response)=>{
      console.log(response);
      if(response.message == "success"){
        this._CartService.cartNumber.set(0)
        this.cartDetails = 0

      }
      
    },
    error:(err)=>{
      console.log(err);
      
    }
  })

}

}
