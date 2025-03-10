import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EcomdataService {

  constructor(private _HttpClient:HttpClient) { }
  baseUrl:string =`https://ecommerce.routemisr.com/api/v1/`

  getAllProduct(pagenumber:number = 1):Observable<any>{
   return this._HttpClient.get(this.baseUrl +`products?page=${pagenumber}`)
  }

  getProductById(id:string):Observable<any>{
    return this._HttpClient.get(this.baseUrl +`products/${id}`);
  }

  getCatigories():Observable<any>{
    return this._HttpClient.get(this.baseUrl +`categories`)
  }

  
}
