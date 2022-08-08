import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from '../../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  

  constructor(private _http:HttpClient) { }

  retrieveProduct(product_id:number):Observable<any>{
    
    return this._http.get(`${environment.base_url}product/${product_id}/`)
  }


  buyNow(product_id:number, qty:number){
    let data={
      'product_id':product_id,
      'qty':qty
    }

    this._http.post(`${environment.base_url}checkout`,data)
  }
}
