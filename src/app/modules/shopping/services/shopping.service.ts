import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  base_url:string = "http://127.0.0.1:8000/api/";

  constructor(private _http:HttpClient) { }

  retrieveProduct(product_id:number):Observable<any>{
    
      //console.log("data = ",this._http.get(`${this.base_url}product/${product_id}/`))
    return this._http.get(`${this.base_url}product/${product_id}/`)
  }


  buyNow(product_id:number, qty:number){
    let data={
      'product_id':product_id,
      'qty':qty
    }

    console.log("data = ", data)
    this._http.post(`${this.base_url}checkout`,data)
  }
}
