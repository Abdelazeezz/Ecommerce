import { Component, computed, OnInit, Signal } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-nav-blank',
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.css']
})
export class NavBlankComponent implements OnInit {
  constructor(private _AuthService:AuthService ,private _CartService:CartService){}

  cartCount:Signal<number> = computed(()=> this._CartService.cartNumber());
ngOnInit(): void {
  // this._CartService.cartNumber.subscribe({
  //   next:(data) =>{
  //     this.cartCount = data
  //   }
  // })
  
this._CartService.getUserCart().subscribe({
  next:(response)=>{
    this._CartService.cartNumber.set(response.numOfCartItems);
  }
})




}

  LogOutUser():void{
    this._AuthService.logOut();


  }

}
