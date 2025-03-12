import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private _HttpClient: HttpClient) {}

  cartNumber: WritableSignal<number> = signal(0);

  addToCart(productId: string): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      { productId: productId }
    );
  }

  getUserCart(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart`);
  }

  removeItem(productId: string): Observable<any> {
    return this._HttpClient.delete(
      `${environment.baseUrl}/api/v1/cart/${productId}`
    );
  }
  updateCartProduct(productId: string, newCount: number): Observable<any> {
    return this._HttpClient.put(
      `${environment.baseUrl}/api/v1/cart/${productId}`,
      { count: newCount }
    );
  }

  checkOut(cartId: string, userData: object): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,
      { shippingAddress: userData }
    );
  }

  clearCartitems(): Observable<any> {
    return this._HttpClient.delete(
      `${environment.baseUrl}/api/v1/cart`
    );
  }
}
